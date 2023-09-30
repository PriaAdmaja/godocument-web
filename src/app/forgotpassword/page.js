"use client";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OtpModal from "./_components/otpModal";

const ForgotPassword = () => {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const getOTP = async(e) => {
    try {
        e.preventDefault();
        setIsLoading(true);
        console.log(email);
        const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/requestreset`;
        const result = await axios.patch(url, {email});
        toast.success(result.data.msg);
        document.getElementById('otp_modal').showModal();
        e.target.reset();
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg || "Failed send OTP")
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <main className="flex flex-col justify-center items-center p-20 gap-5">
        <h1 className="text-3xl font-bold">Reset Password</h1>

        <section className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="text-center text-sm pb-3">
              Make sure youl email is valid, we will send OTP to your mail.
            </p>
            <form onSubmit={getOTP} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Input your email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <button
                className={`btn btn-neutral ${isLoading ? "hidden" : "block"}`}
                type="submit"
                disabled={email ? false : true}
              >
                Get OTP
              </button>
              <button
                className={`btn btn-neutral ${isLoading ? "block" : "hidden"}`}
              >
                <span className="loading loading-dots loading-md"></span>
              </button>
            </form>
            <button type="button" className="btn" onClick={() => router.push('/')}>Cancel</button>
          </div>
        </section>
      </main>
      <OtpModal email={email}/>
      <ToastContainer />
    </Fragment>
  );
};

export default ForgotPassword;
