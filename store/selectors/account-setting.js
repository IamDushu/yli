import { createSelector } from 'reselect';

export const selectAccountSettings = (state) => state.accountSetting;

export const selectUserPreferences = createSelector([selectAccountSettings], (accountInfo) => accountInfo.preferences);
