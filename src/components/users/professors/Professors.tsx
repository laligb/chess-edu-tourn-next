"use client";

"use client";

import { useEffect, useState } from "react";
import ProfessorsUI from "./ProfessorsUI";
import { useDispatch, useSelector } from "react-redux";
import useChat from "@/hooks/useChat";
import { User } from "@/types";
import { getUsers } from "@/redux/slices/users/userSlice";

const Professors = () => {
  const [isClient, setIsClient] = useState(false);
  const { setMessage, message, openChat, handleOpenChat, handleCloseChat } =
    useChat();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const professors: User[] = users.filter((user) => user.role === "professor");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
    if (users.length === 0) {
      dispatch(getUsers());
    }
    console.log(users);
    console.log(professors);
  }, [dispatch, users, professors]);

  if (!isClient) return <p>Loading professors...</p>;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProfessorsUI
      professors={filteredProfessors}
      searchQuery={searchQuery}
      handleClearSearch={handleClearSearch}
      handleSearchChange={handleSearchChange}
      handleOpenChat={handleOpenChat}
      openChat={openChat}
      handleCloseChat={handleCloseChat}
      setMessage={setMessage}
      message={message}
    />
  );
};

export default Professors;
