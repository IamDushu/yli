import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { onImageError } from "utils";
import { Button, Dropdown, Form } from "react-bootstrap";
import { APP_URL } from "config";
import { useDispatch, useSelector } from "react-redux";
import { addPost, toggleModal } from "store/actions";
import { LinkPreviewGenerator } from "components/ui/link-preview";
import { selectUserInfo } from "store/selectors/user";

function ManageShare({ manageData, roomId, courseId, type }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [shareData, setShareData] = useState({
    status: true,
    description:
      type === "certificate"
        ? `${manageData?.userDetails?.firstName} ${
            manageData?.userDetails?.lastName
          } got ${
            manageData?.courseDetails?.certificateTitle
              ? manageData?.courseDetails?.certificateTitle
              : "this"
          } certificate.`
        : `${userInfo?.firstName} ${userInfo?.lastName} is following this ${
            roomId !== undefined ? "room" : "course"
          } of ${
            manageData?.instituteDetails?.name
              ? manageData?.instituteDetails?.name
              : manageData?.UserDetails?.firstName +
                " " +
                manageData?.UserDetails?.lastName
          } 
        `,
    imageURL: null,
    privacy: "Anyone",
    postType: `${roomId !== undefined ? "virtualShare" : "courseShare"}`,
    whoCanComment: "Anyone",
    virtualEventId: roomId,
    courseId: courseId,
    eventExternalLink: `${APP_URL}${
      type === "certificate"
        ? "/certificate/" + manageData?.certificateDetails?.certificateNumber
        : roomId !== undefined
        ? "/virtual-events/" + roomId + "/false"
        : "/course-detail/" + courseId
    }`,
  });

  const selectUserMode = (e) => {
    setShareData({ ...shareData, privacy: e });
  };

  const selectCommentMode = (e) => {
    setShareData({ ...shareData, whoCanComment: e });
  };

  const shareHandler = () => {
    dispatch(addPost(shareData)).then(() => {
      dispatch(toggleModal(false, "manageShare"));
    });
  };

  return (
    <div>
      <div className="modal-body">
        {/* <PerfectScrollbar> */}
        <div className="body">
          <div className="d-flex align-items-center">
            <div className="mr-sm-1 w-h-50 flex-shrink-0 rounded-pill overflow-hidden">
              <picture
                className="user-profile-pic rounded-pill h-100 d-flex"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source
                  srcSet={
                    type === "certificate"
                      ? manageData?.userDetails?.profilePicURL
                      : userInfo?.profilePicURL
                  }
                  type="image/jpg"
                />
                <img
                  src={
                    type === "certificate"
                      ? manageData?.userDetails?.profilePicURL
                      : userInfo?.profilePicURL
                  }
                  onError={(e) => {
                    onImageError(
                      e,
                      "profile",
                      `${
                        type === "certificate"
                          ? manageData?.userDetails?.firstName +
                            " " +
                            manageData?.userDetails?.lastName
                          : userInfo?.firstName + " " + userInfo?.lastName
                      }`
                    );
                  }}
                  width="50"
                  height="50"
                />
              </picture>
            </div>
            <div className="ml-3">
              <div className="mb-3 algin-items-center">
                <span className="font-weight-semibold">
                  {type === "certificate"
                    ? `${manageData?.userDetails?.firstName} ${manageData?.userDetails?.lastName}`
                    : `${userInfo?.firstName} ${userInfo?.lastName} `}
                </span>
              </div>
              <div></div>
              <div className="reaction-icons-sections">
                <div className="py-1 reaction-icons-box d-flex align-items-center border rounded-8 border-geyser mr-3">
                  <em className="icon icon-web pr-2 text-charcoal-grey"></em>
                  <h5 className="font-14 mb-0">{shareData?.privacy}</h5>
                  <Dropdown
                    className="theme-dropdown ml-2"
                    onSelect={selectUserMode}
                  >
                    <Dropdown.Toggle>
                      <em className="icon icon-down-arrow text-charcoal-grey"></em>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Anyone">Anyone</Dropdown.Item>
                      <Dropdown.Item eventKey="Connections only">
                        Connections only
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <Form.Group className="mb-0">
            <Form.Label className="mt-4">{shareData?.description}</Form.Label>
            <div className="mt-4">
              {/*<a>{shareData?.eventExternalLink}</a>*/}
              {/* <LinkPreview
                  margin="20px auto 0 auto"
                  width="100%"
                  url={shareData?.eventExternalLink}
                /> */}
              <LinkPreviewGenerator
                url={shareData?.eventExternalLink}
                title={manageData?.title}
                image={
                  type === "certificate"
                    ? manageData?.courseDetails?.imageURL ??
                      manageData?.eventDetails?.imageURL
                    : manageData?.imageURL
                }
              />
            </div>
          </Form.Group>
        </div>
        {/* </PerfectScrollbar> */}
      </div>
      <div className="footer border-top border-geyser p-4 pt-3 modal-footer">
        <div className="reaction-icons-sections d-lg-flex align-items-center justify-content-between">
          <div className="py-1 reaction-icons-box d-flex align-items-center border rounded-8 border-geyser mr-3">
            <em className="icon icon-message text-secondary font-20"></em>
            <h5 className="font-14 mb-0 pl-2 text-left">
              {shareData.whoCanComment}
            </h5>
            <Dropdown
              className="theme-dropdown ml-2"
              onSelect={selectCommentMode}
            >
              <Dropdown.Toggle>
                <em className="icon icon-down-arrow text-charcoal-grey"></em>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Anyone">Anyone</Dropdown.Item>
                <Dropdown.Item eventKey="Connections only">
                  Connections only
                </Dropdown.Item>
                <Dropdown.Item eventKey="No one">No one</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="d-flex ml-auto pl-3 border-left-1">
          <Button
            variant="btn btn-info text-uppercase btn-sm px-5 w-lg-100 py-12"
            onClick={shareHandler}
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManageShare;
