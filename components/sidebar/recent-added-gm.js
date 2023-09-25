import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { recentlyAddedToGM } from "store/actions";
import { useTranslation } from "react-i18next";
import { onImageError } from "utils";

const RecentAddedGM = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { recentAddedGM } = useSelector((state) => state.growth);

  useEffect(() => {
    dispatch(recentlyAddedToGM({ page: 1, pagesize: 5 }));
  }, []);

  return (
    recentAddedGM?.data?.rows?.length > 0 && (
      <div className="mb-3 added-gm-box">
        <Card className="rounded-0 border-0 border-bottom-dark-2 ">
          <Card.Header className="d-flex border-radius-0 border-bottom border-geyser py-2">
            <div className="w-100 d-flex border-0 p-0 ">
              <Card.Title className="text-body-16 mb-0 w-100 text-secondary">
                {lang("RIGHT_SIDEBAR.RECENTLY_ADDED_TO_GM")}
              </Card.Title>
              {/* <em className="icon icon-down-arrow ml-auto font-24 d-xl-none d-block"></em> */}
            </div>
            <div>
              <ReactTooltip />
            </div>
          </Card.Header>

          <Card.Body className="px-0">
            <ul className="listing-section listing-content-between pt-first-0 border-first-0">
              {recentAddedGM?.data && recentAddedGM?.data?.rows?.length > 0 ? (
                recentAddedGM?.data?.rows?.map((e, i) => (
                  <li
                    key={i}
                    className={`listing-box ${
                      i === recentAddedGM?.data?.rows?.length - 1 ? "pb-0" : ""
                    }`}
                  >
                    <a
                      target="_blank"
                      href={e?.activityLink !== null ? e?.activityLink : ""}
                      title={e?.activityTitle}
                      className="d-flex align-items-center w-100 px-3"
                    >
                      <div className="position-relative flex-shrink-0 mr-3">
                        <img
                          className={
                            !e?.courseDetails && !e?.virtualEventDetails
                              ? "img-fluid w-h-84-48 object-contain border-radius-8"
                              : "img-fluid w-h-84-48 border-radius-8"
                          }
                          src={
                            e?.courseDetails?.imageURL ||
                            e?.virtualEventDetails?.imageURL ||
                            "/assets/images/brand-logo.svg"
                          }
                          onError={(image) => onImageError(image, "myProfile")}
                        />
                      </div>

                      <div className="w-68">
                        <h5 className="text-body-14 text-secondary text-ellipsis text-capitalize sidebar-text mb-0">
                          {`${e?.skillArea} - ${
                            e?.activityType?.split("-")?.join(" ") ||
                            e?.activityType
                          }`}
                        </h5>
                        <div className="text-body-12 text-capitalize text-ellipsis sidebar-text mt-1">
                          {e?.activityTitle}
                        </div>
                      </div>
                      {/* <em className="icon icon-right-gray-arrow ml-auto"></em> */}
                    </a>
                  </li>
                ))
              ) : (
                <div className="px-3">
                  <em className="font-12">
                    {lang("RIGHT_SIDEBAR.NO_RECORDS")}
                  </em>
                </div>
              )}
            </ul>
          </Card.Body>
        </Card>
      </div>
    )
  );
};
export default RecentAddedGM;
