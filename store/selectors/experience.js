import { createSelector } from "reselect";

export const selectExperience = (state) => state.experience;

export const selectExperienceData = createSelector(
  [selectExperience],
  (experience) => experience.data
);

