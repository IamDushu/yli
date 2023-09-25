import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "../../../store/actions";
import { post } from "../../../api";
import { PAYMENT_API_URL } from "../../../config";
import { CHECK_CAPABILITY, LINK_STRIPE_ACCOUNT } from "../../../api/routes";
import { removeQueryParamsFromRouter } from "../../../utils";
import { selectUserInfo } from "../../../store/selectors/user";
import { useTranslation } from "react-i18next";
/******************** 
  @purpose : Redeem 
  @Parameter : {}
  @Author : INIC
  ******************/
const Redeem = ({ currentSubMenu, handleChange }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);
  const noCredits =
    (userInfo && !userInfo?.credits) ||
    (userInfo && Number(userInfo?.credits) < 1);
  const handleClick = async () => {
    if (noCredits) return;
    const response = await post(
      { serviceURL: PAYMENT_API_URL },
      CHECK_CAPABILITY,
      false,
      { capability: "transfers" },
      true
    );
    if (response.status !== 1) return;

    if (response.data.status !== "active") {
      const accountLinkResponse = await post(
        { serviceURL: PAYMENT_API_URL },
        LINK_STRIPE_ACCOUNT,
        false,
        {},
        true
      );
      if (accountLinkResponse.status === 1)
        return window.open(accountLinkResponse.data.url);
      return;
    }

    dispatch(toggleModals({ redeem: true }));
  };

  useEffect(() => {
    if (router.query?.redeem === "true") {
      removeQueryParamsFromRouter(router, ["redeem"]);
      handleClick();
    }
  }, [router.query?.redeem]);

  return (
    <li className="listing-box d-sm-flex d-block justify-content-between">
      <div className="pr-md-3">
        <h4 className="text-body-16">
          {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.REDEEM")}
        </h4>
        <p className="text-body-14 font-weight-normal m-0">
          {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.REDEEM_DESCRIPTION")}
        </p>
      </div>
      <div className="mt-sm-0 mt-3">
        <Button
          variant="outline-info ml-sm-3 w-sm-100"
          size="sm"
          disabled={noCredits}
          onClick={handleClick}
        >
          {lang("COMMON.VIEW")}
        </Button>
      </div>
    </li>
  );
};
export default Redeem;
