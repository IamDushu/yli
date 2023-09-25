import { createSelector } from "reselect";

export const selectActivity = (state) => state.post;

export const selectActivityData = createSelector(
  [selectActivity],
  (activity) => activity.postListData
);

