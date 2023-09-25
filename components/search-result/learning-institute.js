import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { onImageError } from "utils";

const LearningInstitute = ({
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
        selectedFilters.includes(
          lang("GLOBAL_SEARCH.FILTER.LEARNING_INSTITUTE")
        )) &&
        searchData?.searchResults?.institute?.rows.length > 0 && (
          <Card className="mb-3">
            <Card.Body className="p-0">
              <h3 className="h6 mb-0 px-3 py-12">
                {lang("GLOBAL_SEARCH.FILTER.LEARNING_INSTITUTE")}
              </h3>
              <Container fluid>
                <Row className="custom-col-box four-grid-spacing-md row-col-10 ">
                  {searchData?.searchResults?.institute?.rows.map(
                    (org, key) => {
                      return (
                        key <= 3 &&
                        !showAll.learningInstitute && (
                          <Col md={4} xl={3} key={key} className="mb-sm-3">
                            <Card
                              className="text-center position-relative h-100 p-3"
                              onClick={() => {
                                router.push({
                                  pathname: "/profile/institute-profile",
                                  query: {
                                    instituteId: org.id,
                                    name: org?.name,
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
                                      onImageError(e, "profile", org?.name)
                                    }
                                  />
                                </picture>
                              </div>
                              <div>
                                <div>
                                  <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                                    {org.name}
                                  </h5>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        )
                      );
                    }
                  )}
                  {searchData?.searchResults?.institute?.rows?.map(
                    (org, index) => {
                      return (
                        showAll.learningInstitute && (
                          <Col md={4} xl={3} key={index} className="mb-sm-3">
                            <Card
                              className="text-center position-relative h-100 p-3"
                              onClick={() => {
                                router.push({
                                  pathname: "/profile/institute-profile",
                                  query: {
                                    instituteId: org.id,
                                    name: org?.name,
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
                                      onImageError(e, "profile", org?.name)
                                    }
                                  />
                                </picture>
                              </div>
                              <div className="">
                                <div>
                                  <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                                    {org.name}
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
              {searchData?.searchResults?.institute?.rows.length > 4 && (
                <div className="people-tab-view-all-button my-2 border-top border-geyser pt-2">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        learningInstitute: !showAll.learningInstitute,
                      });
                    }}
                  >
                    {!showAll.learningInstitute
                      ? lang("COMMON.VIEW_ALL")
                      : lang("COMMON.VIEW_LESS")}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(
        lang("GLOBAL_SEARCH.FILTER.LEARNING_INSTITUTE")
      ) &&
        searchData?.searchResults?.institute?.rows.length === 0 && (
          <p>No Learning Institute Found</p>
        )}
    </div>
  );
};

export default LearningInstitute;
