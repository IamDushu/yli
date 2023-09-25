import React, { useState } from "react";
import { Fragment } from "react";
import { Card } from "react-bootstrap";
import { onImageError } from "utils";

const OurLogo = ({ learningAboutData }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Fragment>
      <Card className="my-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between pb-2">
            <h6>Our Logo</h6>
          </div>
          {learningAboutData.ourLogo.length > 0 &&
            learningAboutData.ourLogo.map((ourLogoData) => (
              <Fragment>
                {ourLogoData.data.length === 0 ? (
                  <i>No Data There</i>
                ) : (
                  ourLogoData.data.map((data, i) => (
                    <Fragment key={i}>
                      <div className="d-flex align-items-center w-100">
                        <picture
                          className="user-profile-pic rounded-pill mr-3"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <source src={data.imageURL} type="image/jpg" />
                          <img
                            src={data.imageURL}
                            alt=""
                            width="92"
                            height="92"
                            onError={(e) => onImageError(e, "myProfile")}
                          />
                        </picture>
                      </div>
                      
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

export default OurLogo;
