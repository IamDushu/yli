import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "@components/layout";
import WithAuth from "components/with-auth/with-auth";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import {
  Card,
  CardContent,
  Grid,
  FormControl,
  TextField,
  InputAdornment,
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
  import("components/search-result/learning-institute"),
);
const Posts = dynamic(() => import("../../components/dashboard/Posts"));
const RecentAddedGM = dynamic(() =>
  import("components/sidebar").then((mod) => mod.RecentAddedGM),
);
const UpgradeYourProfile = dynamic(() =>
  import("components/sidebar").then((mod) => mod.UpgradeYourProfile),
);
const GrowthModal = dynamic(() =>
  import("components/sidebar").then((mod) => mod.GrowthModal),
);
const GrowthPartners = dynamic(() =>
  import("components/sidebar").then((mod) => mod.GrowthPartners),
);
const FollowedGroup = dynamic(() =>
  import("components/sidebar").then((mod) => mod.FollowedGroup),
);
const MostFollowedContents = dynamic(() =>
  import("components/sidebar").then((mod) => mod.MostFollowedContents),
);

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
      }),
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
      }),
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
    if (e.target.checked) {
      list.push(e.target.value);
      setFilteredList(list);
    } else {
      let temp = list.filter((item) => item !== e.target.value);
      setFilteredList(temp);
    }
    setFilter(e.target.value);
  };

  const handleSearchFilter = (e) => {
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredListData = filters.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilterList(filteredListData);
    } else {
      setFilterList(filters);
    }
  };

  const applyFilter = () => {
    setOpen(false);
    setSelectedFilters(filteredList);
    setFilterList(filters);
  };
  useEffect(() => {
    const isAllEmpty = Object.values(searchData?.searchResults || {}).every(
      (result) => result?.rows.length === 0,
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
      <div className="inner-wrapper search-result-box inner-left-full-orsidebar">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* Left view */}
            <div
              className={`profile-right-bar px-4 ${
                !searchResults ? "dimmed" : ""
              }`}
            >
              <div>
                <div className="common-searchbar">
                  <FormControl className="mb-0 w-100 bg-white">
                    <TextField
                      type="text"
                      placeholder={lang("COMMON.SEARCH")}
                      onChange={(e) => handleSearchFilter(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      disabled={searchResults}
                    />
                  </FormControl>
                </div>
                {/* <PerfectScrollbar> */}
                {filterList.length ? (
                  <ul className="list-unstyled model-listing-box">
                    {filterList.map((item, i) => {
                      return (
                        <li className="model-common-listing bg-white" key={i}>
                          <div className="custom-checkbox checkbox-blue d-flex justify-content-between align-items-center">
                            <div className=" d-flex justify-content-between align-items-center">
                              <PermIdentityIcon />
                              <div className="ml-2">
                                <h5 className="text-body-14 mb-0">
                                  {item.name}
                                </h5>
                              </div>
                            </div>

                            <div className="d-flex align-items-center">
                              <span className="text-body-12 mr-2 mt-1">10</span>
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
              </div>
            </div>

            {/* right blog section */}
            <div className="profile-left-bar">
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
                searchData?.searchResults?.posts?.rows.length === 0 && (
                  <p>No Posts Found</p>
                )}
              {searchResults && (
                <Card>
                  <CardContent className="py-5">
                    <Grid container>
                      <Grid item md={8} lg={8} className="mx-auto">
                        <div className="mb-2 font-weight-normal">
                          <p className="font-22 mb-0">
                            {lang("GLOBAL_SEARCH.NO_RESULT")}
                            <span className="font-italic "> Abracadabra</span>
                          </p>

                          <p className="font-22">
                            {lang("GLOBAL_SEARCH.NO_RESULT_DESC")}
                          </p>
                        </div>

                        <img
                          src="/assets/images/no-result-new.svg"
                          alt="No result found"
                          className="mb-5"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
              {/* <Modal
                centered
                show={open}
                onHide={() => {
                  closeModalHandler();
                }}
                contentLabel="Example Modal"
                backdrop="static"
                className="custom-modal-box"
              >
                <Modal.Header>
                  <h2 className="h6 m-0 Heading">
                    {lang("GLOBAL_SEARCH.FILTERS")}
                  </h2>
                  <button
                    type="button"
                    className="close mt-1"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      closeModalHandler();
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </Modal.Header>
                <Modal.Body>
                  <div className="common-searchbar mb-3">
                    <Form.Group
                      controlId="formSearch"
                      className="position-relative mb-0"
                    >
                      <Form.Control
                        type="text"
                        placeholder={lang("COMMON.SEARCH")}
                        onChange={(e) => handleSearchFilter(e)}
                      />
                      <div className="search-inner-icon">
                        <em className="bx bx-search"></em>
                      </div>
                    </Form.Group>
                  </div>
                  {filterList.length ? (
                    <ul className="list-unstyled model-listing-box">
                      {filterList.map((item, i) => {
                        return (
                          <li className="model-common-listing" key={i}>
                            <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                              <div>
                                <h5 className="text-body-14 mb-0">
                                  {item.name}
                                </h5>
                              </div>
                              <label
                                htmlFor={item.id}
                                className="mb-0 mr-0 pr-0 ml-3"
                              >
                                <input
                                  type="checkbox"
                                  name="cssradio"
                                  id={item.id}
                                  value={item.name}
                                  checked={filteredList.includes(item.name)}
                                  onChange={(e) => handleFilterChange(e)}
                                />
                                <span></span>
                              </label>
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
                </Modal.Body>
                <Modal.Footer className="rounded-b-16">
                  <Button
                    onClick={() => {
                      closeModalHandler();
                    }}
                    className="m-0 btn btn-dark"
                  >
                    {lang("COMMON.CANCEL")}
                  </Button>
                  <Button onClick={applyFilter} className="m-0 px-5">
                    {lang("COMMON.APPLY")}
                  </Button>
                </Modal.Footer>
              </Modal> 
              <UpgradeYourProfile />
              <GrowthModal />
              <GrowthPartners />
              <RecentAddedGM />
              <FollowedGroup />
              <MostFollowedContents /> */}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default WithAuth(SearchResult);
