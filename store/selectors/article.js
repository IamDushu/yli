import { createSelector } from "reselect";

export const selectArticleData = (state) => state.articles;

export const selectArticlesData = createSelector(
  [selectArticleData],
  (result) => result.articleList
);

export const selectGetArticleData = createSelector(
  [selectArticleData],
  (result) => result.articleData
);

export const selectPublishedArticlesData = createSelector(
  [selectArticleData],
  (result) => result.publishedArticles
);
