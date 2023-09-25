import * as types from "@actions";

/******************* 
@purpose : Intital articles reducer data
@Author : INIC
******************/
const initialState = {
  articleList: {},
  articleData: {},
  publishedArticles: {},
};

/******************* 
@purpose : articles reducer
@Parameter : {article_list, action}
@Author : INIC
******************/
const articles = (article_data = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_ARTICLE_LIST:
      return Object.assign({}, article_data, {
        articleList: action.payload,
      });
    case types.SET_ARTICLE_DATA:
      return Object.assign({}, article_data, {
        articleData: action.payload,
      });
    case types.SET_PUBLISHED_ARTICLE_DATA:
      return Object.assign({}, article_data, {
        publishedArticles: action.payload,
      });
    case types.UPDATE_ARTICLE_LIKE_COUNT:
      let id = action.body.id;
      let updatedCountData = article_data.publishedArticles
      let likeCountData;
      if (id) {
        let postIndex =
          !article_data.publishedArticles.singlePost &&
          article_data.publishedArticles.rows.findIndex((obj) => obj.id === id);
        likeCountData = updatedCountData.rows[postIndex];
        if (likeCountData.reaction === null || action.body.reaction === null) {
          likeCountData.reactionCount =
            action.body.reaction !== null
              ? likeCountData.reactionCount + 1
              : likeCountData.reactionCount - 1;
          likeCountData.reaction = action.body.reaction;
        }
      }

      return Object.assign({}, article_data, {
        publishedArticles: updatedCountData,
      });
    default:
      return article_data;
  }
};

export default articles;
