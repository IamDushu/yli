import React, { useCallback, useState, Fragment } from "react";
import { Card, Form } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import WithPopup from "../../with-popup/with-popup";
import { selectUserDescription } from "../../../store/selectors/user";
import ShortDescriptionForm from "./shortDescription-form";
const ProfileSectionNotFound = dynamic(() =>
  import("components/profile-section-not-found")
);
/******************** 
  @purpose :Short Description
  @Parameter : { }
  @Author : INIC
  ******************/
const ShortDescription = ({
  editPopupHandler,
  renderPopup,
  shortDescriptionRef,
  isSelfProfile,
  userDetails,
  viewmode,
  otherUserData,
  profile,
}) => {
  const [lang] = useTranslation("language");

  const data = isSelfProfile ? useSelector(selectUserDescription) : userDetails;
  let { shortDescription } = data || {};
  shortDescription = shortDescription || "";

  const renderDescriptionForm = (props) => <ShortDescriptionForm {...props} />;
  const editPopUpHandler = useCallback(
    () => editPopupHandler({ shortDescription }),
    [shortDescription]
  );

  return (
    <Fragment className="mt-0">
      {(isSelfProfile ||
        otherUserData.shortDescription !== null ||
        profile === "otherProfile") && (
        <Card className="mb-3">
          <Card.Body className="p-3">
            <div
              className={`d-flex ${
                shortDescription.length >= 1
                  ? "justify-content-between"
                  : "justify-content-end"
              } pb-3`}
            >
              {shortDescription.length >= 1 && (
                <h3 className="font-18 m-0 font-weight-bold">
                  {lang("USER_DESCRIPTION.TEXT.SHORT_DESCRIPTION")}
                </h3>
              )}
              {isSelfProfile && !viewmode && (
                <>
                  {shortDescription.length >= 1 && (
                    <span
                      className="font-18 d-flex align-items-center text-secondary pointer material-icons"
                      onClick={editPopUpHandler}
                      ref={shortDescriptionRef}
                    >
                      {" "}
                      {/* {lang("USER_DESCRIPTION.TEXT.EDIT")} */}
                      border_color
                    </span>
                  )}
                  {!(shortDescription.length >= 1) && (
                    <span
                      className="material-icons font-24 text-secondary  pointer"
                      onClick={editPopUpHandler}
                      ref={shortDescriptionRef}
                    >
                      add
                    </span>
                  )}
                </>
              )}
            </div>
            <div>
              <span className="text-body-14 font-weight-normal m-0">
                {shortDescription.length < 1 ? (
                  <ProfileSectionNotFound
                    sorryTextMessage={
                      isSelfProfile
                        ? lang("USER_DESCRIPTION.TEXT.NO_SHORT_DESCRIPTION")
                        : lang(
                            "USER_DESCRIPTION.TEXT.NO_SHORT_DESCRIPTION_OTHER_PROFILE"
                          )
                    }
                  />
                ) : (
                  <Fragment>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: shortDescription,
                      }}
                    />
                  </Fragment>
                )}
              </span>
            </div>
          </Card.Body>
          {renderPopup(
            shortDescription
              ? lang("USER_DESCRIPTION.POPUP.EDIT_OVERVIEW")
              : lang("USER_DESCRIPTION.POPUP.ADD_OVERVIEW"),
            renderDescriptionForm
          )}
        </Card>
      )}
    </Fragment>
  );
};
export default WithPopup(ShortDescription);
