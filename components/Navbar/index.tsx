import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  return (
    <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-white ">
      <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
        <nav className="flex text-lg justify-center items-center">
          <Link href="/" className="mr-auto ">
      <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
            <div className="flex flex-col items-start text-sm footerSM:text-2xl text-black h-[46px] mt-2 mb-7 ">
              <span className="font-bold  text-orange">Paul</span>
              <span className="font-bold  flex ">
                <span className="text-orange">Graham&nbsp;</span>Essays
          <div className="ml-auto">
            {session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button onClick={() => signIn('google')}>Sign in with Google</button>
            )}
          </div>
        </nav>
      </div>
      <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
    </div>
  );
              </span>
}\n
            </div>
          </Link>
          <Link href="https://paul-graham-gpt.vercel.app/" target="_blank">
            Search Essays 🔍
          </Link>
        </nav>
      </div>
      <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
    </div>
  );
}
