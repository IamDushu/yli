import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import dynamic from "next/dynamic";
const PaymentHistoryModal = dynamic(() =>
  import("components/modal/paymentHistory")
);
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);

/******************** 
  @purpose : Payment History
  @Parameter : {}
  @Author : INIC
  ******************/
const PaymentHistory = ({ currentSubMenu, handleChange }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { paymentmodal } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [showContent, setShowContent] = useState(false);
  const [currentListing, setCurrentListing] = useState("purchaseHistory");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [total, setTotal] = useState(10);
  const [data, setData] = useState([]);

  const handleClose = () => {
    dispatch(toggleModals({ paymentmodal: false }));
    setStartDate("");
    setEndDate("");
    setPage(1);
    setPageSize(10);
    setCurrentListing("purchaseHistory");
  };
  return (
    <Fragment>
      <li className="listing-box d-sm-flex d-block justify-content-between">
        <div className="pr-md-3">
          <h4 className="text-body-16">
            {" "}
            {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PAYMENTS")}
          </h4>
          <p className="text-body-14 font-weight-normal m-0">
            {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PAYMENTS_DESCRIPTION")}
          </p>
        </div>
        <div className="mt-sm-0 mt-3">
          <Button
            variant="outline-info ml-sm-3 w-sm-100"
            size="sm"
            onClick={() => dispatch(toggleModals({ paymentmodal: true }))}
          >
            {lang("COMMON.VIEW")}
          </Button>
        </div>
      </li>
      <MainModal
        className="paymentmodal-modal custom-modal-footer"
        show={paymentmodal}
        keyModal="paymentmodal"
        header={
          <h3 className="h6 m-0">
            {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.PAYMENTS")}
          </h3>
        }
        handleClose={handleClose}
        body={
          <PaymentHistoryModal
            currentSubMenu={currentSubMenu}
            handleChange={handleChange}
            showContent={showContent}
            setShowContent={setShowContent}
            currentListing={currentListing}
            setCurrentListing={setCurrentListing}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            page={page}
            setPage={setPage}
            pagesize={pagesize}
            setPageSize={setPageSize}
            data={data}
            setData={setData}
            total={total}
            setTotal={setTotal}
            paymentmodal={paymentmodal}
          />
        }
        headerClassName="mb-50 block md-mb-30"
      />
    </Fragment>
  );
};

export default PaymentHistory;
