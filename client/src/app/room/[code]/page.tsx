"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { socket } from "@/lib/socket";

function RoomContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const roomInitDoneRef = useRef(false);

  const mode = searchParams.get("mode");
  const initialUsername = searchParams.get("username") || "Guest";
  const roomCodeParam = searchParams.get("roomCode");

  const [roomCode, setRoomCode] = useState<string>("");
  const [username, setUsername] = useState(initialUsername);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [showSidebar, setShowSidebar] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [roomError, setRoomError] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTyping = useCallback(
    (value: string) => {
      if (!roomCode) return;

      if (!isTyping && value.trim().length > 0) {
        setIsTyping(true);
        socket.emit("typing", {
          roomCode,
          username,
          isTyping: true,
        });
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        if (isTyping) {
          setIsTyping(false);
          socket.emit("typing", {
            roomCode,
            username,
            isTyping: false,
          });
        }
      }, 1000);
    },
    [isTyping, roomCode, username],
  );

  const sendMessage = useCallback(() => {
    if (!message.trim() || !roomCode) return;

    socket.emit("send_message", {
      roomCode,
      username,
      message: message.trim(),
    });

    setMessage("");

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isTyping) {
      socket.emit("typing", {
        roomCode,
        username,
        isTyping: false,
      });
      setIsTyping(false);
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [message, roomCode, username, isTyping]);

  const updateUsername = () => {
    if (tempUsername.trim() && tempUsername !== username) {
      setUsername(tempUsername);
      socket.emit("update_username", { newUsername: tempUsername });
    }
    setIsEditingName(false);
  };

  const copyRoomCode = () => {
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode);
    const toast = document.createElement("div");
    toast.textContent = "Room code copied!";
    toast.className =
      "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-xl text-sm font-medium z-50 animate-fade-in";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  useEffect(() => {
    if (!mounted) return;

    // Connect socket
    if (!socket.connected) {
      socket.connect();
    }

    // Join/create should only run once for this page instance.
    if (!roomInitDoneRef.current) {
      if (mode === "create" && roomCodeParam) {
        socket.emit("join_room", { roomCode: roomCodeParam, username });
        roomInitDoneRef.current = true;
      } else if (mode === "create") {
        socket.emit("create_room", { roomCode: "", username });
        roomInitDoneRef.current = true;
      } else if (mode === "join" && roomCodeParam) {
        socket.emit("join_room", { roomCode: roomCodeParam, username });
        roomInitDoneRef.current = true;
      } else if (mode === "join" && !roomCodeParam) {
        setRoomError("No room code provided");
        setTimeout(() => router.push("/"), 2000);
      }
    }

    // Socket event handlers
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const handleRoomCreated = (data: { roomCode: string; message: string }) => {
      setRoomCode(data.roomCode);
      window.history.pushState(
        {},
        "",
        `/room/${encodeURIComponent(data.roomCode)}?username=${encodeURIComponent(username)}&mode=create&roomCode=${encodeURIComponent(data.roomCode)}`,
      );
    };

    const handleRoomJoined = (data: { roomCode: string; message: string }) => {
      setRoomCode(data.roomCode);
    };

    const handleRoomError = (data: { message: string }) => {
      setRoomError(data.message);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    };

    const handleReceiveMessage = (data: any) => {
      setMessages((prev) => [...prev, data]);
    };

    const handlePreviousMessages = (prevMessages: any[]) => {
      setMessages(prevMessages);
    };

    const handleRoomUsers = (data: { users: string[]; count: number }) => {
      setOnlineUsers(data.count);
    };

    const handleUserTyping = (data: {
      username: string;
      isTyping: boolean;
    }) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        if (data.isTyping) {
          newSet.add(data.username);
        } else {
          newSet.delete(data.username);
        }
        return newSet;
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("room_created", handleRoomCreated);
    socket.on("room_joined", handleRoomJoined);
    socket.on("room_error", handleRoomError);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("previous_messages", handlePreviousMessages);
    socket.on("room_users", handleRoomUsers);
    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("room_created", handleRoomCreated);
      socket.off("room_joined", handleRoomJoined);
      socket.off("room_error", handleRoomError);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("previous_messages", handlePreviousMessages);
      socket.off("room_users", handleRoomUsers);
      socket.off("user_typing", handleUserTyping);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [mode, roomCodeParam, username, router, mounted]);

  const getTypingText = () => {
    const typingArray = Array.from(typingUsers).filter((u) => u !== username);
    if (typingArray.length === 0) return "";
    if (typingArray.length === 1) return `${typingArray[0]} is typing...`;
    if (typingArray.length === 2)
      return `${typingArray[0]} and ${typingArray[1]} are typing...`;
    return `${typingArray.length} people are typing...`;
  };

  if (!mounted || !roomCode) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Connecting to room...</p>
        </div>
      </div>
    );
  }

  if (roomError) {
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Error</h2>
          <p className="text-gray-400">{roomError}</p>
          <p className="text-gray-500 text-sm mt-4">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">Room:</h1>
                <button
                  onClick={copyRoomCode}
                  className="bg-white/10 px-3 py-1 rounded-lg text-sm font-mono hover:bg-white/20 transition-colors flex items-center gap-2 group"
                >
                  {roomCode}
                  <svg
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400">Chatting as</span>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && updateUsername()}
                      className="bg-white/10 px-2 py-1 rounded text-sm text-white outline-none focus:border-white/30"
                      autoFocus
                    />
                    <button
                      onClick={updateUsername}
                      className="text-xs text-green-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="text-xs text-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-sm text-white hover:text-gray-300 flex items-center gap-1 group"
                  >
                    {username}
                    <svg
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>{onlineUsers} online</span>
            </div>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="sm:hidden rounded-xl border border-white/20 bg-white/5 px-3 py-2 hover:bg-white/10 transition-all"
            >
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <button
              onClick={() => router.push("/")}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Leave Room
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <section className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No messages yet
                </h3>
                <p className="text-gray-400">
                  Start the conversation! Type a message below 👋
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isOwnMessage = msg.username === username;
                const isSystem = msg.isSystem;
                const showUsername =
                  index === 0 || messages[index - 1]?.username !== msg.username;

                if (isSystem) {
                  return (
                    <div key={index} className="flex justify-center">
                      <div className="bg-white/5 px-4 py-2 rounded-full text-xs text-gray-400">
                        {msg.message}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-[60%] ${isOwnMessage ? "items-end" : "items-start"} flex flex-col`}
                    >
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
                        <p
                          className={`text-[10px] mt-1 ${isOwnMessage ? "text-gray-500" : "text-gray-400"}`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                      {showUsername && isOwnMessage && (
                        <p className="text-xs text-gray-500 mt-1 mr-3">You</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* Sidebar */}
        <aside
          className={`${showSidebar ? "block" : "hidden"} sm:block fixed sm:relative right-0 top-0 bottom-0 w-64 bg-zinc-950/95 backdrop-blur-sm border-l border-white/10 overflow-y-auto z-20 sm:z-auto`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">
                Online Users ({onlineUsers})
              </h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="sm:hidden text-gray-400 hover:text-white"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {username} (You)
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Input Bar */}
      <footer className="border-t border-white/10 bg-zinc-950/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessage(value);
                  handleTyping(value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                rows={1}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 resize-none"
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height =
                    Math.min(target.scrollHeight, 120) + "px";
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

          {getTypingText() && (
            <div className="h-4 mt-1">
              <p className="text-xs text-gray-500 animate-pulse">
                {getTypingText()}
              </p>
            </div>
          )}
        </div>
      </footer>
    </main>
  );
}

export default function RoomPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <RoomContent />
    </Suspense>
  );
}
