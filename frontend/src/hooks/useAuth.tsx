import { useContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { IRegister, ISignIn, login, refreshToken, register } from "@/utils/Auth";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { UserContext } from "@/contexts/AuthContext";

/**
 * Only states and functions that are necessary to be here on each render of each component
 * should be here.
 * @returns
 */
export const useAuth = () => {
  const { user, setUser } = useContext(UserContext);
  const { setItem } = useLocalStorage();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleTokenRefresh = async () => {
    try {
      const accessToken = await refreshToken();
      setUser({ ...user, accessToken });
    } catch (error) {
      // logout user?
    }
  };

  const handleRegister = async (values: IRegister, { setSubmitting }: FormikHelpers<IRegister>) => {
    try {
      setSubmitting(true);
      const user = await register(values);
      if (user) {
        setUser(user);
        setItem("user", JSON.stringify(user));
      }

      console.log(user);

      router.push("/");
    } catch (error: any) {
      setSubmitting(false);
      setError(error.message);
    }
  };

  /* Handler Functions */
  const handleLogin = async (values: ISignIn, { setSubmitting }: FormikHelpers<ISignIn>) => {
    try {
      setSubmitting(true);
      const user = await login(values);

      if (user) {
        setUser(user);

        setItem("user", JSON.stringify(user));
      }
      console.log(user);

      router.push("/");
    } catch (error: any) {
      console.log();
      console.log(error.message);
      setError(error.message);
      setSubmitting(false);
    }
  };

  return { user, error, handleTokenRefresh, handleLogin, handleRegister };
};
