import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const session: Session | null = await getServerSession(req, res, authOptions);
    const db = (await connectDB).db('forum');
    const foundOne = await db.collection('comment').findOne({ _id: new ObjectId(req.body._id) });

    if (foundOne?.email === session?.user?.email) {
      try {
        let db = (await connectDB).db('forum');
        // eslint-disable-next-line no-unused-vars
        let result = await db.collection('comment').deleteOne({ _id: new ObjectId(req.body._id) });
        res.status(200).json('Deleted Successfully');
      } catch (error) {
        res.status(500);
      }
    } else {
      return res.status(500).json('Unmatch User');
    }
  } else {
    return res.status(500).json('Wrong request method');
  }
}
