import { useRouter } from "next/router";
import Head from "next/head";

const EssayPage = () => {
  const router = useRouter();
  const { link } = router.query;
  return (
    <>
      <Head>
        <base target="_parent" />
      </Head>
      <iframe
        src={typeof link === "string" ? link : ""}
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </>
  );
};

export default EssayPage;
