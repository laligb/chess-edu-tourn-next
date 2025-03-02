import styles from "./page.module.css";

import ChatSocket from "@/components/socketComponents/ChatSocket";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ChatSocket />
      </main>
    </div>
  );
}
