"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../_components/header";
import Sidebar from "../_components/sidebar";
import Loader from "../_components/loader";
import jwtExpired from "@/utils/private-route/jwtExpired";
import authCheck from "@/utils/private-route/authCheck";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [showSort, setShowSort] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [statusValue, setStatusValue] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const { id, token } = useSelector((state) => state.user);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    let getData = true;
    if (getData) {
      setIsLoading(true);
      const url = `${
        process.env.NEXT_PUBLIC_GODOCUMENT_API
      }/documents?userId=${id}&limit=20&${searchParams.toString()}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setMeta(res.data.meta);
        })
        .catch((err) => {
          jwtExpired(err.response.data.msg);
          toast.error("Error get data");
        })
        .finally(() => setIsLoading(false));
    }
    return () => {
      getData = false;
    };
  }, [searchParams]);

  const createQueryParams = (key, value) => {
    const queryList = {};
    const queryUpdate = [];
    searchParams.forEach((value, key) => (queryList[key] = value));
    queryList[key] = value;

    for (const key in queryList) {
      queryUpdate.push(`${key}=${queryList[key]}`);
    }

    const url = `${pathname}?${queryUpdate.join("&")}`;
    router.push(url);
  };

  const deleteQueryParams = (keyRemove) => {
    const queryList = {};
    const queryUpdate = [];
    searchParams.forEach((value, key) => (queryList[key] = value));
    
    for (const key in queryList) {
      if (keyRemove != key) {
        queryUpdate.push(`${key}=${queryList[key]}`);
      }
    }

    const url = `${pathname}?${queryUpdate.join("&")}`;
    router.push(url);
  };

  const setSort = (value) => {
    setShowSort(false);
    setSortValue(value);
    createQueryParams("sort", value);
  };

  const setStatus = (value) => {
    setShowStatus(false);
    setStatusValue(value);
    if (value === 1) {
      setStatusValue("Draft");
      createQueryParams("statusId", value);
      return;
    }
    if (value === 2) {
      setStatusValue("Need check");
      createQueryParams("statusId", value);
      return;
    }
    if (value === 3) {
      setStatusValue("Rejected");
      createQueryParams("statusId", value);
      return;
    }
    if (value === 4) {
      setStatusValue("Release");
      createQueryParams("statusId", value);
      return;
    }
    setStatusValue("All");
    deleteQueryParams('statusId')
  };

  if (isLoading) return <Loader isShow={isLoading} />;

  return (
    <>
      <Header />
      <main className="flex px-16 py-5">
        <Sidebar />
        <section className="w-4/5 p-3 flex flex-col items-center">
          <p className="text-2xl text-center pb-5">Document List</p>
          <div className="flex justify-start gap-5 items-baseline w-full">
            <div className="relative min-w-max">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() =>
                  showSort ? setShowSort(false) : setShowSort(true)
                }
              >
                Sort :{" "}
                {sortValue === "titleAsc"
                  ? "A-Z"
                  : sortValue === "titleDesc"
                  ? "Z-A"
                  : "none"}
              </button>
              <div
                className={`${
                  showSort ? "block" : "hidden"
                } join join-vertical absolute w-full left-0 top-8 z-50`}
              >
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setSort("titleAsc")}
                >
                  A-Z
                </button>
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setSort("titleDesc")}
                >
                  Z-A
                </button>
              </div>
            </div>
            <div className="relative w-40">
              <button
                className="btn btn-sm btn-ghost w-full"
                onClick={() =>
                  showStatus ? setShowStatus(false) : setShowStatus(true)
                }
              >
                Status : {statusValue}
              </button>
              <div
                className={`${
                  showStatus ? "block" : "hidden"
                } join join-vertical absolute w-full left-0 top-8 z-50`}
              >
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setStatus(0)}
                >
                  All
                </button>
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setStatus(1)}
                >
                  Draft
                </button>
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setStatus(2)}
                >
                  Need Check
                </button>
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setStatus(3)}
                >
                  Rejected
                </button>
                <button
                  className="btn btn-sm join-item w-full"
                  type="button"
                  onClick={() => setStatus(4)}
                >
                  Release
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-neutral right-5 top-5 ml-auto"
              onClick={() => router.push("/document")}
            >
              Create New
            </button>
          </div>
          <div className="overflow-x-auto w-full ">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>File Name</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((datum, i) => {
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{datum.title}</td>
                      <td>{datum.status}</td>
                      <td>{String(datum.created_at).slice(0, 10)}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => router.push(`/document/${datum.id}`)}
                        >
                          details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default authCheck(Dashboard);
