import React from "react";
import tabStyles from "./tabs.module.scss";

const Tabs = ({ children, value, onClick }) => {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        value,
      });
    });
  };

  return (
    <div
      className={tabStyles["tabs-container"]}
      onClick={(e) => onClick(e.target.name)}
    >
      {renderChildren()}
    </div>
  );
};

export default Tabs;

export const Tab = ({ tabKey, children, value }) => {
  return (
    <div
      className={`${tabStyles["tab"]} ${
        tabKey === value ? tabStyles["active"] : ""
      }`}
      name={tabKey}
      key={tabKey}
    >
      <button className="tab-button" name={tabKey}>
        {children}
      </button>
    </div>
  );
};
