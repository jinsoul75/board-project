import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest,NextApiResponse } from 'next/types';

export default async function Handler(req:NextApiRequest , res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      let db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(req.body._id) });
      res.status(200).json("제발되죠,,ㅡ,잔짜,,,,,나눈물나..")
    } catch (error) {
      res.status(500);
    }
  } else {
    return res.status(500).json("Wrong request method");
  }
}
