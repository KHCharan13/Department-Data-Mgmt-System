import Link from "next/link";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { Dropdown, Input, Grid } from "@nextui-org/react";
import { useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Searchresult } from "./searchresult";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const [data, setData] = useState([]);
  const [allTeach, setTeach] = useState([]);
  const [type, setType] = useState("Type of User");
  const [input, setInput] = useState("");
  var a = 0;
  const [vis, setVis] = useState("false");
  const [final, setFinal] = useState([]);
  const getData = async (key) => {
    const reqRef = collection(db, "users");
    if (key === "teacher") {
      const q = query(reqRef, where("type", "==", "teacher"));
      const snap = onSnapshot(q, (snapshot) => {
        console.log(key);
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      return snap;
    } else if (key === "student") {
      const q = query(reqRef, where("type", "==", "student"));
      const snap = onSnapshot(q, (snapshot) => {
        console.log(key);
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
      return snap;
    }
  };
  const fetchData = (value) => {
    if (data.length === 0) {
      alert("Select the Type of User / No data available");
    } else {
      const res = data.filter((user) => {
        return (
          value &&
          user &&
          user.name &&
          user.name.toLowerCase().includes(value.toLowerCase())
        );
      });
      setFinal(res);
    }
  };

  const b = useRouter();
  function viewProf(name, uid, email, type) {
    b.push({
      pathname: "/profile",
      query: {
        name,
        uid,
        email,
        type,
      },
    });
  }
  return (
    //
    <div className="bg-gradient-to-b from-light-blue-600 to-cyan-300 overflow-hidden">
      <nav className=" sm:mx-10 lg:mx-40 py-8  flex justify-between items-center font-poppins ">
        <Link className="w-0 sm:w-auto" href={"/user"}>
          <Image src="/logo.png" width={50} height={50} alt="NIE" />
        </Link>

        <div>
          <div className="flex bg-white py-2 px-3 rounded-full items-center">
            <Dropdown>
              <Dropdown.Button bordered rounded id="asd" flat>
                Type of user
              </Dropdown.Button>

              {user.email.includes("4ni") && (
                <Dropdown.Menu
                  onAction={(key) => {
                    getData(key);
                    document.getElementById("asd").textContent = key;
                    setType(key);
                  }}
                  aria-label="Static Actions"
                >
                  <Dropdown.Item key="student">Student</Dropdown.Item>
                </Dropdown.Menu>
              )}

              {!user.email.includes("4ni") && (
                <Dropdown.Menu
                  onAction={(key) => {
                    getData(key);
                    document.getElementById("asd").textContent = key;
                    setType(key);
                  }}
                  aria-label="Static Actions"
                >
                  <Dropdown.Item key="teacher">Teacher</Dropdown.Item>
                  <Dropdown.Item key="student">Student</Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
            <input
              className="mx-4 p-2 w-[30vw] rounded-3xl text-center bg-blue-100 placeholder:text-blue-700"
              placeholder="Enter The Name to Search"
              value={input}
              onFocus={(e) => {
                var num = 0;
                if (num === 0) {
                  setVis("true");
                }
              }}
              onChange={(e) => {
                setInput(e.target.value);
                fetchData(e.target.value);
              }}
              type="text"
            />
          </div>
          {input != "" && vis === "true" && (
            <div className="fixed flex px-4">
              <div className=" invisible "> Type of user </div>
              <div className="mx-4 p-2 w-[30vw] rounded-3xl text-center bg-blue-100/80 placeholder:text-blue-700">
                <div className="flex-col max-h-[100px] scroll-p-1 overflow-y-scroll">
                  {final.map((result, id) => {
                    return (
                      <div
                        className="bg-blue-100 rounded-3xl p-2 my-2 hover:bg-white hover:cursor-pointer"
                        key={id}
                        onFocus={() => {
                          setVis("true");
                        }}
                        onClick={(e) => {
                          viewProf(
                            result.name,
                            result.uid,
                            result.email,
                            result.type
                          );
                        }}
                      >
                        {result.name}, {result.uid}{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {input.length != 0 && vis === "true" && final.length === 0 && (
            <div className="fixed flex px-4">
              <div className=" invisible "> Type of user </div>
              <div className="mx-4 p-2 w-[30vw] rounded-3xl text-center bg-blue-100 placeholder:text-blue-700">
                No results found
              </div>
            </div>
          )}
        </div>
        <ul>
          {user && (
            <a
              onClick={() => auth.signOut()}
              className="hover:cursor-pointer hover:bg-cyan-500 transition-colors duration-500 py-2 px-4 bg-cyan-200 mx-2  rounded-lg text-cyan-900"
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
