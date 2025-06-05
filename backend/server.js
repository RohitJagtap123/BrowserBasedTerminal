import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import handleSocketConnection from "./terminalSocket.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './auth/authRoutes.js';
dotenv.config();

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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes); // Now /api/auth/signup and /api/auth/login are active

