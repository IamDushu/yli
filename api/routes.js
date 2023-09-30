/******************* 
@Purpose : We can use following api calls and can change api name easily
@Author : INIC
******************/
module.exports = {
  //Authentication
  LOGIN: "login",
  GOOGLE: "google",
  FACEBOOK: "facebook",
  LINKEDIN: "linkedin",
  LINKEDIN_ME: "me",
  LOG_OUT: "logout",
  REFRESH_TOKEN: "refreshtoken",
  REGISTER: "signUp",
  REGISTER_DETAILS: "signUpDetails",
  CHECK_INVITE_TOKEN: "checkInviteToken",
  VERIFY_OTP: "verifyOTP",
  RESEND_OTP: "resentOTP",
  FORGOT_PASSWORD: "forgotPassword",
  CHANGE_PASSWORD: "/users/changePassword",
  RESET_PASSWORD: "resetPassword",
  SET_PASSWORD: "/users/setPassword",
  PASSWORD_VERIFICATION: "verifyPassword",
  //Users
  USER_DETAILS: "/user/details",
  TESTIMONIAL_DETAILS: "/testimonials/list",
  MY_PROFILE: "myProfile",
  SECURITY_ACTIVITIES: "recentSecurityActivities",
  NEW_LOGINS: "recentNewLogins",
  PROFILE_COUNT: "profileCounts/",
  PROFILE_VIEWED: "viewProfile/",
  PROFILE_SEARCH: "saveRecentVisitor",
  SEARCH_RESULT: "globalSearch",
  RECENT_SEARCH_LIST: "recentSearch",
  SEARCH_UER_LIST: "userList",
  CLEAR_SEARCH_LIST: "clearRecentSearch",
  UPDATE_USER_DETAILS: "updateUserDetails",
  YLIWAY_USER_CERTIFICATE: "certificate/list",
  YLIWAY_USER_ENTITY_DETAILS: "entity/entityData",
  UPDATE_COMPANY_ROLE_INVITATION_STATUS: "company/updateRoleInvitationStatus",
  UPDATE_LI_ROLE_INVITATION_STATUS:
    "learningInstitute/updateRoleInvitationStatus",
  ADD_UPDATE_USERDETAILS: "addUpdateUserDetails",
  ADD_UPDATE_EXPERIENCE: "addUpdateUserExperience",
  ADD_UPDATE_EDUCATION: "addUpdateUserEducation",
  ADD_UPDATE_CERTIFICATION: "addUpdateUserCertification",
  DELETE_EXPERIENCE: "userExperience/",
  MONETISATION_FEATURE_LIST: "monetization/list",
  MONETISATION_FEATURE_LIST_MODULE_AND_CATEGORY:
    "monetization/listByModuleAndCategory",
  MONETISATION_PLAN_LIST: "plan/list",
  MONETISATION_PLAN_DETAILS: "plan/details",
  LAST_PURCHASED_PLAN_DETAILS: "userFeatures/lastPurchasePlan",
  MONETISATION_PURCHASED_FEATURE_LIST: "userFeatures/purchasedFeatures",
  PURCHASE_MONETISATION_FEATURE: "userFeatures/buyFeature",
  PURCHASE_MONETISATION_PLAN: "userFeatures/buyPlan",
  UNSUBSCRIBE_MONETISATION_PLAN: "plan/unsubscribe/",
  FILE_UPLOAD: "fileUpload",
  PRIVACY_POLICY: "Cms/page/privacy-policy",
  PRIVACY_POLICY_IT: "Cms/page/privacy-policy-it",
  TERMS_AND_CONDITION: "Cms/page/general-conditions",
  TERMS_AND_CONDITION_IT: "Cms/page/general-conditions-it",
  COOKIES_POLICY: "Cms/page/cookies-policy",
  COOKIES_POLICY_IT: "Cms/page/cookies-policy-it",
  INVESTOR_RELATION: "Cms/page/investor-relations",
  INVESTOR_RELATION_IT: "Cms/page/investor-relations-it",
  BRAND_POLICY: "Cms/page/brand-policy",
  BRAND_POLICY_IT: "Cms/page/brand-policy-it",
  CMS_LIST_STATUS: "Cms/listStatus",
  ABOUT_US: "aboutUs/list",
  ABOUT_TEACHER: "learningInstitute/teacherInfo/",
  ABOUT_INSTITUTE: "learningInstitute/instituteInfo/",
  WORK_WITH_US: "getSocialMediaLinks",
  FAQ_DETAILS: "FAQs/list",
  USER_ROLES_LIST: "userRole/list",
  USER_ROLES_ADD_UPDATE: "profession/add",
  CHECK_PENDING_REQUEST: "connections/checkPendingRequest/",
  SKILL_ENDORSEMENT: "skill/endorse",
  SKILL_ENDORSEMENT_REJECT: "skill/rejectEndorse",
  ENDORSE_REQUEST: "endorseRequest",
  ENDORSE_LIST: "endorseList",
  USER_SKILLS: "userSkills?skillArea=",
  // Groups
  GROUPS_LIST: "Groups/myGroups/list",
  IMAGE_UPLOAD: "fileUpload",
  CREATE_GROUP: "Groups/myGroups/addUpdate",
  DELETE_GROUP: "Groups/myGroups/delete/",
  GROUP_DETAILS: "Groups/myGroups/details/",
  GROUPS_JOINED_LIST: "Groups/joined",
  GROUPS_INVITE_RECEIVED: "Groups/invite/received",
  GROUPS_INVITE_ACTION: "Groups/invite/action",
  GROUPS_CONNECTION_LIST: "Groups/myConnection",
  GROUPS_INVITE_SEND: "Groups/invite/send",
  GROUPS_LEAVE: "Groups/leave",
  GROUPS_MUTEUNMUTE: "Groups/muteUnmute",
  GROUP_SEARCH: "Groups/search",
  JOIN_PUBLIC_GROUP: "/Groups/joinPublicGroup",
  GROUPS_REQUEST_RECEIVED: "/Groups/private/requestReceived",
  GROUPS_PRIVATE_REQUESTED_LIST: "/Groups/private/requested/list",
  GROUPS_PRIVATE_ACTION: "/Groups/private/action",
  GROUPS_MEMBERS: "/Groups/members",
  ALL_GROUPS_LIST: "Groups/all",
  ALL_GROUPS_REQUESTED: "Groups/invite/send/list",
  GROUPS_WITHDRAW: "private-groups/action/",

  //Article
  CREATE_ARTICLE: "article/add",
  ARTICLE_LIST: "article/list",
  DELETE_ARTICLE: "article/delete/",
  GET_ARTICLE: "article/",
  GET_DELETED_ARTICLE:"article/deleted/list",

  // Connections
  PEOPLE_YOU_MAY_KNOW_LIST: "connections/peopleYouMayKnow",
  PENDING_CONNECTIONS_LIST: "connections/pendingRequestList",
  SENT_CONNECTIONS_LIST: "connections/sentRequestList",
  MY_CONNECTIONS_LIST: "connections/myConnections",
  PEOPLE_VIEWED_LIST: "viewProfile/list",
  CHANGE_CONNECTION_STATUS: "connections/changeRequestStatus",
  SEND_CONNECTION_REQUEST: "connections/sendRequest",
  FOLLOW_USER: "connections/follow",
  FOLLOWERS_LIST: "followers/list",
  FOLLOWING_LIST: "following/list",
  MY_GROWTH_CONNECTIONS_LIST: "growthConnections/myConnections",
  GROWTH_CONNECTIONS_DELETE: "growthConnections/delete/",
  CROSS_OPTION: "connections/removeSuggestedUser/",

  // Dashboard Right Side
  RECENTLY_ADDED_TO_GM: "recentActivities",
  MOST_FOLLOWED_CONTENT: "mostFollowedContent",
  LATEST_ARTICLES: "/article/latest/list",
  MOST_FOLLOWED_CIRCLES: "Topics/mostActive/list",
  MOST_FOLLOWED_TOPICS: "Circles/mostActive/list",
  GROWTH_PARTNERS: "growthConnections/peopleYouKnow",
  GROWTH_PARTNERS_LIST: "growthConnections/list",
  GROWTH_PARTNERS_ACTIVITY_LIST:
    "growthConnections/growthConnectionActivityListing",
  DELETE_GROWTH_PARTNERS_ACTIVITY:
    "/growthConnections/deleteGrowthConnectionActivity",
  ADD_UPDATE_PARTNERS_ACTIVITY_LIST:
    "growthConnections/addUpdateGrowthConnectionActivity",

  GROWTH_PROFESSION_LIST: "growthConnections/professionList",
  ADD_REMOVE_GROWTH_PARTNERS: "growthConnections/addToGrowthConnection",
  UPDATE_CONNECTION_GOALS: "growthConnections/updateConnectionGoals",

  //dashboard post
  POST_LIST: "newsFeed/list",
  NEWS_FEED_GMACTION: "newsFeed/gm-action",
  INSTITUTE_ARTICLE_LIST: "learningInstitute/postList",
  POST_REACTION: "newsFeed/reaction",
  POST_ADD: "Posts/addUpdate",
  GET_USER_DETAILS: "getUserDetails/",
  GET_OTHER_PROFILE: "profile/",
  OTHER_PROFILE: "otherProfile/",

  HIDE_POST: "newsFeed/hide",
  MUTE_POST: "newsFeed/mute",
  REPORT_POST: "Posts/report",
  SAVE_POST: "newsFeed/save",
  //user post reply
  USER_REPLY_UPDATE: "Posts/commentReply/addUpdate",
  USER_REPLY_DELETE: "Posts/commentReply/delete",
  USER_REPLY_LIKE: "Posts/commentReply/like/addUpdate",
  USER_REPLY_LIKE_DELETE: "Posts/commentReply/like/delete",
  GET_POST_REACTION_DATA: "newsFeed-reaction/list",
  POST_VOTING: "Posts/votePoll/addUpdate",
  HASHTAG_SEARCH: "Posts/hashtag/serach",
  GET_SINGLE_POST: "newsFeed/",
  SPEAKER_SEARCH: "connections/search",
  POST_COMMENT_LIST: "comments/list",
  POST_COMMENT_REPLY_LIST: "commentReplys/list",
  USER_COMMENT_UPDATE: "Posts/comment/addUpdate",
  USER_COMMENT_DELETE: "Posts/comment/delete",
  USER_COMMENT_LIKE: "Posts/comment/like/addUpdate",
  USER_LIKE_UPDATE: "Posts/like/addUpdate",
  USER_LIKE_DELETE: "Posts/like/delete",
  //delete post
  DELETE_POST: `Posts/delete/`,
  DELETE_VOTE: `Posts/votePoll/delete/`,

  // My Account settings
  EDIT_PROFILE_INTRO: "accountSettings/profileIntroduction",
  GET_USER_PREFERENCE: "accountSettings/preferencesView",
  ACCOUNT_SETTINGS_SUSPEND: "accountSettings/suspend",
  ACCOUNT_SETTINGS_CLOSE: "accountSettings/close",
  ACCOUNT_CHANGE_PASSWORD: "accountSettings/changePassword",
  ACCOUNT_CHANGE_ACCESS: "accountSettings/access",
  ACCOUNT_ACCESS_SEND_OTP: "accountSettings/sendOTP",
  ACCOUNT_ACCESS_VERIFY_OTP: "accountSettings/verifyOTP",
  ACCOUNT_CHANGE_PREFERENCE_OTP: "accountSettings/preferences",
  ADD_TAG: "user/addTag",
  CHANGE_LANGUAGE: "user/changeLanguage",
  LI_ROLES: "learningInstitute/accessOfLI",
  GET_BILLING_INFO: "accountSettings/getBillingInfo",

  // Growth Model
  GET_GROWTH_MODEL_SELECTED_SKILLS: "skill/getGmSkills",
  ADD_EDIT_GROWTH_MODEL_SELECTED_SKILLS: "skill/addEditGmSkills",
  GET_GROWTH_MODEL: "get_growth_model",
  ADD_GROWTH_MODEL: "create_growth_model",
  UPDATE_GROWTH_MODEL: "update_growth_model",
  // GET_GROWTH_MODEL_ACTIVITIES: "get_growthmodel_activities",
  GET_GROWTH_MODEL_ACTIVITIES: "growthModel/getGrowthModelActivities",
  ADD_GROWTH_MODEL_ACTIVITIES: "add_growthmodel_activities",
  UPDATE_GROWTH_MODEL_ACTIVITIES: "update_growth_model_activity",
  DELETE_GROWTH_MODEL_ACTIVITIES: "delete_growth_model_activity",
  GET_GROWTH_MODEL_ACTIVITIES_STATUS: "get_growthmodel_activities_stats",
  DELETE_GROWTH_MODEL_USER_ACTIVITIES:
    "growthModel/deleteGrowthModelActivities",
  GROWTH_MODEL_PRINT: "get_growthmodel_activities_pdf",
  GET_PROFESSIONAL_FIELD: "professionField/list",
  GET_PROFESSIONS: "profession/list",
  GET_ALL_PROFESSIONS: "profession/all?searchTxt=",
  ADD_PROFESSIONS: "profession/add",
  AUTHOR_NAME: "user-virtualEvents/author",
  AUTHOR_NAMELIST: "authorsList",
  BLOCK_FLAG: "skill/growth-model/selectedSkillArea",
  GET_GROWTH_MODEL_STEPONE: "getGrowthModel",
  GM_DEPARTMENT_LIST: "profession/departmentList",
  GROWTH_MODEL: "growthModel",
  DELETE_GROWTH_MODEL: "delete_growth_model",

  // STATUS_GM: "status/list",
  STATUS_GM: "get_status_list",

  // PAYMENTS
  ADD_CARD: "cards/create",
  REMOVE_CARD: "cards/delete",
  CARD_LIST: "cards/list",
  RECHARGE_LIST: "creditAmount/list",
  ADD_CREDIT: "credits/add",
  VERIFY_CAPTCHA_TOKEN: "captcha/verifyCaptcha/",
  LINK_STRIPE_ACCOUNT: "credits/accountLinks",
  CREATE_EXTERNAL_ACCOUNT: "credits/createExternalAccount",
  REDEEM_CREDIT: "credits/redeem",
  CONVERT_CREDIT: "credits/conversions",
  SAVE_CREDIT: "credits/success",
  PAYMENT_HISTORY: "reports/paymentHistory",
  PURCHASE_HISTORY: "reports/purchaseHistory",
  PURCHASE_DETAIL: "reports/purchaseDetails",
  CHECK_CAPABILITY: "credits/retrieveCapability",

  // PLANS
  PLAN_LIST: "plan/list",
  PLAN_JOIN: "plan/join",
  UNSUBSCRIBE_PLAN: "plan/unsubscribe",

  // My Account Visibility
  ADD_VISIBILITY_PROFILE: "visibility/profile",
  ADD_VISIBILITY_STORY: "visibility/story",
  ADD_VISIBILITY_PUBLIC_PROFILE: "visibility/publicProfile",
  ADD_VISIBILITY_LINKS: "visibility/links",
  ADD_VISIBILITY_LAST_NAME: "visibility/lastName",
  ADD_VISIBILITY_CONNECTION_STATUS: "visibility/connectionStatus",
  ADD_VISIBILITY_TAGS: "visibility/tags",
  GET_VISIBILITY_SETTING: "visibility/getSetting",
  BLOCK_USER_LIST: "visibility/blockUserList",
  BLOCK_USER: "visibility/blockUser",
  CONTACT_INFO_GET_VISIBILITY: "visibility/getSetting",
  CONTACT_INFO_UPDATE_VISIBILITY: "visibility/contactInfo",
  UPDATE_ANONYMOUS_VISIBLITY: "visibility/anonymousProfile",

  //My Account Communication
  ADD_COMMUNICATION_MESSAGING: "addMessaging",
  ADD_COMMUNICATION_NOTIFICATION: "addNotificationSettings",
  GET_MESSAGING: "getMessaging",

  // My Account Manage Avtivity
  GET_ACTIVITY_LIST: "activity/list",
  DELETE_ACTIVITY_LIST: "activity/",

  //Virtual Events List

  VIRTUAL_EVENTS_DETAIL: "user-virtualEvents/details/",
  JOIN_VIRTUAL_EVENT: "join-event/virtualEvent",
  GENERATE_VIRTUAL_EVENT_CERTIFICATE: "virtualEvent/generateCertificate",
  GET_VIRTUAL_EVENT_CERTIFICATE_DETAILS: "virtualEvent/getCertificateDetails/",
  CREATE_OR_ADD_MEMBER_VIRTUAL_EVENTS: "/virtualEvents/createOrAddMember/",

  //YliMeet Events List
  CREATE_YLIMEET_INSTANT_MEETING_EVENTS: "meet/create",
  UPDATE_YLIMEET_INSTANT_MEETING_EVENTS: "meet/update",
  GET_YLIMEET_INSTANT_MEETING_DETAIL_EVENTS: "meet/getData",
  JOIN_YLIMEET_INSTANT_MEETING_EVENTS: "meet/join",
  END_YLIMEET_INSTANT_MEETING_EVENTS: "meet/end",
  SENT_YLIMEET_INSTANT_MEETING_NOTIFICATION_EVENTS: "meet/inviteUser",
  CREATE_AND_ADD_MEMBER_YLIMEET_GROUP_EVENTS: "meet/createAndAddMemberInGroup",
  ADD_MEMBER_YLIMEET_GROUP_EVENTS: "meet/addMember",
  FIND_GROUP_OF_PARTICIPENTS: "meet/findGroupOfParticipents",

  //Become teacher
  GET_TOPIC_LIST: "Topic/listAll",
  GET_PLATFORM: "platform/list",

  //language listing
  LANGUAGE_LIST: "languages",
  TAG_LISTING: "Topic/listAll",

  //faculty listing
  FACULTY_ALL_LIST: "faculty/allList",

  // User Requests Apis
  ROLE_REQUEST: "requestManagement/addUpdate",
  ROLE_REQUEST_STATUS: "requestManagement/checkStatus",

  // Courses Related APIs
  GET_TAGS: "tags/list",
  ADD_TAGS: "tags/addUpdate",
  GET_CONFIGURATION: "getConfiguration",
  COURSES: "otherCourses",
  COURSE_DETAIL_TEACHER: "teacherCourseDetails/details",
  COURSE_DETAIL: "course/details",
  COURSE_PLAYLIST: "course/coursePlayList",
  JOIN_COURSE: "course/join",
  JOIN_ROOMS: "virtualEvent/join",
  LESSONS: "lessons/list",
  QUIZ_QUESTIONS: "quiz/list",
  QUIZ_DETAILS: "quiz/details",
  QUIZ_ANSWERS_QUESTION: "quiz/answerQuestion",
  QUIZ_ANSWERS: "quiz/questionAnswer",
  QUIZ_QUESTIONSLIST: "quiz/questionList",
  PRACTICAL_TESTQUES_LIST: "practical/questionList",
  PRACTICAL_TESTQUES_ANSWER: "practical/questionAnswer",
  PRACTICAL_QUESTIONS: "practical/list",
  MY_LEARNING: "myLearning",
  MY_LEARNING_PAGINATION: "myLearningDetails",
  USER_LESSON_VIEWS: "lessons/userLessonViews",
  UPDATE_COURSE_TEXT: "course/addUpdateTextReadStatus",
  GENERATE_COURSE_CERTIFICATE: "course/generateCertificate/",
  GET_CERTIFICATE_DETAILS: "course/getCertificateDetails/",

  // Subscription Details
  SUBSCRIPTION_LISTING: "subscription/list",

  GET_SINGLE_CERTIFICATE: "/viewUserDetails",
  //skills
  SKILLS_AREA: "skill/areaList",
  SKILLS_TYPE: "skill/typeList?ariaId=",
  PROFILE_SKILLS_TYPE: "skill/typeList",
  SKILLS_USERLIST: "skill/userList?type=",
  ADD_SKILLS_DATA: "skill/addEditSkill",
  UPDATE_SKILLS_DATA: "skill/addEditSkill/",
  SKILLS_LISTING: "skills",
  ACTIVITIES_LIST: "user-virtualEvents/getActivitiesBySkills",
  SKILLS_TYPE_GROWTH: "skill/growth-model/typeList?ariaId=",
  ALL_SKILLS_LISTING: "skill/all",

  //notifications
  NOTIFICATION_LIST: "userNotificaton/list",
  NOTIFICATION_TURN_OFF: "userNotificaton/turnOff",
  NOTIFICATION_DELETE: "userNotificaton/status",
  NOTIFICATION_READ: "userNotificaton/status",

  //Learning Institute
  GET_LEARNING_INSTITUTE_DETAILS: "/learningInstitute/userInfo",
  LEARNING_VALIDATE_EMAIL: "learningInstitute/validateEmail",

  // Zoom
  GET_ZOOM_DETAILS: "/zoomEmbed",

  //send notification to user
  SEND_MESSAGE_NOTIFICATION: "userNotificaton/sendMessageNotification",

  // job tab
  ADD_UPDATE_JOB: "job/addUpdate",
  JOB_LIST: "job/list",
  JOB_DETAIL_LIST: "job/details/",
  INCOMPLETE_JOB: "job/incomplete-job-details/",
  JOB_EVENT_LIST: "job/event-details/",
  JOB_CANDIDATE_LIST: "candidate-list",
  SINGLE_JOB_CANDIDATE_LIST: "candidate-job/list",
  SINGLE_JOB_CANDIDATE_DETAIL: "candidate-job/details",
  APPLY_FOR_JOB: "candidate-job/apply",
  LEARNING_INSTITUTE_CURRENT_POSITIONS: "learningInstitute/currentPositionList",

  //Learning Institute
  CREATE_LEARNING_INSTITUTE: "learningInstitute/addUpdate",
  ABOUT_DATA: "learningInstitute/about/",
  LEARNING_INSTITUTE_SECTORS: "learningInstitute/sectors",
  // LEARNING_INSTITUTE_EVENTS: "learningInstitute/virtualEventList",
  LEARNING_INSTITUTE_EVENTS: "virtualEvents/list",
  GET_LEARNING_INSTITUTE_DETAILS: "learningInstitute/userInfo",
  LEARNING_INSTITUTE_FOLLOWER_LIST: "learningInstituteFollowers/list",
  LEARNING_INSTITUTE_PEOPLE_LIST: "learningInstituteFollowers/employee/list",
  LEARNING_INSTITUTE_FOLLOW_UPDATE: "learningInstituteFollowers/addUpdate",
  LEARNING_INSTITUTE_COURSES_LIST: "learningInstitute/courseList",
  INSTITUTE_PURCHASE_LIST: "learningInstitute/purchaseList",
  INSTITUTE_USER_LIST: "learningInstitute/userList",
  LEARNING_INSTITUTE_DETAILS: "learningInstitute/details/",
  LEARNING_INSTITUTE_LIST: "learningInstitute/list",
  USER_COMPANY_LIST: "company/list",
  ORGANIZATION_LIST: "organisation/list",
  ADD_ORGANISATION: "organisation/add",
  EXPERIENCE_LIST: "userExperience/list",
  EDUCATION_LIST: "userEducation/list",
  CERTIFICATION_LIST: "userCertification/list",
  CERTIFICATION_DELETE: "userCertification",
  EDUCATION_DELETE: "userEducation",
  ADD_COMPANY_TO_LIST: "company/add",

  //Services tab
  LIST_SERVICES: "service/list",

  // Home tab
  LEARNING_INSTITUTE_HOME: "learningInstitute/home/",
  LEARNING_INSTITUTE_JOB_LIST: "job/list",
  SUGGESTED_JOB_LIST: "job/suggestedJobs",
  SUGGESTED_JOB_DETAIL: "job/suggestedJobs/details/",
  SUGGESTED_ACTIVITY_LIST: "job/suggestedJobs/activities",

  // Faculty tab
  LIST_FACULTY: "faculty/list",

  //Student Feedback
  ADD_STUDENT_FEEDBACK: "feedback/addUpdate",
  STUDENT_FEEDBACK: "feedback/list",

  //Growth courses and rooms
  OTHER_GROWTH_COURSES: "course/growth-model",
  OTHER_GROWTH_ROOMS: "/user-virtualEvents/growth-model",

  // link preview
  LINK_PREVIEW: "link-preview",
  // Get Lesson video
  GET_LESSON_VIDEO: "getLesson/",
  GET_CHAPTER_PDF: "getChapterPdf/",
  // Tag functionality
  TAG_FUNCTIONALITY: "Posts/userTags/search",

  //Welcome Room
  AVAILABLE_SLOTS: "virtualEvent/welcome-room/availbleSlots",
  BOOK_SLOTS: "virtualEvent/welcome-room/bookSlot",

  //Chat Api's
  CHAT_USER_LOGIN: "chat/user/login",
  CHAT_USER_SIGNUP: "chatSignup/create/user",
  CHAT_CREATE_USER: "chat/create",
  CHAT_CREATE_CHANNEL: "channel/create",
  GET_USER_BY_EMAIL: "chatSignup/users/email/",
  GET_USER_BY_ID: "chatSignup/users/",
  GET_CHANNELS_LIST: "channel/list/me/",
  GET_MESSAGE_LIST: "channel/",
  SEND_MESSAGE: "channel/sendMessage",
  USER_SEARCH: "users/search",
  DELETE_MESSAGE_CHANNEL: "channel/deleteMessage/",
  REPLY_MESSAGE_CHANNEL: "channel/replyMessage",
  GET_THREAD_MESSAGES: "channel/thread/",
  EDIT_MESSAGE_CHANNEL: "channel/editMessage/",
  MM_FILE_UPLOAD: "file/upload",
  FILE_UPLOAD_MESSAGE: "file/message",
  FILE_LISTING_MESSAGE: "file/",
  ADD_CHANNEL_MEMBERS: "channel",

  // Company
  GET_COMPANY_DETAILS: "/company/userInfo",
  COMPANY_VALIDATE_EMAIL: "company/validateEmail",
  CREATE_COMPANY: "company/addUpdate",
  ABOUT_DATA_CO: "company/about/",
  COMPANY_DATA: "company/details/",
  COMPANY_HOME: "company/home/",
  COMPANY_FOLLOW_UPDATE: "companyFollowers/addUpdate",
  COMPANY_FOLLOWER_LIST: "companyFollowers/list",
  COMPANY_PEOPLE_LIST: "companyFollowers/employee/list",
  LIST_PRODUCTS: "product/list",

  // Calendar
  GET_CALENDAR_EVENT_LIST: "calendarEvent/list",
  ADD_UPDATE_CALENDAR_EVENT: "calendarEvent/addUpdate",
  DELETE_CALENDAR_EVENT: "calendarEvent/delete/",
};
