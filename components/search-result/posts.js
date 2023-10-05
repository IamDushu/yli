import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import Posts from "../dashboard/Posts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NoSearchResult from "./noSearchResult";

const PostSec = ({
  lang,
  selectedFilters,
  searchData,
  setShowAll,
  showAll,
  userData,
  getAllPost,
  searchText,
}) => {
  return (
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.POSTS"))) &&
        searchData?.searchResults?.posts?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body
              className={
                searchData?.searchResults?.posts?.rows.length > 4
                  ? "p-0"
                  : "p-0 pb-3"
              }
            >
              <h3
                className="mb-0 pl-3 pt-20"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {lang("GLOBAL_SEARCH.FILTER.POSTS")}
              </h3>

              <div className="d-flex justify-content-around  mt-2 pl-4 pr-21">
                <Container fluid className="p-0">
                  <div
                    style={{
                      columnGap: "0.5rem",
                      rowGap: "1.5rem",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent:
                        searchData?.searchResults?.posts?.rows.length > 4
                          ? "space-between"
                          : "flex-start",
                    }}
                  >
                    {searchData?.searchResults?.posts?.rows?.map(
                      (posts, key) => {
                        return (
                          key <= 2 &&
                          !showAll.posts && (
                            <div
                              className="ml-4 mt-1"
                              style={{
                                width: "28.5rem",
                              }}
                            >
                              <Posts
                                key={key}
                                postListData={searchData?.searchResults?.posts}
                                userInfo={userData}
                                getAllPost={getAllPost}
                                searchText={searchText}
                              />
                            </div>
                          )
                        );
                      }
                    )}
                    {searchData?.searchResults?.posts?.rows?.map(
                      (posts, key) => {
                        return (
                          showAll.posts && (
                            <div
                              className="ml-4 mt-1"
                              style={{
                                width: "28.5rem",
                              }}
                            >
                              <Posts
                                key={key}
                                postListData={searchData?.searchResults?.posts}
                                userInfo={userData}
                                getAllPost={getAllPost}
                                searchText={searchText}
                              />
                            </div>
                          )
                        );
                      }
                    )}
                  </div>
                </Container>
              </div>

              {searchData?.searchResults?.posts?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-3 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        posts: !showAll.posts,
                      });
                    }}
                  >
                    {!showAll.posts ? (
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
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.POSTS")) &&
        searchData?.searchResults?.posts?.rows.length === 0 && (
          <NoSearchResult lang={lang} />
        )}
    </div>
  );
};

export default PostSec;
