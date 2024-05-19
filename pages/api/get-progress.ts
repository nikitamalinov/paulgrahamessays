import { getSession } from 'next-auth/react';
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const email = session.user.email;
  const completedLessons = await kv.smembers(email);

  res.status(200).json({ completedLessons });
}