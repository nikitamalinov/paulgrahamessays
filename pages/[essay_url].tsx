import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EssayPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { essay_url } = router.query;
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (session) {
      fetch(`/api/progress?url=${essay_url}`)
        .then((res) => res.json())
        .then((data) => {
          setIsRead(data.isRead);
        });
    }
  }, [session, essay_url]);

  const handleReadStatus = () => {
    fetch('/api/progress', {
      method: isRead ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: essay_url }),
    }).then(() => {
      setIsRead(!isRead);
    });
  };

  return (
    <div>
      <h1>{essay_url}</h1>
      {session && (
        <button onClick={handleReadStatus}>
          {isRead ? 'Mark as Unread' : 'Mark as Read'}
        </button>
      )}
    </div>
  );
}