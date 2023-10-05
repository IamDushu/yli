import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import NoSearchResult from "./noSearchResult";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const SearchGroup = ({
  lang,
  selectedFilters,
  searchData,
  setShowAll,
  showAll,
  router,
}) => {
  return (
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.GROUPS"))) &&
        searchData?.searchResults?.groups?.rows.length > 0 && (
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
                {lang("GLOBAL_SEARCH.FILTER.GROUPS")}
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
                  {searchData?.searchResults?.groups?.rows.map((groups, i) => {
                    return (
                      i <= 3 &&
                      !showAll.groups && (
                        <Card
                          className="secondary-card abstract-card-v2"
                          style={{
                            width: "166px",
                            height: "152px",
                            position: "relative",
                            borderRadius: "0px",
                          }}
                          onClick={() => {
                            router.push(`/groups/${groups.name}/${groups.id}`);
                          }}
                        >
                          <div className="position-relative pointer">
                            <CardMedia
                              component="img"
                              height="70px"
                              className="w-100"
                              src={
                                groups?.imageURL ||
                                "../assets/images/circles-no-img.jpg"
                              }
                              alt={groups?.name}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src =
                                  "../assets/images/circles-no-img.jpg";
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
                                {groups?.name?.charAt(0).toUpperCase() +
                                  groups?.name?.slice(1)}
                              </h6>
                            </div>
                            {groups?.name && (
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  <span style={{ color: "#49454E" }}>
                                    {`${groups?.name || ""}`.trim()}
                                  </span>
                                </small>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    );
                  })}
                  {searchData?.searchResults?.groups?.rows.map((groups, i) => {
                    return (
                      showAll.groups && (
                        <Card
                          className="secondary-card abstract-card-v2 mb-2"
                          style={{
                            width: "166px",
                            height: "152px",
                            position: "relative",
                            borderRadius: "0px",
                          }}
                          onClick={() => {
                            router.push(`/groups/${groups.name}/${groups.id}`);
                          }}
                        >
                          <div className="position-relative pointer">
                            <CardMedia
                              component="img"
                              height="70px"
                              className="w-100"
                              src={
                                groups?.imageURL ||
                                "../assets/images/circles-no-img.jpg"
                              }
                              alt={groups?.name}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src =
                                  "../assets/images/circles-no-img.jpg";
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
                                {groups?.name?.charAt(0).toUpperCase() +
                                  groups?.name?.slice(1)}
                              </h6>
                            </div>

                            {groups?.name && (
                              <div className="text-ellipsis d-flex align-items-center justify-content-between">
                                <small className="font-weight-semi-bold text-card-name text-body-12">
                                  <span style={{ color: "#49454E" }}>
                                    {`${groups?.name || ""}`.trim()}
                                  </span>
                                </small>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    );
                  })}
                </div>
              </div>
              {searchData?.searchResults?.groups?.rows.length > 4 && (
                <div className="people-tab-view-all-button mt-2 pt-2 d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        groups: !showAll.groups,
                      });
                    }}
                  >
                    {!showAll.groups ? (
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

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.GROUPS")) &&
        searchData?.searchResults?.groups?.rows.length === 0 && (
          <NoSearchResult lang={lang} />
        )}
    </div>
  );
};

export default SearchGroup;
