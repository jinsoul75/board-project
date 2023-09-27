import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    if (req.body.comment === '') {
      return res.status(500).json('fill the title and content');
    }
    try {
      const db = (await connectDB).db('forum');
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
