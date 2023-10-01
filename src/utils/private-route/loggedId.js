import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const loggedIn = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    const { token } = useSelector((state) => state.userData);
    if (token) {
      router.push("/dashboard");
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

export default loggedIn;
