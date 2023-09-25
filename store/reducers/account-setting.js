import {
  ADD_CARDS,
  CLEAR_STATE,
  CLOSE_ACCOUNT,
  SET_LI_ROLES,
  SET_NUMBERS,
  SET_PREFERENCES,
  SUSPEND_ACCOUNT,
} from "../actions";
/******************* 
@purpose : Intital account settings reducer data
@Author : INIC
******************/
const initialState = {
  isSuspended: false,
  isDeleted: false,
  phone: "",
  alternatePhone: "",
  preferences: {},
  cards: [],
  liRoles: [],
};
/******************* 
@purpose : ui reducer
@Parameter : {state, action}
@Author : INIC
******************/
const accountSettingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SUSPEND_ACCOUNT:
      return { ...state, isSuspended: payload.isSuspended };
    case ADD_CARDS:
      return { ...state, cards: payload };

    case CLOSE_ACCOUNT:
      return { ...state, isDeleted: payload.isDeleted };

    case SET_NUMBERS:
      return {
        ...state,
        phone: payload.phone,
        alternatePhone: payload.alternatePhone,
      };

    case SET_PREFERENCES:
      return { ...state, preferences: payload };
    case SET_LI_ROLES:
      return { ...state, liRoles: payload };

    case CLEAR_STATE:
      return {
        isSuspended: false,
        isDeleted: false,
        phone: "",
        alternatePhone: "",
        preferences: {},
      };

    default:
      return state;
  }
};

export default accountSettingReducer;
