const routes = (module.exports = require("next-routes")());
// const { default: Dashboard } = require("pages/dashboard");
// const { default: Connection } = require("pages/connections/connection");

const {
  HOME,
  SIGM_IN,
  SIGM_UP,
  FORGOT_PASSWORD,
  RESRT_PASSWORD,
  MY_ACCOOUNT,
  ABOUT_US,
  FAQ,
  UIKIT,
  PRIVACY_POLICY,
  COOKIES_POLICY,
  ADD_QUESTIONS,
  TERM_AND_CONDITIONS,
  EMAIL,
  GUIDE_LINES,
  MY_CONNECTION,
  PLUGINS,
  MY_PROFILE,

  EDIT_EXPERIENCE,
  EDIT_EDUCATION,
  EDITCERTIFICATIONS,
  EDITLANGUAGES,
  EDITDESCRIPTION,
  GROUPS,
  CREATE_GROUPS,
  GROUPS_POST,
  TEACHER_PROFILE,
  NEW_TEACHER,
  NOTIFICATIONS,
  COURSES,
  COURSES_DETAIL,
  TEACHER_INTRODUCTION,
  TRAINER_INTRODUCTION,
  CREATE_PROFILE_TEACHER,
  CREATE_PROFILE_TRAINER,
  CREATE_PROFILE_COACH,
  CREATE_PROFILE_HOST,
  UPLOAD_ONLINECOURSES,
  ADD_PRACTICAL_TEST,
  SELECT_COMPANY_TYPE,
  CREATE_BUSINESS_PAGE,
  UPLOAD_OFFLINECOURSES,
  OFFLINE_COURSES,
  BN_ROOMS,
  ADD_QUIZ,
  ACCOUNTS,
  ROOMS,
  FIND_YOUR_PROFESSION,
  COACH_INTRODUCTION,
  BECOME_BN_HOST,
  CREATE_ROOM,
  ROOM_DETAIL,
  ADD_FAQ,
  MESSAGES,
  EDIT_GROUPS,
  CREATE_PROFILE_INSTITUTE,
  CREATE_PROFILE_INSTITUTE_STEP1,
  CREATE_PROFILE_INSTITUTE_STEP2,
  INSTITUTE_INTRODUCTION,
  INSTITUTE_PROFILE,
  CERTIFICATE,
  JOB_OFFERS,
  SUGGESTED_ACTIVITY,
  BRAND_POLICY,
  INVESTOR_RELATIONS,
  CREATE_PROFILE_COMPANY,
  CREATE_PROFILE_COMPANY_STEP1,
  CREATE_PROFILE_COMPANY_STEP2,
} = require("./urls");

/******************* 
@purpose : Application Routing URL
@Author : INIC
******************/
routes.add("home", "/", "/");
routes.add("/home", HOME);
// accounts and authentications page routes
routes.add("account/sign-up", SIGM_UP);
routes.add("account/sign-in", SIGM_IN);
routes.add("account/forgot-password", FORGOT_PASSWORD);
routes.add("account/reset-password", RESRT_PASSWORD);
routes.add("account/my-account", MY_ACCOOUNT);
// cms pages routes
routes.add("cms/about-us", ABOUT_US);
routes.add("cms/uikit", UIKIT);
routes.add("cms/privacy-and-policy", PRIVACY_POLICY);
routes.add("cms/term-and-conditions", TERM_AND_CONDITIONS);
routes.add("cms/faq", FAQ);
routes.add("cms/cookies-policy", COOKIES_POLICY);
routes.add("cms/investor-relations", INVESTOR_RELATIONS);
routes.add("cms/brand-policy", BRAND_POLICY);
routes.add("cms/add-questions", ADD_QUESTIONS);
routes.add("cms/email", EMAIL);
// theme routes
routes.add("theme/guide-lines", GUIDE_LINES);
routes.add("theme/plugins", PLUGINS);
// My-profile routes
routes.add("profile/my-profile", MY_PROFILE);
routes.add("profile/teacher-profile", TEACHER_PROFILE);
routes.add("profile/new-teacher", NEW_TEACHER);
routes.add("profile/institute-profile", INSTITUTE_PROFILE);

routes.add("profile/edit-experience", EDIT_EXPERIENCE);
routes.add("profile/edit-education", EDIT_EDUCATION);
routes.add("profile/edit-certifications", EDITCERTIFICATIONS);
routes.add("profile/edit-languages", EDITLANGUAGES);
routes.add("profile/edit-description", EDITDESCRIPTION);
// Connection routes
routes.add("my-connections/my-connection", MY_CONNECTION);
// Groups routes
routes.add("groups/groups", GROUPS);
routes.add("groups/create-groups", CREATE_GROUPS);
routes.add("groups/edit-groups", EDIT_GROUPS);
routes.add("groups/groups-post", GROUPS_POST);

// Notifications
routes.add("notifications/notifications", NOTIFICATIONS);

// Courses
routes.add("courses/video-courses", COURSES);
routes.add("courses/courses-detail", COURSES_DETAIL);
routes.add("courses/upload-onlinecourses", UPLOAD_ONLINECOURSES);
routes.add("courses/upload-offlinecourses", UPLOAD_OFFLINECOURSES);
routes.add("courses/add-quiz", ADD_QUIZ);
routes.add("courses/add-practical-test", ADD_PRACTICAL_TEST);
routes.add("courses/offline-courses", OFFLINE_COURSES);
routes.add("courses/certificate", CERTIFICATE);

//Institute

routes.add("institute/institute-introduction", INSTITUTE_INTRODUCTION);
routes.add("institute/create-profile-institute", CREATE_PROFILE_INSTITUTE);
routes.add(
  "institute/create-profile-institute-step1",
  CREATE_PROFILE_INSTITUTE_STEP1
);
routes.add(
  "institute/create-profile-institute-step2",
  CREATE_PROFILE_INSTITUTE_STEP2
);

// Training Rooms
routes.add("rooms/rooms", ROOMS);
routes.add("messages", MESSAGES);
// BN Rooms
routes.add("bn-rooms/bn-rooms", BN_ROOMS);
// Business Section
routes.add("business/teacher-introduction", TEACHER_INTRODUCTION);
routes.add("business/trainer-introduction", TRAINER_INTRODUCTION);
routes.add("business/create-profile-teacher", CREATE_PROFILE_TEACHER);
routes.add("business/create-profile-trainer", CREATE_PROFILE_TRAINER);
routes.add("business/create-profile-coach", CREATE_PROFILE_COACH);
routes.add("business/create-profile-room-manager", CREATE_PROFILE_HOST);
routes.add("business/select-company-type", SELECT_COMPANY_TYPE);
routes.add("business/create-business-page", CREATE_BUSINESS_PAGE);
routes.add("business/coach-introduction", COACH_INTRODUCTION);
routes.add("business/become-bn-room-manager", BECOME_BN_HOST);
// Create Room
routes.add("create-room/training-room", CREATE_ROOM);
routes.add("create-room/room-detail", ROOM_DETAIL);
// My Accounts
routes.add("my-accounts/accounts", ACCOUNTS);

routes.add("growth/findyour-profession", FIND_YOUR_PROFESSION);

routes.add("faq/add-faq", ADD_FAQ);

// jobs
routes.add("/job-offers", JOB_OFFERS);
routes.add("/job-offers/activity", SUGGESTED_ACTIVITY);

// Company
routes.add("company/company-introduction", INSTITUTE_INTRODUCTION);
routes.add("company/create-profile-company", CREATE_PROFILE_COMPANY);
routes.add(
  "company/create-profile-company-step1",
  CREATE_PROFILE_COMPANY_STEP1
);
routes.add(
  "company/create-profile-company-step2",
  CREATE_PROFILE_COMPANY_STEP2
);
