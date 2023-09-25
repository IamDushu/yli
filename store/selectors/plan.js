import { createSelector } from 'reselect';

export const selectPlans = (state) => state.plans;

export const selectPlansData = createSelector([selectPlans], (plans) => plans.data);
