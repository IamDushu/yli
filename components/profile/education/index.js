import React, { Fragment, useCallback, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import WithPopup from "../../with-popup/with-popup";
import EducationForm from "./education-form";
import EducationDetail from "./education-detail";
/******************** 
  @purpose :Education Listing
  @Parameter : { }
  @Author : INIC
  ******************/
const Education = ({
  openPopupHandler,
  editPopupHandler,
  renderPopup,
  popupInfo,
  educationRef,
  isSelfProfile,
  educationList,
  viewmode,
  otherUserData,
  profile,
}) => {
  const [lang] = useTranslation("language");
  const [viewAll, setViewAll] = useState(false);
  const data = educationList;
  const editPopUpHandler = useCallback(editPopupHandler, []);
  let numberOfEducation = viewAll ? data.length : 3;
  const renderEducationForm = (props) => (
    <EducationForm {...props} isSelfProfile={isSelfProfile} />
  );
  return (
    <Fragment>
      {(isSelfProfile ||
        data?.rows?.length > 0 ||
        profile === "otherProfile") && (
        <Card className="mb-3">
          <Card.Body className="p-3">
            <div
              className={`d-flex align-items-center justify-content-between ${
                data && data.length > 0 ? "pb-3" : "pb-3"
              }`}
            >
              <h6 className="mb-sm-0 mb-0">
                {lang("EDUCATION.TEXT.EDUCATION")}
              </h6>
              {isSelfProfile && !viewmode && (
                <div
                  variant="outline-info py-12 px-4 d-flex align-items-center border-0"
                  onClick={openPopupHandler}
                  ref={educationRef}
                >
                  {/* <em className="icon icon-plus-primary font-14 pr-2"></em> */}
                  <span className="material-icons font-24 text-secondary  pointer">
                    add
                  </span>
                  {/* {lang("COMMON.ADD_MORE")} */}
                </div>
              )}
            </div>
            {data?.rows && data?.rows?.length > 0 ? (
              data?.rows
                ?.slice(0)
                ?.reverse()
                ?.slice(0, numberOfEducation)
                ?.map((item, idx) => (
                  <EducationDetail
                    key={item.id}
                    // isFirst={item.id}
                    isLast={idx + 1 === data.length}
                    data={item}
                    isSelfProfile={isSelfProfile}
                    editPopupHandler={editPopUpHandler}
                    viewmode={viewmode}
                  />
                ))
            ) : (
              <div className="desc pr-xl-5 mr-xl-2">
                <p className="text-body-14 font-weight-normal m-0">
                  {lang("EDUCATION.TEXT.NO_EDUCATION")}
                </p>
              </div>
            )}
          </Card.Body>

          {data && data?.count > 3 && (
            <span
              className="cursor-pointer text-body-14 py-2 text-center load-more-color border-geyser border-top"
              style={{ color: "#0f6bbf" }}
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? lang("COMMON.VIEW_LESS") : lang("COMMON.VIEW_MORE")}
            </span>
          )}

          {renderPopup(
            popupInfo.isEdit
              ? lang("EDUCATION.TEXT.EDIT_EDUCATION")
              : lang("EDUCATION.TEXT.ADD_EDUCATION"),
            renderEducationForm
          )}
        </Card>
      )}
    </Fragment>
  );
};
export default WithPopup(Education);
