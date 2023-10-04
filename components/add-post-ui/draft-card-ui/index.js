import moment from "moment";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import draftCardUiStyle from "./draft-card-ui.module.scss";
import Image from "next/image";
import { makeFirstLetterCapital } from "utils";
export const DraftCardUi = ({
  article,
  handleEdit,
  handleDelete,
  isFromDeleted = false,
  lastIndex,
  index,
  undeleteHandler,
}) => {
  const [lang] = useTranslation("language");
  const containerStyle = [draftCardUiStyle["draft-card-ui-container"]]
  if(lastIndex==0){
    containerStyle.push(draftCardUiStyle["border-top-divider"])
    containerStyle.push(draftCardUiStyle["border-bottom-divider"])
  }
  else{
    if(index==0){
      containerStyle.push(draftCardUiStyle["border-top-divider"])
      containerStyle.push(draftCardUiStyle["border-bottom-divider"])
    }
    else{
      containerStyle.push(draftCardUiStyle["border-bottom-divider"])
    }
  }
  return (
    <div className={(containerStyle).join(" ")}>
      <div>
        <div className={draftCardUiStyle["created-on-block"]}>
          <div className={draftCardUiStyle["created-on-label"]}>
            {isFromDeleted ? lang("ARTICLE_CARD.DELETED_ON") : lang("ARTICLE_CARD.CREATED_ON")}
          </div>
          <div className={draftCardUiStyle["created-on-value"]}>
            {isFromDeleted
              ? moment(article?.updatedAt).format("D MMM YYYY")
              : moment(article?.createdAt).format("D MMM YYYY")}
          </div>
        </div>
      </div>

      <div className={draftCardUiStyle["right-block"]}>
        <div className={draftCardUiStyle["article-img"]}>
          <Image src={article?.imageURL || ""} width={95.14} height={54} />
        </div>
        <div>
          <div className={draftCardUiStyle["article-subtitle-block"]}>
            <div className={draftCardUiStyle["article-title"]}>
              {makeFirstLetterCapital(article?.title || "")}
            </div>
            <div className={draftCardUiStyle["article-subtitle"]}>
              {makeFirstLetterCapital(article?.subTitle || "")}
            </div>
          </div>
          <div className={draftCardUiStyle["right-article-footer"]}>
            {isFromDeleted ? (
              <>
                <div
                  className={draftCardUiStyle["article-footer-action"]}
                  onClick={undeleteHandler}
                >
                  <div className={draftCardUiStyle["icon-style"]}>
                    <Image
                      src="/assets/images/add-post/deleted-article-upload-icon.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className={draftCardUiStyle["edit-text"]}>
                    {lang("ARTICLE_CARD.MOVE_TO_DRAFT")}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={draftCardUiStyle["article-footer-action"]}>
                  <div className={draftCardUiStyle["icon-style"]}>
                    <Image
                      src="/assets/images/add-post/draft-article-edit-icon.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div
                    className={draftCardUiStyle["edit-text"]}
                    onClick={handleEdit}
                  >
                    {lang("COMMON.EDIT")}
                  </div>
                </div>
                <div className={draftCardUiStyle["article-footer-action"]}>
                  <div className={draftCardUiStyle["icon-style"]}>
                    <Image
                      src="/assets/images/add-post/draft-article-delete-icon.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div
                    className={draftCardUiStyle["delete-text"]}
                    onClick={() => {
                      // POP FOR DELETION
                      Swal.fire({
                        html: `
                          <div style="font-size: 22px; font-weight: 400; line-height: 28px; letter-spacing: 0em; text-align: center; color: #001551;">
                            ${lang("ARTICLE_CARD.DELETE_ARTICLE")}
                          </div>
                          <div style="font-size: 14px; text-align: center; color: #001551;">
                          ${lang("ARTICLE_CARD.DELETE_WARNING")}
                          </div>`,
                        imageUrl: "/assets/images/warning-modal-icon.svg",
                        imageWidth: 60,
                        imageHeight: 60,
                        showDenyButton: true,
                        confirmButtonText: lang("COMMON.CONFIRM"),
                        denyButtonText: lang("COMMON.BACK"),
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete();
                        }
                      });
                    }}
                  >
                    {lang("COMMON.DELETE")}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
