import * as types from "@actions";

/******************* 
@purpose : Intital faq reducer data
@Author : INIC
******************/
const initialState = {
  skillArea: [],
  skillType: [],
  skillUserList: [],
  skillList: [],
  userHardSkillList: [],
  userSoftSkillList: [],
  userMindsetSkillList: [],
  skillDataHardS: [],
  skillDataMidset: [],
  skillDataSoftS: [],
  skillDataTraction: [],
  skillDataSupport: [],
  skillDataDistribution: [],
  skillTypeSoftSkills: [],
  skillTypeHardSkills: [],
  skillTypeTraction: [],
  skillTypeMindset: [],
  skillTypeDistribution: [],
  skillTypeSupport: [],
  softSkillData: [],
  hardSkillData: [],
  tractionData: [],
  mindsetData: [],
  distributionData: [],
  supportData: [],
  requestSkillList: [],
  endorseList: [],
};

/******************* 
@purpose : faq reducer
@Parameter : {faq_ini_data, action}
@Author : INIC
******************/
const skillReducer = (skills_ini_data = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_SKILL_AREA:
      return Object.assign({}, skills_ini_data, {
        skillArea: action.data,
      });
    case types.SET_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillType: action.data,
      });
    case types.SET_SOFTSKILL_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeSoftSkills: action.data,
      });
    case types.SET_HARDSKILL_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeHardSkills: action.data,
      });
    case types.SET_TRACTIONSKILL_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeTraction: action.data,
      });
    case types.SET_MINDSETSKILL_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeMindset: action.data,
      });
    case types.SET_DISTRIBUTIONSKILL_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeDistribution: action.data,
      });
    case types.SET_SUPPORTSKILL_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeSupport: action.data,
      });
    case types.CLEAR_SKILL_TYPE:
      return Object.assign({}, skills_ini_data, {
        skillTypeSoftSkills: [],
        skillTypeHardSkills: [],
        skillTypeTraction: [],
        skillTypeMindset: [],
        skillTypeDistribution: [],
        skillTypeSupport: [],
      });
    case types.SET_SKILL_USERLIST:
      return Object.assign({}, skills_ini_data, {
        skillUserList: action.data,
      });
    case types.SKILLS_LIST:
      return Object.assign({}, skills_ini_data, {
        skillList: action.data,
      });
    case types.SKILLS_USER_LIST:
      return Object.assign({}, skills_ini_data, {
        requestSkillList: action.data,
      });
    case types.USER_HARD_SKILL_LIST:
      return Object.assign({}, skills_ini_data, {
        userHardSkillList: action.data,
      });

    case types.USER_SOFT_SKILL_LIST:
      return Object.assign({}, skills_ini_data, {
        userSoftSkillList: action.data,
      });

    case types.USER_MINDSET_SKILL_LIST:
      return Object.assign({}, skills_ini_data, {
        userMindsetSkillList: action.data,
      });

    case types.SKILLS_ENDORSE_LIST:
      return Object.assign({}, skills_ini_data, {
        endorseList: action.data,
      });
    case types.ACTIVITY_LIST_DATA:
      return Object.assign({}, skills_ini_data, {
        skillActivityList: action.data,
      });
    case types.ACTIVITY_LIST_DATA_UPDATE:
      return Object.assign({}, skills_ini_data, {
        skillActivityList: {
          virtualEvenDetails: {
            rows: [
              ...skills_ini_data?.skillActivityList?.virtualEvenDetails?.rows,
              ...action.data?.virtualEvenDetails?.rows,
            ],
            total: action.data?.virtualEvenDetails?.total,
            page: action.data?.virtualEvenDetails?.page,
            perPage: action.data?.virtualEvenDetails?.perPage,
          },
          courseDetails: {
            rows: [
              ...skills_ini_data?.skillActivityList?.courseDetails?.rows,
              ...action.data?.courseDetails?.rows,
            ],
            total: action.data?.courseDetails?.total,
            page: action.data?.courseDetails?.page,
            perPage: action.data?.courseDetails?.perPage,
          },
        },
      });
    // ACTIVITY TYPE REDUCERS
    case types.HARD_SKILL_LIST:
      return Object.assign({}, skills_ini_data, {
        hardSkillData: action.data,
      });
    case types.SOFT_SKILL_LIST:
      return Object.assign({}, skills_ini_data, {
        softSkillData: action.data,
      });
    case types.MINDSET_LIST:
      return Object.assign({}, skills_ini_data, {
        mindsetData: action.data,
      });
    case types.TRACTION_LIST:
      return Object.assign({}, skills_ini_data, {
        tractionData: action.data,
      });
    case types.DISTRIBUTION_LIST:
      return Object.assign({}, skills_ini_data, {
        distributionData: action.data,
      });
    case types.SUPPORT_LIST:
      return Object.assign({}, skills_ini_data, {
        supportData: action.data,
      });
    // CLEAR ACTIVITY REDUCER
    case types.SET_BLOCK_PAYLOAD_DETAILS_CLEAR: {
      return Object.assign({}, skills_ini_data, {
        softSkillData: [],
        hardSkillData: [],
        tractionData: [],
        mindsetData: [],
        distributionData: [],
        supportData: [],
      });
    }

    case types.CLEAR_SKILL_DATA: {
      return Object.assign({}, skills_ini_data, {
        skillDataHardS: [],
        skillDataSoftS: [],
        skillDataMidset: [],
        skillDataTraction: [],
        skillDataDistribution: [],
        skillDataSupport: [],
      });
    }
    case types.SKILL_DATA_STOREM:
      return Object.assign({}, skills_ini_data, {
        skillDataMidset: action.data,
      });
    case types.SKILL_DATA_STORESS:
      return Object.assign({}, skills_ini_data, {
        skillDataSoftS: action.data,
      });
    case types.SKILL_DATA_STORET:
      return Object.assign({}, skills_ini_data, {
        skillDataTraction: action.data,
      });
    case types.SKILL_DATA_STOREHS:
      return Object.assign({}, skills_ini_data, {
        skillDataHardS: action.data,
      });
    case types.SKILL_DATA_STOREDist:
      return Object.assign({}, skills_ini_data, {
        skillDataDistribution: action.data,
      });
    case types.SKILL_DATA_STORESupp:
      return Object.assign({}, skills_ini_data, {
        skillDataSupport: action.data,
      });

    default:
      return skills_ini_data;
  }
};

export default skillReducer;
