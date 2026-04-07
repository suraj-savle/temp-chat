import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

// Store room data
const rooms = new Map(); // roomCode -> { users: Map, messages: [], createdAt, createdBy }
const userSessions = new Map(); // socketId -> { username, roomCode, joinedAt }

// Generate random room code
function generateRandomRoomCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.get("/api/rooms", (req, res) => {
  const roomList = Array.from(rooms.keys()).map(roomCode => ({
    code: roomCode,
    users: rooms.get(roomCode).users.size,
    createdAt: rooms.get(roomCode).createdAt,
  }));
  res.json({ rooms: roomList });
});

io.on("connection", (socket) => {
  console.log("✅ Connected:", socket.id);

  // Create room
  socket.on("create_room", ({ roomCode, username }) => {
    try {
      let finalRoomCode = roomCode;
      
      if (!finalRoomCode || finalRoomCode.trim() === "") {
        finalRoomCode = generateRandomRoomCode();
        while (rooms.has(finalRoomCode)) {
          finalRoomCode = generateRandomRoomCode();
        }
      }
      
      if (rooms.has(finalRoomCode)) {
        socket.emit("room_error", { 
          message: "Room already exists. Please use a different code." 
        });
        return;
      }
      
      rooms.set(finalRoomCode, {
        users: new Map(),
        messages: [],
        createdAt: new Date(),
        createdBy: socket.id,
        isActive: true,
      });
      
      userSessions.set(socket.id, {
        username,
        roomCode: finalRoomCode,
        joinedAt: new Date(),
      });
      
      const room = rooms.get(finalRoomCode);
      room.users.set(socket.id, username);
      socket.join(finalRoomCode);
      
      socket.emit("room_created", {
        roomCode: finalRoomCode,
        message: `Room ${finalRoomCode} created!`,
      });
      
      socket.emit("receive_message", {
        username: "System",
        message: `✨ Welcome! You created room: ${finalRoomCode}`,
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true,
      });
      
      // Send updated users list
      io.to(finalRoomCode).emit("room_users", {
        users: Array.from(room.users.values()),
        count: room.users.size,
      });
      
      console.log(`📝 Room created: ${finalRoomCode} by ${username}`);
    } catch (error) {
      console.error("Create room error:", error);
      socket.emit("room_error", { message: "Failed to create room" });
    }
  });

  // Join room
  socket.on("join_room", ({ roomCode, username }) => {
    try {
      if (!roomCode || roomCode.trim() === "") {
        socket.emit("room_error", { message: "Please enter a room code" });
        return;
      }
      
      const roomCodeUpper = roomCode.toUpperCase().trim();
      
      if (!rooms.has(roomCodeUpper)) {
        socket.emit("room_error", { 
          message: `Room "${roomCodeUpper}" does not exist. Please check the code.` 
        });
        return;
      }
      
      const room = rooms.get(roomCodeUpper);
      
      if (!room.isActive) {
        socket.emit("room_error", { message: "Room is no longer active" });
        return;
      }
      
      userSessions.set(socket.id, {
        username,
        roomCode: roomCodeUpper,
        joinedAt: new Date(),
      });
      
      room.users.set(socket.id, username);
      socket.join(roomCodeUpper);
      
      socket.emit("room_joined", {
        roomCode: roomCodeUpper,
        message: `Joined ${roomCodeUpper}!`,
      });
      
      // Send previous messages
      socket.emit("previous_messages", room.messages);
      
      // Notify others
      socket.to(roomCodeUpper).emit("receive_message", {
        username: "System",
        message: `👋 ${username} joined the room`,
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true,
      });
      
      // Send updated users list
      io.to(roomCodeUpper).emit("room_users", {
        users: Array.from(room.users.values()),
        count: room.users.size,
      });
      
      console.log(`👤 ${username} joined: ${roomCodeUpper}`);
    } catch (error) {
      console.error("Join room error:", error);
      socket.emit("room_error", { message: "Failed to join room" });
    }
  });

  // Send message
  socket.on("send_message", ({ roomCode, username, message }) => {
    try {
      const session = userSessions.get(socket.id);
      if (!session || session.roomCode !== roomCode) {
        socket.emit("room_error", { message: "Unauthorized" });
        return;
      }
      
      if (!rooms.has(roomCode)) {
        socket.emit("room_error", { message: "Room no longer exists" });
        return;
      }
      
      const messageData = {
        username,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString(),
        isSystem: false,
      };
      
      const room = rooms.get(roomCode);
      room.messages.push(messageData);
      // Keep only last 100 messages
      if (room.messages.length > 100) {
        room.messages.shift();
      }
      
      io.to(roomCode).emit("receive_message", messageData);
    } catch (error) {
      console.error("Send message error:", error);
    }
  });

  // Typing indicator
  socket.on("typing", ({ roomCode, username, isTyping }) => {
    try {
      const session = userSessions.get(socket.id);
      if (session && session.roomCode === roomCode) {
        socket.to(roomCode).emit("user_typing", { username, isTyping });
      }
    } catch (error) {
      console.error("Typing error:", error);
    }
  });

  // Update username
  socket.on("update_username", ({ newUsername }) => {
    try {
      const session = userSessions.get(socket.id);
      if (session) {
        const oldUsername = session.username;
        session.username = newUsername;
        
        const room = rooms.get(session.roomCode);
        if (room && room.users.has(socket.id)) {
          room.users.set(socket.id, newUsername);
          
          io.to(session.roomCode).emit("receive_message", {
            username: "System",
            message: `✏️ ${oldUsername} changed name to ${newUsername}`,
            timestamp: new Date().toLocaleTimeString(),
            isSystem: true,
          });
          
          // Send updated users list
          io.to(session.roomCode).emit("room_users", {
            users: Array.from(room.users.values()),
            count: room.users.size,
          });
        }
      }
    } catch (error) {
      console.error("Update username error:", error);
    }
  });

  // Leave room
  socket.on("leave_room", ({ roomCode, username }) => {
    try {
      const session = userSessions.get(socket.id);
      if (session && session.roomCode === roomCode) {
        const room = rooms.get(roomCode);
        
        if (room && room.users.has(socket.id)) {
          room.users.delete(socket.id);
          socket.leave(roomCode);
          
          // Notify others
          socket.to(roomCode).emit("receive_message", {
            username: "System",
            message: `👋 ${username} left the room`,
            timestamp: new Date().toLocaleTimeString(),
            isSystem: true,
          });
          
          // Send updated users list
          io.to(roomCode).emit("room_users", {
            users: Array.from(room.users.values()),
            count: room.users.size,
          });
          
          // Clean up empty rooms
          if (room.users.size === 0) {
            setTimeout(() => {
              if (rooms.has(roomCode) && rooms.get(roomCode).users.size === 0) {
                rooms.delete(roomCode);
                console.log(`🗑️ Room deleted (inactive): ${roomCode}`);
              }
            }, 3600000); // 1 hour
          }
        }
        
        userSessions.delete(socket.id);
      }
    } catch (error) {
      console.error("Leave room error:", error);
    }
  });

  // Close room (creator only)
  socket.on("close_room", ({ roomCode }) => {
    try {
      const session = userSessions.get(socket.id);
      const room = rooms.get(roomCode);
      
      // Check if user is the creator
      if (room && room.createdBy === socket.id) {
        // Notify all users in the room
        io.to(roomCode).emit("room_closed", {
          message: "Room has been closed by the creator",
        });
        
        // Remove all users from the room
        const users = Array.from(room.users.keys());
        users.forEach(userSocketId => {
          const userSocket = io.sockets.sockets.get(userSocketId);
          if (userSocket) {
            userSocket.leave(roomCode);
          }
        });
        
        // Delete the room
        rooms.delete(roomCode);
        console.log(`🔒 Room closed by creator: ${roomCode}`);
      } else {
        socket.emit("room_error", { message: "Only the room creator can close the room" });
      }
    } catch (error) {
      console.error("Close room error:", error);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
    
    const session = userSessions.get(socket.id);
    if (session) {
      const { username, roomCode } = session;
      
      if (rooms.has(roomCode)) {
        const room = rooms.get(roomCode);
        
        if (room.users.has(socket.id)) {
          room.users.delete(socket.id);
          
          io.to(roomCode).emit("receive_message", {
            username: "System",
            message: `👋 ${username} left the room`,
            timestamp: new Date().toLocaleTimeString(),
            isSystem: true,
          });
          
          // Send updated users list
          io.to(roomCode).emit("room_users", {
            users: Array.from(room.users.values()),
            count: room.users.size,
          });
        }
        
        // Clean up empty rooms
        if (room.users.size === 0) {
          setTimeout(() => {
            if (rooms.has(roomCode) && rooms.get(roomCode).users.size === 0) {
              rooms.delete(roomCode);
              console.log(`🗑️ Room deleted (inactive): ${roomCode}`);
            }
          }, 3600000);
        }
      }
      
      userSessions.delete(socket.id);
    }
  });
  socket.on("check_is_creator", ({ roomCode }) => {
  const room = rooms.get(roomCode);
  if (room) {
    socket.emit("is_creator", { isCreator: room.createdBy === socket.id });
  }
});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO ready for connections\n`);
});