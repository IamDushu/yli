import React, { Fragment, useEffect } from "react";
import Datetime from "react-datetime";
import { Button, Form, Row, Col, Table, Modal } from "react-bootstrap";
import moment from "moment";
import Pagination from "rc-pagination";
import { useTranslation } from "react-i18next";
import { post } from "api";
import { PAYMENT_API_URL } from "config";
import { PURCHASE_DETAIL, PURCHASE_HISTORY } from "api/routes";

/******************** 
  @purpose : Payment History
  @Parameter : {}
  @Author : INIC
  ******************/
const PaymentHistoryModal = ({
  currentSubMenu,
  handleChange,
  showContent,
  setShowContent,
  currentListing,
  setCurrentListing,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  page,
  setPage,
  pagesize,
  setPageSize,
  data,
  setData,
  total,
  setTotal,
  paymentmodal,
}) => {
  const [lang] = useTranslation("language");

  const fetchData = async (tab, download = false, element, id) => {
    const endPoint =
      tab === "purchaseHistory" ? PURCHASE_HISTORY : PURCHASE_DETAIL;
    const response = await post(
      { serviceURL: PAYMENT_API_URL },
      endPoint,
      false,
      { page, pagesize, startDate, endDate, download, id },
      true
    );
    if (download) {
      let target = element.target || element.srcElement;
      target.innerHTML = lang("MY_ACCOUNTS.FORM.PAYMENTS.LOADING");
      target.disabled = true;
      setTimeout(function () {
        window.open(response?.data?.downloadPath, "_blank");
        target.innerHTML = lang("MY_ACCOUNTS.FORM.PAYMENTS.DOWNLOAD");
        target.disabled = false;
      }, 3000);
    } else if (response.status === 1) {
      setTotal(response.data.total);
      setData(response.data.rows);
    }
  };
  const inputProps = {
    placeholder: lang("MY_ACCOUNTS.FORM.PAYMENTS.SELECT"),
    readOnly: true,
  };
  const changeListingTab = (tab) => {
    setData([]);
    setStartDate("");
    setEndDate("");
    setPage(1);
    setCurrentListing(tab);
  };

  const paginationChange = (page, pagesize) => {
    setPage(page);
    setPageSize(pagesize);
  };

  const handleClick = () => {
    handleChange("Payments");
    setShowContent(!showContent);
  };

  const renderThead = () => {
    switch (currentListing) {
      case "purchaseHistory":
        return (
          <thead>
            <tr>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.SR_NO")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.DATE")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.AMOUNT")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.CREDIT_DEDUCTED")}</th>
            </tr>
          </thead>
        );

      default:
        return (
          <thead>
            <tr>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.SR_NO")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.DATE")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.ACTIVITY_TYPE")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.TITLE")}</th>
              <th>{lang("MY_ACCOUNTS.FORM.PAYMENTS.CREDITS")}</th>
            </tr>
          </thead>
        );
    }
  };

  const renderItem = ({
    id,
    no,
    amount,
    planData,
    creditReceived,
    creditDeduct,
    createdAt,
    courseData,
    virtualData,
    type,
    transactionData,
    invoiceFile,
  }) => {
    createdAt = Number(createdAt) || new Date();
    switch (currentListing) {
      case "purchaseHistory":
        return (
          <tr key={id}>
            <td>{no}</td>
            <td>{moment(createdAt).format("DD MMM YYYY")}</td>
            <td>${amount || 0} </td>
            <td>{creditReceived || 0}</td>
            <td>
              <div className="pt-2">
                <em className="icon icon-document font-24"></em>
              </div>
            </td>
            <td>
              <Button
                variant="outline-info font-12 text-uppercase py-2 btn-sm"
                onClick={(element) => {
                  let target = element.target || element.srcElement;
                  target.innerHTML = lang("MY_ACCOUNTS.FORM.PAYMENTS.LOADING");
                  target.disabled = true;
                  fetchData(currentListing, true, element, id);
                }}
              >
                {lang("MY_ACCOUNTS.FORM.PAYMENTS.DOWNLOAD")}
              </Button>
            </td>
          </tr>
        );

      default:
        return (
          <tr key={id}>
            <td>{no}</td>
            <td>{moment(createdAt).format("DD MMM YYYY")}</td>
            <td>{courseData?.title || virtualData?.title || "Plans"}</td>
            <td>
              {planData
                ? planData?.subscriptionType
                : type === "course"
                ? courseData?.courseType === "online" && "Online Course"
                : (virtualData?.virtualEventType === "training-room" &&
                    "Training Room") ||
                  (virtualData?.virtualEventType === "business-network-room" &&
                    "Business Network Room") ||
                  (virtualData?.virtualEventType === "webinar" && "Webinar") ||
                  (virtualData?.virtualEventType === "event" && "Event") ||
                  (virtualData?.virtualEventType === "master-class" &&
                    "Master Class") ||
                  (virtualData?.virtualEventType === "coaching-room" &&
                    "Coaching Room")}
            </td>
            <td>{transactionData?.amount || 0}</td>
          </tr>
        );
    }
  };

  useEffect(() => {
    fetchData(currentListing);
  }, [page, currentListing, paymentmodal]);

  useEffect(() => {
    if (currentSubMenu !== "Payments" && showContent) {
      setShowContent(false);
    }
  }, [currentSubMenu]);
  return (
    <Fragment>
      <Modal.Body className="p-3">
        <div>
          <div className="d-lg-flex mb-3">
            <div className="custom-radio custom-radio-outline mr-3 mb-md-0 mb-2">
              <label
                htmlFor="purchase-history"
                className="text-body-14 font-weight-normal"
              >
                <input
                  type="radio"
                  name="pay-purchase-history"
                  id="purchase-history"
                  autoComplete="off"
                  onChange={() => changeListingTab("purchaseHistory")}
                  checked={currentListing === "purchaseHistory"}
                />
                <span></span>
                {lang("MY_ACCOUNTS.FORM.PAYMENTS.PURCHASE_HISTORY")}
              </label>
            </div>
            <div className="custom-radio custom-radio-outline mr-3 mb-md-0 mb-2">
              <label
                htmlFor="payment-detail"
                className="text-body-14 font-weight-normal"
              >
                <input
                  type="radio"
                  name="pay-purchase-detail"
                  id="payment-detail"
                  autoComplete="off"
                  onChange={() => changeListingTab("purchaseDetail")}
                  checked={currentListing === "purchaseDetail"}
                />
                <span></span>{" "}
                {lang("MY_ACCOUNTS.FORM.PAYMENTS.PURCHASE_DETAIL")}
              </label>
            </div>
          </div>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {lang("MY_ACCOUNTS.FORM.PAYMENTS.FROM")}
                </Form.Label>
                <div className="calendar-wrap">
                  <Datetime
                    closeOnSelect
                    utc={true}
                    inputProps={inputProps}
                    timeFormat={false}
                    value={startDate}
                    dateFormat="DD/MM/YYYY"
                    isValidDate={(currentDate) =>
                      endDate ? currentDate.isBefore(endDate) : true
                    }
                    renderInput={(props) => {
                      return (
                        <input
                          {...props}
                          value={startDate ? props.value : ""}
                        />
                      );
                    }}
                    onChange={(value) => setStartDate(value.utc().valueOf())}
                  />
                  <em className="icon icon-calendar"></em>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {lang("MY_ACCOUNTS.FORM.PAYMENTS.TO_DATE")}{" "}
                </Form.Label>
                <div className="calendar-wrap">
                  <Datetime
                    closeOnSelect
                    utc={true}
                    inputProps={inputProps}
                    timeFormat={false}
                    value={endDate}
                    dateFormat="DD/MM/YYYY"
                    isValidDate={(currentDate) => {
                      return startDate
                        ? currentDate.isAfter(startDate)
                        : currentDate.isBefore(new Date());
                    }}
                    renderInput={(props) => {
                      return (
                        <input {...props} value={endDate ? props.value : ""} />
                      );
                    }}
                    onChange={(value) => setEndDate(value.utc().valueOf())}
                  />
                  <em className="icon icon-calendar"></em>
                </div>
              </Form.Group>
            </Col>

            <Col md={12} className="text-right">
              <Button
                variant="outline-info px-3 mb-20"
                onClick={() => fetchData(currentListing)}
              >
                {lang("MY_ACCOUNTS.FORM.PAYMENTS.EXECUTE")}
              </Button>
              {data && data.length > 0 && (
                <Button
                  variant="outline-info px-3 mb-20 ml-2"
                  onClick={(e) => {
                    fetchData(currentListing, true, e);
                  }}
                >
                  {lang("MY_ACCOUNTS.FORM.PAYMENTS.DOWNLOAD")}
                </Button>
              )}
            </Col>
          </Row>
          <div>
            <Table
              className="video-listed-item-table font-14 mt-2"
              responsive="lg"
            >
              {renderThead()}
              <tbody className="text-nowrap">
                {data.length > 0 &&
                  data.map((item, idx) => {
                    const no = (page - 1) * 10 + (idx + 1);
                    return renderItem({ ...item, no });
                  })}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Pagination
              className="d-flex custom-pagination justify-content-center mt-3 mt-sm-0 mb-0"
              pageSize={pagesize}
              current={page}
              total={total}
              showSizeChanger={true}
              totalBoundaryShowSizeChanger={100}
              onChange={paginationChange}
              showTitle={false}
            />
          </div>
        </div>
      </Modal.Body>
    </Fragment>
  );
};

export default PaymentHistoryModal;
