import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.id as string; 
  const db = (await connectDB).db("forum");
  let result = await db.collection("comment").find({parent: new ObjectId(id)}).sort({ date: -1 }).toArray();
  res.status(200).json(result);
}
