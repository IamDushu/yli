import React, { Fragment } from "react";
import { Button, Badge, Card } from "react-bootstrap";
import { Link } from "@routes";
import { ACCOUNTS } from "routes/urls";
import { useRouter } from "next/router";
import { toggleModals } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";
import { useTranslation } from "react-i18next";

const OtherViews = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const userInfo = useSelector(selectUserInfo);
  /******************** 
@purpose : Used for display type of account
@Parameter : { type }
@Author : INIC
******************/
  const upgradeUser = (type) => {
    if (type === "free") {
      return (
        <div className="updgrade-profile">
          <div className="pb-20 text-center font-14 font-medium">
            Ugrade your profile
          </div>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            <Button
              variant="primary-light w-100 mr-xl-1 mr-0 btn-sm mb-xl-0 mb-2 py-12"
              onClick={() =>
                router.replace({
                  pathname: ACCOUNTS,
                  query: { upgrade: true },
                })
              }
            >
              Lite
            </Button>
            <Button
              variant="primary w-100 ml-xl-1 ml-0 btn-sm py-12"
              onClick={() =>
                router.replace({
                  pathname: ACCOUNTS,
                  query: { upgrade: true },
                })
              }
            >
              Premium
            </Button>
          </div>
        </div>
      );
    } else if (type === "lite") {
      return (
        <div className="updgrade-profile">
          <div className="pb-10 font-14 font-medium">Ugrade your profile</div>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            <Button
              variant="primary w-100 ml-xl-1 ml-0 btn-sm py-12"
              onClick={() =>
                router.replace({
                  pathname: ACCOUNTS,
                  query: { upgrade: true },
                })
              }
            >
              Premium
            </Button>
          </div>
        </div>
      );
    } else if (type === "premium") {
      return;
    }
  };
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Fragment>
      {/* profile section */}
      <Card className="mb-4 my-profile-box">
        <Card.Body className="overflow-hidden py-0">
          <div>
            <ul className="listing-section listing-content-between border-first-0">
              <li className="listing-box">
                <Link to={`/profile/${userInfo.profileId}?viewmode=true`}>
                  <a
                    // title="my connections"
                    className="d-flex align-items-center w-100"
                  >
                    {lang(
                      "RIGHT_SIDEBAR.OTHER_VIEWS.HOW_OTHER_VIEW_MY_PROFILE"
                    )}
                    <div className="ml-auto">
                      <Badge className="text-primary font-14 font-weight-normal">
                        <em className="icon icon-right-angle-arrow ml-auto"></em>
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
              <li
                className="listing-box"
                onClick={() => dispatch(toggleModals({ addcredit: true }))}
              >
                <Link route="/">
                  <a
                    // title="people viewed"
                    className="d-flex align-items-center w-100"
                  >
                    {lang("RIGHT_SIDEBAR.OTHER_VIEWS.ADD_CREDITS")}
                    <div className="ml-auto">
                      <Badge className="text-primary font-14 font-weight-normal">
                        <em className="icon icon-right-angle-arrow ml-auto"></em>
                      </Badge>
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default OtherViews;
