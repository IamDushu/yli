import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateCertificate } from "store/actions";
import { showMessageNotification } from "utils";

function CourseContent() {
  const dispatch = useDispatch()
  const courseDetail = useSelector((state) => state?.courses?.courseDetail);
  const [lang] = useTranslation("language");
  const router = useRouter();
  const { courseId } = router.query;

  const [isReadDesc, setIsReadDesc] = useState({
    courseGoal: true,
    requirement: true,
    description: true,
  });

  // to generate certificate
  const handleGenerateCertificate = () => {
    if (courseId) {
      dispatch(generateCertificate(courseId)).then((res) => {
        if (res.statusCode === 200) {
          window.open(
            `/certificate/${res?.data?.certificateNumber}?type=course`,
            "_blank"
          );
        } else {
          showMessageNotification(res?.message);
        }
      });
    }
  };

  return (
    <div className="mt-4 course-details">
      <div className="d-flex justify-content-between">
        <h6>{lang("ROOMS.GOAL")}</h6>
      </div>
      <div className="desc border-bottom-blueberry-whip mb-3 mb-md-4  pb-md-3">
        <p
          className="text-body-14 font-weight-normal m-0 course-goal"
          dangerouslySetInnerHTML={{
            __html: courseDetail?.courseGoal,
          }}
        />
      </div>

      <div className="d-flex justify-content-between">
        <h6>{lang("ROOMS.REQUIREMENTS")}</h6>
      </div>
      <div className="desc border-bottom-blueberry-whip mb-3 mb-md-4  pb-md-3">
        <p className="text-body-14 font-weight-normal m-0 mt-1">
          <p
            dangerouslySetInnerHTML={{
              __html: isReadDesc.requirement
                ? courseDetail?.requirement?.slice(0, 500)
                : courseDetail?.requirement,
            }}
          />
        </p>
        {courseDetail?.requirement?.length > 500 && (
          <div
            className="text-primary text-body-14 font-weight-semibold mt-2 pointer"
            onClick={() =>
              setIsReadDesc({
                ...isReadDesc,
                requirement: !isReadDesc.requirement,
              })
            }
          >
            {isReadDesc.requirement
              ? lang("COMMON.READ_MORE")
              : lang("COMMON.READ_LESS")}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <h6>{lang("ROOMS.DESCRIPTION")}</h6>
      </div>
      <div className="desc border-bottom-blueberry-whip mb-3 mb-md-4  pb-md-3">
        <p className="text-body-14 font-weight-normal m-0 mt-1">
          <p
            dangerouslySetInnerHTML={{
              __html: isReadDesc.description
                ? courseDetail?.description?.slice(0, 500)
                : courseDetail?.description,
            }}
          />
        </p>
        {courseDetail?.description?.length > 500 && (
          <div
            className="text-primary text-body-14 font-weight-semibold mt-2 pointer"
            onClick={() =>
              setIsReadDesc({
                ...isReadDesc,
                description: !isReadDesc.description,
              })
            }
          >
            {isReadDesc.description
              ? lang("COMMON.READ_MORE")
              : lang("COMMON.READ_LESS")}
          </div>
        )}
      </div>

      <div className="desc pr-xl-5 mr-xl-2 mt-3">
        <h3 className="h6">{lang("ROOMS.TAGS")}</h3>
        <div className="tags">
          {courseDetail?.tags?.length > 0 &&
            courseDetail?.tags.map((v, i) => (
              <span className="mr-2 " key={i}>
                {v}{" "}
              </span>
            ))}
        </div>
      </div>
      <Card className="">
        <Card.Body className="p-4">
          <h3 className="h6">{lang("ROOMS.CERTIFICATES")}</h3>
          <p>
            {courseDetail?.certificateTitle
              ? courseDetail?.certificateTitle
              : lang("ROOMS.CERTI_TEXT")}
          </p>
          {courseDetail?.completionPercent === 100 && (
            <Button onClick={handleGenerateCertificate}>
              {lang("ROOMS.YLI_CERTI")}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CourseContent;
