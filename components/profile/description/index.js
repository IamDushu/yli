import React, { useCallback, useState, Fragment } from "react";
import { Card, Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import WithPopup from "../../with-popup/with-popup";
import DescriptionForm from "./description-form";
import { selectUserDescription } from "../../../store/selectors/user";
const ProfileSectionNotFound =  dynamic(()=>import("components/profile-section-not-found"))

/******************** 
  @purpose :Description 
  @Parameter : { }
  @Author : INIC
  ******************/
const Description = ({
  editPopupHandler,
  renderPopup,
  descriptionRef,
  isSelfProfile,
  userDetails,
  viewmode,
  otherUserData,
  profile,
}) => {
  const [lang] = useTranslation("language");
  const [showEntireDescription, setShowEntireDescription] = useState(false);
  const data = isSelfProfile ? useSelector(selectUserDescription) : userDetails;
  let { briefDescription } = data || {};
  briefDescription = briefDescription || "";

  const renderDescriptionForm = (props) => <DescriptionForm {...props} />;
  const editPopUpHandler = useCallback(
    () => editPopupHandler({ briefDescription }),
    [briefDescription]
  );
  const readDescriptionHandler = () =>
    setShowEntireDescription(!showEntireDescription);

  let description =
    briefDescription.length > 350
      ? `${briefDescription.slice(0, 350).trim()}.....`
      : briefDescription;
  return (
    <div>
      {(isSelfProfile ||
        otherUserData?.briefDescription !== null ||
        profile === "otherProfile") && (
        <Card className="mb-3">
          <Card.Body className="p-3">
            <div className={`d-flex ${
                briefDescription.length >= 1
                  ? "justify-content-between"
                  : "justify-content-end"
              } pb-3`}>
              {briefDescription.length >= 1 &&<h6 className="mb-0">{lang("USER_DESCRIPTION.TEXT.DESCRIPTION")}</h6>}
              {isSelfProfile && !viewmode && (
                <>
                 {briefDescription.length >= 1 && (
                    <span
                      className="font-18 d-flex align-items-center text-secondary pointer material-icons"
                      onClick={editPopUpHandler}
                      ref={descriptionRef}
                    >
                      {" "}
                      {/* {lang("USER_DESCRIPTION.TEXT.EDIT")} */}
                      border_color
                    </span>
                  )}
                  {!(briefDescription.length >= 1) && (
                    <span
                      className="material-icons font-24 text-secondary  pointer"
                      onClick={editPopUpHandler}
                      ref={descriptionRef}
                    >
                      add
                    </span>
                  )}
                </>
              )}
            </div>
            <div>
              <span className="text-body-14 font-weight-normal m-0">
                {briefDescription.length < 1 ? (
                  <ProfileSectionNotFound sorryTextMessage={(isSelfProfile)?lang("USER_DESCRIPTION.TEXT.NO_DESCRIPTION"):lang("USER_DESCRIPTION.TEXT.NO_DESCRIPTION_OTHER_PROFILE")}/>
                ) : (
                  <Fragment>
                    <div>
                      {showEntireDescription ? (
                        <p className="mb-0"
                          dangerouslySetInnerHTML={{
                            __html: briefDescription,
                          }}
                        />
                      ) : (
                        <p className="mb-0"
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        />
                      )}

                      {briefDescription.length > 350 && (
                        <a
                          onClick={readDescriptionHandler}
                          className="text-primary font-weight-bold"
                        >
                          {showEntireDescription
                            ? lang("COMMON.READ_LESS")
                            : lang("COMMON.READ_MORE")}
                        </a>
                      )}
                    </div>
                  </Fragment>
                )}
              </span>
            </div>
          </Card.Body>
          {renderPopup(
            briefDescription
              ? lang("USER_DESCRIPTION.POPUP.EDIT_DESCRIPTION")
              : lang("USER_DESCRIPTION.POPUP.ADD_DESCRIPTION"),
            renderDescriptionForm
          )}
        </Card>
      )}
    </div>
  );
};
export default WithPopup(Description);
