import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import handleSocketConnection from "./terminalSocket.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

handleSocketConnection(io);

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
