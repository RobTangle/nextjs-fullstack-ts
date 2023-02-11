"use client";

import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Form from "./Form";
import axios from "axios";
import { useQuery } from "react-query";
import { pets } from "@prisma/client";
// require("dotenv").config();

// const inter = Inter({ subsets: ["latin"] });
async function getPets() {
  console.log(`${process.env.BASE_URL}/api/getPets`);
  console.log({ processENV: `${process.env.BASE_URL}` });

  const res: any = await axios.get(`/api/getPets`);
  console.log("RES.DATA ! = ", res.data);
  return res.data;
}

export default function Home() {
  const { data, error, isLoading } = useQuery<{ pets: pets[] }>({
    queryFn: getPets,
    queryKey: ["pets"],
  });
  if (error) return error;
  if (isLoading) return "Loading.....";

  return (
    <main className="py-7 px-48">
      <Link
        href={"/dashboard"}
        className={`bg-teal-500 text-black font-bold py-2 px-4 rounded-md`}
      >
        Go to dashboard
      </Link>
      <div>
        <h1 className="text-lg my-4">Pets</h1>
        <div>
          {Array.isArray(data?.pets) &&
            data?.pets.map((pet: any) => (
              <div
                className="bg-blue-300 rounded-md inline-block m-2 p-2"
                key={pet.id}
              >
                <h2>Id: {pet.id}</h2>
                <h2>Name: {pet.name}</h2>
                <h2>Age: {pet.age}</h2>
                <h2>Birthday: {pet.birthday}</h2>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Form />
      </div>
    </main>
  );
}
