export const DEFAULT_TIMEOUT = 20000; //milliseconds
export const INPUT_VALIDATOR = {
  noSpeacialCharRegex: /^[a-zA-Z0-9_.-]*$/,
  emailRegex: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  inputText: /^[a-zA-Z\u0600-\u06FF,-][\sa-zA-Z\u0600-\u06FF,-]*$/,
  passwordRegex:
    /^(?=.*[0-9])(?=.*[- ?.!@#$%^&*_\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?.!@#$%^&*_\/\\]{8,}$/,
  numberRegx:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  otpRegex: /^\d{6}$/,
  urlRegex: /(((https?:\/\/)|(www\.))[^\s]+)/g,
};

export const USER_IMAGE_TYPES = {
  PROFILE: "profile",
  PROFILE_BG: "profile_bg",
  COMPANY_LOGO_EXPERIENCE: "company_logo_experience",
  CERTIFICATE_LOGO_EXPERIENCE: "certificate_logo_experience",
  EDUCATION_LOGO_SCHOOL: "education_logo_school",
};

export const monthOptions = [
  { value: "", label: "None" },
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const websiteTypeOptions = [
  { value: "Personal", label: "Personal" },
  { value: "Company", label: "Company" },
  { value: "Blog", label: "Blog" },
  { value: "RSS_Feed", label: "RSS Feed" },
  { value: "Portfolio", label: "Portfolio" },
  { value: "Other", label: "Other" },
];

export const instantMessageOptions = [
  { value: "Skype", label: "Skype" },
  { value: "Twitter", label: "Twitter" },
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Tiktok", label: "Tiktok" },
  { value: "Youtube", label: "Youtube" },
];

export const phoneNumberTypeOptions = [
  { value: "Mobile", label: "Mobile" },
  { value: "Home", label: "Home" },
  { value: "Work	", label: "Work	" },
];

export const monthNumMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export const monthDayNumMap = {
  January: 31,
  February: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

export const availableForOptions = [
  { label: "Finding Visibility Partners", value: 2 },
  { label: "Finding Business Partner", value: 3 },
  { label: "Finding a job at a company", value: 5 },
  { label: "Working as a freelancer", value: 6 },
  { label: "Working as consultant", value: 7 },
  { label: "Create a new business", value: 8 },
  { label: "Create a startup", value: 9 },
];

export const OPERATION_TYPE = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
};

export const growthModelResourceFilterOptions = [
  { value: "Hard Skills", label: "Hard Skills" },
  { value: "Soft Skills", label: "Soft Skills" },
  { value: "Mindset", label: "Mindset" },
  { value: "Traction", label: "Traction" },
  { value: "Distribution", label: "Distribution" },
  { value: "Support", label: "Support" },
  { value: "Content", label: "Content" },
];

export const growthModelTypeFilterOptionschange = [
  { value: "Courses", label: "Online Course" },
  { value: "Courses", label: "Offline Course" },
  { value: "training-room", label: "Training Room" },
  { value: "coaching-room", label: "Coaching Room" },
  { value: "business-network-room", label: "Business Network Room" },
  { value: "webinar", label: "Webinar" },
  { value: "master-class", label: "Masterclass" },
  { value: "event", label: "Event" },
  { value: "Other", label: "Other" },
];

export const otherPlatforms = [
  {
    value: "Udemy",
    label: "Udemy",
  },
  {
    value: "Coursera",
    label: "Coursera",
  },
  {
    value: "Podia",
    label: "Podia",
  },
  {
    value: "Skillshare",
    label: "Skillshare",
  },
  {
    value: "Coursi.it",
    label: "Coursi.it",
  },
  {
    value: "Competenze.in",
    label: "Competenze.in",
  },
  {
    value: "Learnn",
    label: "Learnn",
  },
  {
    value: "Others",
    label: "Others",
  },
];

export const defaultDateFormat = "DD MMM YYYY hh:mm:ss A";
export const brandLogoOnly = "/assets/images/brand-logo-icon.png";

export const CONST_STRING = {
  ADMIN: "Admin",
};

export const SOCKET_EVENTS = {
  TEST: "test",
  ONLINE_USER_SAVED: "onlineUserSaved",
  NEW_USER: "newUser",
  GET_NOTIFICATION: "getNotification",
  NEW_MESSAGE: "newmessage",
  NEW_NOTIFICATION: "newnotification",
  GET_NEW_MESSAGE: "getnewmessage",
  NOT_FOUND: "notFound",
};

export const learningInstituteStepOne = {
  name: "",
  orgType: "",
  // sector: "",
  roleInInstitute: "",
  instituteEmail: "",
  instituteContact: "",
  foundedOn: "",
  instituteURL: "",
  fiscalNumber: "",
  tin: "",
  // iban: "",
  // bicSwiftNumber: "",
  // pec: "",
  // cu: "",
  tags: [],
  headquarter: "",
  branches: [
    {
      otherBranchAddress: "",
    },
  ],
};

export const learningInstituteStepTwo = {
  logo: null,
  cover: null,
  slogan: "",
  overview: "",
  description: "",
  type: "Learning Institute",
  // headquarter: "",
  // branches: [],
};

export const jobCreateStepOneInitialData = {
  professionalField: {},
  profession: {},
  educationDetails: "",
  experience: "",
  salaryRange: "",
  employmentAge: "",
  address: "",
  otherBenefits: "",
  responsibilities: "",
  jobDescription: "",
};

export const jobCreateStepTwoInitialData = {
  hardSkills: [],
  hardSkillInformation: "",
  softSkills: [],
  softSkillInformation: "",
  mindsets: [],
  mindsetsInformation: "",
  eventId: "",
  eventUrl: "",
  instituteId: "",
};

export const skillTypes = [
  {
    key: "hardSkills",
    title: "Hard Skills",
  },
  {
    key: "softSkills",
    title: "Soft Skills",
  },
  {
    key: "mindsets",
    title: "Mindsets",
  },
];

export const companySkillAreaOptions = [
  "Hard Skills",
  "Soft Skills",
  "Mindset",
];

export const jobTabRenderTypes = {
  ADD_JOB: "addjob",
  JOB_DETAIL: "jobdetail",
};

export const ADD_EDIT_JOB = "addjob";
export const JOB_DETAIL = "jobdetail";
export const JOB_LIST = "joblist";

export const contentTypes = {
  VIDEO: "VIDEO",
  TEXT: "TEXT",
  QUIZ: "QUIZ",
  DOCUMENT: "DOCUMENT",
};

export const imagePreferenceHandler = (
  userData,
  profilePicShowData,
  userInfo
) => {
  if (
    userData.id === userInfo.id ||
    profilePicShowData === null ||
    profilePicShowData?.all ||
    (userData?.connectionDetails &&
      userData?.connectionDetails?.isConnection &&
      profilePicShowData?.myConnections) ||
    (userData?.connectionDetails &&
      userData?.connectionDetails?.isfollow &&
      profilePicShowData?.followers) ||
    (userData?.growthConnectionData &&
      userData?.growthConnectionData?.isGrowthConnection &&
      profilePicShowData?.myGrowthConnections) ||
    (userInfo.role &&
      ((userInfo.role.includes("Teacher") && profilePicShowData.teachers) ||
        (userInfo.role.includes("Trainer") && profilePicShowData.trainer) ||
        (userInfo.role.includes("Coach") && profilePicShowData.coach) ||
        (userInfo.role.includes("Host") && profilePicShowData.hosts)))
  ) {
    return true;
  }
};

export const lastNameHandler = (userData, lastNameVisibility, userInfo) => {
  if (
    userData?.id === userInfo?.id ||
    lastNameVisibility === null ||
    lastNameVisibility?.settings?.all ||
    (userData?.connectionDetails &&
      userData?.connectionDetails?.isConnection &&
      lastNameVisibility?.settings?.myConnection) ||
    (userData?.growthConnectionData &&
      userData?.growthConnectionData?.isGrowthConnection &&
      lastNameVisibility?.settings?.myGrowthConnection) ||
    (userData?.connectionDetails &&
      userData?.connectionDetails?.isfollow &&
      lastNameVisibility?.settings?.followers)
  ) {
    return true;
  }
};
export const employmentTypeOptions = [
  {
    label: "In presence",
    value: "In presence",
  },
  {
    label: "Smart working",
    value: "Smart working",
  },
  {
    label: "Mixed presence-smartworking",
    value: "Mixed presence-smartworking",
  },
  {
    label: "To be agreed",
    value: "To be agreed",
  },
];
export const jobTypeOptions = [
  {
    label: "Part time contract",
    value: "Part time contract",
  },
  {
    label: "Full time contract",
    value: "Full time contract",
  },
];
export const contractTypeOptions = [
  {
    label: "Permanent contract",
    value: "Permanent contract",
  },
  {
    label: "Fixed-term contract",
    value: "Fixed-term contract",
  },
  {
    label: "Contract on call",
    value: "Contract on call",
  },
  {
    label: "Occasional performance contract",
    value: "Occasional performance contract",
  },
  {
    label: "Apprenticeship contract",
    value: "Apprenticeship contract",
  },
  {
    label: "Training and orientation internship contract",
    value: "Training and orientation internship contract",
  },
  {
    label: "Coordinated and continuous collaboration agreement",
    value: "Coordinated and continuous collaboration agreement",
  },
];

export const visibilityOptions = [
  { value: "all", label: "All" },
  { value: "myConnection", label: "My Connections" },
  { value: "myGrowthConnection", label: "My Growth Connections" },
  { value: "followers", label: "Followers" },
  { value: "none", label: "None" },
];

// features category constant
export const CATEGORY = {
  HASHTAGS: "hashtags",
  PROFILE_VISITS: "profile visited",
  ANONYMOUS_PROFILE: "anonymous profile",
};
// features code constant
export const CODE = {
  HASHTAG_6: "HASHTAG_6",
  HASHTAG_10: "HASHTAG_10",
  PROFILE_VISIT_20: "PROFILE_VISIT_20",
  PROFILE_VISIT_UNLIMITED: "PROFILE_VISIT_UNLIMITED",
  ANONYMOUS_PROFILE: "ANONYMOUS_PROFILE",
};

export const PURCHASE_MODE_RECURRING = "recurring";
export const PURCHASE_MODE_ONETIME = "oneTime";
export const SUBSCRIPTION_TYPE_FREE = "Free";

// company
export const companyStepOne = {
  companyStrength: "",
  companyName: "",
  industry: "",
  roleInCompany: "",
  companyEmail: "",
  companyContact: "",
  foundedOn: "",
  companyURL: "",
  fiscalNumber: "",
  tin: "",
  iban: "",
  bicSwiftNumber: "",
  pec: "",
  cu: "",
  tags: [],
  headquarter: "",
  branches: [
    {
      otherBranchAddress: "",
    },
  ],
};

export const companyStepTwo = {
  logo: null,
  cover: null,
  slogan: "",
  overview: "",
  description: "",
  type: "Company",
  // headquarter: "",
  // branches: [],
};

export const accountTypeFiscalType = {
  BUSINESS: "business",
  PRIVATE: "private",
};

// Screen Sizes
export const responsiveSizes = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Conneciton goal options
export const connectionGoals = [
  {
    label: "Know-how exchange",
    value: "Know-how exchange",
  },
  {
    label: "Visibility Partner",
    value: "Visibility Partner",
  },
  {
    label: "Channel Partner",
    value: "Channel Partner",
  },
  {
    label: "Business Partner",
    value: "Business Partner",
  },
];

export const getFilters = (lang) => [
  {
    id: "all",
    name: lang("GLOBAL_SEARCH.FILTER.ALL"),
  },
  {
    id: "people",
    name: lang("GLOBAL_SEARCH.FILTER.PEOPLE"),
  },
  {
    id: "companies",
    name: lang("GLOBAL_SEARCH.FILTER.COMPANIES"),
  },
  {
    id: "groups",
    name: lang("GLOBAL_SEARCH.FILTER.GROUPS"),
  },
  {
    id: "guides",
    name: lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES"),
  },
  {
    id: "teachers",
    name: lang("GLOBAL_SEARCH.FILTER.TEACHER"),
  },
  {
    id: "trainers",
    name: lang("GLOBAL_SEARCH.FILTER.TRAINER"),
  },
  {
    id: "coach",
    name: lang("GLOBAL_SEARCH.FILTER.COACH"),
  },
  {
    id: "courses",
    name: lang("GLOBAL_SEARCH.FILTER.COURSES"),
  },
  {
    id: "rooms",
    name: lang("GLOBAL_SEARCH.FILTER.ROOMS"),
  },
  {
    id: "learningInstitute",
    name: lang("GLOBAL_SEARCH.FILTER.LEARNING_INSTITUTE"),
  },
  {
    id: "articles",
    name: lang("GLOBAL_SEARCH.FILTER.ARTICLES"),
  },
  {
    id: "posts",
    name: lang("GLOBAL_SEARCH.FILTER.POSTS"),
  },
];

export const PPAndCompanyNotificationType = [
  "Peer Producer",
  "Admin Peer Producer",
  "Company",
  "Admin Company",
];
