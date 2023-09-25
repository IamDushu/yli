import * as types from "@actions";
/******************* 
@purpose : Intital ui reducer data
@Author : INIC
******************/
const initialState = {
  isLoading: false,
  messages: [],
  language: "",
  sharePost: {},
  skills: {},
  viewSingleCerti: {},
  shareArticle: {},
  otherConnection: {},
  coursePdf: {},
  singleMessage: {},
  loaders: {
    courseloader: false,
    roomloader: false,
    roomDetailLoader: true,
    courseDetailLoader: true,
  },
  modals: {
    login: false,
    register: false,
    forgetPassword: false,
    setNewPassword: false,
  },
  skillArea: "",
};

/******************* 
@purpose : UI Reducer
@Parameter : {ui_ini_data, action}
@Author : INIC
******************/
export default function ui(ui_ini_data = initialState, action = {}) {
  switch (action.type) {
    // Set Various Custom Redux Key Data /
    case types.SET_UI_KEY:
      return Object.assign({}, ui_ini_data, {
        [action.key]: action.data,
      });
    // Show Alert Notification .
    case types.SHOW_ALERT:
      let tempMessages = Object.assign([], ui_ini_data.messages);
      tempMessages.push({
        text: action.text,
        level: action.level,
        timeout: action.timeout,
      });
      return Object.assign({}, ui_ini_data, {
        messages: tempMessages,
      });
    // Remove Alert Notification
    case types.REMOVE_ALERT:
      return Object.assign({}, ui_ini_data, {
        messages: [],
      });
    // Set Page Loader
    case types.TOGGLE_LOADER:
      let loaders = Object.assign({}, ui_ini_data.loaders);
      loaders[action.key] = action.value;
      return Object.assign({}, ui_ini_data, {
        loaders,
      });
    // Open/Close Modal
    case types.TOGGLE_MODAL:
      let modals = Object.assign({}, ui_ini_data.modals);
      modals[action.key] = action.value;
      return Object.assign({}, ui_ini_data, {
        modals,
      });

    // toggle multiple modal
    case types.TOGGLE_MODALS: {
      return {
        ...ui_ini_data,
        modals: {
          ...ui_ini_data.modals,
          ...action.data,
        },
      };
    }
    case types.SHARE_MODAL:
      return Object.assign({}, ui_ini_data, {
        sharePost: action.data,
      });
    case types.REQUEST_FOR_RECOMMENDATION:
      return Object.assign({}, ui_ini_data, {
        skillArea: action.data,
      });
    case types.SKILL_ENDORSE_MODAL:
      return Object.assign({}, ui_ini_data, {
        skills: action.data,
      });
    case types.VIEW_CERTIFICATE:
      return Object.assign({}, ui_ini_data, {
        viewSingleCerti: action.data,
      });
    case types.ARTICLE_MODAL:
      return Object.assign({}, ui_ini_data, {
        shareArticle: action.data,
      });
    case types.OTHER_CONNECTION:
      return Object.assign({}, ui_ini_data, {
        otherConnection: action.data,
      });
    case types.UPLOAD_COURSE_PDF:
      return Object.assign({}, ui_ini_data, {
        coursePdf: action.data,
      });
    case types.CONFIRM_DELETE_MESSAGE:
      return Object.assign({}, ui_ini_data, {
        singleMessage: action.data,
      });
    default:
      return ui_ini_data;
  }
}
