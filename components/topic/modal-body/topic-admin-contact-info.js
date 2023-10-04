// External packages
import Image from "next/image";
import { useTranslation } from "react-i18next";

// Internal packages
import { ProfileImage } from "components/profile-image";


const TopicAdminContactInfo = () => {
  const [lang] = useTranslation("language");
  const infoLists = [
    {
      iconName: "/assets/images/topic-img/topic-website-icon.svg",
      label: lang("TOPIC.WEBSITE"),
      value: "google.com",
    },
    {
      iconName: "/assets/images/topic-img/topic-email-icon.svg",
      label: lang("TOPIC.EMAIL"),
      value: "email.com",
    },
    {
      iconName: "/assets/images/topic-img/topic-phone-icon.svg",
      label: lang("TOPIC.PHONE"),
      value: "22366726",
    },
    {
      iconName: "/assets/images/topic-img/topic-location-icon.svg",
      label: lang("TOPIC.ADDRESS"),
      value: "Via Nazionale, Roma, Italy",
    },
  ];

  const socIconLists = [
    "/assets/images/topic-img/linkedin.svg",
    "/assets/images/topic-img/facebook.svg",
    "/assets/images/topic-img/tiktok.svg",
    "/assets/images/topic-img/youtube.svg",
    "/assets/images/topic-img/instagram.svg",
    "/assets/images/topic-img/twitter.svg",
    "/assets/images/topic-img/pinterest.svg",
    "/assets/images/topic-img/messenger.svg",
  ];
  return (
    <div className="topic-contact-info-container">
      <div className="topic-contact-info-sub-container">
        {/* name img current position */}
        <div className="topic-contact-info-name-img-cp">
          <div className="topic-contact-info-img">
            <ProfileImage src="" size={48} />
          </div>
          <div className="topic-contact-info-name-cp">
            <div className="topic-contact-info-name">Profile Name</div>
            <div className="topic-contact-info-cp">Profile Current</div>
          </div>
        </div>
        {infoLists.map((info) => {
          return (
            <div className="contact-info-icon-box">
              <div className="contact-info-icon-box-left">
                <Image src={info.iconName} width={24} height={24} />
              </div>
              <div className="contact-info-icon-box-right">
                <div className="contact-info-icon-label">{info.label}</div>
                <div className="contact-info-icon-content">{info.value}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="contact-info-social-icons-box">
        {socIconLists?.map((icon) => {
          return (
            <div className="contact-info-social-icons">
              <Image src={icon} width={24} height={24} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TopicAdminContactInfo;
