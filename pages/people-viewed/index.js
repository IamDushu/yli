import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { RightSidebarLayout } from "components/layout";
import WithAuth from "components/with-auth/with-auth";
import { useTranslation } from "react-i18next";
import {
  changeConnectionStatus,
  followUser,
  getPeopleViewedList,
  sendConnectionRequest,
  unfollowUser,
} from "store/actions/connections";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CATEGORY, CODE, getLocalStorage, onImageError, timeAgo } from "utils";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectUserInfo } from "store/selectors/user";
import {
  chatCreateUser,
  chatSignupUser,
  getPurchasedFeatureList,
  getUserById,
  toggleModals,
} from "store/actions";
import {
  Follow,
  UnFollow,
  Connect,
  MessageIcon,
  CrossIcon,
} from "components/svg/connections";
import dynamic from "next/dynamic";
import { Loader } from "components/ui";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const MonetisationPlans = dynamic(() =>
  import("components/modal").then((mod) => mod.MonetisationPlans)
);
const NoSufficientCreadit = dynamic(() =>
  import("components/modal").then((mod) => mod.NoSufficientCreadit)
);
const PurchaseFeatureAndPlans = dynamic(() =>
  import("components/modal").then((mod) => mod.PurchaseFeatureAndPlans)
);

const PeopleViewed = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  const { peopleViewedList } = useSelector((state) => state.connections);
  const purchaseList = useSelector(
    (state) => state?.user?.monetisationPurchasedFeatureList
  );
  const {
    purchaseFeaturesPlans,
    nosufficientcreadit,
    monetisationPlan,
    monetisationPlanDetails,
  } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [body, setBody] = useState({
    page: 1,
    pagesize: 10,
  });
  const [limit, setLimit] = useState(5);
  const [hasFeature, setHasFeature] = useState(true);
  const [code, setCode] = useState();

  useEffect(() => {
    peopleViewedProfile();
  }, [code]);

  const peopleViewedProfile = () => {
    setLoading(true);
    dispatch(getPeopleViewedList({ code, ...body }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    // dispatch(getPeopleViewedList({ ...body }));
  };
  const fetchSetting = () => {
    setBody({
      ...body,
      pagesize: body.pagesize + 4,
    });
  };
  /******************** 
  @purpose : Used for purchase details
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(getPurchasedFeatureList(CATEGORY.PROFILE_VISITS));
  }, []);

  /******************** 
  @purpose : Used for setting view limits
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (purchaseList?.length > 0) {
      const codes = purchaseList.map((purchase) => purchase?.code);
      if (codes?.length > 0) {
        if (codes.includes(CODE.PROFILE_VISIT_UNLIMITED)) {
          setHasFeature(false);
          setLimit(-1);
          setCode(CODE?.PROFILE_VISIT_UNLIMITED);
        } else if (codes.includes(CODE?.PROFILE_VISIT_20)) {
          setLimit(20);
          setCode(CODE?.PROFILE_VISIT_20);
        }
      }
    }
  }, [purchaseList]);

  /******************** 
  @purpose : Image prefernce Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const imagePreferenceHandler = (viewDetails, profilePicShowData) => {
    if (
      profilePicShowData === null ||
      profilePicShowData?.all ||
      (viewDetails?.isConnection &&
        viewDetails?.isConnection?.isConnection &&
        profilePicShowData.myConnections) ||
      (viewDetails?.isFollow &&
        viewDetails?.isFollow?.isFollow &&
        profilePicShowData.followers) ||
      (viewDetails?.isGrwothConnection &&
        viewDetails?.isGrwothConnection?.isGrowthConnection &&
        profilePicShowData.myGrowthConnections) ||
      (userInfo.role &&
        ((userInfo.role.includes("Teacher") && profilePicShowData?.teachers) ||
          (userInfo.role.includes("Trainer") && profilePicShowData?.trainer) ||
          (userInfo.role.includes("Coach") && profilePicShowData?.coach) ||
          (userInfo.role.includes("Host") && profilePicShowData?.hosts)))
    ) {
      return true;
    }
  };

  /******************** 
  @purpose : Last Name Handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const lastNameHandler = (viewDetails, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility?.settings.all ||
      (viewDetails?.isConnection &&
        viewDetails?.isConnection?.isConnection &&
        lastNameVisibility?.settings?.myConnection) ||
      (viewDetails?.isGrwothConnection &&
        viewDetails?.isGrwothConnection?.isGrowthConnection &&
        lastNameVisibility?.settings?.myGrowthConnection) ||
      (viewDetails?.isFollow &&
        viewDetails?.isFollow?.isFollow &&
        lastNameVisibility?.settings?.followers)
    ) {
      return true;
    }
  };
  return (
    <RightSidebarLayout removeSidebar="footer">
      <div>
        <InfiniteScroll
          dataLength={
            peopleViewedList?.data !== "" && peopleViewedList?.data?.length > 0
              ? peopleViewedList?.data?.length
              : ""
          }
          next={fetchSetting}
          hasMore={peopleViewedList?.data?.length !== peopleViewedList?.total}
        >
          <Card className="mb-3">
            <Card.Header className="pb-0 border-bottom border-dark p-2 p-sm-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex">
                  <div>
                    <h6 className="text-body-14 mb-0 font-weight-bold">
                      People who viewed your profile in the past 30 days
                    </h6>
                  </div>
                </div>
                <div>
                  <h5 className="mb-0">{peopleViewedList?.total}</h5>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="pb-0 pt-4">
              {loading && <Loader />}
              <ul className="listing-section listing-content-between border-first-0 pt-first-0 active-inner">
                {(peopleViewedList?.data === undefined ||
                  peopleViewedList?.data?.length === 0) &&
                !loading ? (
                  <h6>No one viewed your profile</h6>
                ) : (
                  peopleViewedList?.data &&
                  peopleViewedList?.data?.length > 0 &&
                  peopleViewedList?.data?.map((item, index) => (
                    <li className="listing-box" key={index}>
                      <div
                        className="d-md-flex align-items-center justify-content-between w-100"
                        key={item.id}
                      >
                        <div
                          className="d-flex align-items-center"
                          onClick={() => {
                            if (!item?.isAnonymProfile)
                              window.open(
                                `/profile/${item?.viewDetails?.profileId}`,
                                "_self"
                              );
                          }}
                        >
                          <div className="w-h-54 rounded-pill mr-2 pointer flex-shrink-0 overflow-hidden">
                            <picture onContextMenu={(e) => e.preventDefault()}>
                              <source
                                src={
                                  imagePreferenceHandler(
                                    item?.viewDetails,
                                    item?.viewDetails?.profilePicShowData
                                  )
                                    ? item?.viewDetails?.profilePicURL
                                    : ""
                                }
                                type="image/jpg"
                              />
                              <img
                                src={
                                  imagePreferenceHandler(
                                    item?.viewDetails,
                                    item?.viewDetails?.profilePicShowData
                                  )
                                    ? item?.viewDetails?.profilePicURL || ""
                                    : ""
                                }
                                alt="profilePicURL"
                                width="54"
                                height="54"
                                onError={(e) => {
                                  onImageError(
                                    e,
                                    "profile",
                                    `${item?.viewDetails?.firstName} ${
                                      lastNameHandler(
                                        item?.viewDetails,
                                        item?.viewDetails?.lastNameVisibility
                                      )
                                        ? item?.viewDetails?.lastName
                                        : ""
                                    }`
                                  );
                                }}
                              />
                            </picture>
                          </div>
                          <div className="ml-1 text-left">
                            <h5 className="card-title font-16 text-secondary font-bold mb-0 pointer">
                              {item?.viewDetails?.firstName}{" "}
                              {lastNameHandler(
                                item?.viewDetails,
                                item?.viewDetails?.lastNameVisibility
                              )
                                ? item?.viewDetails?.lastName
                                : ""}
                            </h5>
                            <p className="card-title font-12 text-secondary font-weight-normal mb-0">
                              {item?.viewDetails?.currentPosition
                                ? item?.viewDetails?.currentPosition
                                : "No position added "}
                            </p>
                            <p className="card-title font-12  font-weight-normal mb-0">
                              {timeAgo(item?.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-md-between  mt-3 mt-md-0">
                          {!item?.viewDetails?.isConnection?.isConnection &&
                            !item?.isAnonymProfile && (
                              <>
                                <button
                                  className={
                                    item?.viewDetails?.isConnection &&
                                    item?.viewDetails?.isConnection?.status ===
                                      "requested"
                                      ? "btn d-flex align-items-center btn-outline-gray btn-small-icon mb-sm-0 mb-2"
                                      : "btn d-flex align-items-center btn-outline-primary btn-small-icon  mb-sm-0 mb-2"
                                  }
                                  onClick={async () => {
                                    item?.viewDetails?.isConnection &&
                                    item?.viewDetails?.isConnection?.status ===
                                      "requested"
                                      ? await dispatch(
                                          changeConnectionStatus({
                                            id: item?.viewDetails
                                              ?.withDrawDetails?.id,
                                            status: "withdrawl",
                                          })
                                        )
                                      : await dispatch(
                                          sendConnectionRequest(
                                            item?.viewDetails?.id
                                          )
                                        );
                                    await peopleViewedProfile();
                                  }}
                                >
                                  {item?.viewDetails?.isConnection &&
                                  item?.viewDetails?.isConnection?.status ===
                                    "requested" ? (
                                    <span>
                                      <CrossIcon /> Withdraw
                                    </span>
                                  ) : (
                                    <span>
                                      <Connect /> Connect
                                    </span>
                                  )}
                                </button>

                                {!item?.isAnonymProfile && (
                                  <button
                                    className="btn d-flex align-items-center btn-outline-primary btn-small-icon ml-3 mb-sm-0 mb-2"
                                    onClick={async () => {
                                      item?.viewDetails?.isFollow &&
                                      item?.viewDetails?.isFollow?.isFollow
                                        ? await dispatch(
                                            unfollowUser(item?.viewDetails?.id)
                                          )
                                        : await dispatch(
                                            followUser(item?.viewDetails?.id)
                                          );
                                      await peopleViewedProfile();
                                    }}
                                  >
                                    {item?.viewDetails?.isFollow &&
                                    item?.viewDetails?.isFollow?.isFollow ? (
                                      <span>
                                        {" "}
                                        <UnFollow /> Unfollow
                                      </span>
                                    ) : (
                                      <span>
                                        <Follow /> Follow
                                      </span>
                                    )}
                                  </button>
                                )}
                              </>
                            )}
                          {item?.viewDetails?.isConnection &&
                            item?.viewDetails?.isConnection?.isConnection && (
                              <button
                                className="btn btn-outline-secondary-purple btn-small-icon ml-0 ml-md-3 mb-sm-0 mb-2"
                                onClick={async () => {
                                  if (item?.viewDetails?.mmRegister) {
                                    let userMmId = item?.viewDetails?.mmId;
                                    if (!userMmId) {
                                      const res = await getUserById(
                                        item?.viewDetails?.id
                                      );
                                      userMmId = res?.mmId;
                                    }
                                    await chatCreateUser({
                                      ids: [mmLogin?.mmId, userMmId],
                                    });
                                  } else {
                                    let userEmail = item?.viewDetails?.email;
                                    if (!userEmail || userEmail === "HIDDEN") {
                                      const user = await getUserById(
                                        item?.viewDetails?.id
                                      );
                                      userEmail = user.email;
                                    }
                                    const res = await dispatch(
                                      chatSignupUser(
                                        {
                                          email: userEmail,
                                        },
                                        "profile"
                                      )
                                    );
                                    await chatCreateUser({
                                      ids: [mmLogin?.mmId, res?.id],
                                    });
                                  }
                                  router.push("/messages");
                                }}
                              >
                                <MessageIcon />
                                Message
                              </button>
                            )}
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </Card.Body>
            {hasFeature && limit !== -1 && peopleViewedList?.total > limit && (
              <div className="p-2 bg-secondary-lighter">
                <div className="d-sm-flex align-items-center justify-content-between">
                  <em className="bx bx-lock-alt font-18 pr-2 text-secondary-purple"></em>
                  <div className="pr-md-3">
                    <p className="text-body-14 text-secondary-purple font-weight-normal m-0">
                      {lang("FEATURESPLANS.UNLOCK_MORE_PEOPLE_VIEW")}
                    </p>
                  </div>
                  <div className="mt-sm-0 mt-3 ml-auto p-2">
                    <Button
                      variant="info ml-sm-3 w-sm-100"
                      size="sm"
                      onClick={() =>
                        dispatch(toggleModals({ purchaseFeaturesPlans: true }))
                      }
                    >
                      {lang("COMMON.UNLOCK")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </InfiniteScroll>

        <MainModal
          className="preferenceTag custom-modal-footer"
          show={purchaseFeaturesPlans}
          keyModal="purchaseFeaturesPlans"
          centered
          body={
            <PurchaseFeatureAndPlans
              userInfo={userInfo}
              category={CATEGORY.PROFILE_VISITS}
            />
          }
          headerClassName="mb-50 block md-mb-30"
          header={
            <div>
              <h2 className="h6 m-0">
                {lang("FEATURESPLANS.PROFILE_VISIT")} {lang("COMMON.PLANS")}
              </h2>
            </div>
          }
        />
        {/******************* 
      @purpose : No Sufficient Creadit
      @Author : INIC
      ******************/}
        <MainModal
          className="nosufficient-creadit-modal only-body-modal"
          show={nosufficientcreadit}
          keyModal="nosufficientcreadit"
          body={<NoSufficientCreadit />}
          headerClassName="mb-50 block md-mb-30"
        />

        {/******************* 
      @purpose : Monetisation Plan details
      @Author : INIC
      ******************/}
        <MainModal
          className="preferenceTag custom-modal-footer"
          show={monetisationPlan}
          keyModal="monetisationPlan"
          body={<MonetisationPlans plan={monetisationPlanDetails} />}
          headerClassName="mb-50 block md-mb-30"
          header={
            <div>
              <h2 className="h6 m-0">
                {lang("FEATURESPLANS.PREFERENCESTAG")} {lang("COMMON.PLANS")}
              </h2>
            </div>
          }
        />
      </div>
    </RightSidebarLayout>
  );
};
export default WithAuth(PeopleViewed);
