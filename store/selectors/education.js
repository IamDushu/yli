import { createSelector } from "reselect";

export const selectEducation = (state) => state.education;

export const selectEducationData = createSelector(
  [selectEducation],
  (education) => education.data
);

