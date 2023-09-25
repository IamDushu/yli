import React, { useState } from "react";
import { Fragment } from "react";
import { Card } from "react-bootstrap";

const CompanyTour = ({ learningAboutData }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Fragment>
      <Card className="my-4">
        <Card.Body className="p-3 p-sm-4">
          <div className="d-flex justify-content-between">
            <h6>Company Tour</h6>
          </div>
          {learningAboutData.companyTour.length > 0 &&
            learningAboutData.companyTour.map((companyTour) => (
              <Fragment key={companyTour.id}>
                {companyTour.data.length === 0 ? (
                  <i>No Data There</i>
                ) : (
                  companyTour.data.map((data, i) => (
                    <Fragment key={i}>
                      {data.videoURL && (
                        <div className="video-main rounded-8 overflow-hidden mb-3 mt-2 mt-sm-3">
                          <video
                            className="img-fluid video w-100"
                            width="700"
                            height="425"
                            controls
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            <source src={data.videoURL} />
                          </video>
                        </div>
                      )}
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
                    </Fragment>
                  ))
                )}
              </Fragment>
            ))}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default CompanyTour;
