import React from "react";
import { Button, Card } from "react-bootstrap";
import { useFormik, FormikProvider, FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { EDIT_EDUCATION_SCHEMA } from "../../../utils";

import {
  addEducation,
  deleteEducation,
  getEducationList,
  updateEducation,
} from "../../../store/actions/education";
import { selectUserInfo } from "store/selectors/user";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getUserProfileData, getSkillsData } from "store/actions";
import EducationDetails from "components/sign-up-tabs/education-details";
import moment from "moment";
/******************** 
  @purpose :Education Form
  @Parameter : { }
  @Author : INIC
  ******************/
const EducationForm = ({ closePopupHandler, popupInfo: { data, isEdit } }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const initialValues = {
    educationDetails: [
      {
        instituteName: data?.instituteName || "",
        instituteId: data?.instituteId || "",
        degree: data?.degree || "",
        fieldOfStudy: data?.fieldOfStudy || "",
        startDate: data?.startDate
          ? moment(data?.startDate).format("DD/MM/YYYY")
          : "",
        endDate: data?.endDate
          ? moment(data?.endDate).format("DD/MM/YYYY")
          : "",
        grade: data?.grade || "",
        activities: data?.activities || "",
        description: data?.description || "",
        skills: data?.skills ?? {
          "Hard Skills": [],
          "Soft Skills": [],
          Mindset: [],
        },
        uploadUrl:
          data?.companyDetails ?? data?.instituteDetails
            ? data?.companyDetails?.logo ?? data?.instituteDetails?.logo
            : data?.uploadUrl ?? "",
      },
    ],
  };
  /******************** 
  @purpose :Add/Edit Delete Education
  @Parameter : { }
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: () => EDIT_EDUCATION_SCHEMA(lang),
    onSubmit: async (values) => {
      if (data?.id)
        await dispatch(
          updateEducation(values?.educationDetails, data?.id, () => {
            closePopupHandler();
          })
        );
      else
        await dispatch(
          addEducation(values.educationDetails, () => closePopupHandler())
        );
      await dispatch(getEducationList({ userId: userInfo?.id }));
      try {
        await dispatch(getSkillsData());
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDelete = () => {
    dispatch(
      deleteEducation(data.id, () => {
        closePopupHandler();
        dispatch(getEducationList({ userId: userInfo?.id }));
        dispatch(getSkillsData());
      })
    );
  };
  return (
    <>
      <Card className="card-md border-top-0 rounded-0">
        {/* <PerfectScrollbar> */}
        <Card.Body className="p-3 card-scroll">
          <FormikProvider value={formik}>
            <FieldArray
              name="educationDetails"
              validateOnChange={true}
              render={(arrayHelpers) => {
                const educationDetails = formik.values.educationDetails;

                return (
                  <div>
                    {educationDetails && educationDetails.length > 0
                      ? educationDetails.map((educationDetail, index) => (
                          <div key={educationDetail.id}>
                            <h2 className="font-20 font-md-18 mb-4 pb-1">
                              {!data?.id &&
                                `${lang("EDUCATION.TEXT.EDUCATION")} ${
                                  index + 1
                                }`}
                              {educationDetails.length > 1 && (
                                <em
                                  className="bx custom-bx bx-x pointer pl-5 float-right"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                ></em>
                              )}
                            </h2>
                            <EducationDetails
                              formik={formik}
                              i={index}
                              data={data}
                              type="profile"
                            />
                          </div>
                        ))
                      : null}

                    {!data?.id && educationDetails.length < 3 && (
                      <div className="text-right mt-2 d-flex justify-content-end">
                        <Button
                          size="sm"
                          variant="outline-info py-12 px-4 w-100 d-flex align-items-center justify-content-center"
                          type="button"
                          onClick={() => {
                            arrayHelpers.push({
                              instituteName: "",
                              degree: "",
                              fieldOfStudy: "",
                              startDate: "",
                              endDate: "",
                              grade: "",
                              activities: "",
                              description: "",
                              skills: {
                                "Hard Skills": [],
                                "Soft Skills": [],
                                Mindset: [],
                              },
                            });
                          }}
                        >
                          <em className="icon icon-plus-primary font-14 pr-2"></em>
                          {lang("COMMON.ADD_MORE")}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </FormikProvider>
        </Card.Body>
        {/* </PerfectScrollbar> */}
      </Card>
      <div className="custom-footer d-flex justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold mb-0 mb-md-0 mr-1"
          onClick={() => closePopupHandler()}
        >
          {lang("COMMON.CANCEL")}
        </Button>

        <div className="d-flex justify-content-between">
          {isEdit && (
            <Button
              variant="btn btn-dark font-weight-semibold mr-2"
              onClick={handleDelete}
            >
              {lang("COMMON.DELETE")}
            </Button>
          )}
          <Button
            onClick={formik.handleSubmit}
            variant="btn btn-info font-weight-semibold px-24"
            type="submit"
          >
            {lang("COMMON.SAVE")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EducationForm;
