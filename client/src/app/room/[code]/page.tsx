"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { socket } from "@/lib/socket";

export default function RoomPage() {
  const { code } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const username = searchParams.get("username") || "Guest";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const mode = searchParams.get("mode");

    if (mode === "create") {
      socket.emit("create_room", {
        roomCode: code,
        username,
      });
    } else {
      socket.emit("join_room", {
        roomCode: code,
        username,
      });
    }

    const handleReceiveMessage = (data: any) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleRoomNotFound = () => {
      alert("Room does not exist");
      router.push("/");
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("room_not_found", handleRoomNotFound);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("room_not_found", handleRoomNotFound);
    };
  }, [code, username, searchParams, router]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      roomCode: code,
      username,
      message,
    });

    setMessage("");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back button */}
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="bg-white/10 px-2 py-1 rounded-lg text-sm font-mono">
                  {code}
                </span>
              </h1>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Chatting as {username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Connection status */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>Connected</span>
            </div>
            
            <button
              onClick={() => router.push("/")}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Leave Room
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <section className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No messages yet</h3>
              <p className="text-gray-400">
                Start the conversation! Type a message below 👋
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isOwnMessage = msg.username === username;
              const showUsername = index === 0 || messages[index - 1]?.username !== msg.username;

              return (
                <div
                  key={index}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div className={`max-w-[80%] sm:max-w-[60%] ${isOwnMessage ? "items-end" : "items-start"} flex flex-col`}>
                    {showUsername && !isOwnMessage && (
                      <p className="text-xs text-gray-500 mb-1 ml-3">
                        {msg.username}
                      </p>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 shadow-lg ${
                        isOwnMessage
                          ? "bg-white text-black rounded-br-sm"
                          : "bg-zinc-900 text-white border border-white/10 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm break-words">{msg.message}</p>
                    </div>
                    {showUsername && isOwnMessage && (
                      <p className="text-xs text-gray-500 mt-1 mr-3">
                        You
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </section>

      {/* Input Bar */}
      <footer className="border-t border-white/10 bg-zinc-950/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 resize-none"
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 120) + "px";
                }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                {message.length > 0 && <span>⏎ Send</span>}
              </div>
            </div>

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 min-w-[80px]"
            >
              Send
            </button>
          </div>
          
          {/* Typing indicator placeholder */}
          <div className="h-4 mt-1">
            <p className="text-xs text-gray-500 animate-pulse">
              {/* Add typing indicator logic here if needed */}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}