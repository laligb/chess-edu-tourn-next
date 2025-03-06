"use client";

import { useEffect, useState } from "react";
import socket from "../../utils/sockets";

interface MessagePayload {
  message: string;
}

const ChatSocket = () => {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    console.log("📡 WebSocketChat component mounted");

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server:", socket?.id);
    });

    socket.on("receiveMessage", (payload: MessagePayload) => {
      console.log("📩 Received Message:", payload.message);
      setMessages((prev) => {
        const updatedMessages = [...prev, payload];
        console.log("Updated Messages:", updatedMessages);
        return updatedMessages;
      });
    });

    return () => {
      console.log("🛑 WebSocketChat component unmounted");
      socket?.off("connect");
      socket?.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = { message: inputMessage };
    console.log("📤 Sending message:", newMessage);

    socket?.emit("sendMessage", newMessage, (response: unknown) => {
      console.log("📨 Server Acknowledged:", response);
    });

    setInputMessage("");
  };

  return (
    <div className="chat-container">
      <h2 style={{ color: "black" }}>Chat</h2>
      <div className="chat-box">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index} className="chat-message" style={{ color: "black" }}>
              🗨 {msg.message}
            </p>
          ))
        )}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>

      <style jsx>{`
        .chat-container {
          margin: auto;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
          text-align: center;
        }
        .chat-box {
          overflow-y: auto;
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 10px;
          background: white;
        }
        .chat-message {
          text-align: left;
          padding: 5px;
          margin: 3px 0;
          background: #e3e3e3;
          border-radius: 5px;
        }
        input {
          width: 70%;
          padding: 5px;
          margin-right: 5px;
        }
        button {
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ChatSocket;
