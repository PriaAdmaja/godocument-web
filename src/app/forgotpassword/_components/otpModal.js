import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpModal = (props) => {
  const [otp, setOtp] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const sendNewPassword = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (password !== rePassword) {
        return toast.error("Check your password!");
      }
      const body = {
        email: props.email,
        otp,
        password,
      };
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/resetpassword`;
      const result = await axios.patch(url, body);
      toast.success(result.data.msg);
      e.target.reset();
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.msg || "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="otp_modal" className="modal">
      <section className="modal-box max-w-sm flex justify-center">
        <form className="flex flex-col w-full" onSubmit={sendNewPassword}>
          <section className="">
            <label className="label">
              <span className="">OTP :</span>
            </label>
            <input
              type="text"
              placeholder="Input your OTP"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setOtp(e.target.value)}
              disabled={isLoading}
            />
            <label className="label">
              <span className="">New password :</span>
            </label>
            <input
              type="password"
              placeholder="Input your new password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <label className="label">
              <span className="">Re-enter new password :</span>
            </label>
            <input
              type="password"
              placeholder="Input your new password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setRePassword(e.target.value)}
              disabled={isLoading}
            />
          </section>
          <button
            className={`btn mt-5 btn-neutral max-w-xs ${
              isLoading ? "hidden" : "block"
            }`}
            type="submit"
            disabled={otp && password && rePassword ? false : true}
          >
            Confirm
          </button>
          <button
            className={`btn mt-5 btn-neutral max-w-xs ${
              isLoading ? "block" : "hidden"
            }`}
          >
            <span className="loading loading-dots loading-md"></span>
          </button>
        </form>
      </section>
    </dialog>
  );
};

export default OtpModal;
