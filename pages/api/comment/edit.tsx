import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (req.body.comment === '') {
      return res.status(500).json('fill the title and content');
    }
    try {
      const db = (await connectDB).db('forum');
      // eslint-disable-next-line no-unused-vars
      let result = await db
        .collection('comment')
        .updateOne({ _id: new ObjectId(req.body._id) }, { $set: { content: req.body.comment } });
      res.redirect(302, '/');
    } catch (error) {
      console.error();
    }
  } else {
    return res.status(500).json('Wrong Request');
  }
}
