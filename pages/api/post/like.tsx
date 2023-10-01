import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: Session | null = await getServerSession(req, res, authOptions);
  const db = (await connectDB).db('forum');

  let likeInfo = {
    pageId: new ObjectId(req.body.pageId),
    userId: new ObjectId(session?.user?.id),
  };

  const foundOneLike = await db
    .collection('like')
    .findOne({ pageId: new ObjectId(req.body.pageId) });

  if (req.method === 'POST') {
    try {
      if (foundOneLike) {
        // eslint-disable-next-line no-unused-vars
        let result = await db.collection('like').deleteOne(foundOneLike);
        res.status(200).json('삭제완료');
      } else {
        // eslint-disable-next-line no-unused-vars
        let result = await db.collection('like').insertOne(likeInfo);
        res.status(200).json('저장완료');
      }
      const count = await db
        .collection('like')
        .countDocuments({ pageId: new ObjectId(req.body.pageId) });
      // eslint-disable-next-line no-unused-vars
      const foundOnePost = await db
        .collection('post')
        .updateOne({ _id: new ObjectId(req.body.pageId) }, { $set: { likeCount: count } });
    } catch (error) {
      console.error();
    }
  } else {
    return res.status(500).json('Wrong Request');
  }
}
