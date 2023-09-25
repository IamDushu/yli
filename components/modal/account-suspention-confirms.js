import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout, toggleModals } from "../../store/actions";
import { suspendAccount } from "../../store/actions/my-account";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const AccountSuspentionConfirms = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const handleClick = () => {
    dispatch(
      suspendAccount(() => {
        dispatch(toggleModals({ accountsuspentionconfirms: false }));
        dispatch(logout());
      })
    );
  };

  return (
    <>
      <Modal.Body className="text-center">
        {/* <em className="icon-oops-icon font-lg-60 text-info"></em> */}
        <picture className="p-3 rounded-50">
          <source
            srcSet={"../assets/images/icons/error_outline_black.svg"}
            type="image/svg"
          />
          <img
            src={"../assets/images/icons/error_outline_black.svg"}
            alt="error_outline_black"
            width="60px"
            height="60px"
          />
        </picture>

        <div>
          <h2 className="h5 mt-md-4 mt-2 mb-2">
            {lang("MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.SUSPENT_YOUR_ACCOUNT")}
          </h2>
          <h6 className="text-body-16 font-weight-normal mb-0">
            {lang(
              "MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.SUSPENT_YOUR_ACCOUNT_DESCRIPTION"
            )}
          </h6>
          <div className="d-flex justify-content-center">
            <Button
              variant="dark"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold mt-4 mx-sm-2 mr-3 mr-md-0"
              onClick={() =>
                dispatch(toggleModals({ accountsuspentionconfirms: false }))
              }
            >
              {lang("MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.BACK")}
            </Button>
            <Button
              variant="info"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold px-5 mt-4 mx-sm-2"
              onClick={handleClick}
            >
              {lang("MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.YES")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
