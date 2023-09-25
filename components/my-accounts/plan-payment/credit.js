import React from "react";
import { Card, Button } from "react-bootstrap";
import { toggleModals } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
/******************** 
  @purpose : Add Card/Credit
  @Parameter : {}
  @Author : INIC
  ******************/
const Credit = ({ currentSubMenu, handleChange }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const handleClick = () => {
    // handleChange('Credit');
    dispatch(toggleModals({ addcredit: true }));
  };
  return (
    <li className="listing-box d-sm-flex d-block justify-content-between">
      <div className="pr-md-3">
        <h4 className="text-body-16">
          {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CREDIT")}
        </h4>
        <p className="text-body-14 font-weight-normal m-0">
          {" "}
          {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.CREDIT_DESCRIPTION")}
        </p>
      </div>
      <div className="mt-sm-0 mt-3">
        <Button
          variant="outline-info ml-sm-3 w-sm-150 mb-sm-0 mb-2"
          size="sm"
          onClick={handleClick}
        >
          {lang("RIGHT_SIDEBAR.OTHER_VIEWS.ADD_CREDITS")}
        </Button>
        <Button
          variant="outline-info ml-sm-3 w-sm-150"
          size="sm"
          onClick={() => dispatch(toggleModals({ addcard: true }))}
        >
          {lang("COMMON.ADD_CARD")}
        </Button>
      </div>
    </li>
  );
};
export default Credit;
