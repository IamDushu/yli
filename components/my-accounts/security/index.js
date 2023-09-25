import React from "react";
import { Card, Button } from "react-bootstrap";
import { toggleModals } from "../../../store/actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "store/selectors/user";
import moment from "moment";
import { showMessageNotification } from "utils";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AccountChangePassword = dynamic(() =>
  import("components/modal").then((mod) => mod.AccountChangePassword)
);
/******************** 
  @purpose :  Change Account Password
  @Parameter : {}
  @Author : INIC
  ******************/
const Security = () => {
  const dispatch = useDispatch();
  const { accountChangePassword } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const userInfo = useSelector(selectUserInfo);
  const { passwordUpdatedAt, authType } = userInfo;
  const [lang] = useTranslation("language");
  return (
    <>
      <Card className="mb-10">
        <Card.Body className="d-sm-flex align-items-center justify-content-between">
          <div className="pr-md-3">
            <h4 className="text-body-16">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CHANGE_PASSWORD")}
            </h4>
              <p className="text-body-14 font-weight-normal m-0">
                {lang(
                  "MY_ACCOUNTS.ACCOUNT_SETTINGS.CHANGE_PASSWORD_DESCRIPTION"
                )}{" "}
                {passwordUpdatedAt &&
                  `Latest Update:${moment(+passwordUpdatedAt).format("LL")}`}
              </p>
          </div>
          <div className="mt-sm-0 mt-3">
            <Button
              variant="outline-info ml-sm-3 w-sm-100"
              size="sm"
              onClick={() => {
                  dispatch(toggleModals({ accountChangePassword: true }));              
              }}
            >
              {lang("MY_ACCOUNTS.COMMON.CHANGE")}
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/******************* 
           @purpose : Account change password for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="account-change-password custom-modal-footer"
        show={accountChangePassword}
        keyModal="accountChangePassword"
        centered
        body={<AccountChangePassword />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 m-0">
            {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CHANGE_PASSWORD")}
          </h2>
        }
      />
    </>
  );
};
export default Security;
