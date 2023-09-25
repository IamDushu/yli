import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
/******************** 
  @purpose : Language Detail
  @Parameter : { }
  @Author : INIC
  ******************/
const LanguageDetail = ({
  data,
  editPopupHandler,
  isSelfProfile,
  isLast,
  viewmode,
  getViewState,
  index,
}) => {
  const { name, proficiency } = data;
  const [lang] = useTranslation("language");
  return (
    <Fragment>
      <li className="d-flex">
        <div className="w-25">
          <span className="text-body-16 d-block">
            {name || data.spokenLanguage}
          </span>
        </div>
        <div className="px-3">
          <small className="text-body-14 text-gray font-weight-normal">
            {proficiency || data.level}
          </small>
        </div>
        {/* removing edit button in Languages */}
        {isSelfProfile && !viewmode && (
          <div className="ml-auto">
            <span
              className="font-18 text-secondary material-icons pointer"
              onClick={() => editPopupHandler(data)}
            >
              border_color
            </span>
          </div>
        )}
      </li>
      {!isLast && (
        <hr
          className={`${
            (!getViewState() && index == 2) ? "mt-3" : "my-3"
          }`}
        />
      )}
    </Fragment>
  );
};

export default React.memo(LanguageDetail);
("");
