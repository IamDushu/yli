import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { onImageError } from "utils";
import { Link } from "../../routes";

const SearchGroup = ({
  lang,
  selectedFilters,
  searchData,
  setShowAll,
  showAll,
  router,
}) => {
  return (
    <div>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.GROUPS"))) &&
        searchData?.searchResults?.groups?.rows.length > 0 && (
          <Card className="mb-3">
            <Card.Body className="p-0">
              <h3 className="h6 mb-0 px-3 py-12">
                {lang("GLOBAL_SEARCH.FILTER.GROUPS")}
              </h3>
              <Container fluid>
                <Row className="custom-col-box four-grid-spacing-md row-col-10">
                  {searchData?.searchResults?.groups?.rows?.map(
                    (group, key) => {
                      return (
                        key <= 3 &&
                        !showAll.groups && (
                          <Col md={4} xl={3} key={key} className="mb-sm-3">
                            <Card
                              className="text-center position-relative h-100"
                              onClick={() =>
                                router.push(`/groups/${group.name}/${group.id}`)
                              }
                            >
                              <Card.Body className="pt-4">
                                <picture
                                  className="user-profile-pic mt-2 d-inline-block rounded-pill mb-3 pointer"
                                  onContextMenu={(e) => e.preventDefault()}
                                >
                                  <source
                                    srcSet={group.imageURL}
                                    type="image/jpg"
                                  />
                                  <img
                                    src={group.imageURL}
                                    width="70"
                                    height="70"
                                    onError={(e) => onImageError(e)}
                                  />
                                </picture>
                                <div>
                                  <div>
                                    <a>
                                      <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                                        {group.name}
                                      </h5>
                                    </a>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        )
                      );
                    }
                  )}
                  {searchData?.searchResults?.groups?.rows?.map((group, i) => {
                    return (
                      showAll.groups && (
                        <Col md={4} xl={3} key={i} className="mb-sm-3">
                          <Card
                            className="text-center position-relative h-100"
                            onClick={() =>
                              router.push(`/groups/${group.name}/${group.id}`)
                            }
                          >
                            <Card.Body className="pt-4">
                              <picture className="user-profile-pic mt-2 d-inline-block rounded-pill mb-3 pointer">
                                <source
                                  srcSet={group.imageURL}
                                  type="image/jpg"
                                />
                                <img
                                  src={group.imageURL}
                                  width="70"
                                  height="70"
                                  onError={(e) => onImageError(e)}
                                />
                              </picture>
                              <div>
                                <div>
                                  <a>
                                    <h5 className="text-body-14 mb-1 text-ellipsis pointer">
                                      {group.name}
                                    </h5>
                                  </a>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    );
                  })}
                </Row>
              </Container>
              {searchData?.searchResults?.groups?.rows.length > 4 && (
                <div className="people-tab-view-all-button my-2 border-top border-geyser pt-2">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        groups: !showAll.groups,
                      });
                    }}
                  >
                    {!showAll.groups
                      ? lang("COMMON.VIEW_ALL")
                      : lang("COMMON.VIEW_LESS")}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.GROUPS")) &&
        searchData?.searchResults?.groups?.rows.length === 0 && (
          <p>No Groups Found</p>
        )}
    </div>
  );
};

export default SearchGroup;
