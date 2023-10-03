import { Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import articleCardStyles from "./article-card.module.scss";
import { ProfileImage } from "components/profile-image";
import { YliwayButton } from "components/button";
import moment from "moment";
import { makeFirstLetterCapital } from "utils";

export const ArticleCard = ({
  article = {},
  userInfo = {},
  handleEditArticle,
  redirectHandle,
}) => {
  const [lang] = useTranslation("language");
  return (
    <Card sx={{ width: "787px", borderRadius: 0, paddingBottom: "0px" }}>
      <CardContent
        sx={{
          borderRadius: 0,
          padding: "0px",
        }}
      >
        <div className={articleCardStyles["article-card-container"]}>
          <div>
            <img src={article?.imageURL || ""} width="100%" height="346" />
          </div>
        </div>

        <div className={articleCardStyles["article-card-container-main"]}>
          <div
            className={articleCardStyles["article-title"]}
            onClick={redirectHandle}
          >
            {article?.title}
          </div>
          <div
            className={articleCardStyles["article-desc"]}
            onClick={redirectHandle}
          >
            {makeFirstLetterCapital(article?.subTitle)}
          </div>

          <div
            className={articleCardStyles["author-name-image-currentposition"]}
          >
            <div className={articleCardStyles["author-image"]}>
              <ProfileImage
                imageUrl={userInfo?.profilePicURL || ""}
                firstName={userInfo?.firstName || ""}
                lastName={userInfo?.lastName || ""}
                size="40"
              />
            </div>
            <div className={articleCardStyles["author-name-current-position"]}>
              <div className={articleCardStyles["author-name"]}>
                {makeFirstLetterCapital(
                  `${userInfo?.firstName || ""} ${userInfo?.lastName || ""}`
                )}
              </div>
              <div className={articleCardStyles["author-currentposition"]}>
                {makeFirstLetterCapital(userInfo?.currentPosition || "")}
              </div>
            </div>
          </div>

          <div className={articleCardStyles["read-more-time-edit"]}>
            <div className={articleCardStyles["read-more-time"]}>
              <div className={articleCardStyles["time"]}>
                <div className={articleCardStyles["article-card-icons"]}>
                  <Image
                    src="/assets/images/add-post/article-card-clock.svg"
                    width={20}
                    height={20}
                  />
                </div>
                <div>{moment(article?.createdAt).format("D MMM YYYY")}</div>
              </div>
              <div
                className={articleCardStyles["readmore"]}
                onClick={redirectHandle}
              >
                <div
                  style={{
                    borderBottom: "2px solid #6750A4",
                  }}
                >
                  {lang("ARTICLE_CARD.READ_MORE")}
                </div>
                <div className={articleCardStyles["article-card-icons"]}>
                  <Image
                    src="/assets/images/add-post/article-card-forward-arrow.svg"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            <div>
              <YliwayButton
                label="Edit"
                size="medium"
                primary={true}
                fontWeight={500}
                handleClick={() => {
                  handleEditArticle(article);
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
