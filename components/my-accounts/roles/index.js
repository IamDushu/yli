import React, { Fragment, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getLIRolesList } from "store/actions/my-account";
import { PEER_PRODUCER_URL } from "../../../config";
/******************** 
@purpose : Edit Intro
@Parameter : {}
@Author : INIC
******************/
const Roles = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const list = useSelector((state) => state?.accountSetting?.liRoles);

  /******************** 
   @purpose : for roles listing
   @Parameter : {}
   @Author : INIC
   ******************/
  useEffect(() => {
    dispatch(getLIRolesList());
  }, []);

  return (
    <Fragment>
      <Card className="mb-10">
        {list?.length > 0 ? (
          list?.map((role, index) => (
            <Card.Body
              className="d-sm-flex align-items-center justify-content-between"
              key={"role-" + index}
            >
              <div className="pr-md-3">
                <h4 className="text-body-16">
                  {role?.learningInstituteDetails?.[0]?.name}
                </h4>
                <p className="text-body-14 font-weight-normal m-0">
                  {`You can manage ${role?.role.join(", ")} ${
                    role?.role?.length > 1 ? "pages" : "page"
                  }`}
                </p>
              </div>
              <div className="mt-sm-0 mt-3">
                <Button
                  variant="outline-info ml-sm-3 w-sm-100"
                  size="sm"
                  onClick={() => {
                    window.open(
                      `${PEER_PRODUCER_URL}?instituteId=${role?.learningInstituteDetails?.[0]?.id}`,
                      "_blank"
                    );
                  }}
                >
                  {lang("MY_ACCOUNTS.COMMON.VISIT")}
                </Button>
              </div>
            </Card.Body>
          ))
        ) : (
          <Card.Body className="d-sm-flex align-items-center justify-content-between">
            <div className="pr-md-3">
              <h4 className="text-body-16">
                {lang("MY_ACCOUNTS.COMMON.NO_ROLE")}
              </h4>
            </div>
          </Card.Body>
        )}
      </Card>
    </Fragment>
  );
};
export default Roles;
