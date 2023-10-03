import React, { Fragment, useEffect, useState } from "react";
import { getLatestArticles } from "store/actions";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Article } from "components/article";
import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import theme from "config/theme";
import Link from "next/link";
import moment from "moment";

const LatestArticle = () => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const { latestArticles } = useSelector((state) => state.growth);

  useEffect(() => {
    dispatch(getLatestArticles({ page: 1, pagesize: 4, searchText: "" }));
  }, []);

  const handleClick = (id) => {
    router.push(`/article/view/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="mb-4 followed-content-box">
        <Card
          className="rounded-0"
          sx={{ boxShadow: 3 }}
          style={{ height: "auto" }}>
          <CardHeader
            className="d-flex border-radius-0 border-bottom border-geyser py-2"
            title={
              <div className="w-100 d-flex border-0 p-0 overflow-hidden">
                <Typography
                  variant="h6"
                  component="div"
                  className="d-flex mb-0 w-100 text-secondary latest-article-heading">
                  {lang("GROWTH_TOOL.LATEST_ARTILCE")}
                  <Link href="">
                    <span
                      style={{ marginLeft: "auto", cursor: "pointer" }}
                      className="latest-article-view-all">
                      {lang("GROWTH_TOOL.VIEW_ALL")}
                    </span>
                  </Link>
                </Typography>
              </div>
            }
          />

          <CardContent className="px-3 pb-0" style={{ paddingTop: "12px" }}>
            {latestArticles?.length > 0 &&
              latestArticles?.map((article, index) => (
                <div className="list-spacing pb-12" key={index}>
                  <Article
                    id={article?.newsFeedId}
                    redirectLink={`/article/view/${article?.id}`}
                    imgSrc={
                      article?.imageURL ?? "/assets/images/video-Thumbnail.svg"
                    }
                    handleClick={handleClick}
                    name={`${article?.createdBy?.firstName ?? ""} ${
                      article?.createdBy?.lastName ?? ""
                    }`}
                    date={moment(article?.createdAt).format("DD/MM/YY h A")}
                    heading={article?.title}
                    text={article?.subTitle}
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default LatestArticle;
