import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "@routes";
import { useDispatch, useSelector } from "react-redux";
import { getGrowthPartnerList } from "store/actions";
import { onImageError } from "utils";
import { useTranslation } from "react-i18next";
import { selectUserInfo } from "store/selectors/user";

const GrowthPartners = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const page = 1;
  const pagesize = 5;
  const list = useSelector((state) => state?.growth?.growthPartnerList);
  const userInfo = useSelector(selectUserInfo);
  /**
   * Fetch growth connection list
   */
  useEffect(() => {
    dispatch(
      getGrowthPartnerList({
        page: page,
        pagesize: pagesize,
      })
    );
  }, []);

  /******************** 
  @purpose : Image prefernce Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const imagePreferenceHandler = (userData, profilePicShowData) => {
    if (
      profilePicShowData === null ||
      profilePicShowData.all ||
      (userData?.connectionData &&
        userData?.connectionData[0]?.isConnection &&
        profilePicShowData.myConnections) ||
      (userData?.followData &&
        userData?.followData[0]?.isFollow &&
        profilePicShowData.followers) ||
      (userData?.growthConnectionData &&
        userData?.growthConnectionData?.isGrowthConnection &&
        profilePicShowData.myGrowthConnections) ||
      (userInfo.role &&
        ((userInfo.role.includes("Teacher") && profilePicShowData.teachers) ||
          (userInfo.role.includes("Trainer") && profilePicShowData.trainer) ||
          (userInfo.role.includes("Coach") && profilePicShowData.coach) ||
          (userInfo.role.includes("Host") && profilePicShowData.hosts)))
    ) {
      return true;
    }
  };
  /******************** 
  @purpose : Last Name Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const lastNameHandler = (userData, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility.settings.all ||
      (userData?.connectionData &&
        userData?.connectionData[0]?.isConnection &&
        lastNameVisibility.settings.myConnection) ||
      (userData?.followData &&
        userData?.followData[0]?.isFollow &&
        lastNameVisibility.settings.followers) ||
      (userData?.growthConnectionData &&
        userData?.growthConnectionData?.isGrowthConnection &&
        lastNameVisibility.settings.myGrowthConnection)
    ) {
      return true;
    }
  };

  // return list?.length ? (
  return (
    list?.length > 0 && (
      <div className="mb-3 growth-partner">
        <Card className="border-0 border-bottom-dark-2 ">
          <Card.Header className="d-flex border-radius-0 border-bottom border-geyser py-2">
            <div className="w-100 d-flex border-0 p-0">
              <Card.Title className="text-body-16 mb-0 w-100 text-secondary">
                {lang("RIGHT_SIDEBAR.GROWTH_PARTNERS")}
              </Card.Title>
              <em className="icon icon-down-arrow ml-auto font-24 d-xl-none d-block"></em>
            </div>
          </Card.Header>

          <Card.Body className="px-0">
            {list?.length ? (
              <ul className="listing-section listing-content-between pt-first-0 border-first-0">
                {list?.map((data, index) => (
                  <li
                    className={`listing-box ${
                      index === list?.length - 1 ? "pb-0" : ""
                    }`}
                    key={`growth-partner-${index}`}
                  >
                    <Link route={`/profile/${data?.users?.profileId}`}>
                      <a className="d-flex align-items-center w-100 px-3">
                        <div className="profile-wrap d-flex align-items-center">
                          <div className="overflow-hidden rounded-pill">
                            <picture onContextMenu={(e) => e.preventDefault()}>
                              <source
                                srcSet={
                                  imagePreferenceHandler(
                                    data.users,
                                    data.users.profilePicShowData
                                  )
                                    ? data?.users?.profilePicURL
                                    : ""
                                }
                                type="image/png"
                              />
                              <img
                                src={
                                  imagePreferenceHandler(
                                    data.users,
                                    data.users.profilePicShowData
                                  )
                                    ? data?.users?.profilePicURL || ""
                                    : ""
                                }
                                width="48"
                                height="48"
                                onError={(e) =>
                                  onImageError(
                                    e,
                                    "profile",
                                    `${data?.users?.firstName} ${
                                      lastNameHandler(
                                        data.users,
                                        data.users.lastNameVisibility
                                      )
                                        ? data?.users?.lastName
                                        : ""
                                    }`
                                  )
                                }
                              />
                            </picture>
                          </div>
                          <div className="profile-info ml-3">
                            <h6 className="text-body-14 sidebar-text text-ellipsis mb-0 text-secondary">
                              {data?.users?.firstName?.charAt(0).toUpperCase() +
                                data?.users?.firstName?.slice(1)}{" "}
                              {lastNameHandler(
                                data.users,
                                data.users.lastNameVisibility
                              )
                                ? data?.users?.lastName
                                : ""}
                            </h6>
                            <small className="text-body-12 mt-1 d-block">
                              {data?.users?.currentPosition
                                ? data?.users?.currentPosition
                                    ?.charAt(0)
                                    .toUpperCase() +
                                  data?.users?.currentPosition?.slice(1)
                                : ""}
                            </small>
                          </div>
                        </div>
                        {/* <em className="icon icon-right-angle-arrow ml-auto"></em> */}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3">
                <em className="font-12">{lang("RIGHT_SIDEBAR.NO_RECORDS")}</em>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    )
  );
};
export default GrowthPartners;
