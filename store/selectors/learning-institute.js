import { createSelector } from "reselect";

export const learningInstituteSelector = (state) => state.user;
export const selectLearningInfo = createSelector(
  [learningInstituteSelector],
  (user) => {
    if (user.instituteDetails && typeof user.instituteDetails === "string")
      return JSON.parse(user.instituteDetails);
    else return user.instituteDetails;
  }
);

export const selectInstituteSectors = createSelector(
  [learningInstituteSelector],
  (result) => result?.sectors
);
