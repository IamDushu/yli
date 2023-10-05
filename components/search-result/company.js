import React from "react";
import { Col } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StarRatings from "react-star-ratings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Company = ({
  lang,
  searchData,
  router,
  setShowAll,
  showAll,
  selectedFilters,
}) => {
  return (
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COMPANIES"))) &&
        searchData?.searchResults?.companies?.rows.length > 0 && (
          <Card className="mb-3">
            <div className="p-2 pb-4 ">
              <h3
                className="mb-0 px-3 py-3"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {" "}
                {lang("GLOBAL_SEARCH.FILTER.COMPANIES")}
              </h3>
              <div className="pb-2 video-courses-rightbar">
                <div
                  className="pt-1 px-3 d-flex flex-wrap"
                  style={{
                    columnGap: "0.5rem",
                    rowGap: "1.5rem",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {searchData?.searchResults?.companies?.rows.map(
                    (companies, i) => {
                      return (
                        i <= 3 &&
                        !showAll.companies && (
                          <Card
                            className="secondary-card abstract-card-v2"
                            style={{
                              width: "166px",
                              height: "152px",
                              position: "relative",
                              borderRadius: "0px",
                            }}
                            onClick={() => {
                              router.push({
                                pathname: "/profile/company-profile",
                                query: {
                                  companiesId: companies.id,
                                  name: companies?.companyName,
                                  userId: companies?.userDetails?.id,
                                },
                              });
                            }}
                          >
                            <div className="position-relative pointer">
                              <CardMedia
                                component="img"
                                height="70px"
                                className="w-100"
                                src={
                                  companies?.logo ||
                                  "../assets/images/company-no-img.jpg"
                                }
                                alt={companies?.companyName}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "../assets/images/company-no-img.jpg";
                                }}
                              />
                            </div>
                            <CardContent className="p-1">
                              <div className="title-container">
                                <h6
                                  className="text-body-14 pointer ellipsis"
                                  style={{
                                    fontWeight: "500",
                                    color: "#6750A4",
                                    lineHeight: "20px",
                                    letterSpacing: "0.1px",
                                  }}
                                >
                                  {companies?.companyName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    companies?.companyName?.slice(1)}
                                </h6>
                              </div>
                              {companies?.companyStrength && (
                                <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                  <small className="font-weight-semi-bold text-card-name text-body-12">
                                    <span style={{ color: "#49454E" }}>
                                      {`${
                                        companies?.companyStrength || ""
                                      }`.trim()}
                                    </span>
                                  </small>
                                </div>
                              )}
                              <StarRatings
                                rating={companies?.rating ?? 0}
                                starDimension="10.44px"
                                starSpacing="1px"
                                starRatedColor="#FFC635"
                              />
                            </CardContent>
                          </Card>
                        )
                      );
                    }
                  )}
                  {searchData?.searchResults?.companies?.rows.map(
                    (companies, i) => {
                      return (
                        showAll.companies && (
                          <Card
                            className="secondary-card abstract-card-v2 mb-2"
                            style={{
                              width: "166px",
                              height: "152px",
                              position: "relative",
                              borderRadius: "0px",
                            }}
                            onClick={() => {
                              router.push({
                                pathname: "/profile/company-profile",
                                query: {
                                  companiesId: companies.id,
                                  name: companies?.companyName,
                                  userId: companies?.userDetails?.id,
                                },
                              });
                            }}
                          >
                            <div className="position-relative pointer">
                              <CardMedia
                                component="img"
                                height="70px"
                                className="w-100"
                                src={
                                  companies?.logo ||
                                  "../assets/images/company-no-img.jpg"
                                }
                                alt={companies?.companyName}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "../assets/images/company-no-img.jpg";
                                }}
                              />
                            </div>
                            <CardContent className="p-1">
                              <div className="title-container">
                                <h6
                                  className="text-body-14 pointer ellipsis"
                                  style={{
                                    fontWeight: "500",
                                    color: "#6750A4",
                                    lineHeight: "20px",
                                    letterSpacing: "0.1px",
                                  }}
                                >
                                  {companies?.companyName
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    companies?.companyName?.slice(1)}
                                </h6>
                              </div>

                              {companies.companyStrength && (
                                <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                  <small className="font-weight-semi-bold text-card-name text-body-12">
                                    <span style={{ color: "#49454E" }}>
                                      {`${
                                        companies?.companyStrength || ""
                                      }`.trim()}
                                    </span>
                                  </small>
                                </div>
                              )}
                              <StarRatings
                                rating={companies?.rating ?? 0}
                                starDimension="10.44px"
                                starSpacing="1px"
                                starRatedColor="#FFC635"
                              />
                            </CardContent>
                          </Card>
                        )
                      );
                    }
                  )}
                </div>
              </div>
              {searchData?.searchResults?.companies?.rows.length > 4 && (
                <div className="people-tab-view-all-button mt-2 pt-2 d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        companies: !showAll.companies,
                      });
                    }}
                  >
                    {!showAll.companies ? (
                      <>
                        <AddIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.LOAD_MORE")}</span>
                      </>
                    ) : (
                      <>
                        <RemoveIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.VIEW_LESS")}</span>
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.COMPANIES")) &&
        searchData?.searchResults?.companies?.rows.length === 0 && (
          <NoSearchResult lang={lang} />
        )}
    </div>
  );
};

export default Company;
