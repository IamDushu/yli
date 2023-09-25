import { combineReducers } from "redux";
//Import all reducer
import ui from "./ui";
import user from "./user";
import testimonial from "./testimonial";
import privacyPolicy from "./privacy-policy";
import termscondiction from "./terms-and-condiction";
import cookiesPolicy from "./cookies-policy";
import investorRelations from "./investor-relations";
import brandPolicy from "./brand-policy";
import experienceReducer from "./experience";
import activityReducer from "./activity";
import calendarReducer from "./calendar";
import certificationReducer from "./certification";
import languageReducer from "./language";
import post from "./post";
import groups from "./groups";
import educationReducer from "./education";
import connections from "./connections";
import accountSettingReducer from "./account-setting";
import planReducer from "./plan";
import growth from "./growth";
import room from "./room/room";
import visibility from "./visibility";
import communication from "./communication";
import manageActivity from "./manageActivity";
import aboutUsInfo from "./aboutUs";
import faqReducer from "./faq";
import articles from "./article";
import searchResult from "./search-result";
import courses from "./courses";
import businessPage from "./business-page";
import skillReducer from "./skills";
import notificationsReducer from "./notifications";
import message from "./message";
import learningInstitute from "./learningInstitute";
import zoom from "./zoom";
import chatReducer from "./chat";
import company from "./company";
import yliMeet from "./yli-meet/yli-meet";

/******************* 
@purpose : Combine Reducer
@Parameter : {ui, user}
@Author : INIC
******************/
const rootReducer = combineReducers({
  ui,
  user,
  testimonial,
  privacyPolicy,
  termscondiction,
  cookiesPolicy,
  investorRelations,
  brandPolicy,
  experience: experienceReducer,
  education: educationReducer,
  activity: activityReducer,
  calendar: calendarReducer,
  certification: certificationReducer,
  language: languageReducer,
  post: post,
  groups,
  connections,
  accountSetting: accountSettingReducer,
  plans: planReducer,
  growth,
  room,
  visibility,
  communication,
  manageActivity,
  aboutUsInfo,
  faqReducer,
  searchResult,
  learningInstitute,
  articles,
  courses,
  businessPage,
  skillReducer,
  notifications: notificationsReducer,
  message,
  zoom,
  chat: chatReducer,
  company,
  yliMeet,
});

export default rootReducer;
