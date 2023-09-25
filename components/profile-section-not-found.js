import { useTranslation } from "react-i18next";

function ProfileSectionNotFound ({sorryTextMessage}){
    const [lang] = useTranslation("language");
  return (
    <div>
      <div className="sorry-text">{lang("COMMON.SORRY_TEXT")}</div>
      <p className="text-center sorry-not-found-message">
        {sorryTextMessage}
      </p>
    </div>
  );
};
export default ProfileSectionNotFound;
