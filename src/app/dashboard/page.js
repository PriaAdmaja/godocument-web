"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../_components/header";
import Sidebar from "../_components/sidebar";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id, token } = useSelector((state) => state.user);

  useEffect(() => {
    let getData = true;
    if (getData) {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/${id}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res.data.data))
        .catch((err) => toast.error('Error get data'));
    }
    return () => {
      getData = false;
    };
  }, []);
  
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
            <button type="button" className="btn btn-neutral right-5 top-5">
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
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
