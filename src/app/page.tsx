"use client";

import styles from "./page.module.css";
import { useDispatch } from "react-redux";
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
    <div className={styles.page}>
      <main className={styles.main}>
        <br></br>
        <br></br>
        <WelcomePage />
      </main>
    </div>
  );
}
