import React from "react"
import { onImageError } from "utils"

const ProfileImage = ({ src, name, size = 32 }) => {

  return (
    <div className={`w-h-${size} position-relative rounded-pill mr-2`}>
      <div className={`w-h-${size} rounded-pill overflow-hidden`}>
        <picture className="w-100 h-100 d-block">
          <source srcSet={src} type="image/jpg" />
          <img
            style={{ display: "none" }}
            onLoad={(e) => {
              e.target.style.display = "block"; 
            }}
            src={src || ""}
            className="img-fluid h-100 w-100"
            alt={"/assets/images/user-noimg.jpg"}
            onError={(e) =>
              onImageError(
                e,
                "profile",
                name?.charAt(0)
              )
            }
          />
        </picture>
      </div>
    </div>
  )
}

export default ProfileImage