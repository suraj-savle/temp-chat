import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const activeRooms = new Set<string>();

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("create_room", ({ roomCode, username }) => {
    activeRooms.add(roomCode);

    socket.join(roomCode);

    io.to(roomCode).emit("receive_message", {
      username: "System",
      message: `${username} created the room`,
    });
  });

  socket.on("join_room", ({ roomCode, username }) => {
    if (!activeRooms.has(roomCode)) {
      socket.emit("room_not_found");
      return;
    }

    socket.join(roomCode);

    io.to(roomCode).emit("receive_message", {
      username: "System",
      message: `${username} joined the room`,
    });
  });

  socket.on("send_message", ({ roomCode, username, message }) => {
    io.to(roomCode).emit("receive_message", {
      username,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("server running on 5000");
});