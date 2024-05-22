import useSWR from "swr";
import PageLayout from "@/components/Layouts/PageLayout";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { setCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import HomeSkeleton from "@/components/Skeletons/HomeSkeleton";
import { useSession } from "next-auth/react";

const MyComponent = () => {
  const [cookieValues, setCookieValues] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [idToken, setIdToken] = useState("");
  const { data: session, status } = useSession();

  let url = "api/get-rss";
  let completedLessonsUrl = "";
  if (email && idToken) {
    completedLessonsUrl = `api/get-progress?email=${email}&idToken=${idToken}`;
  }

  const { data, error, isLoading } = useSWR(url, async () => {
    const res = await fetch(url, { timeout: 5000 });
    return res.json();
  });

  const { data: completedLessons, mutate } = useSWR(
    completedLessonsUrl,
    async () => {
      const res = await fetch(completedLessonsUrl, { timeout: 5000 });
      return res.json();
    }
  );

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user) {
        setEmail(session.user.email);
      }
      if (session && session.idToken) {
        setIdToken(session.idToken);
      }
    };
    fetchSession();
  }, [session]);

  async function handleClick(item, completed) {
    const response = await fetch("/api/save-progress", {
      method: "POST",
      body: JSON.stringify({
        lessonUrl: item.link[0],
        completed: completed,
        email: email,
        idToken: idToken,
      }),
    });
    await mutate();
  }

  if (isLoading || status === "loading" || (session && !completedLessons)) {
    return <HomeSkeleton />;
  }

  return (
    <PageLayout title="Paul Graham Essays">
      <div className="flex flex-col justify-center my-10">
        {totalProgress !== 0 && (
          <Progress
            value={(100 * totalProgress) / data.length}
            colorScheme="greenScheme"
            rounded="full"
            mb="10"
          />
        )}

        <ul className="text-2xl">
          {data.map((item, index) => (
            <li
              key={index}
              className={`flex items-center border border-b border-[#e8ecf4] py-3 ${
                cookieValues[item.title[0]] ? "bg-lightGreen" : "bg-white"
              }`}
            >
              <p className="pl-5">{index + 1}</p>
              <a href={item.link[0]} target="_blank" className="mx-5">
                {item.title[0]}
              </a>
              {completedLessons && completedLessons.completedLessons && (
                <>
                  {completedLessons.completedLessons.includes(item.link[0]) ? (
                    <button
                      onClick={() => handleClick(item, false)}
                      className="ml-auto mr-5"
                    >
                      <AiOutlineCheckCircle className="text-green hover:text-greenHover" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClick(item, true)}
                      className="ml-auto mr-5"
                    >
                      <AiOutlineCheckCircle className="text-gray hover:text-grayHover" />
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default MyComponent;
