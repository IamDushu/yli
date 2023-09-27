import React, { useState } from "react";
import PropTypes from "prop-types";
import articleStyles from "./article-styles.module.scss";
import Image from "next/image";

export const Article = ({ handleClick, imgSrc, name, date, heading, text }) => {
  const maxChars = 70;
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className={articleStyles["yliway-container"]}>
      <Image
        className={articleStyles["yliway-img"]}
        onClick={handleClick}
        src={imgSrc}
        width={114}
        height={64}
      />
      <div className={articleStyles["yliway-content-container"]}>
        <span
          className={articleStyles["yliway-name"]}>{`${name} - ${date}`}</span>
        <h5 className={articleStyles["yliway-heading"]}>{heading}</h5>
        <span className={articleStyles["yliway-text"]}>
          {showFullText ? text : text.slice(0, maxChars)}
          {!showFullText && text.length > maxChars && (
            <span
              className={`${articleStyles["yliway-text"]} ${articleStyles["yliway-pointer"]}`}
              onClick={toggleShowFullText}>
              ...read more
            </span>
          )}
          {showFullText && (
            <span
              className={`${articleStyles["yliway-text"]} ${articleStyles["yliway-pointer"]}`}
              onClick={toggleShowFullText}>
              ...read less
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

Article.propTypes = {
  imgSrc: PropTypes.string,
  handleClick: PropTypes.func,
};
