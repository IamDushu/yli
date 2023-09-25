import * as types from "@actions";

/******************* 
@purpose : Intital search result reducer data
@Author : INIC
******************/
const initialState = {
  searchResults: {},
  recentSearchList: [],
  searchText: "",
  searchedUserList: {},
};

/******************* 
@purpose : search result reducer
@Parameter : {search_data, action}
@Author : INIC
******************/
const searchResult = (search_data = initialState, action = {}) => {
  switch (action.type) {
    // Set testimonial information
    case types.SET_SEARCH_RESULT:
      return Object.assign({}, search_data, {
        searchResults: action.data,
      });
    case types.SET_SEARCH_TEXT:
      return Object.assign({}, search_data, {
        searchText: action.data,
      });
    case types.RECENT_SEARCH_LIST:
      return Object.assign({}, search_data, {
        recentSearchList: action.data,
      });
    case types.CLEAR_SEARCH_LIST:
      return Object.assign({}, search_data, {
        recentSearchList: [],
      });
    case types.SET_SEARCHED_USER_LIST:
      return Object.assign({}, search_data, {
        searchedUserList: action.data,
      });
    default:
      return search_data;
  }
};

export default searchResult;
