// lib/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection helper
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

// Disconnect helper
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};