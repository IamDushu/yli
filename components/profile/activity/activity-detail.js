import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteActivity } from "store/actions/manageActivities";
import { onImageError } from "utils";

/******************** 
  @purpose :Activity Detail
  @Parameter : {item}
  @Author : INIC
  ******************/
const ActivityDetail = (item) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Card className="list-group" key={item.item.id}>
      {/* removing the delete icon in the Activity */}
      {/* <div className="position-absolute r-0 mt-4 pr-3">
          {item.isSelfProfile && !item.viewmode && (
            // <em
            //   className="border align-items-center justify-content-center"
            //   style={{ width: "16px", height: "16px", borderRadius: "50%" }}
            //   // className="icon icon-delete-line reaction-icons font-22"
            //   onClick={() => dispatch(deleteActivity(item.item.id))}
            // >
            //   x
            // </em>
            <img
              src="/assets/images/mdi_close-circle.svg"
              onClick={() => dispatch(deleteActivity(item.item.id))}
            />
          )}
        </div> */}
      <div className=" d-flex w-100">
        <div className="overflow-hidden w-h-54 rounded-pill flex-shrink-0">
          <picture onContextMenu={(e) => e.preventDefault()}>
            <source
              srcSet={item.profilePicURL ? item.profilePicURL : ""}
              type="image/png"
            />
            <img
              src={item.profilePicURL ? item.profilePicURL : ""}
              alt="User"
              width="54"
              height="54"
              onError={(e) =>
                onImageError(
                  e,
                  "profile",
                  `${
                    item?.isSelfProfile
                      ? item?.userData?.firstName
                      : item?.otherUserData?.firstName
                  } ${
                    item?.isSelfProfile
                      ? item?.userData?.lastName
                      : item?.otherUserData?.lastName
                  }`
                )
              }
            />
          </picture>
        </div>
        <div className="d-flex ml-2 flex-wrap align-items-center flex-md-nowrap justify-content-between w-100">
          <div
            className="mr-4"
            onClick={() => {
              if (item?.item?.newsFeedId)
                router.push(
                  `/post/${item?.item?.newsFeedId}?activityType=${item?.item?.activityType}&commentId=${item?.item?.commentId}`
                );
            }}
          >
            <h5
              className={`font-14 text-secondary font-semibold mb-1 ${
                item?.item?.newsFeedId ? "cursor-pointer" : "text-gray"
              }`}
            >
              {item.item.content}
            </h5>
            <p className="mb-0 font-12 text-gray">
              {moment(item.item.createdAt).format("DD MMM yyyy")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(ActivityDetail);
