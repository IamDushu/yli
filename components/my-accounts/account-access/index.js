import React from "react";
import { Card, Button } from "react-bootstrap";
import { toggleModals } from "../../../store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AccountAccessPhone = dynamic(() =>
  import("components/modal").then((mod) => mod.AccountAccessPhone)
);
const AccountAccessEmail = dynamic(() =>
  import("components/modal").then((mod) => mod.AccountAccessEmail)
);
/******************** 
  @purpose : Account Access
  @Parameter : {}
  @Author : INIC
  ******************/
const AccountAccess = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { accountaccessphone, accountaccessemail } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  return (
    <>
      <Card className="mb-10">
        <Card.Body className="d-xl-flex align-items-center justify-content-between">
          <div className="pr-md-3">
            <h4 className="text-body-16">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.ACCOUNT_ACCESS")}
            </h4>
            <p className="text-body-14 font-weight-normal m-0">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.ACCOUNT_ACCESS_DESCRIPTION")}
            </p>
          </div>
          <div className="d-md-flex mt-xl-0 mt-3">
            <Button
              variant="outline-info w-xl-100"
              size="sm"
              onClick={() =>
                dispatch(toggleModals({ accountaccessphone: true }))
              }
            >
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CHANGE_PHONE")}
            </Button>
            <Button
              variant="outline-info w-xl-100 ml-md-3 mt-md-0 mt-2 ml-0"
              size="sm"
              onClick={() =>
                dispatch(toggleModals({ accountaccessemail: true }))
              }
            >
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CHANGE_EMAIL")}
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/******************* 
           @purpose : Account access email for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="account-access-email custom-modal-footer"
        show={accountaccessemail}
        keyModal="accountaccessemail"
        centered
        body={<AccountAccessEmail />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Account Access Email</h2>}
      />
      {/******************* 
           @purpose : Account access phone for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="account-access-phone custom-modal-footer"
        show={accountaccessphone}
        keyModal="accountaccessphone"
        centered
        body={<AccountAccessPhone />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Account Access Phone</h2>}
      />
    </>
  );
};
export default AccountAccess;
