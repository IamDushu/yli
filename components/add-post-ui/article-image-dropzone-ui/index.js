import Image from "next/image";
import articleDropzoneUiStyle from "./article-image-dropzone-ui.module.scss";
export const ArticleImageDropzoneUi = ({
    text="hello world"
}) => {
  return (
    <div className={articleDropzoneUiStyle["dropzone-container"]}>
      <div className={articleDropzoneUiStyle["dropzone-container-nest-1"]}>
        <div className={articleDropzoneUiStyle["dropzone-icon"]}>
          <Image
            src="/assets/images/add-post/image-dropzone-article.svg"
            width={37.5}
            height={37.5}
          />
        </div>
        <div className={articleDropzoneUiStyle["dropzone-size-text"]}>
            {text}
        </div>
      </div>
    </div>
  );
};
