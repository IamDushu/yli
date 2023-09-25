import React, { useState } from "react";
import { Fragment } from "react";
import { Card, Button } from "react-bootstrap";

const EnvironmentalCommitment = ({ learningAboutData }) => {
  const [pdf] = useState([]);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Fragment>
      <Card className="my-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between pb-md-2 pb-3">
            <h6>Our Environment Commitments</h6>
            {pdf && pdf.length > 0 && (
              <Button
                variant="btn btn-outline-info font-14"
                onClick={() => window.open(pdf[0], "_blank")}
              >
                Download
              </Button>
            )}
          </div>
          {learningAboutData.ourEnvironmentalCommitment.length > 0 &&
            learningAboutData.ourEnvironmentalCommitment.map(
              (ourEnvironmentalCommitment) => (
                <div
                  className="desc  mr-xl-2"
                  key={ourEnvironmentalCommitment.id}
                >
                  {ourEnvironmentalCommitment &&
                  ourEnvironmentalCommitment.data.length === 0 ? (
                    <i> No Data There</i>
                  ) : (
                    ourEnvironmentalCommitment.data.map((data, i) => {
                      if (data.docURL) {
                        pdf.push(data.docURL);
                      }
                      return (
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
                      );
                    })
                  )}
                </div>
              )
            )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default EnvironmentalCommitment;
