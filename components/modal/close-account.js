import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout, toggleModals } from "../../store/actions";
import { permanentlyCloseAccount } from "../../store/actions/my-account";
import WithAuth from "components/with-auth/with-auth";
import { useTranslation } from "react-i18next";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
const CloseAccount = () => {
  const [lang] = useTranslation("language");

  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(
      permanentlyCloseAccount(() => {
        dispatch(toggleModals({ closeaccount: false }));
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
        <div className="mx-lg-5 px-sm-2">
          <h2 className="h5 mt-md-4 mt-2 mb-2">
            {lang("MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.CLOSE_ACCOUNT")}
          </h2>
          <h6 className="text-body-16 font-weight-normal mb-0">
            {lang("MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.CLOSE_ACCOUNT_DESCRIPTION")}
          </h6>
          <div className="d-flex justify-content-center">
            <Button
              variant="dark"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold mt-4 mx-sm-2 btn mr-3 mr-md-0"
              onClick={() => dispatch(toggleModals({ closeaccount: false }))}
            >
              {lang("MY_ACCOUNTS.FORM.SUSPEND_ACCOUNT.BACK")}
            </Button>
            <Button
              variant="info"
              type="submit"
              className="mb-50 md-mb-30 font-weight-semibold px-5 mt-4 mx-sm-2 btn"
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

export default WithAuth(CloseAccount);
