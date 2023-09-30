import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import router from "next/router";
import { selectUserInfo } from "../../store/selectors/user";
import { getCookie, removeCookie, setCookie } from "utils";
import { useYchat } from "hooks/useYchat";

/******************** 
  @purpose : With Auth
  @Parameter : {}
  @Author : INIC
  ******************/
const WithAuth = (Component) => (props) => {
  const { isSignUpDetailsCompleted } = useSelector(selectUserInfo) || {};
  const { email } = useSelector(selectUserInfo) || {};
  const { disconnectYchat } = useYchat() || {};

  useEffect(() => {
    const token = getCookie("token");
    const isLogout = getCookie("isLogout");

    if (isLogout) disconnectYchat();

    if (isSignUpDetailsCompleted === false) {
      router.push("/account/sign-up", undefined, { shallow: true });
    } else if (isSignUpDetailsCompleted === undefined && !token) {
      router.replace({
        pathname: "/",
        query: { from: router.asPath },
      });
      router.push("/").then(() => {
        router.replace({
          pathname: "/",
        });
        removeCookie("isLogout");
      });
    }
  }, [isSignUpDetailsCompleted, router.pathname]);
  return !email ? <Fragment></Fragment> : <Component {...props} />;
};

export default WithAuth;
