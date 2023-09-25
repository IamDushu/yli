import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import SpeakerCard from "./speaker-card";
import { useRouter } from "next/router";

const FollowerList = ({ followerPagesize, setFollowerPagesize }) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { instituteId, companyId } = router.query;
  const followerlistLi = useSelector(
    (state) => state?.learningInstitute?.followerList
  );
  const followerlistCo = useSelector((state) => state?.company?.followerList);

  let followerlist =
    instituteId !== undefined
      ? followerlistLi
      : companyId !== undefined
      ? followerlistCo
      : [];
  /*******************
  @purpose : Rander HTML React Component for followers filter
  @Author : YLIWAY
  ******************/
  return (
    <Card className="mt-3  pt-3 border-radius-zero">
      <h6 className="heading-followers px-3">{lang("COMMON.FOLLOWERS")}</h6>

      <Row className="mb-2">
        {followerlist?.rows?.length > 0 && (
          <Col className="mt-md-3 mt-2">
            <div
              className="d-flex flex-row flex-wrap px-2 "
              style={{ justifyContent: "flex-start" }}
            >
              {followerlist?.rows?.map((data) => (
                <SpeakerCard key={data?.userDetails?.profileId} data={data} />
              ))}
            </div>
          </Col>
        )}
      </Row>
      {followerlist?.rows?.length < followerlist?.total && (
        <a
          className="border-top-gray text-body-14 py-12 text-center people-tab-view-all-button-text"
          onClick={() => setFollowerPagesize(followerPagesize + 4)}
        >
          Load More
        </a>
      )}
      <Row>
        <Col>
          {!followerlist?.rows?.length && (
            <div className="font-14 text-charcoal-grey d-block text-center p-1">
              {lang("LEARNING_INSTITUTE.PEOPLE_TAB.NO_FOLLOWERS_FOUND")}
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
};
export default FollowerList;
