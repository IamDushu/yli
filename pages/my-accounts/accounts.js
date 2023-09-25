import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Container, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  AccountSettings,
  Visibility,
  Communications,
  ManageActivies,
} from "components/sidebar";
import { useRouter } from "next/router";
import { getUserPreferences } from "../../store/actions/my-account";
import WithAuth from "components/with-auth/with-auth";
import dynamic from "next/dynamic";
import { manageActivity } from "store/actions/manageActivities";
import { useTranslation } from "react-i18next";
import Roles from "components/my-accounts/roles";
import { toggleModals } from "store/actions";
const EditIntro = dynamic(() =>
  import("../../components/my-accounts/edit-intro")
);
const PlanAndPayment = dynamic(() =>
  import("../../components/my-accounts/plan-payment")
);
const Security = dynamic(() => import("../../components/my-accounts/security"));
const SuspenseAndTerminate = dynamic(() =>
  import("../../components/my-accounts/suspense-terminate")
);
const AccountAccess = dynamic(() =>
  import("../../components/my-accounts/account-access")
);
const ProfileVisibility = dynamic(() =>
  import("components/my-accounts/profile-visibility")
);
const ActivitiesVisibility = dynamic(() =>
  import("components/my-accounts/activities-visibility")
);
const RecieveNotification = dynamic(() =>
  import("components/my-accounts/communication/RecieveNotification")
);
// const Messaging = dynamic(() =>
//   import("components/my-accounts/communication/Messaging")
// );
const Activities = dynamic(() =>
  import("components/my-accounts/ManageActivity/Activities")
);
const SavedPost = dynamic(() =>
  import("components/my-accounts/ManageActivity/SavedPost")
);
const Preference = dynamic(() =>
  import("../../components/my-accounts/preference")
);
const Language = dynamic(() => import("../../components/my-accounts/language"));

const Accounts = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const router = useRouter();
  const [manageActivitiesBody, setManageActivitiesBody] = useState({
    page: 1,
    pagesize: 10,
  });
  const [currentSubMenu, setCurrentSubMenu] = useState(
    lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.PROFILE_INFORMATION")
  );
  const [accordion, setAccordion] = useState({
    account: "1",
    visibility: "0",
    communications: "0",
    manage: "0",
  });

  const handleChange = (menuItem) => {
    setCurrentSubMenu(menuItem);
  };
  useEffect(() => {
    setCurrentSubMenu(
      lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.PROFILE_INFORMATION")
    );
    if (router.query.redeem === "true" || router.query.upgrade === "true") {
      setCurrentSubMenu(
        lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.CREDITS_PLAN_PAYMENT")
      );
    } else if (router.query.tabName === '"credit"') {
      setCurrentSubMenu(
        lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.CREDITS_PLAN_PAYMENT")
      );
      dispatch(toggleModals({ paymentmodal: true }));
    }
    if (router.query.activity === "manage-activies") {
      setCurrentSubMenu(lang("MY_ACCOUNTS.TABS.MANAGE_ACTIVITIES.ACTIVITIES"));
    }
    dispatch(getUserPreferences());
  }, [router.query, lang]);

  useEffect(() => {
    dispatch(manageActivity(manageActivitiesBody));
  }, [manageActivitiesBody]);

  const fetchMoreActivities = () => {
    setManageActivitiesBody({
      ...manageActivitiesBody,
      pagesize: manageActivitiesBody.pagesize + 10,
    });
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout className="min-vh-100">
      <div className="inner-wrapper accounts-box">
        <Container>
          <div className="w-100 accounts-tabs">
            <div className="d-flex flex-xl-nowrap flex-wrap inner-right-full-orsidebar">
              <div className="profile-left-bar">
                <Card className="rounded-8 overflow-hidden mn-xl-0 mb-4">
                  <AccountSettings
                    currentSubMenu={currentSubMenu}
                    handleChange={handleChange}
                    accordion={accordion}
                    setAccordion={setAccordion}
                  />
                  <Visibility
                    visibilitySubMenu={currentSubMenu}
                    visHandleChange={handleChange}
                    accordion={accordion}
                    setAccordion={setAccordion}
                  />
                  <Communications
                    communicationSubMenu={currentSubMenu}
                    handleCommunication={handleChange}
                    accordion={accordion}
                    setAccordion={setAccordion}
                  />

                  <ManageActivies
                    activitySubMenu={currentSubMenu}
                    handleActivities={handleChange}
                    accordion={accordion}
                    setAccordion={setAccordion}
                  />
                </Card>
              </div>
              <div className="profile-right-bar">
                <div className="">
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.ROLES") && (
                    <Roles />
                  )}
                  {currentSubMenu ===
                    lang(
                      "MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.PROFILE_INFORMATION"
                    ) && <EditIntro />}
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.LANGUAGE") && (
                    <Language setCurrentSubMenu={setCurrentSubMenu} />
                  )}
                  {currentSubMenu ===
                    lang(
                      "MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.CREDITS_PLAN_PAYMENT"
                    ) && <PlanAndPayment />}
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.PREFERENCES") && (
                    <Preference />
                  )}
                  {currentSubMenu ===
                    lang(
                      "MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.ACCOUNT_ACCESS"
                    ) && <AccountAccess />}
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.SECURITY") && (
                    <Security />
                  )}
                  {currentSubMenu ===
                    lang(
                      "MY_ACCOUNTS.TABS.ACCOUNT_SETTINGS.ACCOUNT_SUSPENTION"
                    ) && <SuspenseAndTerminate />}
                </div>
                <div className="">
                  {/* Profile Visibility sidebar content */}
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.VISIBILITY.PROFILE_VISIBILITY") && (
                    <ProfileVisibility />
                  )}

                  {/* Activities Visibility sidebar content */}
                  {currentSubMenu ===
                    lang(
                      "MY_ACCOUNTS.TABS.VISIBILITY.ACTIVITIES_VISIBILITY"
                    ) && <ActivitiesVisibility />}
                </div>
                <div className="">
                  {/* How you receive Notification sidebar content */}
                  {currentSubMenu ===
                    lang(
                      "MY_ACCOUNTS.TABS.COMMUNICATION.HOW_YOU_RECIEVE_NOTIFICATION"
                    ) && <RecieveNotification />}

                  {/* Messaging sidebar content */}
                  {/* currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.COMMUNICATION.MESSAGING") && (
                    <Messaging />
                  ) */}
                </div>

                <div className="">
                  {/* Activity sidebar content */}
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.MANAGE_ACTIVITIES.ACTIVITIES") && (
                    <Activities fetchMoreActivities={fetchMoreActivities} />
                  )}{" "}
                  {currentSubMenu ===
                    lang("MY_ACCOUNTS.TABS.MANAGE_ACTIVITIES.SAVED_POSTS") && (
                    <SavedPost />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(Accounts);
