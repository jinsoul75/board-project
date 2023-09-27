import { connectDB } from "@/util/database";
import {ObjectId} from 'mongodb'
import { NextApiRequest,NextApiResponse } from 'next/types';

export default async function Handler(req:NextApiRequest, res:NextApiResponse) {
console.log(req.body)
  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content==="") {
      return res.status(500).json("fill the title and content");
    }
    try {
      let db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { title: req.body.title, content: req.body.content} },
        );
        res.redirect(302, '/')
    } catch (error) {
      console.error();
    }
  }
}
