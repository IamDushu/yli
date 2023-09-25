import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import SpeakerCard from "./speaker-card";
import { useRouter } from "next/router";

const PeopleList = ({ peoplePagesize, setPeoplePagesize }) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { instituteId, companyId } = router.query;

  const peopleListLi = useSelector(
    (state) => state?.learningInstitute?.peopleList
  );

  const peopleListCo = useSelector((state) => state?.company?.peopleList);

  let peopleList =
    instituteId !== undefined
      ? peopleListLi
      : companyId !== undefined
      ? peopleListCo
      : [];
  /*******************
  @purpose : Rander HTML React Component for followers filter
  @Author : INIC
  ******************/
  return (
    <Card className="mt-3 mb-2  pt-3 border-radius-zero">
      <h6 className="heading-followers px-3">{lang("COMMON.PEOPLE")}</h6>

      {peopleList?.rows?.length > 0 && (
        <Row>
          <Col className="mt-md-3 mt-2">
            <div
              className="d-flex flex-row flex-wrap px-2"
              style={{ justifyContent: "flex-start" }}
            >
              <>
                {peopleList?.rows?.map((data) => (
                  <SpeakerCard key={data?.userDetails?.profileId} data={data} />
                ))}
              </>
            </div>
          </Col>
        </Row>
      )}

      {peopleList?.rows?.length < peopleList.total && (
        <a
          className="border-top-gray text-body-14 py-12 text-center people-tab-view-all-button-text "
          onClick={() => setPeoplePagesize(peoplePagesize + 4)}
        >
          Load More
        </a>
      )}

      {!peopleList?.rows?.length && (
        <div className="font-14 text-charcoal-grey d-block text-center p-2">
          {lang("LEARNING_INSTITUTE.PEOPLE_TAB.NO_PEOPLE_FOUND")}
        </div>
      )}
    </Card>
  );
};
export default PeopleList;
