import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [dropmenu, setDropmenu] = useState(false);
  const items = [
    { name: "Home", link: "/" },
    { name: "SignIn", link: "/signin" },
    { name: "SignUp", link: "/signup" },
    { name: "Jobs", link: "/jobs" },
    { name: "Dashboard", link: "/dashboard/employer" },
    { name: "Dashboard-customer", link: "/dashboard/customer" },
  ];
  return (
    <nav className=" bg-[#0F74BB] flex flex-col justify-center text-slate-50">
      <div className="flex justify-between font-semibold  lg:w-[1180px] w-screen items-center lg:px-0 px-5 self-center h-[60px]">
        {/**Logo */}
        <div className="">
          <Link href="/">
            <a className="flex self-center">
              <Image
                src="/images/Job_Openings_white_logo.png"
                height={31}
                width={183}
                alt="Job OPenings"
              />
            </a>
          </Link>
        </div>
        {/**Links */}
        <div
          className="lg:hidden"
          onClick={() => setDropmenu((dropmenu) => !dropmenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div className="hidden lg:block py-5">
          {items.map((items) => {
            return (
              <Link key={items.name} href={items.link}>
                <a className="px-4 py-5">{items.name}</a>
              </Link>
            );
          })}
        </div>
      </div>
      {dropmenu && (
        <div className="flex flex-col lg:hidden">
          {items.map((items) => {
            return (
              <Link key={items.name} href={items.link}>
                <a className="px-5 py-4" onClick={() => setDropmenu((dropmenu) => !dropmenu)}>{items.name}</a>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
