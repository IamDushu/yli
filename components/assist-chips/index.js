import PropTypes from "prop-types";
import assistChipsStyle from "./assist-chips.module.scss";

export const AssistChips = ({
  backgroundColor = "white",
  color = "#6750A4",
  border = "1px solid #6750A4",
  iconName = "",
  paddingX = "8px",
  paddingY = "6px",
  handleClick,
  label,
  arrow = "",
}) => {
  const iconLink = {};

  const style = {
    border,
    backgroundColor,
    color,
    paddingBottom: paddingY,
    paddingTop: paddingY,
    paddingLeft: paddingX,
    paddingRight: paddingX,
  };

  const arrowStyle = {
    display: "flex",
    alignItems: "center",
  };

  const styleClassArray = [assistChipsStyle["yliway-assist-chips"]];

  return (
    <div style={style} className={styleClassArray.join(" ")}>
      <div>{iconLink[iconName]}</div>
      <div>{label}</div>
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
