import PropTypes from "prop-types";
import assistChipsStyle from "./assist-chips.module.scss";

export const AssistChips = ({
  backgroundColor = "white",
  color = "#48464A",
  border = "1px solid #6750A4",
  iconName = "",
  paddingX = "8px",
  paddingY = "6px",
  fontWeight="600",
  fontSize="14px",
  handleClick,
  label,
  arrow = "",
  tooltip="",
}) => {
  const iconLink = {
    addQuestionIcon:"assets/images/add-post/add-poll-question-icon.svg",
    postPhoto: "assets/images/post-type-icons/post-image.svg",
    postVideo: "assets/images/post-type-icons/post-video.svg",
    postPoll: "assets/images/post-type-icons/post-poll.svg",
    postArticle: "assets/images/post-type-icons/post-article.svg",
  };

  const style = {
    border,
    backgroundColor,
    color,
    paddingBottom: paddingY,
    paddingTop: paddingY,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    fontWeight,
    fontSize
  };

  const arrowStyle = {
    display: "flex",
    alignItems: "center",
  };

  const styleClassArray = [assistChipsStyle["yliway-assist-chips"]];

  return (
    <div style={style} className={styleClassArray.join(" ")} onClick={handleClick} data-toggle="tooltip" title={tooltip}>
      {iconName ? (
        <div className={assistChipsStyle["yliway-assist-chips-icon"]}>
          <img src={iconLink[iconName]} />
        </div>
      ) : (
        <></>
      )}
      <div className={assistChipsStyle["yliway-assist-chips-label"]}>{label}</div>
      {arrow ? (
        <div style={arrowStyle}>
          <img src={arrow} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

AssistChips.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * Chips contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  handleClick: PropTypes.func,
  /* iconName type */
  iconName: PropTypes.string,

  /* arrow type */
  arrow: PropTypes.string,
};
