import Cookies from "js-cookie";
import moment from "moment-timezone"; // used for date time
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import {
  brandLogoOnly,
  CONST_STRING,
  defaultDateFormat,
  INPUT_VALIDATOR,
} from "./constant";

/******************* 
@purpose : Change File Extension
@Parameter : {fileName, newExt}
@Author : INIC
******************/
export function changExtension(fileName, newExt = "webp") {
  var extension = fileName && fileName.match(/\.([^\./\?]+)($|\?)/)[1];
  if (extension === "svg") return fileName;
  var _tmp;
  return (
    fileName &&
    fileName.substr(
      0,
      ~(_tmp = fileName.lastIndexOf(".")) ? _tmp : fileName.length
    ) +
      "." +
      newExt
  );
}

/******************* 
@purpose : Generate Youtube Thmbnail
@Parameter : {url, quality}
@Author : INIC
******************/
export function getYoutubeThumbnail(url, quality) {
  if (url) {
    var video_id,
      result =
        url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/) ||
        url.match(/youtu.be\/(.{11})/);
    if (result) {
      video_id = result.pop();
    }
    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }
      var quality_key = "maxresdefault"; // Max quality
      if (quality == "low") {
        quality_key = "sddefault";
      } else if (quality == "medium") {
        quality_key = "mqdefault";
      } else if (quality == "high") {
        quality_key = "hqdefault";
      }
      return (
        "https://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg"
      );
    }
  }
  return "";
}

/******************* 
@purpose : Get Cookie
@Parameter : {name}
@Author : INIC
******************/
export function getCookie(name) {
  if (name && typeof window !== "undefined") return Cookies.get(name);
  return "";
}

/******************* 
@purpose : Set Cookie
@Parameter : {name, value}
@Author : INIC
******************/
export function setCookie(name, value) {
  // Cookies.set(name, value, { expires: 50000, domain: DOMAIN });
  Cookies.set(name, value, { expires: 50000 });
}

/******************* 
@purpose : Remove Cookie
@Parameter : {name}
@Author : INIC
******************/
export function removeCookie(name) {
  if (name) {
    // Cookies.remove(name, {domain: DOMAIN});
    Cookies.remove(name);
  }
}

/******************* 
@purpose : Remove Array Element
@Parameter : {arr, item}
@Author : INIC
******************/
export function arrayRemoveByValue(arr, item) {
  for (var i = arr.length; i--; ) {
    if (arr[i] === item) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

/******************* 
@purpose : Ganarate File Base64 Image
@Parameter : {file}
@Author : INIC
******************/
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/*******************
@purpose : Used for dynamic date time/ timezone formate
@Parameter : {dateObj, format, timezone}
@Author : INIC
*******************/
export function formatDateTime(
  dateObj = new Date(),
  format = "D MMM, YYYY",
  timezone = moment.tz.guess() || "Asia/Riyadh"
) {
  let finalDate = moment.tz(dateObj, timezone).format(format);
  if (finalDate === "Invalid date") {
    return null;
  }
  return finalDate;
}

export const secondsToMinute = (duration) => {
  return moment.duration(duration, "seconds").seconds() < 10
    ? `${moment.duration(duration, "seconds").minutes()}:0${moment
        .duration(duration, "seconds")
        .seconds()}`
    : `${moment.duration(duration, "seconds").minutes()}:${moment
        .duration(duration, "seconds")
        .seconds()}`;
};
/*******************
@purpose : Used for timeago date format
@Parameter : {dateObj, format, timezone}
@Author : INIC
*******************/
export function timeAgo(
  dateObj = new Date(),
  timezone = moment.tz.guess() || "Asia/Riyadh"
) {
  let finalDate = moment.tz(dateObj, timezone).fromNow(true);
  if (finalDate === "Invalid date") return null;
  return finalDate;
}
/******************* 
@purpose : Handle element outsile click
@Parameter : {HTMLElement, callback function}
@Author : INIC
******************/
export function handleOutsideClick(element1, element2, callback) {
  const handleEleOutsideClick = (event) => {
    if (
      element1 &&
      !element1.contains(event.target) &&
      element2 &&
      !element2.contains(event.target)
    ) {
      typeof callback === "function" && callback();
    }
  };
  document.addEventListener("click", handleEleOutsideClick);
  return () => document.removeEventListener("click", handleEleOutsideClick); // return the remove listener function
}

/******************* 
@purpose : get request error object
@Author : INIC
******************/
export const errorHandler = (error) => {
  return { error: true, message: error?.mesage };
};

/******************** 
@purpose : Used for store login responce and user info
@Parameter : { data }
@Author : INIC
******************/
export const setRememberMeCookie = (data) => {
  let info = JSON.stringify(data);
  let text = encryptId(info);
  setCookie("remember_me", text);
};
/******************** 
@purpose : Used for store login responce and user info
@Parameter : { data }
@Author : INIC
******************/
export const getRememberMeCookie = () => {
  let text = getCookie("remember_me");
  if (text) {
    let info = decryptId(text);
    return JSON.parse(info);
  }
  return {};
};

/******************* 
@Purpose : Used for encrypt id
@Parameter : STR
@Author : INIC
******************/
export const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, "secretPassphrase");
  return encodeURIComponent(ciphertext.toString());
};

/******************* 
@Purpose : Used for decrypt id
@Parameter : STR
@Author : INIC
******************/

export const decryptId = (str) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, "secretPassphrase").toString(enc.Utf8);
};

/********************************************************
 * To return number in compact form i.e. 5k, 5M
 * @author INIC
 * @param {number} num number
 * @param {number} toDecimalPlaces to maintain precision
 * @returns {string}
 ********************************************************/
export const compactNumber = (num, toDecimalPlaces) => {
  if (typeof num !== "number" || Number.isNaN(num)) return null;
  if (num < 1000) return num;

  const suffixes = ["K", "M", "B", "T", "P", "E"];
  const exp = Math.floor(Math.log(num) / Math.log(1000));
  return (
    (num / Math.pow(1000, exp)).toFixed(toDecimalPlaces) + suffixes[exp - 1]
  );
};

/********************************************************
 * To return number in nearest big value
 * @author INIC
 * @param {number} num number
 * @returns {number}
 ********************************************************/
export const roundOfNumbers = (num) => {
  if (typeof num !== "number" || Number.isNaN(num)) return 0;
  return Math.round(num);
};

/******************* 
@Purpose : Used for show message notification
@Parameter : text, type, autoClose, position
@Author : INIC
******************/
export const showMessageNotification = (
  text,
  type,
  autoClose = 1500,
  position = "top-right"
) => {
  if (!document.hidden) {
    toast(text, {
      position: position,
      autoClose: autoClose,
      type: type,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export const checkValidUrl = (url) => {
  const expression =
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  return url.match(regex);
};

export const getDateTime = (date) => {
  if (moment(date).isSame(moment(), "day")) {
    return moment(date).format("HH:mm");
  } else {
    return moment(date).format("D MMM");
  }
};

export const getDay = (date) => {
  if (moment(date).isSame(moment(), "day")) {
    return "Today";
  } else if (moment(date).isSame(moment().subtract(1, "days"), "day")) {
    return "Yesterday";
  } else {
    return moment(date).format("MMM D, YYYY");
  }
};

export const debounce = (func, ms) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, ms);
  };
};

export const removeQueryParamsFromRouter = (router, removeList = []) => {
  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param]);
  } else {
    // Remove all
    Object.keys(object).forEach((param) => delete object[param]);
  }
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    /**
     * Do not refresh the page
     */
    { shallow: true }
  );
};

//on Image error

export const onImageError = (e, type, name) => {
  e.target.onerror = null;
  if (type === "profile") {
    e.currentTarget.parentNode.children[0].srcset = createImageFromInitials(
      500,
      name,
      "#FFFFFF"
    );
  } else if (type === "myprofile") {
    e.currentTarget.parentNode.children[0].srcset =
      "/assets/images/my-profile/profile-bg.jpg";
  } else if (type === "myprofilepicture") {
    e.currentTarget.parentNode.children[0].srcset =
      "/assets/images/my-profile/profile-picture.jpg";
  } else if (type === "instituteprofile") {
    e.currentTarget.parentNode.children[0].srcset = createImageFromInitials(
      500,
      name,
      "#FFFFFF"
    );
  } else if (type === "companies") {
    e.currentTarget.parentNode.children[0].srcset = createImageFromInitials(
      500,
      name,
      "#FFFFFF"
    );
  } else if (type === "courses") {
    e.currentTarget.parentNode.children[0].srcset = createImageFromInitials(
      500,
      name,
      "#FFFFFF"
    );
  } else {
    e.currentTarget.parentNode.children[0].srcset =
      "/assets/images/user-no-img.jpg";
  }
};

export const getNotficationProfilePic = (s) => {
  if (s?.type === CONST_STRING.ADMIN) {
    return brandLogoOnly;
  }
  return s?.notificationData?.imageURL;
};

export const showToast = ({
  message,
  position = "top-right",
  autoClose = 3000,
  hideProgressBar = true,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = false,
  type = "success",
}) => {
  return toast[type](message, {
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
  });
};

export function generateVideoToken(
  sdkKey,
  sdkSecret,
  topic,
  passWord = "",
  sessionKey = "",
  userIdentity = "",
  roleType = 1
) {
  let signature = "";
  try {
    const iat = Math.round(new Date().getTime() / 1000);
    const exp = iat + 60 * 60 * 2;
    // Header
    const oHeader = { alg: "HS256", typ: "JWT" };
    // Payload
    const oPayload = {
      app_key: sdkKey,
      iat,
      exp,
      tpc: topic,
      pwd: passWord,
      user_identity: userIdentity,
      session_key: sessionKey,
      role_type: roleType, // role=1, host, role=0 is attendee, only role=1 can start session when session not start
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    signature = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, sdkSecret);
  } catch (e) {
    console.error(e);
  }
  return signature;
}
export function isShallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (
      objA[key] !== objB[key] ||
      !Object.prototype.hasOwnProperty.call(objB, key)
    ) {
      return false;
    }
  }
  return true;
}
export function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
}
export function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}
export const minuteToHour = (totalTimeInMin) => {
  let time = parseFloat(totalTimeInMin / 60).toFixed(2);
  return time.toString().replace(".", ":");
};

export const urlify = (text) => {
  const urlRegex = INPUT_VALIDATOR.urlRegex;
  return text?.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
};

export const detectURLs = (message) => {
  const urlRegex = INPUT_VALIDATOR.urlRegex;
  return message?.match(urlRegex);
};

export const postTokenUnix = (date) => {
  let nextDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes() + 1
  );
  const unixMomentTime = moment(nextDate).utc().valueOf();
  return unixMomentTime;
};

export const deleteUserInfo = (userData) => {
  let userObj = { ...userData };
  delete userObj.certificate;
  delete userObj.educationDetails;
  delete userObj.experience;
  delete userObj.socialMediaUrl;
  delete userObj.websiteURL;
  delete userObj.availableFor;
  delete userObj.myGoal;
  delete userObj.languageSkills;
  delete userObj.briefDescription;
  return userObj;
};

const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};

export const createImageFromInitials = (size, name, color) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#6750a4";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}10`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 1.9}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

/******************* 
  @Purpose : Used for provide image dimensions
  @Parameter : e
  @Author : INIC
  ******************/
export function getImageDimensions(file) {
  return new Promise(function (resolved, rejected) {
    var i = new Image();
    i.onload = function () {
      resolved({ w: i.width, h: i.height });
    };
    i.src = file;
  });
}

export const GOOGLE_PLACE = {
  fields: ["address_components", "geometry", "formatted_address"],
  types: ["geocode", "establishment"],
};

/******************* 
  @purpose : Post Image  handler
  @Author : INIC
  ******************/

export const postImageHandler = (userDetails, instituteDetails, userInfo) => {
  if (
    (userInfo && userInfo.id === (userDetails?.id || instituteDetails?.id)) ||
    userDetails?.profilePicShowData === null ||
    userDetails?.profilePicShowData?.all ||
    (userDetails &&
      ((userDetails?.connectionData &&
        userDetails?.connectionData[0]?.isConnection &&
        userDetails?.profilePicShowData?.myConnections) ||
        (userDetails?.growthConnectionData &&
          userDetails?.growthConnectionData?.isGrowthConnection &&
          userDetails?.profilePicShowData?.myGrowthConnections) ||
        (userDetails?.followData &&
          userDetails?.followData[0]?.isFollow &&
          userDetails?.profilePicShowData?.followers) ||
        (userInfo.role &&
          ((userInfo.role.includes("Teacher") &&
            userDetails?.profilePicShowData?.teachers) ||
            (userInfo.role.includes("Trainer") &&
              userDetails?.profilePicShowData?.trainer) ||
            (userInfo.role.includes("Coach") &&
              userDetails?.profilePicShowData?.coach) ||
            (userInfo.role.includes("Host") &&
              userDetails?.profilePicShowData?.hosts)))))
  ) {
    return true;
  }
};

/******************* 
  @purpose : Last name handler
  @Author : INIC
  ******************/
export const postLastNameHandler = (
  userDetails,
  instituteDetails,
  userInfo
) => {
  if (
    (userInfo && userInfo.id === (userDetails?.id || instituteDetails?.id)) ||
    userDetails?.lastNameVisibility === null ||
    userDetails?.lastNameVisibility?.settings?.all ||
    (userDetails &&
      ((userDetails?.connectionData &&
        userDetails?.connectionData[0]?.isConnection &&
        userDetails?.lastNameVisibility?.settings?.myConnection) ||
        (userDetails?.growthConnectionData &&
          userDetails?.growthConnectionData?.isGrowthConnection &&
          userDetails?.lastNameVisibility?.settings?.myGrowthConnection) ||
        (userDetails?.followData &&
          userDetails?.followData[0]?.isFollow &&
          userDetails?.lastNameVisibility?.settings?.followers)))
  ) {
    return true;
  }
};

export const getFullName = (v) =>
  `${v?.firstName || ""} ${v?.lastName || ""}`.trim();

export const timeGetter = (timeStampz) => {
  const dt = new Date(timeStampz);
  const hours = dt.getHours(); // gives the value in 24 hours format
  const AmOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutes = dt.getMinutes();
  const finalTime = hours + ":" + minutes + " " + AmOrPm;
  return finalTime;
};

/******************* 
@purpose : Get Session 
@Parameter : {name}
@Author : INIC
******************/
export function getSession(name) {
  if (name && typeof window !== "undefined")
    return sessionStorage.getItem(name);
  return "";
}

/******************* 
@purpose : Set Session
@Parameter : {name, value}
@Author : INIC
******************/
export function setSession(name, value) {
  sessionStorage.setItem(name, value);
}

/******************* 
@purpose : Remove Session
@Parameter : {name}
@Author : INIC
******************/
export function removeSession(name) {
  if (name) {
    sessionStorage.removeItem(name);
  }
}

/******************* 
@purpose : Get Local Storage 
@Parameter : {name}
@Author : INIC
******************/
export function getLocalStorage(name) {
  if (name && typeof window !== "undefined") return localStorage.getItem(name);
  return "";
}

/******************* 
@purpose : Set Local Storage 
@Parameter : {name, value}
@Author : INIC
******************/
export function setLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

/******************* 
@purpose : Remove Local Storage 
@Parameter : {name}
@Author : INIC
******************/
export function removeLocalStorage(name) {
  if (name) {
    localStorage.removeItem(name);
  }
}

/******************* 
@purpose : Get Default Language
@Parameter : 
******************/
export function getDefaultLanguage() {
  if (
    typeof window !== "undefined" &&
    window.navigator &&
    window.navigator.languages
  ) {
    return window.navigator.languages.includes("it") ? "it" : "en";
  }
}

/******************* 
@purpose : Created By Function
@Parameter : 
******************/
export const createdByFunction = (createdBy) => {
  if (createdBy?.type === "Learning Institute") {
    return `/profile/institute-profile?instituteId=${createdBy?.instituteId}&&name=${createdBy?.name}`;
  } else if (createdBy?.type === "Company") {
    return `/profile/company-profile?companyId=${createdBy?.companyId}&&name=${createdBy?.name}`;
  } else {
    return `/profile/${createdBy?.profileId}`;
  }
};

/***********************
 @purpose : remove html tags in string , if any
 @Parameters : string
 @author: YLIWAY
 **************/
export const removeHTMLTags = (str) => {
  // Remove HTML tags using a regular expression
  return str.replace(/<[^>]*>/g, "");
};

/***********************
 @purpose :gives key based on value from object
 @Parameters : object,string
 @author: YLIWAY
 **************/

export function getKeyByValue(object, value) {
  for (const key in object) {
    if (object[key] === value) {
      return key;
    }
  }
  return null;
}

/***********************
 @purpose : gives value based on key from object
 @Parameters : object,string
 @author: YLIWAY
 **************/

export function getValueByKey(object, value) {
  return object[value] || null;
}

/***********************
 @purpose : return string with first letter in capital
 @Parameters : string
 @author: YLIWAY
 **************/
export function makeFirstLetterCapital(str) {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

/***********************
 @purpose : Converts date to given timezone
 @Parameters : date,timezone
 @author: YLIWAY
 **************/

export const convertToTargetTimezone = (inputDate, targetTimezone) => {
  const inputMoment = moment(inputDate);

  if (targetTimezone === null || targetTimezone === undefined) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userMoment = inputMoment.tz(userTimezone);
    return userMoment.format(defaultDateFormat);
  }

  const targetMoment = inputMoment.tz(targetTimezone);
  return targetMoment.format(defaultDateFormat);
};
