import fetch from "isomorphic-unfetch";
import { get, post } from "@api"; // API Types
import * as types from "@actions"; // Redux actions payload types
import { getCookie, setCookie, removeCookie } from "@utils"; // Utility functions
import store from "store";
import {
  LOGIN,
  GOOGLE,
  FACEBOOK,
  LINKEDIN,
  REGISTER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOG_OUT,
  REFRESH_TOKEN,
  REGISTER_DETAILS,
} from "@api/routes"; // API endpoint routes
import router from "next/router";
import { AUTH_API_URL } from "../../config";
import { trackIdentify, trackEvent } from "@components/segment-analytics";

import {
  deleteUserInfo,
  INPUT_VALIDATOR,
  postTokenUnix,
  removeLocalStorage,
  clearAllUserData,
  getDefaultLanguage,
} from "utils";
import { CHECK_INVITE_TOKEN, PASSWORD_VERIFICATION } from "api/routes";
import { changeLanguagePreference } from "./my-account";
import { chatLoginUser, chatSignupUser } from "./chat";
import { setYChatSocketDetails } from "./message";
import { resetStore } from "store";
import i18next from "i18next";
/******************** 
@purpose : Used for login user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const login = (data) => async (dispatch) => {
  let res = await post({ serviceURL: AUTH_API_URL }, LOGIN, true, data, true);

  if (res?.data) {
    dispatch(setToken(res.data.token));
    dispatch(setRefreshToken(res.data.refreshToken));
    setCookie("sortBy", "Recent");
    localStorage.setItem("groupTab", "groups");
    setCookie("userInfo", deleteUserInfo(res.data.user));
    setCookie("description", res?.data?.user?.briefDescription ?? "");

    setCookie("postToken", postTokenUnix(new Date()));
    dispatch({
      type: types.SET_USER_INFO,
      data: {
        ...res.data.user,
        showHeaderMenu: res.data.user.isSignUpDetailsCompleted,
      },
    });
    if (res.data.user.mmRegister) {
      dispatch(chatLoginUser({ login_id: data.auth }));
    } else {
      dispatch(chatSignupUser({ email: data.auth }));
    }
    dispatch(types.toggleModals({ login: false }));
    if (res.data.user.isSignUpDetailsCompleted === false) {
      router.push("/account/sign-up", undefined, { shallow: true });
    }

    // After successful login, trigger the identify event
    trackIdentify(res?.data?.user?.id, {
      name: `${res?.data?.user?.firstName} ${res?.data?.user?.lastName}`,
      email: res?.data?.user?.email,
      role: "user",
      loginType: "email",
    });

    return Promise.resolve();
  }

  return Promise.reject();
};

/******************** 
@purpose : Used for password verification
@Parameter : { data}
@Author : YLIWAY
******************/
export const passwordVerification = async (data) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    PASSWORD_VERIFICATION,
    true,
    data,
    true
  );
  if (res.status) {
    return Promise.resolve(res);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : Used for refresh access token
@Parameter : { dispatch }
@Author : INIC
******************/
export const refreshToken = () => async (dispatch) => {
  const refreshToken = getCookie("refreshToken");
  let res = await fetch(`${AUTH_API_URL}/${REFRESH_TOKEN}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });
  const result = await res.json();
  if (result?.data) {
    dispatch(setToken(result.data));
    return Promise.resolve();
  } else {
    removeCookie("userInfo");
    removeCookie("description");
    removeCookie("instituteDetails");
    dispatch({ type: types.SET_USER_INFO, data: false });
    dispatch(removeToken());
    dispatch(removeRefreshToken());
    dispatch(removeVerifyType());
    return Promise.reject();
  }
};

/******************** 
@purpose : Used for session expire logout
@Parameter : { dispatch }
@Author : INIC
******************/
export const sessionDestroy = () => async (dispatch) => {
  removeCookie("userInfo");
  removeCookie("instituteDetails");
  dispatch({ type: types.SET_USER_INFO, data: false });
  dispatch(removeToken());
  dispatch(removeRefreshToken());
  dispatch(removeVerifyType());
  return Promise.resolve();
};

/******************** 
@purpose : Used for google login user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const googleLogin = (data) => async (dispatch) => {
  let res = await post({ serviceURL: AUTH_API_URL }, GOOGLE, true, data, true);

  if (res?.data) {
    dispatch(setToken(res.data.token));
    dispatch(setRefreshToken(res.data.refreshToken));
    setCookie("sortBy", "Recent");
    localStorage.setItem("groupTab", "groups");
    setCookie("userInfo", deleteUserInfo(res.data.user));
    setCookie("description", res?.data?.user?.briefDescription ?? "");

    setCookie("postToken", postTokenUnix(new Date()));
    dispatch({ type: types.SET_USER_INFO, data: res.data.user });
    if (res.data.user.mmRegister) {
      dispatch(chatLoginUser({ login_id: res.data.user.email }));
    } else {
      dispatch(chatSignupUser({ email: res.data.user.email }));
    }
    dispatch(types.toggleModals({ login: false, register: false }));
    // After successful login, trigger the identify event
    trackIdentify(res?.data?.user?.id, {
      name: `${res?.data?.user?.firstName} ${res?.data?.user?.lastName}`,
      email: res?.data?.user?.email,
      role: "user",
      loginType: "google",
    });
    return Promise.resolve(res.data);
  }

  return Promise.reject(res);
};

/******************** 
@purpose : Used for facebook login user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const facebookLogin = (data) => async (dispatch) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    FACEBOOK,
    true,
    data,
    true
  );
  if (res?.data) {
    dispatch(setToken(res.data.token));
    dispatch(setRefreshToken(res.data.refreshToken));
    setCookie("sortBy", "Recent");
    localStorage.setItem("groupTab", "groups");
    setCookie("userInfo", deleteUserInfo(res.data.user));
    setCookie("description", res?.data?.user?.briefDescription ?? "");
    setCookie("postToken", postTokenUnix(new Date()));
    dispatch({ type: types.SET_USER_INFO, data: res.data.user });
    if (res.data.user.mmRegister) {
      dispatch(chatLoginUser({ login_id: res.data.user.email }));
    } else {
      dispatch(chatSignupUser({ email: res.data.user.email }));
    }
    dispatch(types.toggleModals({ login: false, register: false }));
    // After successful login, trigger the identify event
    trackIdentify(res?.data?.user?.id, {
      name: `${res?.data?.user?.firstName} ${res?.data?.user?.lastName}`,
      email: res?.data?.user?.email,
      role: "user",
      loginType: "facebook",
    });
    return Promise.resolve(res.data);
  }

  return Promise.reject(res);
};

/******************** 
@purpose : Used for linkedin login user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const linkedinLogin = (data) => async (dispatch) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    LINKEDIN,
    true,
    data,
    true
  );
  if (res?.data) {
    dispatch(setToken(res.data.token));
    dispatch(setRefreshToken(res.data.refreshToken));
    setCookie("sortBy", "Recent");
    localStorage.setItem("groupTab", "groups");
    setCookie("userInfo", deleteUserInfo(res.data.user));
    setCookie("description", res?.data?.user?.briefDescription ?? "");
    setCookie("postToken", postTokenUnix(new Date()));
    dispatch({ type: types.SET_USER_INFO, data: res.data.user });
    if (res.data.user.mmRegister) {
      dispatch(chatLoginUser({ login_id: res.data.user.email }));
    } else {
      dispatch(chatSignupUser({ email: res.data.user.email }));
    }
    dispatch(types.toggleModals({ login: false, register: false }));
    // After successful login, trigger the identify event
    trackIdentify(res?.data?.user?.id, {
      name: `${res?.data?.user?.firstName} ${res?.data?.user?.lastName}`,
      email: res?.data?.user?.email,
      role: "user",
      loginType: "linkedIn",
    });
    return Promise.resolve(res.data);
  }

  return Promise.reject(res);
};

/******************** 
@purpose : Used for signup details
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const signUpDetails = (data) => async (dispatch) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    REGISTER_DETAILS,
    true,
    data,
    true
  );
  if (res?.statusCode == 200) {
    // After successful registration, trigger the identify event
    trackIdentify(res?.data?.id, {
      name: `${res?.data?.firstName} ${res?.data?.lastName}`,
      email: res?.data?.email,
      role: "user",
      loginType: "email",
    });
    let x = getCookie("userInfo");
    if (typeof x === "string") x = JSON.parse(x);
    const signUpUserInfo = { ...x, ...res.data };
    setCookie("userInfo", deleteUserInfo(signUpUserInfo));
    setCookie("description", res?.data?.briefDescription);
    trackEvent("onboarding_completed"); // trackevent
    dispatch({ type: types.SET_USER_INFO, data: { ...x, ...res.data } });

    if (!res?.data?.otherSettings?.language) {
      dispatch(
        changeLanguagePreference(
          {
            language: data?.country?.trim() === "Italy" ? "it" : "en",
          },
          deleteUserInfo(signUpUserInfo)
        )
      );
    }
    return true;
  }

  return Promise.reject(res);
};

/******************** 
@purpose : Used for register user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const registration = (data) => async (dispatch) => {
  const email = new RegExp(INPUT_VALIDATOR.emailRegex).test(data.auth);

  const phone = new RegExp(INPUT_VALIDATOR.numberRegx).test(data.auth);
  let res = await post(
    { serviceURL: AUTH_API_URL },
    REGISTER,
    true,
    data,
    true
  );
  if (res?.data) {
    dispatch(setToken(res.data.token));
    dispatch(setRefreshToken(res.data.refreshToken));
    dispatch(setVerifyType("registration"));
    dispatch(
      types.toggleModals({
        register: false,
        otpVerification: true,
        otpData: data,
      })
    );
    dispatch({
      type: types.SET_USER_INFO,
      data: { email: email ? data?.auth : "", phone: phone ? data?.auth : "" },
    });
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};
/******************** 
@purpose : Used for verify otp user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const verifyOTP = (data) => async (dispatch) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    VERIFY_OTP,
    true,
    data,
    true
  );
  if (res?.statusCode === 200) {
    if (store?.getState()?.user?.verifyType == "forgotPassword") {
      dispatch(
        types.toggleModals({ otpVerification: false, setNewPassword: true })
      );
    } else {
      dispatch(types.toggleModals({ otpVerification: false }));
      setCookie("userInfo", {
        email: store?.getState()?.user?.userInfo?.email,
        isSignUpDetailsCompleted: false,
        showHeaderMenu: false,
      });
      dispatch({
        type: types.UPDATE_USER_INFO,
        data: { isSignUpDetailsCompleted: false, showHeaderMenu: false },
      });
      router.push("/account/sign-up", undefined, { shallow: true });
    }
  }

  return;
};

/******************** 
@purpose : Used for resend otp user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const resendOTP = async (data) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    RESEND_OTP,
    true,
    { auth: data?.auth },
    false
  );

  return;
};

/******************** 
@purpose : Used for forgot password user
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const forgotPassword = (data) => async (dispatch) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    FORGOT_PASSWORD,
    true,
    data,
    true
  );
  if (res?.data) {
    dispatch(setToken(res.data.token));
    dispatch(setVerifyType("forgotPassword"));
    dispatch(
      types.toggleModals({
        forgetPassword: false,
        otpVerification: true,
        otpData: data,
      })
    );
    return Promise.resolve(res.data);
  }
  return Promise.reject(res);
};

/******************** 
@purpose : Used for reset password
@Parameter : { data, dispatch }
@Author : INIC
******************/
export const resetPassword = (data) => async (dispatch) => {
  let res = await post(
    { serviceURL: AUTH_API_URL },
    RESET_PASSWORD,
    true,
    data,
    true
  );

  dispatch(removeToken());
  dispatch(removeVerifyType());
  dispatch(types.toggleModals({ setNewPassword: false }));

  return;
};

/******************** 
@purpose : Used for logout user
@Parameter : { dispatch }
@Author : INIC
******************/
export const logout = () => (dispatch) => {
  setCookie("isLogout", true);
  // post(LOG_OUT, true, {}, true);
  //trigger the logout event
  trackEvent("logged_out");
  // dispatch(setYChatSocketDetails(null));
  dispatch(resetStore());
  dispatch(removeToken());
  dispatch(removeRefreshToken());
  removeLocalStorage("mmLogin");
  dispatch(removeVerifyType());
  removeCookie("instituteDetails");
  removeCookie("userInfo");
  removeCookie("description");
  removeCookie("postToken");
  removeCookie("sortBy");
  removeCookie("language");
  removeLocalStorage("entityDetail");
  if (typeof window !== "undefined") {
    const defaultLanguage = getDefaultLanguage();
    setCookie("language", defaultLanguage);
    i18next.changeLanguage(defaultLanguage);
  }
  localStorage.removeItem("groupTab");
  localStorage.removeItem("currentChannel");
  dispatch({ type: types.SET_USER_INFO, data: false });
  dispatch(setAllowSignup(false));
  return;
};

/******************** 
@purpose : Used for store login responce and set token in cookie
@Parameter : { token }
@Author : INIC
******************/
export const setToken = (token) => async (dispatch) => {
  setCookie("token", token);

  return {
    type: types.SET_TOKEN,
    token,
  };
};

/******************** 
@purpose : Used for store logout responce and remove token in cookie
@Parameter : { }
@Author : INIC
******************/
export const removeToken = () => {
  removeCookie("token");
  return {
    type: types.REMOVE_TOKEN,
  };
};

/******************** 
@purpose : Used for store login responce and set refresh token in cookie
@Parameter : { token }
@Author : INIC
******************/
export const setRefreshToken = (token) => {
  setCookie("refreshToken", token);
  return {
    type: types.SET_REFRESH_TOKEN,
    token,
  };
};

/******************** 
@purpose : Used for store logout responce and remove refresh token in cookie
@Parameter : { }
@Author : INIC
******************/
export const removeRefreshToken = () => {
  removeCookie("refreshToken");
  return {
    type: types.REMOVE_REFRESH_TOKEN,
  };
};

/******************** 
@purpose : Used for store verification type in cookie
@Parameter : { value }
@Author : INIC
******************/
export const setVerifyType = (value) => {
  setCookie("verifyType", value);
  return { type: types.SET_VERIFY_TYPE, verifyType: value };
};

/******************** 
@purpose : Used for remove verification type in cookie
@Parameter : { }
@Author : INIC
******************/
export const removeVerifyType = () => {
  removeCookie("verifyType");
  return { type: types.REMOVE_VERIFY_TYPE };
};

/******************** 
@purpose : used to check invite token
@Parameter : { inviteToken, dispatch }
@Author : INIC
******************/
export const checkInviteToken = (inviteToken) => async (dispatch) => {
  const res = await get(
    { serviceURL: AUTH_API_URL },
    CHECK_INVITE_TOKEN + `?invite=${inviteToken}`,
    false,
    "",
    true
  );

  if (res?.statusCode == 200) {
    dispatch(setAllowSignup(true));
    return Promise.resolve(res);
  }
  dispatch(setAllowSignup(false));
  return Promise.reject(res);
};
/******************** 
@purpose : Used for showing signup
@Parameter : { token }
@Author : INIC
******************/
export const setAllowSignup = (payload) => async (dispatch) => {
  dispatch({
    type: types.ALLOW_SIGNUP,
    payload,
  });
};
