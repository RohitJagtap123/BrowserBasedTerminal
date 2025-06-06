import { Client } from "ssh2";
import fs from "fs";
import { EC2Client, DescribeInstanceStatusCommand } from "@aws-sdk/client-ec2";

const ec2 = new EC2Client({ region: "ap-south-1" });

const restrictedCommands = [
  "rm",
  "shutdown",
  "reboot",
  "poweroff",
  "curl",
  "wget",
  "scp",
  "ftp",
  "mv /",
  "dd",
  ":(){ :|:& };:",
  "kill",
  "killall",
  "init",
  "halt",
  "telnet",
  "mkfs",
  "nc",
  "nmap",
  "chmod 777 /",
  "chown",
  "mount",
  "umount",
  "sudo",
  "su",
  "passwd",
  "useradd",
  "userdel",
  "groupadd",
  "groupdel",
  "exit",
];

async function waitForInstanceHealthOK(instanceId) {
  let passed = false;

  console.log("Waiting for instance to pass 2/2 status checks...");

  while (!passed) {
    await new Promise((res) => setTimeout(res, 10000)); // wait 10s

    const statusCmd = new DescribeInstanceStatusCommand({
      InstanceIds: [instanceId],
      IncludeAllInstances: true,
    });

    const result = await ec2.send(statusCmd);
    const statuses = result.InstanceStatuses;

    if (
      statuses.length &&
      statuses[0].InstanceStatus.Status === "ok" &&
      statuses[0].SystemStatus.Status === "ok"
    ) {
      passed = true;
      console.log("Instance passed 2/2 checks.");
    } else {
      console.log("Still waiting on instance checks...");
    }
  }
}

export async function startSSHSession(
  socket,
  language,
  imageMap,
  host,
  privateKeyPath,
  instanceId,
  onEnd
) {
  const conn = new Client();
  const containerName = `term_${socket.id}`;
  const privateKey = fs.readFileSync(privateKeyPath);

  await waitForInstanceHealthOK(instanceId); // ✅ Wait for instance health check

  const sshConfig = {
    host,
    port: 22,
    username: "ubuntu",
    privateKey,
  };

  let sessionEnded = false;

  function endSessionOnce() {
    if (!sessionEnded) {
      sessionEnded = true;
      onEnd(); // decrement container
    }
  }
  conn
    .on("ready", () => {
      console.log("SSH ready");

      conn.shell((err, stream) => {
        if (err) {
          socket.emit("data", `Error starting shell: ${err.message}`);
          return;
        }

        const selectedImage = imageMap[language];
        if (!selectedImage) {
          socket.emit(
            "data",
            `No Docker image found for language: ${language}`
          );
          return;
        }

        const cmd = `docker run --rm --name ${containerName} -it ${selectedImage}`;
        console.log("Running command:", cmd);

        stream.write(cmd + "\n");

        stream.on("data", (data) => {
          socket.emit("data", data.toString());
        });

        stream.on("close", () => {
          console.log("Stream closed");
          conn.end();
          endSessionOnce(); // trigger container decrement
        });

        socket.on("data", (data) => {
          const command = data.toString().trim().toLowerCase();

          const isDangerous = restrictedCommands.some((word) =>
            command.includes(word)
          );

          if (isDangerous) {
            socket.emit(
              "data",
              "❌ Command blocked: Restricted command detected.\n"
            );
            return;
          }

          stream.write(data);
        });

        socket.on("disconnect", () => {
          console.log("Client disconnected");
          conn.end();
          endSessionOnce(); // also trigger on socket disconnect
        });
      });
    })
    .on("error", (err) => {
      socket.emit("data", "SSH connection error: " + err.message);
    })
    .connect(sshConfig);
}
