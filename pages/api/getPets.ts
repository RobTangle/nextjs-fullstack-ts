// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pets, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  pets: pets[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const petsArray = await prisma.pets.findMany();
    const response = {
      pets: petsArray,
    };
    res.status(200).send(response);
  } catch (error: any) {
    console.log({ error: error.message });
  }
}
