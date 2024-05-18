import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center bg-white ">
      <div className="flex flex-col w-[95vw] footerXM:w-[90vw] footerSM:w-[85vw] sm:w-[80vw] xxl:w-[1280px] ">
        <nav className="flex text-lg justify-center items-center">
          <Link href="/" className="mr-auto ">
            <div className="flex flex-col items-start text-sm footerSM:text-2xl text-black h-[46px] mt-2 mb-7 ">
              <span className="font-bold  text-orange">Paul</span>
<Link href="https://paul-graham-gpt.vercel.app/" className="navbar-link">Search</Link>
              <span className="font-bold  flex ">
                <span className="text-orange">Graham&nbsp;</span>Essays
              </span>
            </div>
          </Link>
        </nav>
      </div>
      <hr className="h-[1px] opacity-50 bg-[#C2C2C2] w-full border-0 rounded"></hr>
    </div>
  );
}
