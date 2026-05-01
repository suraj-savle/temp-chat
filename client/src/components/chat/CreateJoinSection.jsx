"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { socket, connectSocket } from "@/lib/socket";
import { IconMessages, IconArrowRight, IconCheck, IconLock, IconTrash, IconBolt } from "@tabler/icons-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto bg-red-50">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Server Not Running
          </h2>
          <p className="text-gray-500 mb-4">
            Please start the backend server first:
          </p>
          <code className="block bg-gray-100 p-3 rounded-lg text-sm mb-4 font-mono">
            cd server && npm install && npm run dev
          </code>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-900 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      
      {/* Gradient blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-50/20 via-purple-50/20 to-pink-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Branding Section */}
          <div className="space-y-8">

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[1.1]">
                Chat for the{" "}
                <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent">
                  moment.
                </span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                JustUs is built for conversations that dont need to be saved. 
                Fast, private, and entirely ephemeral.
              </p>
            </div>
          </div>

          {/* Right Side - Create & Join Sections */}
          <div className="space-y-5">
            {/* Create Room Section */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Create a Room</h3>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                    YOUR NAME
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors"
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
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-9 pr-4 py-2.5 outline-none text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={createRoom}
                  disabled={isCreating}
                  className="w-full rounded-xl bg-gray-900 text-white font-semibold py-2.5 px-4 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {isCreating ? "Creating..." : "Create New Room"}
                  <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Join Room Section */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Join a Room</h3>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                    YOUR NAME
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors"
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
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-9 pr-4 py-2.5 outline-none text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white transition-all duration-300 text-sm"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                    ROOM CODE
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors"
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
                      placeholder="Enter room code"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-9 pr-4 py-2.5 outline-none text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white transition-all duration-300 uppercase text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={joinRoom}
                  disabled={isJoining}
                  className="w-full rounded-xl border border-gray-200 bg-white text-gray-900 font-semibold py-2.5 px-4 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {isJoining ? "Joining..." : "Join Room"}
                  <IconArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}