import React, { useEffect } from "react";
import Posts from "../dashboard/Posts";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPublishedArticles } from "store/actions/article";
import { selectPublishedArticlesData } from "store/selectors/article";
import { selectUserInfo } from "store/selectors/user";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const ArticlesTabs = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { instituteId, companyId } = router.query;
  const publishedArticles = useSelector(selectPublishedArticlesData);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    getArticlePost();
  }, []);

  const getArticlePost = () => {
    let payload = {
      page: 1,
      pagesize: 10,
      instituteId: instituteId,
      ...(companyId !== undefined &&
        companyId !== null &&
        companyId !== "" && { companyId }),
      postType: "article",
    };
    dispatch(getPublishedArticles(payload));
  };

  return (
    <>
      <Card className="my-4">
        <Card.Body className="border-geyser border-bottom">
          <div className="d-flex justify-content-between align-items-center pb-3">
            <h6 className="mb-0">{lang("GLOBAL_SEARCH.FILTER.ARTICLES")}</h6>
          </div>
          <Posts
            postListData={publishedArticles}
            userInfo={userInfo}
            type="articles"
            getAllPost={getArticlePost}
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default ArticlesTabs;
