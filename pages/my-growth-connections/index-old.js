import { Layout } from "components/layout";
import {
  RecentAddedGM,
  MyProfile,
  GrowthModal,
  MostFollowedContents,
  Add,
} from "components/sidebar";
import moment from "moment";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyGrowthConnectionsList,
  removeMyGrowthConnectionsList,
} from "store/actions/connections";
import { onImageError } from "utils";

function MyGrowthConnection() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.connections.myGrowthConnectionList);

  const [search, setSearch] = useState("");

  /******************** 
@purpose : Used for debounce
@Parameter : {  }
@Author : INIC
******************/
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  /******************** 
@purpose : Used for search
@Parameter : {}
@Author : INIC
******************/
  const searchHandler = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
    })
  );

  useEffect(() => {
    dispatch(
      getMyGrowthConnectionsList({ page: 1, pagesize: 10, type: "all", search })
    );
  }, [search]);

  const deleteConnection = (userId) => {
    dispatch(removeMyGrowthConnectionsList(userId));
    dispatch(
      getMyGrowthConnectionsList({ page: 1, pagesize: 10, type: "all", search })
    );
  };

  return (
    <Layout>
      <div className="inner-wrapper">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />

              {/* growth modal listing */}
              <GrowthModal />
            </div>

            <div className="post-section">
              <Card>
                <Card.Header className="pb-0">
                  <div className="mb-3">
                    <h2 className="h5 mb-3">Growth Connections</h2>
                    <div className="common-searchbar w-100">
                      <Form.Group
                        controlId="formSearch"
                        className="position-relative mb-0"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Search by name..."
                          onChange={searchHandler}
                        />
                        <div className="search-inner-icon">
                          <em className="bx bx-search"></em>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="py-0">
                  <ul className="listing-section">
                    {list.data === undefined ||
                    (Array.isArray(list.data) && list.data.length === 0) ? (
                      <li className="listing-box d-flex align-items-center">
                        {"No connections are available"}
                      </li>
                    ) : (
                      Array.isArray(list.data) &&
                      list.data.map((user) => (
                        <li
                          className="listing-box d-flex align-items-center"
                          key={user.id}
                        >
                          <Link href={`/profile/${user.profileId}`}>
                            <picture
                              className="user-profile-pic rounded-50 mr-3 flex-shrink-0 pointer"
                              onContextMenu={(e) => e.preventDefault()}
                            >
                              <source
                                srcSet={
                                  user.profilePicURL
                                    ? user.profilePicURL
                                    : "/assets/images/user-noimg.jpg"
                                }
                                type="image/jpg"
                              />
                              <img
                                src={
                                  user.profilePicURL
                                    ? user.profilePicURL
                                    : "/assets/images/user-noimg.jpg"
                                }
                                alt={user.firstName + " " + user.lastName}
                                onError={(e) =>
                                  onImageError(
                                    e,
                                    "profile",
                                    user.firstName + " " + user.lastName
                                  )
                                }
                                width="70"
                                height="70"
                              />
                            </picture>
                          </Link>
                          <div className="ml-sm-2 d-flex flex-wrap flex-md-nowrap justify-content-between w-100">
                            <div>
                              <Link href={`/profile/${user.profileId}`}>
                                <h5 className="card-title font-16 text-secondary font-medium mb-1 pointer">
                                  {user.firstName + " " + user.lastName}
                                </h5>
                              </Link>
                              <p className="font-12 text-gary font-weight-light mb-1">
                                {user?.qualification}
                              </p>
                              <p className="font-12 text-gary font-weight-light mb-0">
                                Received on,{" "}
                                {moment(user.createdAt).format("DD MMM YYYY")}
                              </p>
                            </div>
                            <div className="d-flex align-items-center mt-sm-0 mt-2">
                              <div className="w-h-24 bg-cosmos circle-inner-icons ml-3 pointer">
                                <em
                                  className="icon icon-delete font-16"
                                  onClick={() => deleteConnection(user.id)}
                                ></em>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </Card.Body>
              </Card>
            </div>

            {/* right blog section */}
            <div className="right-blog-section">
              {/* Recently Added to gm */}
              <RecentAddedGM />

              {/* Most Followed Contents */}
              <MostFollowedContents />

              {/* Add */}
              <Add />

              {/* Top Activities */}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default MyGrowthConnection;
