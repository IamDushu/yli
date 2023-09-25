import * as types from "@actions";

/******************* 
@purpose : Intital visibility reducer data
@Author : INIC
******************/
const initialState = {
  im: {
    all: true,
    none: false,
    followers: false,
    myConnection: false,
    myGrowthConnection: false,
  },
  email: {
    all: true,
    none: false,
    followers: false,
    myConnection: false,
    myGrowthConnection: false,
  },
  phone: {
    all: true,
    none: false,
    followers: false,
    myConnection: false,
    myGrowthConnection: false,
  },
  address: {
    all: true,
    none: false,
    followers: false,
    myConnection: false,
    myGrowthConnection: false,
  },
  website: {
    all: true,
    none: false,
    followers: true,
    myConnection: false,
    myGrowthConnection: false,
  },
  birthyear: {
    all: true,
    none: false,
    followers: false,
    myConnection: false,
    myGrowthConnection: false,
  },
};

/******************* 
@purpose : contact info visibility reducer
@Parameter : {ini_data, action}
@Author : INIC
******************/
const ContactInfoVisibility = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CONTACT_INFO_UPDATE_VISIBILITY:
      return { ...state, data: payload || [] };
    default:
      return state;
  }
};

export default ContactInfoVisibility;
