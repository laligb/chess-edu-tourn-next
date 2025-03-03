"use client";

import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import ChatSocket from "@/components/socketComponents/ChatSocket";
import { checkUserSession } from "@/redux/slices/users/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ChatSocket />
      </main>
    </div>
  );
}
