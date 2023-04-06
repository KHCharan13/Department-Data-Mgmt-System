import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  return (
    //
    <div className="bg-black/80 rounded-b-3xl overflow-hidden">
      <nav className=" sm:mx-10 lg:mx-40 py-8  flex justify-between items-center font-poppins ">
        <Link className="w-0 sm:w-auto" href={"/user"}>
          <Image src="/logo.png" width={70} height={70} alt="NIE" />
        </Link>

        <div>
          <select
            className="bg-white text-slate-800 w-[20vw] sm:w-[10vw] p-2 rounded-l-3xl border-2 border-amber-300 text-center"
            placeholder="Select"
          >
            <option
              className="bg-white text-slate-800 w-[20vw] sm:w-[10vw] p-2 rounded-l-3xl border-2 border-amber-300 text-center"
              value="Student"
            >
              Student
            </option>
            <option
              className="bg-white text-slate-800 w-[20vw] sm:w-[10vw] p-2 rounded-l-3xl border-2 border-amber-300 text-center"
              value="Teaching Staff"
            >
              Teaching Staff
            </option>
          </select>
          <input
            type="text"
            placeholder="Enter the User you want to find .."
            className=" bg-amber-300 text-center placeholder:text-white/80 text-black w-[40vw] border-2 border-amber-300 focus:bg-white transition-all duration-300 p-2 rounded-r-3xl"
          />
        </div>

        <ul>
          {user && (
            <a
              onClick={() => auth.signOut()}
              className="hover:cursor-pointer hover:bg-amber-600 transition-colors duration-500 py-2 px-4 bg-amber-400 mx-2  rounded-lg text-white"
            >
              Sign Out
            </a>
          )}
          {/* <Link legacyBehavior href={"#"}>
          <a className="hover:cursor-pointer hover:bg-teal-600 transition-colors duration-500 py-2 px-4 bg-teal-400 mx-2 rounded-lg text-white">
            Search
          </a>
        </Link> */}
        </ul>
      </nav>
    </div>
  );
}
