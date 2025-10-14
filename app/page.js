import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <Image
          alt="let us clean logo"
          height={140}
          width={140}
          src="https://nciholasegner.s3.us-east-2.amazonaws.com/let-us-clean/clean-logo.webp"
        />
        <h1>Let Us Clean MN</h1>
        <p>Home</p>
        <p>About</p>
      </header>
      <main>
        <p>test</p>
      </main>
    </div>
  );
}
