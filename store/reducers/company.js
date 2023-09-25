import * as types from "@actions";
import { getCookie } from "utils";

/******************* 
@purpose : Intital company reducer data
@Author : YLIWAY
******************/
const initialState = {
  aboutData: [],
  companyData: {},
  companyHomeDetails: {},
  peopleList: [],
  peopleListPage: [],
  followerList: [],
  followerListPage: [],
  productsList: [],
  skillsList: [],
};

/******************* 
@purpose : company reducer
@Parameter : {ini_data, action}
@Author : YLIWAY
******************/
const company = (ini_data = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_ABOUT_INFO_CO:
      return {
        ...ini_data,
        aboutData: action.data,
      };
    case types.SET_COMPANY_DATA:
      return Object.assign({}, ini_data, {
        companyData: action.data,
      });
    case types.SET_COMPANY_HOME_DETAILS:
      return Object.assign({}, ini_data, {
        companyHomeDetails: action.payload,
      });
    case types.SET_FOLLOWER_LIST_CO:
      return Object.assign({}, ini_data, {
        followerList: action.payload,
      });
    case types.SET_FOLLOWER_LIST_PAGE_CO:
      return Object.assign({}, ini_data, {
        followerListPage: action.payload,
      });
    case types.SET_PEOPLE_LIST_CO:
      return Object.assign({}, ini_data, {
        peopleList: action.payload,
      });
    case types.SET_PEOPLE_LIST_PAGE_CO:
      return Object.assign({}, ini_data, {
        peopleListPage: action.payload,
      });
    case types.SET_PRODUCTS_LIST:
      return Object.assign({}, ini_data, {
        productsList: action.payload,
      });
    case types.SET_SKILLS_LIST:
      return Object.assign({}, ini_data, {
        skillsList: action.payload,
      });

    default:
      return ini_data;
  }
};

export default company;
