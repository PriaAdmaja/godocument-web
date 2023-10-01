import { userAction } from "@/redux/slices/user";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtExpired from "@/utils/private-route/jwtExpired";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      setIsLoading(true);
      const url = `${process.env.NEXT_PUBLIC_GODOCUMENT_API}/users/logout`;
      await axios.post(
        url,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(userAction.clearData())
      router.push("/");
      toast.success("Logout");
    } catch (error) {
      console.log(error.response.data.msg);
      jwtExpired(error.response.data.msg)
      // toast.error(error.response.data.msg || "Try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="logout_modal" className="modal relative">
      <div className="modal-box">
        <p className="py-4 font-semibold text-xl">Are you sure to logout?</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error" disabled={isLoading}>
              Cancel
            </button>
          </form>
          <button
            type="button"
            className="btn btn-neutral"
            onClick={logout}
            disabled={isLoading}
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer />
    </dialog>
  );
};

export default Logout;
