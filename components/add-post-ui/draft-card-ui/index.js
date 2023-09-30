import moment from "moment";
import draftCardUiStyle from "./draft-card-ui.module.scss";
import Image from "next/image";
export const DraftCardUi = ({
  article,
  handleEdit,
  handleDelete,
  isFromDeleted = false,
}) => {
  return (
    <div className={draftCardUiStyle["draft-card-ui-container"]}>
      <div>
        <div className={draftCardUiStyle["created-on-block"]}>
          <div className={draftCardUiStyle["created-on-label"]}>
            {isFromDeleted ? "Deleted on" : "Created on"}
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
              {article?.title}
            </div>
            <div className={draftCardUiStyle["article-subtitle"]}>
              {article?.subTitle}
            </div>
          </div>
          <div className={draftCardUiStyle["right-article-footer"]}>
            {isFromDeleted ? (
              <>
                <div className={draftCardUiStyle["article-footer-action"]}>
                  <div className={draftCardUiStyle["icon-style"]}>
                    <Image
                      src="/assets/images/add-post/deleted-article-upload-icon.svg"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className={draftCardUiStyle["edit-text"]}>
                    Move to Drafts
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
                    Edit
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
                    onClick={handleDelete}
                  >
                    Delete
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
