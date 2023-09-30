import React, { useState } from "react";
import PropTypes from "prop-types";
import articleStyles from "./article-styles.module.scss";
import Image from "next/image";
import Link from "next/link";

export const Article = ({
  handleClick,
  imgSrc,
  name,
  date,
  heading,
  text,
  redirectLink = "/",
  id = "",
}) => {
  const maxChars = 41;
  const CapitalisedText = text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div
      className={articleStyles["yliway-container"]}
      onClick={() => handleClick(id)}>
      <Image
        className={articleStyles["yliway-img"]}
        title={heading}
        src={imgSrc}
        width={114}
        height={64}
      />
      <div className={articleStyles["yliway-content-container"]}>
        <span
          className={articleStyles["yliway-name"]}>{`${name} - ${date}`}</span>
        <h5 className={articleStyles["yliway-heading"]}>
          {heading.charAt(0).toUpperCase() + heading.slice(1)}
        </h5>

        <Link href={text.length > maxChars ? redirectLink : ""}>
          <span className={articleStyles["yliway-text"]}>
            {CapitalisedText.length > maxChars
              ? CapitalisedText.slice(0, maxChars) + "...read more"
              : CapitalisedText}
          </span>
        </Link>
      </div>
    </div>
  );
};

Article.propTypes = {
  imgSrc: PropTypes.string,
  handleClick: PropTypes.func,
};
