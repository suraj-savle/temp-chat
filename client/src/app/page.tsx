"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { socket, connectSocket } from "@/lib/socket";

// Generate random username on client side only
const generateRandomUsername = () => {
  const adjectives = [
    "Happy",
    "Cool",
    "Smart",
    "Fast",
    "Wild",
    "Clever",
    "Brave",
    "Calm",
  ];
  const nouns = [
    "Panda",
    "Tiger",
    "Eagle",
    "Wolf",
    "Fox",
    "Bear",
    "Hawk",
    "Lion",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${num}`;
};

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side only initialization
  useEffect(() => {
    setMounted(true);
    setUsername(generateRandomUsername());

    // Test connection
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Server connected:", data);
        setConnectionError(false);
      })
      .catch((err) => {
        console.error("Server not running:", err);
        setConnectionError(true);
      });
  }, []);

  const createRoom = async () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }

    setIsCreating(true);
    try {
      connectSocket();
      router.push(
        `/room/new?username=${encodeURIComponent(username)}&mode=create`,
      );
    } catch (error) {
      console.error("Create room error:", error);
      alert("Failed to create room. Make sure the server is running.");
      setIsCreating(false);
    }
  };

  const joinRoom = () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }

    if (!roomCode.trim()) {
      alert("Please enter a room code");
      return;
    }

    setIsJoining(true);
    try {
      connectSocket();
      router.push(
        `/room/${encodeURIComponent(roomCode.toUpperCase())}?username=${encodeURIComponent(username)}&mode=join&roomCode=${encodeURIComponent(roomCode.toUpperCase())}`,
      );
    } catch (error) {
      console.error("Join room error:", error);
      alert("Failed to join room. Make sure the server is running.");
      setIsJoining(false);
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Server Not Running
          </h2>
          <p className="text-gray-400 mb-4">
            Please start the backend server first:
          </p>
          <code className="block bg-zinc-900 p-3 rounded-lg text-sm mb-4">
            cd server && npm install && npm run dev
          </code>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-gray-100"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            TempChat
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Instant anonymous chat rooms
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-zinc-950/90 backdrop-blur-sm border border-white/10 shadow-2xl p-8 transition-all duration-300 hover:border-white/20">
          <div className="space-y-5">
            {/* Username Input */}
            <div className="group">
              <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">
                YOUR NAME
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-12 py-3.5 outline-none text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Room Code Input */}
            <div className="group">
              <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">
                ROOM CODE (Optional)
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10 4v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter room code to join (leave empty to create new)"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-12 py-3.5 outline-none text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 uppercase"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">
                Leave empty to create a new room with random code
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={createRoom}
                disabled={isCreating}
                className="rounded-xl bg-white text-black font-semibold py-3.5 px-4 transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {isCreating ? "Creating..." : "Create Room"}
                </span>
              </button>

              <button
                onClick={joinRoom}
                disabled={isJoining}
                className="rounded-xl border border-white/20 bg-white/5 text-white font-semibold py-3.5 px-4 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  {isJoining ? "Joining..." : "Join Room"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>✨ No registration • Anonymous • Temporary rooms ✨</p>
        </div>
      </div>
    </main>
  );
}
