import React, { Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { toggleModals } from "../../../store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const CloseAccount = dynamic(() => import("components/modal/close-account"));
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AccountSuspentionConfirms = dynamic(() =>
  import("components/modal").then((mod) => mod.AccountSuspentionConfirms)
);
/******************** 
  @purpose : Close or Permanent Deactivate Account
  @Parameter : {}
  @Author : INIC
  ******************/
const SuspenseAndTerminate = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { accountsuspentionconfirms, closeaccount } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  return (
    <Fragment>
      <Card>
        <Card.Body>
          <ul className="listing-section border-first-0 pt-first-0 pb-last-0 py-lg">
            <li className="listing-box d-sm-flex d-block justify-content-between">
              <div className="pr-md-3">
                <h4 className="text-body-16">
                  {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.SUSPEND_ACCOUNT")}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.ACCOUNT_SETTINGS.SUSPEND_ACCOUNT_DESCRIPTION"
                  )}
                </p>
              </div>
              <div className="mt-sm-0 mt-3">
                <Button
                  variant="outline-info ml-sm-3 w-sm-150"
                  size="sm"
                  onClick={() =>
                    dispatch(toggleModals({ accountsuspentionconfirms: true }))
                  }
                >
                  {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.DEACTIVATE")}
                </Button>
              </div>
            </li>
            <li className="listing-box d-sm-flex d-block justify-content-between">
              <div className="pr-md-3">
                <h4 className="text-body-16">
                  {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CLOSE_ACCOUNT")}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {lang(
                    "MY_ACCOUNTS.ACCOUNT_SETTINGS.CLOSE_ACCOUNT_DESCRIPTION"
                  )}
                </p>
              </div>
              <div className="mt-sm-0 mt-3">
                <Button
                  variant="outline-info ml-sm-3 w-sm-100"
                  size="sm"
                  onClick={() => dispatch(toggleModals({ closeaccount: true }))}
                >
                  {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CLOSE")}
                </Button>
              </div>
            </li>
          </ul>
        </Card.Body>
      </Card>
      {/******************* 
           @purpose : Account suspention confirms for My accounts Modal
           @Author : INIC
           ******************/}
      {
        <MainModal
          className="account-suspention-confirms only-body-modal"
          show={accountsuspentionconfirms}
          keyModal="accountsuspentionconfirms"
          centered
          body={<AccountSuspentionConfirms />}
          headerClassName="mb-50 block md-mb-30"
        />
      }
      {/******************* 
           @purpose : Close account for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="close-account only-body-modal"
        show={closeaccount}
        keyModal="closeaccount"
        centered
        body={<CloseAccount />}
        headerClassName="mb-50 block md-mb-30"
      />
    </Fragment>
  );
};
export default SuspenseAndTerminate;
