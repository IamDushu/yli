import { Layout } from "components/layout";
import {
  RecentAddedGM,
  MyProfile,
  GrowthModal,
  MostFollowedContents,
  Add,
  UpgradeYourProfile,
  GrowthPartners,
  FollowedGroup,
} from "components/sidebar";
import moment from "moment";
import Link from "next/link";
import Pagination from "rc-pagination";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getGrowthPartnerList } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import { onImageError } from "utils";

function MyGrowthConnection() {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const growthPartners = useSelector((state) => state?.growth?.growthPartners);
  const [search, setSearch] = useState("");
  const list = search
    ? useSelector((state) => state?.growth?.searchedGrowthPartnerList)
    : useSelector((state) => state?.growth?.growthPartnerList);
  const userInfo = useSelector(selectUserInfo);
  /******************** 
  @purpose : My Growth Connections List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(
      getGrowthPartnerList({
        page: page,
        pagesize: pagesize,
        searchText: search,
      })
    );
  }, [page, pagesize, search]);
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

  /********************************************************
   * Handle Pagination change
   * @author INIC
   * @param {number} pageNo
   * @param {number} pageSize
   * @returns {void}
   ********************************************************/
  const paginationChange = (page, pagesize) => {
    setPage(page);
    setPagesize(pagesize);
  };

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
  return (
    <Layout>
      <div className="inner-wrapper">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />

              {/* growth modal listing */}
              <GrowthModal />
              <Add />
            </div>

            <div className="post-section">
              <Card>
                <Card.Header className="pb-0">
                  <div className="mb-3">
                    <h2 className="h5 mb-3">
                      {lang("CONNECTIONS.MY_GROWTH_CONNECTIONS")}
                    </h2>
                    <div className="common-searchbar w-100 dsfsf">
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
                  <ul className="listing-section">
                    {list === undefined ||
                    (Array.isArray(list) && list.length === 0) ? (
                      <li className="listing-box d-flex align-items-center">
                        {lang("CONNECTIONS.NO_CONNECTIONS_AVAILABLE")}
                      </li>
                    ) : (
                      Array.isArray(list) &&
                      list.map((user) => (
                        <li
                          className="listing-box d-flex align-items-center"
                          key={user.id}
                        >
                          <Link href={`/profile/${user.users.profileId}`}>
                            <picture
                              className="user-profile-pic rounded-50 mr-3 flex-shrink-0 pointer"
                              onContextMenu={(e) => e.preventDefault()}
                            >
                              <source
                                srcSet={
                                  imagePreferenceHandler(
                                    user.users,
                                    user.users.profilePicShowData
                                  )
                                    ? user.users.profilePicURL
                                    : ""
                                }
                                type="image/jpg"
                              />
                              <img
                                src={
                                  imagePreferenceHandler(
                                    user.users,
                                    user.users.profilePicShowData
                                  )
                                    ? user.users.profilePicURL || ""
                                    : ""
                                }
                                alt={
                                  user.users.firstName +
                                  " " +
                                  user.users.lastName
                                }
                                onError={(e) =>
                                  onImageError(
                                    e,
                                    "profile",
                                    `${user.users.firstName} ${
                                      lastNameHandler(
                                        user.users,
                                        user.users.lastNameVisibility
                                      )
                                        ? user?.users?.lastName
                                        : ""
                                    }`
                                  )
                                }
                                width="70"
                                height="70"
                              />
                            </picture>
                          </Link>
                          <div className="ml-sm-2 d-flex flex-wrap flex-md-nowrap justify-content-between w-100">
                            <div>
                              <Link href={`/profile/${user.users.profileId}`}>
                                <h5 className="card-title font-16 text-secondary font-medium mb-1 pointer">
                                  {user?.users?.firstName}{" "}
                                  {lastNameHandler(
                                    user.users,
                                    user.users.lastNameVisibility
                                  )
                                    ? user?.users?.lastName
                                    : ""}
                                </h5>
                              </Link>
                              <p className="font-12 text-gary font-weight-light mb-1">
                                {user?.users?.qualification}
                              </p>
                              <p className="font-12 text-gary font-weight-light mb-0">
                                {lang("CONNECTIONS.RECIEVED_ON")} ,{" "}
                                {moment(user.createdAt).format("DD MMM YYYY")}
                              </p>
                            </div>
                            {/* <div className="d-flex align-items-center mt-sm-0 mt-2">
                              <div className="w-h-24 bg-cosmos circle-inner-icons ml-3 pointer">
                                <em
                                  className="icon icon-delete font-16"
                                  onClick={() => deleteConnection(user.id)}
                                ></em>
                              </div>
                            </div> */}
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </Card.Body>
                {!search && list?.length < growthPartners?.total && (
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      className="pagination custom-pagination"
                      pageSize={pagesize}
                      current={page}
                      total={growthPartners?.total}
                      showSizeChanger={true}
                      totalBoundaryShowSizeChanger={true}
                      onChange={paginationChange}
                      showTitle={false}
                    />
                  </div>
                )}
              </Card>
            </div>

            {/* right blog section */}
            <div className="right-blog-section">
              <UpgradeYourProfile />

              {/* GrowthModal */}
              {/* <GrowthModal /> */}

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
}

export default MyGrowthConnection;
