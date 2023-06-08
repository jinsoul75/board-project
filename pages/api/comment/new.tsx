import { NextApiRequest, NextApiResponse } from "next/types";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: any = await getServerSession(req, res, authOptions);

  let commentInfo = {
    content: req.body.comment,
    author: session.user.name,
    email: session.user.email,
    parent: new ObjectId(req.body._id),
    date: req.body.date

  };
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("comment").insertOne(commentInfo);
      res.status(200).json("저장완료");
    } catch (error) {
      console.error();
    }
  }else{
    return res.status(500).json("Wrong Request");
  }
}
