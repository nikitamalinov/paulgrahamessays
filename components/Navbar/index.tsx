import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { motion } from "framer-motion";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Navbar() {
  const { data: session } = useSession();
  const personTypeButtonStyles = `bg-orange text-white rounded-lg transition-colors 
  duration-200 text-md footerSM:text-lg xl:text-xl py-2 px-3 shadow-lg hover:shadow-lg 
  cursor-pointer hover:bg-orangeHover font-medium text-center nav:w-auto`;
  return (
    <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-white ">
      <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
        <nav className="flex text-lg justify-center items-center">
          <Link href="/" className="mr-auto ">
            <div className="flex flex-col items-start text-sm footerSM:text-2xl text-black h-[46px] mt-2 mb-7 ">
              <span className="font-bold  text-orange">Paul</span>
              <span className="font-bold  flex ">
                <span className="text-orange">Graham&nbsp;</span>Essays
                <div className="ml-auto"></div>
              </span>
            </div>
          </Link>
          <Link
            href="https://paul-graham-gpt.vercel.app/"
            target="_blank"
            className="mr-5 flex gap-1 items-center justify-center"
          >
            <span className="hidden footerSM:block font-medium">
              {" "}
              Search Essays
            </span>{" "}
            🔍
          </Link>
          <div className="mr-5">
            <motion.div
              className="flex flex-col justify-center items-center z-10"
              variants={childVariants}
            >
              {session ? (
                <button
                  onClick={() => signOut()}
                  className={`${personTypeButtonStyles}`}
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className={`${personTypeButtonStyles}`}
                >
                  Sign in
                </button>
              )}
            </motion.div>
          </div>
        </nav>
      </div>
      <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
    </div>
  );
}
