import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "@routes";
import StarRatings from "react-star-ratings";
import { GMIcon } from "icons/index";
import courseCardStyles from "./course-card.module.scss";

const CourseCard = ({ course }) => {
  return (
    <Card
      className={`${courseCardStyles["course-card-wrapper"]} secondary-card abstract-card-v2`}
    >
      <div className={courseCardStyles["online-tag"]}>ONLINE COURSE</div>

      <div className={courseCardStyles["gm-icon"]}>
        <GMIcon />
      </div>
      <Link route={"/course-detail/" + course.id}>
        <div className="position-relative pointer">
          <CardMedia
            component="img"
            height="70px"
            className="w-100"
            src={course?.imageURL || "../assets/images/user-no-img.jpg"}
            alt={course?.title}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "../assets/images/user-no-img.jpg";
            }}
          />
        </div>
      </Link>
      <CardContent className="p-1">
        <Link route={"/course-detail/" + course.id}>
          <div className="title-container">
            <h6
              className={`${courseCardStyles["course-name"]} text-body-14 pointer ellipsis`}
            >
              {course?.title?.charAt(0).toUpperCase() + course?.title?.slice(1)}
            </h6>
          </div>
        </Link>
        <div className="text-ellipsis d-flex align-items-center justify-content-between">
          <small className="font-weight-semi-bold text-card-name text-body-12">
            <span style={{ color: "#49454E" }}>
              {`${course?.UserDetails?.firstName || ""} ${
                course?.UserDetails?.lastName || ""
              }`.trim()}
            </span>
          </small>
        </div>
        <StarRatings
          rating={course?.rating ?? 0}
          starDimension="10.44px"
          starSpacing="1px"
          starRatedColor="#FFC635"
        />
      </CardContent>
    </Card>
  );
};

export default CourseCard;
