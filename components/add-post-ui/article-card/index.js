import { Card, CardContent } from "@mui/material";
import Image from "next/image";
import articleCardStyles from "./article-card.module.scss";
import { ProfileImage } from "components/profile-image";
import { YliwayButton } from "components/button";
import moment from "moment";

export const ArticleCard = ({
  article = {},
  userInfo = {},
  handleEditArticle,
  redirectHandle,
}) => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: 0 }}>
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
          <div className={articleCardStyles["article-card-container-main"]}>
            <div className={articleCardStyles["title-subtitle"]}>
              <div
                className={articleCardStyles["article-title"]}
                onClick={redirectHandle}
              >
                {article?.title}
              </div>
              <p
                className={articleCardStyles["article-desc"]}
                onClick={redirectHandle}
              >
                {article?.subTitle}
              </p>
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
              <div
                className={articleCardStyles["author-name-current-position"]}
              >
                <div className={articleCardStyles["author-name"]}>
                  {`${userInfo?.firstName || ""} ${userInfo?.lastName || ""}`}
                </div>
                <div>{userInfo?.currentPosition || ""}</div>
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
                    Read More
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
        </div>
      </CardContent>
    </Card>
  );
};
