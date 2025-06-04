import { Client } from "ssh2";
import fs from "fs";
import {
  EC2Client,
  DescribeInstanceStatusCommand,
} from "@aws-sdk/client-ec2";

const ec2 = new EC2Client({ region: "ap-south-1" });

async function waitForInstanceHealthOK(instanceId) {
  let passed = false;

  console.log("Waiting for instance to pass 2/2 status checks...");

  while (!passed) {
    await new Promise((res) => setTimeout(res, 10000)); // wait 5s

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

export async function startSSHSession(socket, language, imageMap, host, privateKeyPath, instanceId) {
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
          socket.emit("data", `No Docker image found for language: ${language}`);
          return;
        }

        const cmd = `docker run --rm --name ${containerName} -it ${selectedImage} /bin/bash`;
        console.log("Running command:", cmd);

        stream.write(cmd + "\n");

        stream.on("data", (data) => {
          socket.emit("data", data.toString());
        });

        stream.on("close", () => {
          console.log("Stream closed");
          conn.end();
        });

        socket.on("data", (data) => {
          stream.write(data);
        });

        socket.on("disconnect", () => {
          console.log("Client disconnected");
          conn.end();
        });
      });
    })
    .on("error", (err) => {
      socket.emit("data", "SSH connection error: " + err.message);
    })
    .connect(sshConfig);
}
