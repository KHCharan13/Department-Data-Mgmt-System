import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { DominoSpinner } from "react-spinners-kit";
import Requests from "../components/requests";
export default function user() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  if (loading)
    return (
      <div className="flex justify-center mt-[35vh]">
        <DominoSpinner size={400} color="#000000" />;
      </div>
    );
  if (!user) route.push("/");
  if (user)
    return (
      <div>
        <Navbar />
        {user.email.match("baasu.kondeti@gmail.com") && <Requests />}
        {!user.email.match("baasu.kondeti@gmail.com") && <Dashboard />}
      </div>
    );
}
