import { createSelector } from "reselect";

export const selectSearchData = (state) => state.searchResult;

export const selectSearchResultData = createSelector(
  [selectSearchData],
  (result) => result?.searchResults
);

export const selectRecentSearchData = createSelector(
  [selectSearchData],
  (result) => result?.recentSearchList
);

export const selectSearchText = createSelector(
  [selectSearchData],
  (result) => result?.searchText
);

export const searchedUsersList = createSelector(
  [selectSearchData],
  (result) => result.searchedUserList
);
