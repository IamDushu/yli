import { Link } from "@routes";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "store/actions/article";
import { onImageError, postTokenUnix, setCookie } from "utils";
import {
  getGroupDetailsByID,
  toggleModals
} from "../../store/actions";

const PublishArticle = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { shareArticle } = useSelector((state) => state.ui);
  const [mentions, setMentions] = useState([]);
  const [articleData, setArticleData] = useState({
    id: shareArticle ? shareArticle.id : "",
    title: shareArticle ? shareArticle.title : "",
    subTitle: shareArticle ? shareArticle.subTitle : "",
    articleDescription: "",
    description: shareArticle ? shareArticle?.description : "",
    imageURL: shareArticle ? shareArticle?.imageURL : "",
    privacy: "Anyone",
    profilePicURL: shareArticle ? shareArticle?.profilePicURL : "",
    whoCanComment: "Anyone",
    groupId: shareArticle ? shareArticle.groupId : "",
    postId: shareArticle ? shareArticle.postId : "",
    tags: shareArticle ? shareArticle.tags : [],
  });
  useEffect(() => {
    if (articleData.description !== "") {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [articleData.description]);


  const selectUserMode = (e) => {
    setArticleData({ ...articleData, privacy: e });
  };

  const selectCommentMode = (e) => {
    setArticleData({ ...articleData, whoCanComment: e });
  };

  let postDescription = articleData.articleDescription || "";

  if (postDescription.includes("#")) {
    postDescription = postDescription
      .split('<a href="/search-result')
      .join("$$$$__");
  }

  const descriptionTag = postDescription.includes("~+~")
    ? postDescription.split("~+~")[0] + "$$$~~~"
    : postDescription;
  postDescription = descriptionTag.split('<a href="/profile/').join("$$$__");
  postDescription = postDescription.split(`">`).join("~~~__");
  postDescription = postDescription.split("</a>").join("$$$~~~");
  //
  const publishArticle = async () => {
    setIsButtonDisabled(true)
    let description = articleData.articleDescription;

    if (description && description.includes("#")) {
      description = description.split("$$$$__").join('<a href="/search-result');
    }
    const descriptionTagAdd = description.includes("~+~")
      ? description.split("~+~")[0] + "$$$~~~"
      : description;
    description = descriptionTagAdd.split("$$$__").join('<a href="/profile/');
    description = description.split("~~~__").join(`">`);
    description = description.split("$$$~~~").join("</a>");

    let body = {
      ...(articleData.id !== "" && { id: articleData.id }),
      title: articleData.title,
      subTitle: articleData.subTitle,
      description: articleData.description + description,
      whoCanComment: articleData.whoCanComment,
      imageURL: articleData.imageURL,
      privacy: articleData.privacy,
      publishedStatus: "published",
      ...(articleData.groupId !== "" && { groupId: articleData.groupId }),
      ...(articleData.postId !== "" && { postId: articleData.postId }),
      tags: [...(articleData.tags || [])],
      taggedId: mentions.length > 0 ? mentions : null,
    };
    await Promise.resolve(createArticle(body));
    setIsButtonDisabled(false)
    setCookie("postToken", postTokenUnix(new Date()));
    dispatch(toggleModals({ publishArticle: false }));

    let redirectRoute = "/dashboard";
    if (body?.groupId !== undefined && body?.groupId !== "") {
      let groupDetails = await getGroupDetailsByID(body?.groupId);
      if (groupDetails?.name !== undefined) {
        redirectRoute = `/groups/${groupDetails.name}/${body?.groupId}`;
      }
    }
    router.push(redirectRoute);
  };

  useEffect(() => {
    return () => {
      setArticleData({
        status: true,
        description: "",
        privacy: lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
        imageURL: "",
        whoCanComment: lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE"),
      });
    };
  }, []);
  

  return (
    <>
      <Modal.Body className="p-4">
        {/* <PerfectScrollbar> */}
        <div className="body">
          <div className="d-flex align-items-center">
            {
              <div className="w-h-50 flex-shrink-0 rounded-pill overflow-hidden">
                <Link route="/">
                  <a href="#">
                    <picture className="user-profile-pic rounded-pill h-100 d-flex">
                      <source
                        srcSet={userInfo.profilePicURL}
                        type="image/jpg"
                      />
                      <img
                        src={userInfo.profilePicURL}
                        onError={(e) => {
                          onImageError(
                            e,
                            "profile",
                            `${userInfo.firstName} ${userInfo.lastName}`
                          );
                        }}
                        width="54"
                        height="54"
                        className="img-fluid overflow-hidden rounded-pill"
                      />
                    </picture>
                  </a>
                </Link>
              </div>
            }
            <div className="ml-3">
              <div className="mb-0 algin-items-center">
                <a
                  title={`${userInfo && userInfo.firstName !== null
                    ? userInfo.firstName
                    : "john"
                    } ${userInfo && userInfo.lastName !== null
                      ? userInfo.lastName
                      : "dev"
                    }`}
                >
                  <span className="font-weight-semibold">{`${userInfo && userInfo.firstName !== null
                    ? userInfo.firstName
                    : "john"
                    }
                    ${userInfo && userInfo.lastName !== null
                      ? userInfo.lastName
                      : "dev"
                    }
                    `}</span>
                </a>
                <p className="mb-1">
                  {`${userInfo && userInfo.currentPosition !== null
                    ? userInfo.currentPosition
                    : ""
                    }
                    `}
                </p>
              </div>
              <div></div>
              <div className="reaction-icons-sections">
                <div className="py-1 px-2 reaction-icons-box border rounded-8 border-geyser mr-3">
                  <Dropdown
                    className="theme-dropdown"
                    onSelect={selectUserMode}
                  >
                    <Dropdown.Toggle className="d-flex align-items-center">
                      <em className="icon icon-web pr-2 text-charcoal-grey"></em>
                      <h5 className="font-14 mb-0">{articleData.privacy}</h5>
                      <em className="icon icon-down-arrow text-charcoal-grey pl-2"></em>
                    </Dropdown.Toggle>
                    <Dropdown.Menu defaultValue={articleData.privacy}>
                      <Dropdown.Item
                        eventKey={lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                      >
                        {lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey={lang(
                          "DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY"
                        )}
                      >
                        {lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY")}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <Form.Group className="mb-0">
            <Form.Label></Form.Label>
            {articleData.title && <h4>{articleData.title}</h4>}
            {articleData.imageURL && (
              <div className="mt-3">
                <img src={articleData.imageURL} />
              </div>
            )}
            {articleData.description && (
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{
                  __html: articleData.description,
                }}
              />
            )}
          </Form.Group>
        </div>
        {/* </PerfectScrollbar> */}
      </Modal.Body>
      <Modal.Footer className="footer border-top border-geyser p-4 pt-3">
        <div className="reaction-icons-sections d-lg-flex align-items-center justify-content-between">
          <div className="py-1 reaction-icons-box d-flex align-items-center border rounded-8 border-geyser mr-3">
            <em className="icon icon-msg-square text-secondary font-20"></em>
            <Dropdown
              className="theme-dropdown ml-2"
              onSelect={selectCommentMode}
            >
              <Dropdown.Toggle>
                {/*<em className="icon icon-down-arrow text-charcoal-grey"></em>*/}
                <h5 className="font-14 mb-0 pl-2 text-left">
                  {articleData.whoCanComment}
                </h5>
              </Dropdown.Toggle>
              <Dropdown.Menu defaultValue={articleData.whoCanComment}>
                <Dropdown.Item
                  eventKey="Anyone"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.ANYONE")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Connections only"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.CONNECTION_ONLY")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Growth connections only"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.GROWTH_CONNECTION_ONLY")}
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="No one"
                >
                  {lang("DASHBOARD.ADD_POST.PRIVACY.NO_ONE")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Button
          variant="btn btn-info px-md-4 px-5 w-lg-100"
          onClick={publishArticle}
          disabled={isButtonDisabled}
        >
          {!isButtonDisabled ? lang("ATRICLE.PUBLISH") : lang("COMMON.LOADING")}
        </Button>
      </Modal.Footer>
    </>
  );
};
export default PublishArticle;
