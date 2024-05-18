import { getSession } from 'next-auth/react';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;
  const email = session.user.email;

  switch (method) {
    case 'POST':
      await redis.sadd(email, req.body.url);
      res.status(200).json({ message: 'Progress saved' });
      break;
    case 'DELETE':
      await redis.srem(email, req.body.url);
      res.status(200).json({ message: 'Progress removed' });
      break;
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}