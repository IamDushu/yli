import { createSelector } from "reselect";

export const selectCertification = (state) => state.certification;

export const selectCertificationData = createSelector(
  [selectCertification],
  (certification) => certification.data
);

