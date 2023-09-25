import React from "react";
import PropTypes from "prop-types";
import iconButtonCss from "./icon-button.module.scss";

export const IconButton = ({
  size = "regular",
  iconName = "postPhoto",
  circular = true,
  title,
  handleClick,
}) => {
  /*
 icon links based on icon name
 */
  const iconLinks = {
    postPhoto: "assets/images/post-type-icons/post-image.svg",
    postVideo: "assets/images/post-type-icons/post-video.svg",
    postPoll: "assets/images/post-type-icons/post-poll.svg",
    postArticle: "assets/images/post-type-icons/post-article.svg",
  };

  /*
  className generation
  */
  const classArray = [iconButtonCss["yliway-icon-button"]];

  if (circular)
    classArray.push(iconButtonCss["yliway-icon-button-circular"]);
  classArray.push(iconButtonCss[`yliway-icon-button-${size}`]);

  return (
    <div className={classArray.join(" ")} onClick={handleClick} data-toggle="tooltip" title={title}>
      <div>
        <img src={iconLinks[iconName]} />
      </div>
    </div>
  );
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  circular: PropTypes.bool,
  size: PropTypes.string,
  title:PropTypes.string
};

