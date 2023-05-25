import { collection, onSnapshot, query, where } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { storage } from "../utils/firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import Router, { useRouter } from "next/router";
import { Dropdown, Collapse, Text } from "@nextui-org/react";
import React from "react";
import { db } from "../utils/firebase";
import { useState, useEffect } from "react";
import Image from "next/image";
function profile() {
  const b = useRouter();
  const {
    query: { name, uid, email, type },
  } = b;
  const [userDetails, setDetails] = useState([]);
  const [tablevis, setTableVis] = useState(false);
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);
  const props = {
    name,
    uid,
    email,
    type,
  };
  var a = null;
  const viewItems = () => {
    a = userDetails;
    setTimeout(() => {
      setTableVis(true);

      setDocList([]);
      setMetaList([]);
      console.log(a[0].uid, a[0].email);
      const fileListRef = ref(storage, `${a[0].type}/${a[0].uid}/`);
      listAll(fileListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setDocList((prev) => [...prev, url]);
          });
          getMetadata(item).then((data) => {
            setMetaList((prev) => [...prev, data]);
          });
        });
        console.log(docList, docList.length);
      });
    }, 5000);
  };

  const getData = async () => {
    const reqRef = collection(db, "users");
    const a = document.getElementById("mail");
    const e_mail = a.textContent;
    const q = query(reqRef, where("email", "==", e_mail));

    await onSnapshot(q, (snapshot) => {
      setDetails(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    console.log(userDetails);
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);
  return (
    <div>
      <div>
        <div className="fixed top-0 w-full z-40">
          <Navbar />
        </div>

        <div className=" mx-[10%] mt-[200px] font-poppins bg-[#F4F4F4] rounded-3xl min-h-screen p-14">
          <div className="flex justify-center items-center mix-blend-multiply">
            <Image
              src="/avatar-scaled.jpeg"
              width={300}
              height={300}
              alt="Profile Avatar"
            />
          </div>
          <div className="flex justify-center">
            <div>
              <div className="flex">
                <h1 className="font-bold mr-4">Name : </h1>
                {name}
              </div>
              <div className="flex">
                <h1 className="font-bold mr-4">Email : </h1>{" "}
                <h1 id="mail">{email}</h1>
              </div>
              <div className="flex">
                <h1 className="font-bold mr-4">Id : </h1> {uid}
              </div>
              <div className="flex">
                <h1 className="font-bold mr-4">Type of user:</h1> {type}
              </div>
            </div>
          </div>
          <div className="justify-center">
            <h1 className="text-4xl mt-8 flex justify-center">
              Documents of {name}
            </h1>
            <div className="flex gap-8 justify-center ">
              {a != null && <div>hari </div>}
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => viewItems()}
              >
                Click here to view
              </button>
              <button
                className="mt-10 bg-amber-300 w-fit px-5 py-3 rounded-lg hover:bg-amber-500 hover:text-white "
                onClick={() => b.push("/user")}
              >
                Back
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {Boolean(Boolean(docList.length) ^ tablevis.valueOf()) == true && (
              <div>No Files Uploaded</div>
            )}
          </div>

          <div className="p-10 flex justify-center items-center">
            {tablevis.valueOf() == false && <div></div>}
            {tablevis.valueOf() == true && (
              <div>
                {!email.includes("4ni") && (
                  <div>
                    <Collapse.Group accordion={false}>
                      <Collapse title="Journals">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "journal"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Research Papers">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "research"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Seminars">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "seminar"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Resume">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "resume"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Other Documents">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "others"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                    </Collapse.Group>
                  </div>
                )}
                {email.includes("4ni") && (
                  <div>
                    <Collapse.Group accordion={false}>
                      <Collapse title="Activity Points">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "activitypoints"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Project Documents">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "projects"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Seminars">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "seminar"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Resume">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "resume"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                      <Collapse title="Other Documents">
                        <Text>
                          <table className="w-full rounded-3xl bg-white ">
                            <tr className="border-b-4">
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Name
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Type
                              </th>
                              <th
                                scope="col"
                                className=" font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                File Description
                              </th>
                              <th
                                scope="col"
                                className="font-bold text-gray-900 px-6 py-4 text-left"
                              >
                                Links
                              </th>
                            </tr>
                          </table>
                          {metaList.map((items) => {
                            {
                              return (
                                <div>
                                  {items.customMetadata.filetype.match(
                                    "others"
                                  ) && (
                                    <div>
                                      <table className="w-full rounded-3xl bg-white ">
                                        <tr>
                                          <td className="  px-6 py-4 text-left">
                                            {items.customMetadata.filename}
                                          </td>

                                          <td className="   px-6 py-4 text-left">
                                            {items.customMetadata.filetype}
                                          </td>
                                          <td className=" px-6 py-4 text-left">
                                            {
                                              items.customMetadata
                                                .filedescription
                                            }
                                          </td>
                                          <td className=" font-bold px-6 py-4 text-left">
                                            <a
                                              className="hover:underline text-blue-400 "
                                              href={
                                                docList[metaList.indexOf(items)]
                                              }
                                            >
                                              Click here to view
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          })}
                        </Text>
                      </Collapse>
                    </Collapse.Group>
                  </div>
                )}
              </div>
            )}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
