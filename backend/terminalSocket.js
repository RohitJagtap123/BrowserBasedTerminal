import { startSSHSession } from "./sshService.js";
import { getOrLaunchInstance, releaseContainer } from "./instanceManager.js";

const languageImageMap = {
  python: "python:latest",
  node: "node:latest",
  java: "openjdk:latest",
  cpp: "gcc:latest",
  go: "golang:latest",
  rust: "rust:latest",
  ruby: "ruby:latest",
  php: "php:latest",
  bash: "bash:latest",
};

export default function handleSocketConnection(io) {
  io.on("connection", async (socket) => {
    socket.on("select-language", async (language) => {
      try {
        const { instanceId, publicIp } = await getOrLaunchInstance();
        console.log("Launched/Selected EC2 at", publicIp);

        startSSHSession(
          socket,
          language,
          languageImageMap,
          publicIp,
          "private-key.pem",
          instanceId,
          async () => await releaseContainer(instanceId)
        );
      } catch (e) {
        socket.emit("data", "Failed to start session: " + e.message);
      }
    });
  });
}
