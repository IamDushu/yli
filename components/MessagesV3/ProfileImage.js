import Image from "next/image";
import React, { useMemo } from "react";
import ProfileImageStyle from "./profileImage.module.scss";
import dynamic from "next/dynamic";
const ProfileImageAvtar = dynamic(() =>
  import("../profile-image").then((mod) => mod.ProfileImage)
);
const ProfileImage = ({ src, name, size = 32, isOnline = false, fontSize = "1.2rem" }) => {
  const [firstName, lastName] = useMemo(() => {
    console.log("name =>",name);
    let firstInitials, secondInitials;
    const nameSplit = name?.split(" ");
    const nameLength = nameSplit?.length;
    if (nameLength > 1) {
      firstInitials = nameSplit[0].substring(0, 1);
      secondInitials = nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
      firstInitials = nameSplit[0].substring(0, 1);
    } else return ["",""];
    return [firstInitials?.toUpperCase(), secondInitials ? secondInitials?.toUpperCase() : ""];
  }, [name]);

  return (
    <div className={`w-h-${size} position-relative rounded-pill mr-2`}>
      <div className={`w-h-${size} rounded-pill overflow-hidden`}>
        <picture className="w-100 h-100 d-block">
          <source srcSet={src} type="image/jpg" />
          <ProfileImageAvtar
            size={size}
            fontSize={fontSize}
            imageUrl={src? src : null}
            firstName={firstName}
            lastName={lastName}
          />
        </picture>
        {isOnline && (
          <div className={[ProfileImageStyle["online-dot"]]}>
            <Image
              className="online-dot"
              src="/assets/images/online_user.svg"
              alt="Online Indicator"
              height={10}
              width={10}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
