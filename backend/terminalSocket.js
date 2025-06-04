import { launchDockerInstance } from './ec2config.js';
import { startSSHSession } from './sshService.js';

const languageImageMap = {
  python: 'python:latest',
  node: 'node:latest',
  java: 'openjdk:latest',
  cpp: 'gcc:latest',
  go: 'golang:latest',
  rust: 'rust:latest',
  ruby: 'ruby:latest',
  php: 'php:latest',
  bash: 'bash:latest',
};

export default function handleSocketConnection(io) {
  io.on("connection", (socket) => {
    socket.on("select-language", async (language) => {
      const selectedLang = language.toLowerCase();

      if (!languageImageMap[selectedLang]) {
        socket.emit("data", `Unsupported language: ${selectedLang}`);
        return;
      }

      try {
        const { publicIp, instanceId } = await launchDockerInstance();
        console.log(`Launched EC2 for ${selectedLang} at ${publicIp}`);

        startSSHSession(
          socket,
          selectedLang,
          languageImageMap,
          publicIp,
          "private-key.pem",
          instanceId
        );
      } catch (err) {
        console.error("Error launching instance:", err);
        socket.emit("data", `Error: ${err.message}`);
      }
    });
  });
}
