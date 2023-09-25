import * as types from "@actions";


const initialState = {
  investorRelationsInfo: "",
};
const investorRelations = (investorRelations = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_INVEST_REL_INFO:
      return Object.assign({}, investorRelations, {
        investorRelationsInfo: action.data,
      });
    default:
      return investorRelations;
  }
};

export default investorRelations;
