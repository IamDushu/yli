import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { onImageError } from "utils";

const Company = ({
  lang,
  searchData,
  router,
  setShowAll,
  showAll,
  selectedFilters,
}) => {
  return (
    <div>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COMPANIES"))) &&
        searchData?.searchResults?.companies?.rows.length > 0 && (
          <Card className="mb-3">
            <Card.Body className="p-0">
              <h3 className="h6 mb-0 px-3 py-12">
                {lang("GLOBAL_SEARCH.FILTER.COMPANIES")}
              </h3>
              <Container fluid>
                <Row className="custom-col-box four-grid-spacing-md row-col-10 pb-3">
                  {searchData?.searchResults?.companies?.rows.map(
                    (org, key) => {
                      return (
                        key <= 3 &&
                        !showAll.companies && (
                          <Col lg={3} sm={6} key={key}>
                            <Card
                              className="text-center position-relative h-100 p-3"
                              onClick={() => {
                                router.push({
                                  pathname: "/profile/company-profile",
                                  query: {
                                    companyId: org.id,
                                    name: org?.companyName,
                                    userId: org?.userDetails?.id,
                                  },
                                });
                              }}
                            >
                              <div>
                                <picture
                                  className="user-profile-pic mt-2 d-inline-block rounded-pill mb-3 pointer"
                                  onContextMenu={(e) => e.preventDefault()}
                                >
                                  <source srcSet={org?.logo} type="image/jpg" />
                                  <img
                                    src={org?.logo ?? ""}
                                    width="70"
                                    height="70"
                                    onError={(e) =>
                                      onImageError(
                                        e,
                                        "profile",
                                        org?.companyName
                                      )
                                    }
                                  />
                                </picture>
                              </div>
                              <div>
                                <div>
                                  <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                                    {org.companyName}
                                  </h5>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        )
                      );
                    }
                  )}
                  {searchData?.searchResults?.companies?.rows?.map(
                    (org, index) => {
                      return (
                        showAll.companies && (
                          <Col lg={3} sm={6} key={index}>
                            <Card
                              className="text-center position-relative h-100 p-3"
                              onClick={() => {
                                router.push({
                                  pathname: "/profile/company-profile",
                                  query: {
                                    companyId: org.id,
                                    name: org?.companyName,
                                    userId: org?.userDetails?.id,
                                  },
                                });
                              }}
                            >
                              {" "}
                              <div>
                                <picture className="user-profile-pic mt-2 d-inline-block rounded-pill mb-3 pointer">
                                  <source srcSet={org?.logo} type="image/jpg" />
                                  <img
                                    src={org?.logo ?? ""}
                                    width="70"
                                    height="70"
                                    onError={(e) =>
                                      onImageError(
                                        e,
                                        "profile",
                                        org?.companyName
                                      )
                                    }
                                  />
                                </picture>
                              </div>
                              <div className="">
                                <div>
                                  <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                                    {org.companyName}
                                  </h5>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        )
                      );
                    }
                  )}
                </Row>
              </Container>
              {searchData?.searchResults?.companies?.rows.length > 4 && (
                <div className="people-tab-view-all-button my-2 border-top border-geyser pt-2">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        companies: !showAll.companies,
                      });
                    }}
                  >
                    {!showAll.companies
                      ? lang("COMMON.VIEW_ALL")
                      : lang("COMMON.VIEW_LESS")}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COMPANIES")) &&
        searchData?.searchResults?.companies?.rows.length === 0 && (
          <p>No Companies Found</p>
        )}
    </div>
  );
};

export default Company;
