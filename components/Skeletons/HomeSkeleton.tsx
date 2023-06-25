import useSWR from "swr";
import PageLayout from "@/components/Layouts/PageLayout";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { setCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";

export default function HomeSkeleton() {
  const divArray = Array.from({ length: 30 }, (_, index) => index);
  return (
    <PageLayout title="Paul Graham Essays">
      <div className="flex flex-col justify-center my-10">
        <Skeleton rounded="full" mb="10">
          <Progress value={100} colorScheme="greenScheme" rounded="full" />
        </Skeleton>

        <ul className="text-2xl">
          {divArray.map((item, index) => (
            <li
              key={index}
              className={`flex items-center border border-b border-[#e8ecf4] py-3`}
            >
              <Skeleton ml="5" rounded="full" px="4" py="4">
                <p className=""></p>
              </Skeleton>
              <Skeleton mx="5" rounded="full">
                <a href="" target="_blank" className="">
                  Hello World Skeleton
                </a>
              </Skeleton>
              <Skeleton ml="auto" mr="5" rounded="full" px="1">
                <button className="" disabled>
                  <AiOutlineCheckCircle className="text-gray hover:text-grayHover" />
                </button>
              </Skeleton>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
