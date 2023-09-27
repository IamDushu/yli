import fileDropzoneUiStyles from "./file-dropzone.module.scss";
import Image from 'next/image'
export const FileDropzoneUi = ({}) => {
  return (
    <div className={fileDropzoneUiStyles["yliway-filedropzone-ui-container"]}>
      <div>
        <Image
          src="/assets/images/dropzone-icon-post.svg" // The path to your image
          width={202}
          height={202}
        />
      </div>
    </div>
  );
};
