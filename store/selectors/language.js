import { createSelector } from "reselect";

export const selectLanguage = (state) => state.language;

export const selectLanguageData = createSelector(
  [selectLanguage],
  (language) => language.data
);

