import { ProfileImage } from "components/profile-image";
import mentionUserStyle from "./mention-user.module.scss";
import { makeFirstLetterCapital } from "utils";
export const MentionUserUi = ({ imageUrl = "", userName = "Jacob Johnes",currentPosition, tagName="",isTag=false }) => {
  const firstName = userName?.split(" ")[1] || "";
  const lastName = userName?.split(" ")[0] || "";

  return (
    <div className={mentionUserStyle["mention-user-container"]}>
      {(isTag)?<div className={mentionUserStyle["profile-name"]}>{tagName}</div>:<div className={mentionUserStyle["mention-user-sub-container"]}>
        <div className={mentionUserStyle["profile-img"]}>
          <ProfileImage
            imageUrl={imageUrl}
            size={56}
            firstName={firstName}
            lastName={lastName}
          />
        </div>
        <div className={mentionUserStyle["profile-name-current-position"]}>
          <div className={mentionUserStyle["profile-name"]}>{userName}</div>
          <div className={mentionUserStyle["current-position"]}>
            {makeFirstLetterCapital(currentPosition || "")}
          </div>
        </div>
      </div>}
    </div>
  );
};
