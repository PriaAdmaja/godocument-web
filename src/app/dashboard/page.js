"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../_components/header";
import Sidebar from "../_components/sidebar";
import Loader from "../_components/loader";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id, token } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    let getData = true;
    if (getData) {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents?usersId=${id}`;
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
        .catch((err) => toast.error("Error get data"))
        .finally(() => setIsLoading(false));
    }
    return () => {
      getData = false;
    };
  }, []);

  console.log(data);

  if (isLoading) return <Loader isShow={isLoading} />;

  return (
    <>
      <Header />
      <main className="flex px-16 py-5">
        <Sidebar />
        <section className="w-4/5 p-3 flex flex-col items-center">
          <p className="text-2xl text-center pb-5">Document List</p>
          <div className="flex justify-between items-baseline w-full">
            <select className="select select-bordered select-sm  max-w-xs">
              <option disabled selected>
                Sort
              </option>
              <option>Id Asc</option>
              <option>Id Desc</option>
              <option>Title Asc</option>
              <option>Title Desc</option>
            </select>
            <button
              type="button"
              className="btn btn-neutral right-5 top-5"
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
                  <th>Id</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((datum, i) => {
console.log(datum);
                  return (
                    <tr key={i}>
                      <th>{datum.id}</th>
                      <td>{datum.title}</td>
                      <td>{datum.status}</td>
                      <td>{String(datum.created_at).slice(0, 10)}</td>
                      <td>
                        <button className="btn btn-ghost btn-xs">
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

export default Dashboard;
