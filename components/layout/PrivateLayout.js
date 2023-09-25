import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Layout } from "./layout";
/******************** 
@purpose : Used For Private Route
@Parameter : {}
@Author : INIC
******************/
const PrivateLayout = (props) => {
  const { token } = useSelector(({ user }) => user);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/");
  }, []);

  if (!token) {
    return <Fragment></Fragment>;
  }

  return <Layout>{props.children}</Layout>;
};

export default PrivateLayout;
