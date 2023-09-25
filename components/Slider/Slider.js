import React, { Fragment, useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_API_URL } from "config";
import { getTestimonialInfo } from "../../store/actions/testimonial";
import { onImageError } from "utils";
// SlickSlider
var settings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

/******************** 
  @purpose :Slick Slider
  @Parameter : {props}
  @Author : INIC
  ******************/
const SlickSlider = (props) => {
  const dispatch = useDispatch();
  const { testimonialInfo } = useSelector(({ testimonial }) => testimonial);
  const [testimonials, setTestimonial] = useState([]);
  /******************** 
  @purpose :Get Testimonial Information
  @Parameter : {props}
  @Author : INIC
  ******************/
  useEffect(() => {
    const body = {
      page: 1,
      pagesize: 10,
      searchText: "",
      cmsType: "user",
    };

    dispatch(getTestimonialInfo(body));
  }, []);

  /******************** 
  @purpose :Testimonial InfoData according to role
  @Parameter : {props}
  @Author : INIC
  ******************/
  const testimonialInfoData = () => {
    if (props.role) {
      let testimonialArray = [];
      testimonialInfo &&
        testimonialInfo.length > 0 &&
        testimonialInfo.forEach((element) => {
          if (element.profession === props.role) {
            testimonialArray.push(element);
          }
        });
      setTestimonial(testimonialArray);
    } else {
      setTestimonial(testimonialInfo);
    }
  };
  /******************** 
  @purpose :Testimonial InfoData 
  @Parameter : {props}
  @Author : INIC
  ******************/
  useEffect(() => {
    testimonialInfoData();
  }, [testimonialInfo]);
  return (
    <Fragment>
      <Slider {...settings}>
        {testimonials &&
          testimonials?.map((testimonial, index) => (
            <div
              className="testimonial border rounded-8 overflow-hidden border-geyser py-4 px-sm-4 px-3"
              key={index}
            >
              <div>
                <div className="mb-20">
                  <em className="icon font-30 icon-quotes"></em>
                </div>
                <div className="mb-3 user-comment">
                  <p
                    className="text-body-16 mb-1"
                    dangerouslySetInnerHTML={{
                      __html: testimonial.comment,
                    }}
                  />
                </div>
                <div className="user-details">
                  <div className="profile-img mr-2 ml-0 rounded-pill overflow-hidden flex-shrink-0">
                    <img
                      src={
                        `${testimonial.profilePicURL}`
                          ? `${testimonial.profilePicURL}`
                          : "/assets/images/user-noimg.jpg"
                      }
                      alt={testimonial.name}
                      width="40"
                      height="40"
                      onError={(e) => {
                        onImageError(e);
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="text-body-14 mb-0">{testimonial.name}</h5>
                    <span className="text-body-12">
                      {testimonial.profession}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </Fragment>
  );
};

export default SlickSlider;
