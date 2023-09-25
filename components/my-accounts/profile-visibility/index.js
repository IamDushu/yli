import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUserProfileData, toggleModals } from "store/actions";
import { updateAnonymousUser } from "store/actions/visibility";
import { selectUserInfo } from "store/selectors/user";
import { CATEGORY, CODE } from "utils";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const WhoSeeYourLastname = dynamic(() =>
  import("components/modal").then((mod) => mod.WhoSeeYourLastname)
);
const BlockingOtherProfiles = dynamic(() =>
  import("components/modal").then((mod) => mod.BlockingOtherProfiles)
);
const Links = dynamic(() =>
  import("components/modal").then((mod) => mod.Links)
);
const StoryDisplayOption = dynamic(() =>
  import("components/modal").then((mod) => mod.StoryDisplayOption)
);
const EditYourPublicProfile = dynamic(() =>
  import("components/modal").then((mod) => mod.EditYourPublicProfile)
);
const ProfilePhotoView = dynamic(() =>
  import("components/modal").then((mod) => mod.ProfilePhotoView)
);
const PurchaseFeatureAndPlans = dynamic(() =>
  import("components/modal").then((mod) => {
    return mod.PurchaseFeatureAndPlans;
  })
);
const NoSufficientCreadit = dynamic(() =>
  import("components/modal").then((mod) => mod.NoSufficientCreadit)
);
const MonetisationPlans = dynamic(() =>
  import("components/modal").then((mod) => mod.MonetisationPlans)
);

/******************** 
  @purpose : Profile Visibility 
  @Parameter : {}
  @Author : INIC
  ******************/
function ProfileVisibility() {
  const [lang] = useTranslation("language");
  const {
    whoseeyourlastname,
    blockingotherprofiles,
    links,
    storydisplayoption,
    edityourpublicprofile,
    profilephotoview,
    purchaseFeaturesPlans,
    nosufficientcreadit,
    monetisationPlan,
    monetisationPlanDetails,
  } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [isUserAnonymous, setIsUserAnonymous] = useState(false);
  const [data] = useState([
    // {
    //   title: "Visibility display options",
    //   subTitle: "Choose whether to be visible or in private mode",
    //   toggle: { visibilityoption: true },
    // },
    {
      title: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.VISIBILITY_DISPLAY_OPTIONS"
      ),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.VISIBILITY_DISPLAY_OPTIONS_DESCRIPTION"
      ),
      toggle: { storydisplayoption: true },
    },

    {
      title: lang("MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.BECOME_ANONYMOUS"),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.BECOME_ANONYMOUS_DESCRIPTION"
      ),
      showSwitch: true,
    },
    {
      title: lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PROFILE_PHOTO_VIEW"),
      subTitle: lang(
        "MY_ACCOUNTS.ACCOUNT_SETTINGS.PROFILE_PHOTO_VIEW_DESCRIPTION"
      ),
      toggle: { profilephotoview: true },
    },
    {
      title: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.EDIT_YOUR_PUBLIC_PROFILE"
      ),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.EDIT_YOUR_PUBLIC_PROFILE_DESCRIPTION"
      ),
      toggle: { edityourpublicprofile: true },
    },
    {
      title: lang("MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LINKS"),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LINKS_DESCRIPTION"
      ),
      toggle: { links: true },
    },
    {
      title: lang("MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LAST_NAME"),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LAST_NAME_DESCRIPTION"
      ),
      toggle: { whoseeyourlastname: true },
    },
    {
      title: lang("MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.BLOCKING_PROFILE"),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.BLOCKING_PROFILE_DESCRIPTION"
      ),
      toggle: { blockingotherprofiles: true },
    },
  ]);

  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  /******************** 
  @purpose : Used for handle user profile
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (userInfo.id) {
      setIsUserAnonymous(userInfo?.isAnonymProfile);
    }
  }, [userInfo]);

  /******************** 
  @purpose : Used for handle anonymous user profile
  @Parameter : { }
  @Author : INIC
  ******************/
  const handleAnonymousProfile = (e) => {
    const { checked } = e.target;
    dispatch(
      updateAnonymousUser({
        isAnonymProfile: checked,
        code: CODE.ANONYMOUS_PROFILE,
      })
    ).then((res) => {
      if (!res?.data?.haveFeatures) {
        dispatch(toggleModals({ purchaseFeaturesPlans: true }));
      } else {
        setIsUserAnonymous(checked);
      }
    });
  };

  /******************** 
  @purpose : handles success on purchase of plan/features
  @Parameter : { }
  @Author : INIC
  ******************/
  const handlePurchaseSuccess = (e) => {
    dispatch(getUserProfileData());
  };
  return (
    <>
      <Card>
        <Card.Body>
          <ul className="listing-section border-first-0 pt-first-0 pb-last-0 py-lg">
            {data.map((list, i) => (
              <li
                className="listing-box d-sm-flex d-block justify-content-between"
                key={i}
              >
                <div className="pr-md-3">
                  <h4 className="text-body-16">{list.title}</h4>
                  <p className="text-body-14 font-weight-normal m-0">
                    {list.subTitle}
                  </p>
                </div>
                <div className="mt-sm-0 mt-3">
                  {!list?.showSwitch ? (
                    <Button
                      variant="outline-info ml-sm-3 w-sm-100"
                      size="sm"
                      onClick={() => dispatch(toggleModals(list.toggle))}
                    >
                      {lang("MY_ACCOUNTS.COMMON.CHANGE")}
                    </Button>
                  ) : (
                    <label className="switch mb-0">
                      <input
                        type="checkbox"
                        name="anonymous"
                        checked={isUserAnonymous}
                        onChange={handleAnonymousProfile}
                      />
                      <span className="switch-slider round"></span>
                    </label>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      {/******************* 
           @purpose : Profile photo view popup for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="profile-photo-view custom-modal-footer"
        show={profilephotoview}
        keyModal="profilephotoview"
        centered
        body={<ProfilePhotoView />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PROFILE_PHOTO_VIEW")}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal pr-4">
              {lang(
                "MY_ACCOUNTS.ACCOUNT_SETTINGS.PROFILE_PHOTO_VIEW_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />
      {/******************* 
           @purpose : Story display option for My accounts Modal
           @Author : INIC
           ******************/}

      <MainModal
        className="story-display-option custom-modal-footer"
        show={storydisplayoption}
        keyModal="storydisplayoption"
        centered
        body={<StoryDisplayOption />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {" "}
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.VISIBILITY_DISPLAY_OPTIONS"
              )}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.VISIBILITY_DISPLAY_OPTIONS_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />
      {/******************* 
           @purpose : Edit Your public profile for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="edit-your-public-profile custom-modal-footer"
        show={edityourpublicprofile}
        keyModal="edityourpublicprofile"
        centered
        body={<EditYourPublicProfile />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.EDIT_YOUR_PUBLIC_PROFILE"
              )}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal pr-4">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.EDIT_YOUR_PUBLIC_PROFILE_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />
      {/******************* 
           @purpose : Who can see your lastname for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="who-see-lastname custom-modal-footer"
        show={whoseeyourlastname}
        keyModal="whoseeyourlastname"
        centered
        body={<WhoSeeYourLastname />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LAST_NAME")}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LAST_NAME_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />
      {/******************* 
           @purpose : Blocking other profiles for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="blocking-other-profiles modal-md custom-modal-footer"
        show={blockingotherprofiles}
        keyModal="blockingotherprofiles"
        centered
        body={<BlockingOtherProfiles />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.BLOCKING_PROFILE"
              )}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.BLOCKING_PROFILE_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />
      {/******************* 
           @purpose : Links for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="links custom-modal-footer"
        show={links}
        keyModal="links"
        centered
        body={<Links />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LINKS")}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.PROFILE_VISIBILITY.LINKS_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />

      {/******************* 
      @purpose : Purchase plans and features
      @Author : INIC
      ******************/}
      <MainModal
        className="preferenceTag custom-modal-footer"
        show={purchaseFeaturesPlans}
        keyModal="purchaseFeaturesPlans"
        centered
        body={
          <PurchaseFeatureAndPlans
            userInfo={userInfo}
            category={CATEGORY.ANONYMOUS_PROFILE}
            handleSuccess={() => {
              handlePurchaseSuccess();
            }}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("FEATURESPLANS.UNLOCK_ANONYMOUS_MODE")}{" "}
              {lang("COMMON.PLANS")}
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
        body={
          <MonetisationPlans
            plan={monetisationPlanDetails}
            handleSuccess={() => {
              handlePurchaseSuccess();
            }}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang("FEATURESPLANS.PREFERENCESTAG")} {lang("COMMON.PLANS")}
            </h2>
          </div>
        }
      />
    </>
  );
}

export default ProfileVisibility;
