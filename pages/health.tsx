import useSWR from "swr";

export default function Home() {
  const { data, isLoading, error } = useSWR("/api/health", async (url) => {
    const response = await fetch(url);
    return response.json();
  });
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col justify-center min-h-screen items-center bg-gradient-to-tr from-black to-[#322B44] text-white">
      <h1 className="text-4xl font-bold">Health Check</h1>
      <p className="text-lg mt-4">Status: {data.status}</p>
    </main>
  );
}
