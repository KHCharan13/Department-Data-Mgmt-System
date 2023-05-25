import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { DominoSpinner } from "react-spinners-kit";
import Admin from "../components/Admin";
import Requests from "../components/requests";
import Image from "next/image";
import { sendEmailVerification } from "firebase/auth";
import { async } from "@firebase/util";

export default function user() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const sendVerif = async () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Email Sent");
    });
  };

  if (loading)
    return (
      <div className="flex justify-center mt-[35vh]">
        <title>Loading</title>
        <DominoSpinner size={400} color="#000000" />;
      </div>
    );
  if (!user) route.push("/");
  if (user)
    if (user.emailVerified)
      return (
        <div>
          <title>{user.displayName}</title>
          <div className=" fixed top-0 w-full z-40 ">
            <Navbar />
          </div>

          <div className="mt-[200px]">
            {user.email.match("baasu.kondeti@gmail.com") && <Admin />}
            {!user.email.match("baasu.kondeti@gmail.com") && <Dashboard />}
          </div>
        </div>
      );
    else
      return (
        <div className=" mt-40 ">
          <div className="m-14 flex justify-center items-center ">
            <Image src="/OIP.png" width={200} height={200} alt="error" />
          </div>
          <div className="m-14 flex justify-center items-center text-center">
            The Account is not verified please check your mail to verify the
            account before trying again
            <br />
            If not found in the inbox please check your Spam or press the button
            below to resend the mail
            <br />
          </div>
          <div>
            <b className=" flex justify-center items-center ">
              Email = {user.email}
            </b>
            <br />
            <div className="flex justify-center items-center">
              <button
                className="mt-10 mx-4 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => sendVerif()}
              >
                Send Verification
              </button>
              <button
                className="mt-10 mx-4 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => auth.signOut()}
              >
                Back to Login/Exit
              </button>
            </div>
          </div>
        </div>
      );
}
