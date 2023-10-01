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

const Document = () => {
  const [editorContent, setEditorContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsloading] = useState(false);

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
      console.log(result.data?.data);
      toast.success(result.data.msg);
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      toast.error(error.response.data.msg || "Error");
    } finally {
      setIsloading(false);
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
                <span className="">Title : </span>
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
            <div className="w-full h-[400px] p-3 rounded-lg bg-white">
              <Tiptap getContent={getContent} contentDb="halo" />
            </div>
            <button className="btn btn-neutral" onClick={createDocument}>
              Create
            </button>
          </div>
          <Loader isShow={isLoading} />
        </section>
      </main>
      <ToastContainer />
    </>
  );
};

export default Document;
