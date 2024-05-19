import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/redis';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { email } = session.user;

  if (req.method === 'POST') {
    const { url } = req.body;
    await client.sAdd(email, url);
    res.status(200).json({ message: 'Progress saved' });
  } else if (req.method === 'GET') {
    const urls = await client.sMembers(email);
    res.status(200).json({ urls });
  } else if (req.method === 'DELETE') {
    const { url } = req.body;
    await client.sRem(email, url);
    res.status(200).json({ message: 'Progress removed' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
client.connect();