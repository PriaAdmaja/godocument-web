"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@/app/_components/header";
import Sidebar from "@/app/_components/sidebar";
import Loader from "@/app/_components/loader";
import Tiptap from "@/app/_components/tiptap";

const DocumentId = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [editable, setEditable] = useState(false);

  const pathname = usePathname();
  const documentId = pathname.split("/")[2];
  const router = useRouter();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    let getData = true;
    if (getData) {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/${documentId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setData(res.data.data[0]))
        .catch((err) => {
          console.log(err);
          router.push("/dashboard");
        })
        .finally(() => setIsLoading(false));
    }
    return () => {
      getData = false;
    };
  }, []);

  const deleteDoc = async () => {
    try {
      setDelLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/${documentId}`;
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(result.data.msg);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg || "Error");
    } finally {
      setDelLoading(false);
    }
  };

  const editDoc = async () => {
    try {
      setDelLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/${documentId}`;
      const result = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(result.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg || "Error");
    } finally {
      setDelLoading(false);
    }
  };

  const getContent = (text) => {
    const prevData = { ...data };
    prevData.content = text;
    setData(prevData);
  };

  const editing = () => {
    setEditable(true);
  };

  const editTitle = (text) => {
    const prevData = { ...data };
    prevData.title = text;
    setData(prevData);
  };

  const sendSpv = async () => {
    try {
      setDelLoading(true)
      const body = {
        statusId: 2,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/${documentId}`;
      await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Document has been send to supervisor')
    } catch (error) {
      toast.error(error.response.data.msg || "Error");
    } finally {
      setDelLoading(false)
    }
  };

  if (isLoading) return <Loader isShow={isLoading} />;

  return (
    <>
      <Header />
      <main className="flex px-16 py-5">
        <Sidebar />
        <section className="w-4/5 p-3 ml-3 ">
          <div className="w-full">
            <div className="form-control w-full max-w-xs mb-3">
              <label className="label">
                <span className="">File Name : </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input_sm "
                value={data.title}
                disabled={!editable}
                onChange={(e) => editTitle(e.target.value)}
              />
            </div>
            <label className="label">
              <span className="">Content : </span>
            </label>
            <div className="w-full h-[400px] p-3 rounded-lg bg-white">
              {/* <Tiptap getContent={getContent} contentDb={data.content} /> */}
              <Tiptap
                contentDb={data.content}
                editable={editable}
                getContent={getContent}
              />
            </div>
            <div className="flex gap-5 mt-5">
              <div>
                <button
                  type="button"
                  className={`btn btn-neutral ${editable ? "hidden" : "block"}`}
                  onClick={editing}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`btn btn-neutral ${editable ? "block" : "hidden"}`}
                  onClick={editDoc}
                >
                  Save
                </button>
              </div>
              <button
                className="btn btn-error"
                type="button"
                onClick={() =>
                  document.getElementById("delete_doc").showModal()
                }
              >
                Delete
              </button>
              <button className="btn btn-success" type="button" onClick={sendSpv}>
                Send to Spv
              </button>
            </div>
          </div>
        </section>
      </main>
      <dialog id="delete_doc" className="modal">
        <div className="modal-box">
          <p className="py-4 text-lg font-semibold">
            Are you sure to delete this document?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
            <button
              className="btn btn-neutral"
              type="button"
              onClick={deleteDoc}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
        <Loader isShow={delLoading} />
      <ToastContainer />
    </>
  );
};

export default DocumentId;
