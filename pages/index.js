import useSWR from "swr";
import PageLayout from "@/components/Layouts/PageLayout";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { setCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { useState } from 'react';
import { Progress } from "@chakra-ui/react";
import HomeSkeleton from "@/components/Skeletons/HomeSkeleton";

const MyComponent = () => {
  const [cookieValues, setCookieValues] = useState({});
  const [selectedEssay, setSelectedEssay] = useState('');
  const [totalProgress, setTotalProgress] = useState(0);

  let url = "api/get-rss";

  const { data, error, isLoading } = useSWR(url, async () => {
    const res = await fetch(url, { timeout: 5000 });
    return res.json();
  });

  useEffect(() => {
    const cookies = {};
    if (data && !isLoading) {
      data.forEach((item) => {
        cookies[item.title[0]] = getCookie(item.title[0]);
        if (getCookie(item.title[0]) == true) {
          setTotalProgress((prev) => prev + 1);
        }
      });
      setCookieValues(cookies);
    }
  }, [data, isLoading]);

  const handleClick = (item) => {
    const newValue = !cookieValues[item.title[0]];
    if (newValue) setTotalProgress((prev) => prev + 1);
    else setTotalProgress((prev) => prev - 1);
    setCookie(item.title[0], newValue);
    setCookieValues((prevCookieValues) => ({
      ...prevCookieValues,
      [item.title[0]]: newValue,
    }));
  };

  if (isLoading) {
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
              <a href="#" onClick={() => setSelectedEssay(item.link[0])} className="mx-5">
                {item.title[0]}
              </a>
              {cookieValues[item.title[0]] ? (
                <button
                  onClick={() => handleClick(item)}
                  className="ml-auto mr-5"
                >
                  <AiOutlineCheckCircle className="text-green hover:text-greenHover" />
                </button>
              ) : (
                <button
                  onClick={() => handleClick(item)}
                  className="ml-auto mr-5"
                >
                  <AiOutlineCheckCircle className="text-gray hover:text-grayHover" />
                </button>
              )}
            </li>
          ))}
      {selectedEssay && <iframe src={selectedEssay} className="essay-iframe" />}

        </ul>
      </div>
    </PageLayout>
  );
};

export default MyComponent;
