import { connectDB } from "@/util/database";
import {ObjectId} from 'mongodb'
import { NextApiRequest,NextApiResponse } from 'next/types';

export default async function Handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method === "POST") {
    if (req.body.email === "") {
      return res.status(500).json("email input is empty");
    }
    try {
      let db = (await connectDB).db("test");
      // eslint-disable-next-line no-unused-vars
      let result = await db
        .collection("users")
        .updateOne(
          { _id: new ObjectId(req.body.id) },
          { $set: { email: req.body.email} },
        );
        res.redirect(302, '/')
    } catch (error) {
      console.error();
    }
  }
}
