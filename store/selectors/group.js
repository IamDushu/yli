import { createSelector } from "reselect";

export const selectGroup = (state) => state.groups;

export const selectJoinedGroupData = createSelector(
  [selectGroup],
  (group) => group.groupsJoinedList
);

