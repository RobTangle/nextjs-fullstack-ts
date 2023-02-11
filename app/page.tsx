import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="py-7 px-48">
      <Link
        href={"/dashboard"}
        className="bg-teal-500 text-black font-bold py-2 px-4 rounded-md"
      >
        Go to dashboard
      </Link>
    </main>
  );
}
