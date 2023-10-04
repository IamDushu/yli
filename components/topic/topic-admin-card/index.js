// external packages
import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";

// internal packages
import componentStyle from "./topic-admin-card.module.scss";
import { ProfileImage } from "components/profile-image";
import { YliwayButton } from "components/button";
import { makeFirstLetterCapital } from "utils";
import YliModalUI from "components/yli-modal/ModalUI";
import TopicAdminContactInfo from "../modal-body/topic-admin-contact-info";
import { toggleModals } from "store/actions";

const TopicAdminCard = ({ isPrivate = true }) => {
  const dispatch = useDispatch();
  const { topicAdminContactInfo } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const [lang] = useTranslation("language");
  return (
    <>
      <Card
        sx={{
          borderRadius: 0,
        }}
        className={componentStyle["topic-admin-container"]}
      >
        <CardContent
          sx={{
            width: "839px",
            padding: 0,
          }}
        >
          <div className={componentStyle["card-img"]}>
            <Image
              src={
                "https://d39ubr28bcomsg.cloudfront.net/2023/8/8/sample_bg_image.1691504241074.jpg"
              }
              width={839}
              height={250}
            />
          </div>
          <div className={componentStyle["admin-topic-details"]}>
            {/* topic - title - type - members */}
            <div className={componentStyle["topic-title-type-members"]}>
              <div className={componentStyle["topic-title"]}>Topic Title</div>
              <div className={componentStyle["topic-type-members"]}>
                <div className={componentStyle["topic-type-box"]}>
                  <div className={componentStyle["topic-icons"]}>
                    <Image
                      src={
                        isPrivate
                          ? "/assets/images/topic-img/topic-private-icon.svg"
                          : "/assets/images/topic-img/public-icon.svg"
                      }
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className={componentStyle["topic-type"]}>
                    {isPrivate
                      ? lang("TOPIC.PRIVATE_TOPIC")
                      : lang("TOPIC.PUBLIC_TOPIC")}
                  </div>
                </div>
                <div className={componentStyle["topic-member-count"]}>
                  2 {lang("TOPIC.MEMBERS")}
                </div>
              </div>
            </div>

            {/* topic's admin profileImg, name , currentPosition */}
            <div className={componentStyle["admin-details"]}>
              <div className={componentStyle["admin-details-left"]}>
                <ProfileImage size={48} />
              </div>
              <div className={componentStyle["admin-details-right"]}>
                <div>
                  {" "}
                  <span className={componentStyle["current-position"]}>
                    {lang("COMMON.BY")}
                  </span>{" "}
                  <span className={componentStyle["name"]}>Profile Name</span>
                </div>
                <div className={componentStyle["current-position"]}>
                  {makeFirstLetterCapital("current position")}
                </div>
                <div className={componentStyle["current-position"]}>
                  Rating reviews
                </div>
              </div>
            </div>

            {/* contact info */}
            <div className={componentStyle["contact-info-button"]}>
              <YliwayButton
                primaryOutlined={true}
                label={lang("TOPIC.CONTACT_INFORMATION")}
                fontWeight={500}
                paddingLeft={"24px"}
                paddingRight={"24px"}
                paddingTop={"5px"}
                paddingBottom={"5px"}
                handleClick={() => {
                  dispatch(
                    toggleModals({
                      topicAdminContactInfo: true,
                    })
                  );
                }}
              />
            </div>
          </div>

          <div className={componentStyle["join-box"]}>
            <YliwayButton
              primary
              fontWeight={500}
              size="small"
              label={
                <div className={componentStyle["join-button-content"]}>
                  <div className={componentStyle["topic-icons"]}>
                    <Image
                      src={
                        isPrivate
                          ? "/assets/images/topic-img/request-join-icon.svg"
                          : "/assets/images/topic-img/topic-join-icon.svg"
                      }
                      width={18}
                      height={18}
                    />
                  </div>
                  <div>
                    {isPrivate
                      ? lang("TOPIC.REQUEST_TO_JOIN")
                      : lang("TOPIC.JOIN")}
                  </div>
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>
      <YliModalUI
        keyModal={"topicAdminContactInfo"}
        width="none"
        show={topicAdminContactInfo}
        body={<TopicAdminContactInfo />}
        closeModal={() => {
          dispatch(
            toggleModals({
              topicAdminContactInfo: false,
            })
          );
        }}
        header={<div>{lang("TOPIC.CONTACT_INFORMATION")}</div>}
        headerContentStyle={"yli-model-topic-contact-info"}
      />
    </>
  );
};
export default TopicAdminCard;
