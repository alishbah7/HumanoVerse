import React from "react";
import Layout from "@theme/Layout";
import { Loader2 } from "lucide-react";
import styles from "./index.module.css";

export default function WorkingPage() {
  return (
    <Layout title="Working..." description="Loading screen">
      <main className={styles.wrapper}>
        <div className={styles.card}>
          <Loader2 className={styles.loader} />
          <h1 className={styles.title}>Working On It...</h1>
        </div>
      </main>
    </Layout>
  );
}
