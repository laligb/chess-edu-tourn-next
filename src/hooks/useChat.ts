import { useState } from "react";

function useChat() {
  const [openChat, setOpenChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const handleOpenChat = (userId: string) => {
    setOpenChat(userId);
  };

  const handleCloseChat = () => {
    setOpenChat(null);
    setMessage("");
  };

  return { message, openChat, setOpenChat, handleOpenChat, handleCloseChat };
}

export default useChat;
