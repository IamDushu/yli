import React, { Fragment, useCallback, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import WithPopup from "../../with-popup/with-popup";
import LanguageForm from "./language-form";
import LanguageDetail from "./language-detail";
import { selectLanguageData } from "../../../store/selectors/language";
/******************** 
  @purpose : Language Listing
  @Parameter : { }
  @Author : INIC
  ******************/
const Languages = ({
  openPopupHandler,
  editPopupHandler,
  renderPopup,
  popupInfo,
  languageRef,
  isSelfProfile,
  languageInfo,
  viewmode,
  otherUserData,
  profile,
}) => {
  const [lang] = useTranslation("language");
  const [viewAll, setViewAll] = useState(false);
  const data = isSelfProfile ? useSelector(selectLanguageData) : languageInfo;
  const editPopUpHandler = useCallback(editPopupHandler, []);
  const renderLanguageForm = (props) => <LanguageForm {...props} />;
  let numberOfLang = viewAll ? data?.length : 3;
  const getViewState=()=>{
    return viewAll;
  }
  return (
    <Fragment>
      {(isSelfProfile ||
        otherUserData?.languageSkills?.length > 0 ||
        profile === "otherProfile") && (
        <Card className="mb-3">
          <Card.Body className="p-3">
            <div
              className={`d-flex justify-content-between align-items-center ${
                data && data.length > 0 ? "pb-3" : "pb-3"
              }`}
            >
              <h6 className="mb-sm-0 mb-0">
                {lang("LANGUAGE.TEXT.LANGUAGES")}
              </h6>
              {isSelfProfile && !viewmode && (
                <div
                  variant="outline-info py-12 px-4 d-flex align-items-center border-0"
                  onClick={openPopupHandler}
                  ref={languageRef}
                >
                  {/* <em className="icon icon-plus-primary font-14 pr-2"></em> */}
                  <span className="material-icons font-24 text-secondary  pointer">
                    add
                  </span>
                  {/* {lang("COMMON.ADD_MORE")} */}
                </div>
              )}
            </div>
            {data && data.length > 0 ? (
              <div className="d-flex justify-content-between">
                <ul className="list-unstyled w-100">
                  {data
                    .slice(0)
                    .reverse()
                    .slice(0, numberOfLang)
                    .map((item, idx) => (
                      <LanguageDetail
                        key={item.id}
                        // isFirst={idx === 0}
                        index = {idx}
                        isLast={idx + 1 === data.length}
                        data={item}
                        isSelfProfile={isSelfProfile}
                        editPopupHandler={editPopUpHandler}
                        viewmode={viewmode}
                        getViewState={getViewState}
                      />
                    ))}
                </ul>
              </div>
            ) : (
              <div className="desc pr-xl-5 mr-xl-2">
                <p className="text-body-14 font-weight-normal m-0">
                  {lang("LANGUAGE.TEXT.NO_LANGUAGE_FOUND")}
                </p>
              </div>
            )}
            {data && data?.length > 3 && (
              <div
                className={`cursor-pointer text-body-14 text-center load-more-color ${
                  viewAll ? "border-geyser border-top py-12" : ""
                }`}
                style={{ color: "#0f6bbf" }}
                onClick={() => setViewAll(!viewAll)}
              >
                {viewAll ? lang("COMMON.VIEW_LESS") : lang("COMMON.VIEW_MORE")}
              </div>
            )}
          </Card.Body>
          {renderPopup(
            popupInfo.isEdit
              ? lang("LANGUAGE.POPUP.EDIT_LANGUAGE")
              : lang("LANGUAGE.POPUP.ADD_LANGUAGE"),
            renderLanguageForm
          )}
        </Card>
      )}
    </Fragment>
  );
};
export default WithPopup(Languages);
