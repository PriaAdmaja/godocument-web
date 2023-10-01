import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const authCheck = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    const { token } = useSelector((state) => state.userData);
    if (!token) {
      router.push("/");
      return;
    }
    return <WrappedComponent {...props} />;
  };

  Auth.getInitialProps = async (ctx) => {
    const wrappedComponentInitialProps = WrappedComponent.getInitialProps
      ? await WrappedComponent.getInitialProps(ctx)
      : {};
    return { ...wrappedComponentInitialProps };
  };

  return Auth;
};

export default authCheck;
