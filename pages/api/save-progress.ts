import { getSession } from 'next-auth/react';
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { lessonUrl, completed } = req.body;
  const email = session.user.email;

  if (completed) {
    await kv.sadd(email, lessonUrl);
  } else {
    await kv.srem(email, lessonUrl);
  }

  res.status(200).json({ message: 'Progress saved' });
}