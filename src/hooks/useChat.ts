import { useState, useEffect } from "react";
import socket from "@/utils/sockets";

interface MessagePayload {
  message: string;
  userId: string;
}

const useChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (payload: MessagePayload) => {
      if (openChat === payload.userId) {
        setMessages((prev) => [...prev, payload]);
      } else {
        setNotifications((prev) => [...prev, payload.userId]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [openChat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const payload = { message, userId: openChat };
      socket.emit("sendMessage", payload, (response) => {
        console.log("Message sent:", response);
        setMessage("");
      });
    }
  };

  const handleOpenChat = (professorId: string) => {
    setOpenChat(professorId);
    setMessages([]);
    setNotifications((prev) => prev.filter((id) => id !== professorId));
  };

  const handleCloseChat = () => {
    setOpenChat(null);
  };

  return {
    messages,
    message,
    setMessage,
    handleSendMessage,
    handleOpenChat,
    handleCloseChat,
    openChat,
    notifications,
  };
};

export default useChat;
