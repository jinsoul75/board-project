import { connectDB } from '@/util/database';
import { getServerSession, Session } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { authOptions } from '../auth/[...nextauth]';
import timeFommatter from '@/util/dateFomatter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let session: Session | null = await getServerSession(req, res, authOptions);

  if (session) {
    req.body.email = session?.user?.email;
    req.body.author = session?.user?.name;
  }

  const newData = { ...req.body, date: timeFommatter() };

  if (req.method === 'POST') {
    if (req.body.title === '' || req.body.content === '') {
      return res.status(500).json('Title or Content is empty');
    }
    try {
      const db = (await connectDB).db('forum');
      // eslint-disable-next-line no-unused-vars
      let result = await db.collection('post').insertOne(newData);
      res.redirect(302, '/list?page=1');
    } catch (error) {
      console.error();
    }
  } else {
    return res.status(500).json('Wrong Request');
  }
}
