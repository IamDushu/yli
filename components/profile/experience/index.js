import React, { Fragment, useCallback, useState } from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import WithPopup from "../../with-popup/with-popup";
import ExperienceForm from "./experience-form";
import ExperienceDetail from "./experience-detail";
/******************** 
  @purpose : Experience Listing
  @Parameter : { }
  @Author : INIC
  ******************/
const Experience = ({
  openPopupHandler,
  editPopupHandler,
  renderPopup,
  popupInfo,
  experienceRef,
  isSelfProfile,
  experienceInfo,
  viewmode,

  profile,
  experienceList,
}) => {
  const [lang] = useTranslation("language");
  const [viewAll, setViewAll] = useState(false);
  const data = experienceList;
  const editPopUpHandler = useCallback(editPopupHandler, []);
  let numberOfExperience = viewAll ? data?.count : 3;
  const renderExperienceForm = (props) => (
    <ExperienceForm {...props} isSelfProfile={isSelfProfile} />
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
                {lang("EXPERIENCE.TEXT.EXPERIENCE")}
              </h6>
              {isSelfProfile && !viewmode && (
                <div
                  variant="outline-info py-12 px-4 d-flex align-items-center border-0"
                  onClick={openPopupHandler}
                  ref={experienceRef}
                >
                  <span className="material-icons font-24 text-secondary  pointer">
                    add
                  </span>
                </div>
              )}
            </div>
            {data?.rows && data?.rows?.length > 0 ? (
              data?.rows
                ?.slice(0)
                ?.reverse()
                ?.slice(0, numberOfExperience)
                ?.map((item, idx) => (
                  <ExperienceDetail
                    key={item.id}
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
                  {lang("EXPERIENCE.TEXT.NO_EXPERIENCE")}
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
              ? lang("EXPERIENCE.POPUP.EDIT_EXPERIENCE")
              : lang("EXPERIENCE.POPUP.ADD_EXPERIENCE"),
            renderExperienceForm
          )}
        </Card>
      )}
    </Fragment>
  );
};
export default WithPopup(Experience);
