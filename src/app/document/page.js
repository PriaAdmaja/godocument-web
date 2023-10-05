"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../_components/header";
import Sidebar from "../_components/sidebar";
import Tiptap from "../_components/tiptap";
import Loader from "../_components/loader";
import authCheck from "@/utils/private-route/authCheck";

const Document = () => {
  const [editorContent, setEditorContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { token } = useSelector((state) => state.user);
  const router = useRouter();

  const getContent = (text) => {
    setEditorContent(text);
  };

  const createDocument = async () => {
    try {
      if (!title) {
        return toast.error("Set your document title");
      }
      setIsloading(true);
      const body = {
        title,
        content: editorContent,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/documents`;
      const result = await axios.post(url, body, {
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
      setIsloading(false);
    }
  };

  document.onkeydown = (e) => {
    if (e.ctrlKey && e.key == "p") {
      e.preventDefault();
    }
  };
  document.onmouseleave = () => setIsHidden(true);
  document.onclick = () => setIsHidden(false);
  document.onkeyup = (e) => {
    if (e.key == "PrintScreen") {
      navigator.clipboard.writeText("");
      document.getElementById("print_warn_1").showModal();
    }
  };

  return (
    <>
      <Header />
      <main className="flex px-16 py-5">
        <Sidebar />
        <section className="w-4/5 p-3 ml-3 flex flex-col items-center relative">
          <p className="text-2xl text-center pb-5">Create Document</p>
          <div className="w-full">
            <div className="form-control w-full max-w-xs mb-3">
              <label className="label">
                <span className="">File Name : </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full input_sm "
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label className="label">
              <span className="">Content : </span>
            </label>
            <div
              className={`${
                isHidden ? "blur-lg" : ""
              } w-full h-[400px] p-3 rounded-lg bg-white`}
            >
              <Tiptap getContent={getContent} />
            </div>
            <button className="btn btn-neutral" onClick={createDocument}>
              Create
            </button>
          </div>
          <Loader isShow={isLoading} />
        </section>
      </main>
      <dialog id="print_warn_1" className="modal">
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

export default authCheck(Document);
