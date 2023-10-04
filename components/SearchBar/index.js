import React from "react";
import PropTypes from "prop-types";
import searchBarStyles from "./search-bar.module.scss";
import SearchIcon from "../../public/assets/images/search-icon.svg";
import Image from "next/image";

const SearchBar = ({ onChange, placeholder, width }) => {
  const inlineStyles = { width };
  return (
    <div
      className={searchBarStyles["search-bar-wrapper"]}
      style={Object.values(inlineStyles).some((v) => !!v) ? inlineStyles : null}
    >
      <input type="text" onChange={onChange} placeholder={placeholder} />
      <Image src={SearchIcon} alt="Search" height={22} width={22} />
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.string,
};
