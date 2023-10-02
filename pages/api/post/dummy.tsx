import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDB } from '../../../util/database';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset).toISOString();
  try {
    const newData = { ...req.body, date: dateOffset };
    const db = (await connectDB).db('forum');
    await db.collection('post').insertOne(newData);
    return res.redirect(302, '/');
  } catch (err) {
    return res.status(500).json('error');
  }
};

export default handler;
