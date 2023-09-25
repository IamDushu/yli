import moment from "moment";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { Accordion, Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyGrowthConnectionsList,
  removeMyGrowthConnectionsList,
} from "store/actions/connections";
import { onImageError } from "utils";
/******************** 
  @purpose : My Growth Connections List
  @Parameter : {}
  @Author : INIC
  ******************/
function MyGrowthConnectionsList({ isVisible, setVisibility }) {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.connections.myGrowthConnectionList);
  /******************** 
  @purpose : My Growth Connections List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(getMyGrowthConnectionsList({ page: 1, pagesize: 10 }));
  }, []);
  /******************** 
  @purpose : Delete Connection
  @Parameter : {}
  @Author : INIC
  ******************/
  const deleteConnection = (userId) => {
    dispatch(removeMyGrowthConnectionsList(userId));
    dispatch(getMyGrowthConnectionsList({ page: 1, pagesize: 10 }));
  };

  return (
    <Fragment>
      <Accordion
        defaultActiveKey="1"
        activeKey={isVisible ? "0" : "1"}
        className="my-gc-connection-box"
      >
        <Accordion.Toggle
          variant="link"
          eventKey="0"
          className="w-100 d-flex align-items-center border-0 accordion-heading-box bg-white text-secondary"
          onClick={() =>
            setVisibility({
              sent: false,
              pending: false,
              growth: !isVisible,
              my: false,
              other: false,
            })
          }
        >
          <h3 className="text-body-14 pr-3 mb-0">My Growth Connections</h3>
          <div className="ml-auto d-flex align-items-center">
            <Badge className="bg-primary text-white mr-2 font-weight-normal">
              {list?.total}
            </Badge>

            <em
              className={`icon icon-down-arrow-grey font-14 ${
                isVisible ? "rotate-top" : ""
              }`}
            ></em>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="py-0">
            <ul className="listing-section">
              {list.data === undefined ||
              (Array.isArray(list.data) && list.data.length === 0) ? (
                <li className="listing-box d-flex align-items-center">
                  <em>No connections are available</em>
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
                        className="user-profile-pic rounded-8 mr-3 flex-shrink-0 pointer"
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
                          width="54"
                          height="54"
                        />
                      </picture>
                    </Link>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between w-100">
                      <div>
                        <Link href={`/profile/${user.profileId}`}>
                          <h5 className="text-body-16 mb-1 pointer">
                            {user.firstName + " " + user.lastName}
                          </h5>
                        </Link>
                        <p className="text-body-12 mb-1">
                          {user?.qualification}
                        </p>
                        <p className="text-body-12 mb-0">
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
            {list?.total > 10 && (
              <Link href={`/my-growth-connections`}>
                <p>Show More</p>
              </Link>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Fragment>
  );
}

export default MyGrowthConnectionsList;
