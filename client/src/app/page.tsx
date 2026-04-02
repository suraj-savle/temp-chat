"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const createRoom = () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }
    
    const finalRoomCode =
      roomCode.trim() || `ROOM-${Math.floor(Math.random() * 10000)}`;

    router.push(
      `/room/${finalRoomCode}?username=${encodeURIComponent(username)}&mode=create`
    );
  };

  const joinRoom = () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }
    
    if (!roomCode.trim()) {
      alert("Please enter room code");
      return;
    }

    router.push(
      `/room/${roomCode}?username=${encodeURIComponent(username)}&mode=join`
    );
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Main Card */}
        <div className="rounded-3xl bg-zinc-950/90 backdrop-blur-sm border border-white/10 shadow-2xl p-8 transition-all duration-300 hover:border-white/20">

          {/* Form */}
          <div className="space-y-5">
            {/* Username Input */}
            <div className="group">
              <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">
                USERNAME
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (roomCode ? joinRoom() : createRoom())}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-12 py-3.5 outline-none text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Room Code Input */}
            <div className="group">
              <label className="block text-xs font-medium text-gray-400 mb-2 ml-1">
                ROOM CODE
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 002-2v-4a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2zm10 4v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter room code (optional for create)"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && (roomCode ? joinRoom() : createRoom())}
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-12 py-3.5 outline-none text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 uppercase"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">
                Leave empty to generate random code
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={createRoom}
                className="relative rounded-xl bg-white text-black font-semibold py-3.5 px-4 transition-all duration-300 hover:bg-gray-100 hover:scale-105 active:scale-95 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Room
                </span>
              </button>

              <button
                onClick={joinRoom}
                className="relative rounded-xl border border-white/20 bg-white/5 text-white font-semibold py-3.5 px-4 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Join Room
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}