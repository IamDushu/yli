import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@components/layout";
import WithAuth from "components/with-auth/with-auth";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import {
  Card,
  CardContent,
  Grid,
  FormControl,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Container,
} from "@mui/material";
import dynamic from "next/dynamic";
import {
  sendConnectionRequest,
  changeConnectionStatus,
  followUser,
  unfollowUser,
} from "../../store/actions/connections";
import {
  selectSearchData,
  selectSearchText,
} from "../../store/selectors/searchResult";
import { useRouter } from "next/router";
import { getCookie, getSession } from "utils";
import { getSearchResults, saveSearchText } from "store/actions/search-result";
import { useTranslation } from "react-i18next";
import { postListing } from "store/actions";
import { getFilters } from "../../utils/constant";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import { SiteLinks } from "components/sidebar";

//dynamic imports
const People = dynamic(() => import("components/search-result/people"));
const Teacher = dynamic(() => import("components/search-result/teacher"));
const Trainer = dynamic(() => import("components/search-result/trainer"));
const Coach = dynamic(() => import("components/search-result/coach"));
const Host = dynamic(() => import("components/search-result/yli-guide"));
const SearchGroup = dynamic(() => import("components/search-result/group"));
const Courses = dynamic(() => import("components/search-result/courses"));
const Company = dynamic(() => import("components/search-result/company"));
const LearningInstitute = dynamic(() =>
  import("components/search-result/learning-institute")
);
const Posts = dynamic(() => import("../../components/dashboard/Posts"));

function SearchResult() {
  const [lang] = useTranslation("language");
  let dispatch = useDispatch();
  let router = useRouter();
  const searchData = useSelector(selectSearchData);
  const searchText = getSession("globalSearchName");
  const user = useSelector(({ user }) => user);
  let userId = JSON.parse(getCookie("userInfo")).id;
  let userData = user?.userInfo || {};

  if (user?.userInfo && typeof user.userInfo === "string")
    userData = JSON.parse(user.userInfo);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [searchResults, setSearchResults] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [showAll, setShowAll] = useState({
    all: false,
    people: false,
    companies: false,
    groups: false,
    yliGuides: false,
    teacher: false,
    trainer: false,
    coach: false,
    learningInstitute: false,
    companies: false,
    articles: false,
    posts: false,
    courses: false,
    rooms: false,
  });

  const filters = useMemo(() => getFilters(lang), [lang]);

  const [filterList, setFilterList] = useState(filters);

  const [payload, setPayload] = useState({});

  useEffect(() => {
    let body = {
      page: 1,
      pagesize: 10,
      searchText,
    };

    if (searchText && searchText?.length > 0) {
      dispatch(getSearchResults(body));
    }
  }, [searchText]);
  /******************* 
  @Purpose : Used for get All post
  @Parameter : {}
  @Author : INIC
  ******************/
  const getAllPost = () => {
    setTimeout(async () => {
      await dispatch(postListing({ page: 1, pagesize: 10 }));
    }, 1000);
  };

  const withdrawRequest = (id) => {
    dispatch(
      changeConnectionStatus({
        id,
        status: "withdrawl",
      })
    );
    let body = {
      page: 1,
      pagesize: 10,
      searchText,
    };

    if (body.searchText !== "") {
      dispatch(saveSearchText(body.searchText));
      setTimeout(() => {
        dispatch(getSearchResults(body));
      }, 2000);
    }
  };

  const deleteConnection = (id) => {
    dispatch(
      changeConnectionStatus({
        id,
        status: "",
      })
    );
    let body = {
      page: 1,
      pagesize: 10,
      searchText,
    };

    if (body.searchText !== "") {
      dispatch(saveSearchText(body.searchText));
      setTimeout(() => {
        dispatch(getSearchResults(body));
      }, 2000);
    }
  };

  const sendConnection = (id) => {
    dispatch(sendConnectionRequest(id));
    let body = {
      page: 1,
      pagesize: 10,
      searchText,
    };

    if (body.searchText !== "") {
      dispatch(saveSearchText(body.searchText));
      setTimeout(() => {
        dispatch(getSearchResults(body));
        setPayload(body);
      }, 2000);
    }
  };

  const followRequest = (id) => {
    dispatch(followUser(id));
    let body = {
      page: 1,
      pagesize: 10,
      searchText,
    };
    if (body.searchText !== "") {
      dispatch(saveSearchText(body.searchText));
      setTimeout(() => {
        dispatch(getSearchResults(body));
      }, 2000);
    }
  };

  const unfollowRequest = (id) => {
    dispatch(unfollowUser(id));
    let body = {
      page: 1,
      pagesize: 10,
      searchText,
    };

    if (body.searchText !== "") {
      dispatch(saveSearchText(body.searchText));
      setTimeout(() => {
        dispatch(getSearchResults(body));
      }, 2000);
    }
  };

  const handleFilterChange = (e) => {
    let list = [...filteredList];
    if (e.target.checked && e.target.value === "All") {
      setFilteredList(["All"]);
      setSelectedFilters([]);
      setFilterList(filters);
    } else if (e.target.checked) {
      list.push(e.target.value);
      setFilteredList(list);
      setSelectedFilters(list);
      setFilterList(filters);
    } else {
      let temp = list.filter((item) => item !== e.target.value);
      setFilteredList(temp);
      setSelectedFilters(temp);
      setFilterList(filters);
    }
    setFilter(e.target.value);
  };

  const handleSearchFilter = (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredListData = filters.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterList(filteredListData);
    } else {
      setFilterList(filters);
    }
  };

  const getCount = (i) => {
    if (i === "all") {
      let totalCount = 0;
      const data = searchData?.searchResults;
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].hasOwnProperty("count")) {
          totalCount += data[key].count;
        }
      }
      totalCount += searchData?.searchResults["posts"]?.total;
      return totalCount;
    }
    if (i === "people") {
      return searchData?.searchResults["users"]?.count;
    }
    if (i === "learning institute") {
      return searchData?.searchResults["institute"]?.count;
    }
    if (i === "articles") {
      return searchData?.searchResults["blogs"]?.count;
    }
    if (i === "posts") {
      return searchData?.searchResults["posts"]?.total;
    } else {
      return searchData?.searchResults[i]?.count;
    }
  };

  const toggleClass = (item) => {
    if (filteredList.includes(item)) {
      return "model-common-listing bg-haiti-12";
    }
    return "model-common-listing bg-white";
  };
  const applyFilter = () => {
    setOpen(false);
    setSelectedFilters(filteredList);
    setFilterList(filters);
  };
  useEffect(() => {
    const isAllEmpty = Object.values(searchData?.searchResults || {}).every(
      (result) => result?.rows.length === 0
    );
    setSearchResults(isAllEmpty);
  }, [searchData?.searchResults]);

  const closeModalHandler = () => {
    setOpen(false);
    setFilteredList([]);
    setSelectedFilters([]);
    setFilterList(filters);
  };

  return (
    <Layout>
      <div className="inner-wrapper search-result-box inner-left-full-orsidebar pt-0">
        <Grid
          container
          maxWidth="1160px"
          marginLeft={"auto"}
          marginRight={"auto"}
          paddingLeft={{ sm: 2, xs: 1 }}
          paddingRight={{ sm: 2, xs: 1 }}
        >
          <Grid item md={3} xs={12} >
            {/* Left view */}
            <Stack
              sx={{ display: { md: 'none', xs: "block" }}}
              direction="row"
              spacing={1}
              style={{ overflow: "scroll" }}
              className=" mb-3 px-2"
              paddingTop={{ sm: "16px" }}
            >
              {filterList.map((item, i) => {
                return <Chip label={item.name} />;
              })}
            </Stack>
            <Box
              sx={{ display: { md: 'block', xs: "none" } }}
              className={`profile-right-bar common-searchbar px-6  ${!searchResults ? "dimmed" : ""
                }`}
            >
              <FormControl className="mb-0 w-100 bg-white">
                <TextField
                  type="text"
                  placeholder={`${lang(
                    "COMMON.SEARCH_RESULTS"
                  )} '${searchText}'`}
                  onChange={(e) => handleSearchFilter(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "black" }} />
                      </InputAdornment>
                    ),
                    style: { borderRadius: "0" },
                  }}
                  disabled={searchResults}
                />
              </FormControl>
              {/* <PerfectScrollbar> */}
              {filterList.length ? (
                <ul
                  className="list-unstyled model-listing-box bg-white"
                  style={{ borderRadius: "0px" }}
                >
                  {filterList.map((item, i) => {
                    return (
                      <li
                        className={toggleClass(item.name)}
                        style={{ borderBottom: "0" }}
                        key={i}
                      >
                        <div className="custom-checkbox checkbox-blue d-flex justify-content-between align-items-center">
                          <div className=" d-flex justify-content-between align-items-center">
                            <PermIdentityIcon style={{ color: "#49454E" }} />
                            <div className="ml-2">
                              <h5
                                className="text-body-14 mb-0"
                                style={{ color: "#49454E" }}
                              >
                                {" "}
                                {item.name}
                              </h5>
                            </div>
                          </div>

                          <div className="d-flex align-items-center">
                            <span className="text-body-12 mr-2 mt-1">
                              {getCount(item.name.toLowerCase()) || 0}
                            </span>
                            <label htmlFor={item.id} className="mb-3">
                              <input
                                type="checkbox"
                                name="cssradio"
                                id={item.id}
                                value={item.name}
                                checked={filteredList.includes(item.name)}
                                onChange={(e) => {
                                  handleFilterChange(e);
                                }}
                                disabled={searchResults}
                              />
                              <span></span>
                            </label>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center mt-5 mb-5">
                  {lang("COMMON.NO_RESULT_FOUND")}
                </div>
              )}

              <div className="footer-relative">
                <SiteLinks />
              </div>
            </Box>

            {/* <div
                    className="bg-white border border-geyser font-weight-semibold rounded-8 font-12 px-2 py-12 d-inline-block text-gary mb-3"
                    onClick={() => setOpen(true)}
                  >
                    {lang("GLOBAL_SEARCH.FILTER_BY")}
                    <span className="text-secondary pl-1">
                      {selectedFilters.length === 11 && "All"}
                      {selectedFilters.length > 1 &&
                        selectedFilters.length < 11 &&
                        "Multiple"}
                      {selectedFilters.length === 1 && selectedFilters}
                    </span>
                    <em className="icon icon-down-arrow text-charcoal-grey pl-3"></em>
                  </div> */}
          </Grid>
          {/* right blog section */}
          <Grid item md={9} xs={12} paddingLeft={{ md: "48px", sm: 0 }} paddingTop={{ md: "24px", sm: 0 }}>
            <div className="profile-right-bar">
              <People
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                followRequest={followRequest}
                unfollowRequest={unfollowRequest}
                deleteConnection={deleteConnection}
                sendConnection={sendConnection}
                router={router}
                setShowAll={setShowAll}
                showAll={showAll}
                withdrawRequest={withdrawRequest}
                userId={userId}
                userData={userData}
              />
              <Teacher
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                followRequest={followRequest}
                unfollowRequest={unfollowRequest}
                deleteConnection={deleteConnection}
                sendConnection={sendConnection}
                setShowAll={setShowAll}
                showAll={showAll}
                withdrawRequest={withdrawRequest}
                userId={userId}
                userData={userData}
                router={router}
              />
              <Trainer
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                followRequest={followRequest}
                unfollowRequest={unfollowRequest}
                deleteConnection={deleteConnection}
                sendConnection={sendConnection}
                setShowAll={setShowAll}
                showAll={showAll}
                withdrawRequest={withdrawRequest}
                userId={userId}
                userData={userData}
                router={router}
              />
              <Coach
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                followRequest={followRequest}
                unfollowRequest={unfollowRequest}
                deleteConnection={deleteConnection}
                sendConnection={sendConnection}
                setShowAll={setShowAll}
                showAll={showAll}
                withdrawRequest={withdrawRequest}
                userId={userId}
                userData={userData}
                router={router}
              />
              <Host
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                followRequest={followRequest}
                unfollowRequest={unfollowRequest}
                deleteConnection={deleteConnection}
                sendConnection={sendConnection}
                setShowAll={setShowAll}
                showAll={showAll}
                withdrawRequest={withdrawRequest}
                userId={userId}
                userData={userData}
                router={router}
              />
              <LearningInstitute
                lang={lang}
                searchData={searchData}
                router={router}
                setShowAll={setShowAll}
                showAll={showAll}
                selectedFilters={selectedFilters}
              />
              <Company
                lang={lang}
                searchData={searchData}
                router={router}
                setShowAll={setShowAll}
                showAll={showAll}
                selectedFilters={selectedFilters}
              />
              <SearchGroup
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                setShowAll={setShowAll}
                showAll={showAll}
                router={router}
              />
              <Courses
                lang={lang}
                selectedFilters={selectedFilters}
                searchData={searchData}
                setShowAll={setShowAll}
                showAll={showAll}
                userData={userData}
                router={router}
              />
              {(selectedFilters.length === 0 ||
                selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.POSTS"))) &&
                searchData?.searchResults?.posts?.rows.length > 0 && (
                  <Card
                    className="mb-10"
                    infinite-scroll-component__outerdiv
                  // style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    <CardContent
                      className="px-0"
                      infinite-scroll-component__outerdiv
                    // style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      <h3
                        className="h6 mb-0 px-3 py-2"
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        {" "}
                        {lang("GLOBAL_SEARCH.FILTER.POSTS")}
                      </h3>

                      <Posts
                        postListData={searchData?.searchResults?.posts}
                        userInfo={userData}
                        getAllPost={getAllPost}
                        searchText={searchText}
                      />
                    </CardContent>
                  </Card>
                )}
              {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.POSTS")) &&
                searchData?.searchResults?.posts?.rows.length === 0 && <></>}
              {searchResults && (
                <div style={{ height: "200vh" }}>
                  <Card>
                    <CardContent className="py-5">
                      <Grid container>
                        <Grid item md={8} lg={8} className="mx-auto">
                          <div className="mb-2 font-weight-normal">
                            <p className="font-22 mb-0">
                              {lang("GLOBAL_SEARCH.NO_RESULT")}
                              <span className="font-italic ">
                                {lang("COMMON.ABRACADABRA")}
                              </span>
                            </p>

                            <p className="font-22">
                              {lang("GLOBAL_SEARCH.NO_RESULT_DESC")}
                            </p>
                          </div>

                          <img
                            src="/assets/images/no-result-new.svg"
                            alt={lang("GLOBAL_SEARCH.NO_RESULT")}
                            className="mb-5"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default WithAuth(SearchResult);
