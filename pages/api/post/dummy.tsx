import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDB } from '../../../util/database';
import timeFommatter from '@/util/dateFomatter';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const newData = { ...req.body, date: timeFommatter() };
    const db = (await connectDB).db('forum');
    await db.collection('post').insertOne(newData);
    return res.redirect(302, '/');
  } catch (err) {
    return res.status(500).json('error');
  }
};

export default handler;
