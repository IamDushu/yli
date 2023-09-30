import React, { useState } from "react";
import PropTypes from "prop-types";
import searchBarStyles from "./search-bar.module.scss";

export const SearchBar = ({
  handleInput,
  searchLogoUrl,
  placeHolderText,
  handleClick,
  autoComplete,
  onFocus,
}) => {
  const [queryText, setQueryText] = useState("");

  const handleInputChange = (e) => {
    setQueryText(e.target.value);
    handleInput(e.target.value);
  };

  const handleClickEvent = (e) => {
    handleClick(queryText);
  };
  return (
    <>
      <div className={searchBarStyles["main-header-search-bar"]}>
        <input
          className={searchBarStyles["main-header-search-text"]}
          type="text"
          placeholder={placeHolderText}
          value={queryText}
          onChange={handleInputChange}
          autoComplete={autoComplete}
          onFocus={onFocus}
        />
        <img
          className={searchBarStyles["search-icon"]}
          src={searchLogoUrl}
          onClick={handleClickEvent}
        />
      </div>
    </>
  );
};

SearchBar.propTypes = {
  searchLogoUrl: PropTypes.string,
  handleInput: PropTypes.func,
  handleClick: PropTypes.func,
  placeHolderText: PropTypes.string,
  onFocus: PropTypes.func,
  autoComplete: PropTypes.string,
};

SearchBar.defaultProps = {
  searchLogoUrl: "/assets/images/search-icon.svg",
  placeHolderText: "Search Text",
};
