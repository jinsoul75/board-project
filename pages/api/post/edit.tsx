import { connectDB } from "@/util/database";
import {ObjectId} from 'mongodb'
import { NextApiRequest,NextApiResponse } from 'next/types';

export default async function Handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content==="") {
      return res.status(500).json("fill the title and content");
    }
    try {
      let db = (await connectDB).db("forum");
      // eslint-disable-next-line no-unused-vars
      let result = await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: { title: req.body.title, content: req.body.content} },
        );
        res.redirect(302, `/detail/${req.body._id}`)
    } catch (error) {
      console.error();
    }
  }
}
