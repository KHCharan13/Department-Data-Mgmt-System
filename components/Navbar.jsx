import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  return (
    <nav className="mx-14 py-8 flex justify-between items-center">
      <Link href={"/user"}>
        {" "}
        <img
          href="../public/logo.png"
          alt="National Institute of Enginerring "
        />{" "}
      </Link>
      <ul>
        <Link legacyBehavior href={"/user"}>
          <a className="hover:cursor-pointer hover:bg-teal-600 transition-colors duration-500 py-2 px-4 bg-teal-400 mx-2 rounded-lg text-white">
            User
          </a>
        </Link>
        {user && (
          <a
            onClick={() => auth.signOut()}
            className="hover:cursor-pointer hover:bg-teal-600 transition-colors duration-500 py-2 px-4 bg-teal-400 mx-2 rounded-lg text-white"
          >
            Sign Out
          </a>
        )}

        <Link legacyBehavior href={"/user"}>
          <a className="hover:cursor-pointer hover:bg-teal-600 transition-colors duration-500 py-2 px-4 bg-teal-400 mx-2 rounded-lg text-white">
            Search
          </a>
        </Link>
      </ul>
    </nav>
  );
}
