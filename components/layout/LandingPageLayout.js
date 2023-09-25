import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./header"));
const Footer = dynamic(() => import("./footer"));
const MetaTags = dynamic(() => import("./meta-tags"));


const MainModal = dynamic(() =>
  import("./../modal").then((mod) => mod.MainModal)
);
const Registration = dynamic(() =>
  import("./../modal").then((mod) => mod.Registration)
);
const LoginNew = dynamic(() =>
  import("./../modal").then((mod) => mod.LoginNew)
);
const ForgotPassword = dynamic(() =>
  import("./../modal").then((mod) => mod.ForgotPassword)
);
const OtpVerification = dynamic(() =>
  import("./../modal").then((mod) => mod.OtpVerification)
);
const SetNewPassword = dynamic(() =>
  import("./../modal").then((mod) => mod.SetNewPassword)
);

export const LandingPageLayout = ({ children }) => {
  const { login, register, forgetPassword, setNewPassword, otpVerification } =
    useSelector(({ ui }) => ui.modals, shallowEqual);

  const [lang] = useTranslation("language");
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div className="d-flex flex-column h-100">
      {/****************
      @purpose : SEO Intigration
      @Author : INIC
      ******************/}
      <MetaTags />
      {/******************* 
      @purpose :Header Components
      @Author : INIC
      ******************/}
      <div>
        <div></div>
      </div>

      <Header showSearchList={"mega-search d-none"} />
      <main> {children} </main>

      {/******************* 
      @purpose :Registration Modal
      @Author : INIC
        ******************/}
      <MainModal
        show={register}
        title={lang("COMMON.SIGN_UP_TITLE")}
        keyModal="register"
        body={<Registration />}
        headerClassName="block"
      />
      {/******************* 
      @purpose :Login Modal
      @Author : INIC
      ******************/}
      <LoginNew
        className="sign-in-modal login-new-modal"
        show={login}
        title={`${lang("COMMON.SIGN_IN_TO_CONTINUE")}`}
        keyModal="login"
      />

      {/******************* 
          @purpose :Forgot password Modal
          @Author : INIC
          ******************/}
      <MainModal
        className="forget-password header-logins-modal"
        show={forgetPassword}
        title={lang("COMMON.FORGOT_PASSWORD_TITLE")}
        keyModal="forgetPassword"
        body={<ForgotPassword />}
        headerClassName="mb-50 block md-mb-30"
      />
      {/******************* 
          @purpose :OTP verification Modal
          @Author : INIC
          ******************/}
      <MainModal
        className="otp-verification header-logins-modal"
        show={otpVerification}
        title={lang("COMMON.OTP_VERIFICATION_TITLE")}
        keyModal="otpVerification"
        body={<OtpVerification />}
        isOtpDeclined={true}
        headerClassName="mb-50 block md-mb-30"
      />
      {/******************* 
          @purpose :Set New Password Modal
          @Author : INIC
          ******************/}
      <MainModal
        show={setNewPassword}
        title={lang("COMMON.SET_PASSWORD_TITLE")}
        keyModal="setNewPassword"
        body={<SetNewPassword />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
      @purpose :Footer Components
      @Author : INIC
      ******************/}
      <Footer />
    </div>
  );
};
