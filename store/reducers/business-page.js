import * as types from "@actions";

/******************* 
@purpose : Intital Groups reducer data
@Author : INIC
******************/
const initialState = {
  getTopicList: [],
};

const businessPage = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_TOPIC: {
      const topicList = [];
      action.payload?.map((data) => {
        topicList.push({
          label: data.title,
          value: data.title,
        });
      });
      return {
        ...state,
        getTopicList: topicList,
      };
    }
    default:
      return state;
  }
};

export default businessPage;
