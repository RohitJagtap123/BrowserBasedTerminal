import {
  EC2Client,
  RunInstancesCommand,
  DescribeInstancesCommand,
  TerminateInstancesCommand,
} from "@aws-sdk/client-ec2";

const ec2 = new EC2Client({ region: "ap-south-1" });

export async function launchDockerInstance() {
  const userDataScript = `#!/bin/bash
apt update -y
apt install -y docker.io
usermod -aG docker ubuntu
systemctl enable docker
systemctl start docker
newgrp docker
`;

  const base64UserData = Buffer.from(userDataScript).toString("base64");

  const params = {
    ImageId: "ami-0e35ddab05955cf57", 
    InstanceType: "t2.micro",
    KeyName: "temp2", 
    MinCount: 1,
    MaxCount: 1,
    UserData: base64UserData,
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: [{ Key: "Name", Value: "ShellifyInstance" }],
      },
    ],
    // Using default security group by not specifying SecurityGroupIds
  };

  const runCommand = new RunInstancesCommand(params);
  const result = await ec2.send(runCommand);
  const instanceId = result.Instances[0].InstanceId;

  console.log(`Instance launched with ID: ${instanceId}`);

  let publicIp = null;
  while (!publicIp) {
    await new Promise((r) => setTimeout(r, 5000));
    const desc = await ec2.send(
      new DescribeInstancesCommand({ InstanceIds: [instanceId] })
    );
    const instance = desc.Reservations[0].Instances[0];
    if (instance.State.Name === "running" && instance.PublicIpAddress) {
      publicIp = instance.PublicIpAddress;
    }
  }

  return { instanceId, publicIp };
}

export async function terminateInstance(instanceId) {
  await ec2.send(new TerminateInstancesCommand({ InstanceIds: [instanceId] }));
  console.log(`Terminated instance: ${instanceId}`);
}