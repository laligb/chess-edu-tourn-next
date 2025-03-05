"use client";

import { useDispatch } from "react-redux";
import ChatSocket from "@/components/socketComponents/ChatSocket";
import { checkUserSession } from "@/redux/slices/users/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { WelcomePage } from "@/components/WelcomePage";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className={}>
      <main className={}>
        <br></br>
        <br></br>
        <WelcomePage />
        {/* <ChatSocket /> */}
      </main>
    </div>
  );
}
