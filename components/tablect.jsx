import React from "react";
import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { storage } from "../utils/firebase";
import { Dropdown, Collapse, Text } from "@nextui-org/react";

export default function TabLec({ children, email, uid, name, type }) {
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);

  const viewItems = () => {
    setDocList([]);
    setMetaList([]);
    const fileListRef = ref(storage, `${type}/${uid}/`);
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setDocList((prev) => [...prev, url]);
        });
        getMetadata(item).then((data) => {
          setMetaList((prev) => [...prev, data]);
        });
      });
    });
  };

  useEffect(() => {
    viewItems();
    console.log(docList);
  }, []);
  // type of the documents are
  // journal
  // research
  //
  // others are same as students
  return (
    <div className="m-8 justify-center items-center">
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
                      {items.customMetadata.filetype.match("journal") && (
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
                                {items.customMetadata.filedescription}
                              </td>
                              <td className=" font-bold px-6 py-4 text-left">
                                <a
                                  className="hover:underline text-blue-400 "
                                  href={docList[metaList.indexOf(items)]}
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
                      {items.customMetadata.filetype.match("research") && (
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
                                {items.customMetadata.filedescription}
                              </td>
                              <td className=" font-bold px-6 py-4 text-left">
                                <a
                                  className="hover:underline text-blue-400 "
                                  href={docList[metaList.indexOf(items)]}
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
                      {items.customMetadata.filetype.match("seminar") && (
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
                                {items.customMetadata.filedescription}
                              </td>
                              <td className=" font-bold px-6 py-4 text-left">
                                <a
                                  className="hover:underline text-blue-400 "
                                  href={docList[metaList.indexOf(items)]}
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
                      {items.customMetadata.filetype.match("resume") && (
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
                                {items.customMetadata.filedescription}
                              </td>
                              <td className=" font-bold px-6 py-4 text-left">
                                <a
                                  className="hover:underline text-blue-400 "
                                  href={docList[metaList.indexOf(items)]}
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
                      {items.customMetadata.filetype.match("others") && (
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
                                {items.customMetadata.filedescription}
                              </td>
                              <td className=" font-bold px-6 py-4 text-left">
                                <a
                                  className="hover:underline text-blue-400 "
                                  href={docList[metaList.indexOf(items)]}
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
    </div>
  );
}
