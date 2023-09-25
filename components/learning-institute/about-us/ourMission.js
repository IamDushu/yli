import React, { useState } from "react";
import { Fragment } from "react";
import { Card } from "react-bootstrap";

/*******************
@purpose : Our Mission 
@Author : INIC
******************/

const OurMission = ({ learningAboutData }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Fragment>
      <Card className="my-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between pb-2">
            <h6>Our Mission</h6>
          </div>
          {learningAboutData.ourMission.length > 0 &&
            learningAboutData.ourMission.map((ourMissionData) => (
              <div className="desc  mr-xl-2" key={ourMissionData.id}>
                {ourMissionData && ourMissionData.data.length === 0 ? (
                  <i> No Data There</i>
                ) : (
                  ourMissionData.data.map((data, i) => (
                    <>
                      <p
                        className="text-body-14 font-weight-normal m-0 mt-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            isReadMore && data?.text?.length > 500
                              ? `${data.text.slice(0, 500)}...`
                              : data.text,
                        }}
                      />
                      {data?.text?.length > 500 && (
                        <span
                          className="text-primary font-weight-semibold cursor-pointer"
                          onClick={toggleReadMore}
                        >
                          {isReadMore ? "Read more" : "Read less"}
                        </span>
                      )}
                    </>
                  ))
                )}
              </div>
            ))}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default OurMission;
