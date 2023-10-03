import React, { useState } from "react";

export const CollapseList = ({ title, items, render, open = true, onAddClick }) => {
    const [isOpen, setIsOpen] = useState(open);

  return (
    <>
      <div
        className="font-14 text-white text-ellipsis d-flex align-item-center cursor-pointer mx-3 py-3 border-top border-geyser"
        onClick={() => setIsOpen(!isOpen)}
      >
        <em
          className={`icon ${
            isOpen ? "icon-down-arrow" : "icon-right-angle-arrow"
          } font-22 ico-icon-black
          `}
        />
        <span className="pt-1 pl-2 text-black font-weight-bold"> {title}</span>
        {title === "Private Channels" && (
          <em
            className="icon icon-plus-primary font-14 pt-2 ml-auto text-black"
            onClick={onAddClick}
          />
        )}
      </div>
      {isOpen && (
        <ul className="listing-section border-first-0">
          {items &&
            items.length > 0 &&
            items.map((item) => render ? render(item) : <span>{item}</span>)
          }
        </ul>
      )}
    </>
  );
};
