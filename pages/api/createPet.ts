// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { pets, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

type Data = pets | { error: string };

function validateBodyData(bodyFromReq: any) {
  let parsedPet: pets = {
    id: randomUUID(),
    name: validateName(bodyFromReq.name),
    age: validateAge(bodyFromReq.age),
    birthday: validateBirthday(bodyFromReq.birthday),
  };
  return parsedPet;
}

function validateName(nameFromReq: any) {
  if (!nameFromReq) throw new Error("Must enter a valid name.");
  if (typeof nameFromReq !== "string")
    throw new Error("Name must be a string.");
  return nameFromReq;
}

function validateAge(ageFromReq: any) {
  let age = Number(ageFromReq);
  if (isNaN(age)) return null;
  if (age < 0) throw new Error("Age can't be a negative number.");
  return age;
}

function validateBirthday(birthdayFromReq: any) {
  if (!birthdayFromReq) return null;
  let parsedDate = new Date(birthdayFromReq);
  console.log({ parsedDate });
  return parsedDate;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      throw new Error("Request method must be POST.");
    }
    const bodyParsed = JSON.parse(req.body);
    const validatedObj = validateBodyData(bodyParsed);

    const createdPet = await prisma.pets.create({ data: validatedObj });

    return res.status(201).send(createdPet);
  } catch (error: any) {
    console.log({ error: error.message });
    return res.status(400).send({ error: error.message });
  }
}
