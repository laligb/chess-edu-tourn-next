"use client";

import io from "socket.io-client";

console.log("🔄 Attempting to connect to WebSocket...");

const isBrowser = typeof window !== "undefined";
const socket: ReturnType<typeof io> | null = isBrowser
  ? io("http://localhost:3000/chat", {
      transports: ["websocket"],
      reconnection: true,
    })
  : null;

if (isBrowser && socket) {
  (window as unknown as { socket?: ReturnType<typeof io> }).socket = socket;

  socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server:", socket.id);
  });

  socket.on("connect_error", (error: unknown) => {
    console.error("❌ WebSocket Connection Error:", error);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket server");
  });
}

export default socket;
