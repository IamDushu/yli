import { useRouter } from "next/router";
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleModals } from "store/actions";

/*******************   
@purpose : User Set CourseType 
@Author : INIC
******************/
export const CourseType = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Modal.Body>
      <div className="p-4 upload-option-wrap d-flex flex-wrap flex-lg-nowrap justify-content-center">
        <div className="w-50 mr-2">
          <div
            className="upload-link text-secondary text-center pointer"
            onClick={() => {
              router.push({
                pathname: "my-courses/upload-course/online",
              });
              dispatch(toggleModals({ coursetype: false }));
            }}
          >
            <img
              src={"../assets/images/icons/upload-online.svg"}
              alt="Upload an Online Course"
            />
            <span className="h6 d-block pt-3">
              Upload an Online Course
            </span>
          </div>
        </div>
        <div className="w-50 ml-2 mt-4 mt-lg-0">
          <div
            className="upload-link text-secondary text-center pointer"
            onClick={() => {
              router.push({
                pathname: "my-courses/upload-course/offline",
              });
              dispatch(toggleModals({ coursetype: false }));
            }}
          >
            <img
              src={"../assets/images/icons/upload-offline.svg"}
              alt="Upload an Offline Course"
            />
            <span className="h6 d-block pt-3">
              Upload an Offline Course
            </span>
          </div>
        </div>
      </div>
      </Modal.Body>    
    </>
  );
};
