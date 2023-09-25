import { createSelector } from "reselect";
import user from "store/reducers/user";

export const selectUser = (state) => state.user;

export const selectUserInfo = createSelector([selectUser], (user) => {
  if (user.userInfo && typeof user.userInfo === "string")
    return JSON.parse(user.userInfo);
  else return user.userInfo;
});

export const selectUserCountData = createSelector(
  [selectUser],
  (user) => user.countData
);

export const selectUserDescription = createSelector(
  [selectUserInfo],
  (userInfo) => ({
    shortDescription: userInfo?.shortDescription || "",
    briefDescription: userInfo?.briefDescription || "",
  })
);

export const selectInstituteDetails = createSelector(
  [selectUser],
  (user) => user.instituteDetails
);

export const selectCompanyDetails = createSelector(
  [selectUser],
  (user) => user.companyDetails
);

export const CheckPendingRequest = createSelector(
  [selectUser],
  (user) => user.checkPendingRequest
);
