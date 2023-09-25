import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { getMyConnectionsList } from "store/actions/connections";
import { onImageError } from "utils";
import { MY_CONNECTIONS } from "routes/urls";
import { Layout } from "components/layout";
import {
  Add,
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  MyProfile,
  RecentAddedGM,
  UpgradeYourProfile,
} from "components/sidebar";
import { Card, Container, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import WithAuth from "components/with-auth/with-auth";
import { selectUserInfo } from "store/selectors/user";

const myConnectionList = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const connectionList = useSelector(
    (state) => state.connections.myConnectionList
  );
  const userInfo = useSelector(selectUserInfo);
  const router = useRouter();
  const [search, setSearch] = useState("");
  /******************** 
  @purpose : My Connections List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(getMyConnectionsList({ page: 1, pagesize: 100, search }));
  }, [search]);

  /******************** 
  @purpose : Used for debounce
  @Parameter : {  }
  @Author : INIC
  ******************/
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  /******************** 
  @purpose : Used for search
  @Parameter : {}
  @Author : INIC
  ******************/
  const searchHandler = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
    })
  );

  /******************** 
  @purpose : Image prefernce Handler
  @Parameter : {}
  @Author : INIC
  ******************/

  const imagePreferenceHandler = (userData, profilePicShowData) => {
    if (
      profilePicShowData === null ||
      profilePicShowData.all ||
      profilePicShowData.myConnections ||
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
  @purpose : last name Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const lastNameHandler = (userData, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility.settings.all ||
      (userData?.followData &&
        userData?.followData[0]?.isFollow &&
        lastNameVisibility.settings.followers) ||
      lastNameVisibility.settings.myConnection ||
      (userData?.growthConnectionData &&
        userData?.growthConnectionData?.isGrowthConnection &&
        lastNameVisibility.settings.myGrowthConnection)
    ) {
      return true;
    }
  };

  return (
    <Layout>
      <div className="inner-wrapper">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            <div className="left-profile-section">
              <MyProfile />
              <GrowthModal />
              <Add />
            </div>
            <div className="post-section">
              <Card>
                <Card.Header className="pb-0">
                  <div className="mb-3">
                    <h2 className="h5 mb-3">
                      {lang("CONNECTIONS.MY_CONNECTIONS")}
                    </h2>
                    <div className="common-searchbar w-100">
                      <Form.Group
                        controlId="formSearch"
                        className="position-relative mb-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder={lang("CONNECTIONS.SEARCH_BY_NAME")}
                          onChange={searchHandler}
                        />
                        <div className="search-inner-icon">
                          <em className="bx bx-search"></em>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="py-0">
                  {connectionList === undefined ||
                  connectionList?.length === 0 ? (
                    <h6>{lang("CONNECTIONS.NO_CONNECTIONS_AVAILABLE")}</h6>
                  ) : (
                    connectionList &&
                    connectionList?.length > 0 &&
                    connectionList.map((item) => (
                      <div
                        className="d-flex align-items-center mb-3"
                        key={item.id}
                        onClick={() => {
                          window.open(`/profile/${item.profileId}`, "_self"),
                            dispatch(toggleModals({ connectionlist: false }));
                        }}
                      >
                        <picture
                          className="user-profile-pic rounded-pill mr-2 pointer"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <source
                            src={
                              imagePreferenceHandler(
                                item.userDetails && item.userDetails[0],
                                item.userDetails &&
                                  item.userDetails[0].profilePicShowData
                              )
                                ? item.profilePicURL
                                : ""
                            }
                            type="image/jpg"
                          />
                          <img
                            src={
                              imagePreferenceHandler(
                                item.userDetails && item.userDetails[0],
                                item.userDetails &&
                                  item.userDetails[0].profilePicShowData
                              )
                                ? item?.profilePicURL ?? ""
                                : ""
                            }
                            alt="profilePicURL"
                            width="70"
                            height="70"
                            onError={(e) => {
                              onImageError(
                                e,
                                "profile",
                                `${item.firstName} ${
                                  lastNameHandler(
                                    item.userDetails && item.userDetails[0],
                                    item.userDetails &&
                                      item.userDetails[0].lastNameVisibility
                                  )
                                    ? item.lastName
                                    : ""
                                }`
                              );
                            }}
                          />
                        </picture>
                        <div className="ml-2 text-left">
                          <h5 className="card-title font-16 text-secondary font-medium mb-10 pointer">
                            {item.firstName}{" "}
                            {lastNameHandler(
                              item.userDetails && item.userDetails[0],
                              item.userDetails &&
                                item.userDetails[0].lastNameVisibility
                            ) && item.lastName}
                          </h5>
                        </div>
                      </div>
                    ))
                  )}
                  {connectionList && connectionList.length > 10 && (
                    <div className="d-flex justify-content-center">
                      <span
                        onClick={() => router.push(MY_CONNECTIONS)}
                        className="text-black"
                      >
                        View all
                      </span>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
            <div className="right-blog-section">
              <UpgradeYourProfile />

              {/* GrowthModal */}
              {/*               <GrowthModal /> */}

              {/* GrowthPartners */}
              <GrowthPartners />

              {/* Recently Added to gm */}
              <RecentAddedGM />
              <FollowedGroup />
              {/* Most Followed Contents */}
              <MostFollowedContents />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(myConnectionList);
