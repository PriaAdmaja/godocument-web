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
import jwtExpired from "@/utils/private-route/jwtExpired";

const DocumentId = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const pathname = usePathname();
  const documentId = pathname.split("/")[2];
  const router = useRouter();
  const { token, role } = useSelector((state) => state.user);

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
      }, 1000);
    } catch (error) {
      jwtExpired(error.response.data.msg);
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
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      jwtExpired(error.response.data.msg);
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

  const docAction = async (status) => {
    try {
      setDelLoading(true);
      const body = {
        statusId: status,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/${documentId}`;
      const result = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(result.data.msg);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      jwtExpired(error.response.data.msg);
      toast.error(error.response.data.msg || "Error");
    } finally {
      setDelLoading(false);
    }
  };

  const downloadPdf = () => {
    setDelLoading(true);
    const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents/pdf/${documentId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      })
      .then((res) => {
        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(res.data);
        a.download = `${data.title}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(() => {
        jwtExpired(error.response.data.msg);
        toast.error(error.response.msg || "Error");
      })
      .finally(() => {
        setDelLoading(false);
      });
  };

  document.onkeydown = (e) => {
    if (e.ctrlKey && e.key == 'p') {
      e.preventDefault();

    }
  };
  document.onmouseleave = () => setIsHidden(true);
  document.onclick = () => setIsHidden(false);
  document.onkeyup = (e) => {
    if(e.key == 'PrintScreen') {
      navigator.clipboard.writeText('')
      document.getElementById("print_warn_2").showModal();
    }
  }


  if (isLoading) return <Loader isShow={isLoading} />;

  return (
    <>
      <Header />
      <main
        className="flex px-16 py-5"
        onKeyDown={(e) => console.log(e.key)}
        // onKeyUp={(e) => console.log(e.key)}
        // onKeyDownCapture={}
      >
        <Sidebar />
        <section className="w-4/5 p-3 ml-3 ">
          <div className="w-full">
            <div className="flex justify-between items-center">
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

              <button
                type="button"
                onClick={downloadPdf}
                className={`${
                  data.status_id == 4 ? "block" : "hidden"
                } btn btn-neutral btn-sm`}
              >
                Download PDF
              </button>
            </div>
            <div className="flex justify-between items-center">
              <label className="label">
                <span className="">Content : </span>
              </label>
              <div className="badge badge-outline font-semibold">
                {data.status}
              </div>
            </div>
            <div className={`${isHidden ? 'blur-xl' : ''} w-full h-[400px] p-3 rounded-lg bg-white`}>
              {/* <Tiptap getContent={getContent} contentDb={data.content} /> */}
              <Tiptap
                contentDb={data.content}
                editable={editable}
                getContent={getContent}
              />
            </div>
            <div
              className={`${role == 1 ? "block" : "hidden"} flex gap-5 mt-5`}
            >
              <div>
                <button
                  type="button"
                  className={`btn btn-neutral ${editable ? "hidden" : "block"}`}
                  onClick={editing}
                  disabled={data.status_id == 1 ? false : true}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className={`btn btn-neutral ${editable ? "block" : "hidden"}`}
                  onClick={editDoc}
                  disabled={data?.status_id == 1 ? false : true}
                >
                  Save
                </button>
              </div>
              <button
                className="btn btn-error"
                type="button"
                disabled={data?.status_id == 1 ? false : true}
                onClick={() =>
                  document.getElementById("delete_doc").showModal()
                }
              >
                Delete
              </button>
              <button
                className={`btn btn-success`}
                type="button"
                onClick={() => docAction(2)}
                disabled={data.status_id == 1 ? false : true}
              >
                Send to Spv
              </button>
            </div>
            <div
              className={`${role == 2 ? "block" : "hidden"} flex gap-5 mt-5`}
            >
              <button
                className="btn btn-error"
                type="button"
                disabled={data.status_id == 2 ? false : true}
                onClick={() => docAction(3)}
              >
                Reject
              </button>
              <button
                className={`btn btn-success`}
                type="button"
                onClick={() => docAction(4)}
                disabled={data.status_id == 2 ? false : true}
              >
                Release
              </button>
            </div>
          </div>
        </section>
        <Loader isShow={delLoading} />
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
      <dialog id="print_warn_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">PrintScreen is forbidden</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <ToastContainer />
    </>
  );
};

export default DocumentId;
