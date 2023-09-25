import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "@routes";
import { useTranslation } from "react-i18next";
import { Connect, Follow, UnFollow } from "components/svg/connections";
import { getFullName, onImageError } from "utils";

const Speakers = () => {
  const [lang] = useTranslation("language");
  const [specialGuests, setSpecialGuests] = useState([]);
  const { roomDetail } = useSelector((state) => state?.room);

  useEffect(() => {
    if (roomDetail?.specialGuest) {
      let temp = [...roomDetail?.specialGuest];
      setSpecialGuests([...temp]);
    }

    return () => {
      setSpecialGuests([]);
    };
  }, [roomDetail?.specialGuest]);

  return (
    <div className="border-bottom-blueberry-whip desc">
      <h3 className="h6 mb-3">{lang("ROOMS.SPEAKERS")}</h3>
      <div className="d-flex row px-md-2">
        {specialGuests.length > 0 &&
          specialGuests.map((v, i) => (
           
              <Col md={4} xl={3}  className="mb-3 p-0 px-3 px-md-1 ">
            <Card
              className="text-center position-relative h-100 speakers "
              key={i}
            >
              <Card.Header className="p-0">
                <Link href={`/profile/${v.profileId}`}>
                  <div
                    style={{
                      backgroundImage: `url("../../assets/images/dashboard/cover-background-2.jpg")`,
                    }}
                    className="position-relative connection-user-cover-img"
                  >
                    <div className="d-flex mx-auto">
                      <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                        <img
                          src={
                            v.profilePicURL ?? "/assets/images/user-noimg.jpg"
                          }
                          className="d-flex img-fluid w-100 h-100"
                          onError={(e) => {
                            onImageError(
                              e,
                              "profile",
                              `${v.firstName} ${v.lastName}`
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </Card.Header>

              <Card.Body className="d-flex flex-column h-100 p-0 pt-1">
                <Card.Title className="mb-1">
                  <Link href={`/profile/${v.profileId}`}>
                    <h5 className="text-body-14 mb-0 text-ellipsis pointer">
                      {getFullName(v)}
                    </h5>
                  </Link>
                </Card.Title>
                <div className="mb-0 px-2">
                  <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                    {v?.currentPosition ?? "No Position Added"}
                    <br />
                  </p>
                  <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
                    {v?.mutualCount} {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                  </p>
                </div>
                <div className="text-gary font-medium mb-2 d-flex pl-2 pr-1 ">
                  <Button
                    title="Connect"
                    variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                    onClick={async () => {
                    }}
                  >
                    <Connect />
                    Connect
                  </Button>
                  {v.isFollow && v.isFollow.isFollow ? (
                    <Button
                      variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                      title="UnFollow"
                    >
                      <UnFollow />
                      UnFollow
                    </Button>
                  ) : (
                    <Button
                      title="Follow"
                      variant="btn btn-outline-primary mr-1 btn-small-icon w-100"
                    >
                      <Follow />
                      Follow
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
            </Col>
            
          ))}
      </div>
    </div>
  );
};

export default Speakers;
