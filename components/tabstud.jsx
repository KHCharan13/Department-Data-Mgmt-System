import React from "react";
import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { storage } from "../utils/firebase";
import { Dropdown, Collapse, Text } from "@nextui-org/react";
export default function TabStud({ children, email, uid, name, type }) {
  const [docList, setDocList] = useState([]);
  const [metaList, setMetaList] = useState([]);

  const viewItems = () => {
    const fileListRef = ref(storage, `${type}/${uid}/`);
    listAll(fileListRef).then((response) => {
      setDocList([]);
      setMetaList([]);
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
  var a = 0;
  useEffect(() => {
    if (a === 0) {
      viewItems();
      a = a + 1;
    }
  }, []);
  return (
    <div className="m-8 justify-center w-fit items-center">
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
                      {items.customMetadata.filetype.match("projects") && (
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
