import React, { useState } from "react";
import { Fragment } from "react";
import { Card } from "react-bootstrap";

const OurVision = ({ learningAboutData }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Fragment>
      <Card className="my-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between pb-2">
            <h6>Our Vision</h6>
          </div>
          {learningAboutData.ourVision.length > 0 &&
            learningAboutData.ourVision.map((ourVisionData) => (
              <div className="desc mr-xl-2" key={ourVisionData.id}>
                {ourVisionData.data.length === 0 ? (
                  <i>No Data There</i>
                ) : (
                  ourVisionData.data.map((data, i) => (
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

export default OurVision;
