import { MainModal } from "components/modal";
import DeleteExperience from "components/modal/delete-experience";
import Experience from "components/sign-up-tabs/experience";
import { FieldArray, FormikProvider, useFormik } from "formik";
import moment from "moment";
import { omitBy } from "lodash";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSkillsData, toggleModals } from "store/actions";
import { selectUserInfo } from "store/selectors/user";
import {
  addExperience,
  deleteExperienceItem,
  getExperienceList,
  updateExperience,
} from "../../../store/actions/experience";
import { EDIT_EXPERIENCE_SCHEMA } from "../../../utils";
/******************** 
  @purpose : Experience Form
  @Parameter : { }
  @Author : INIC
  ******************/
const ExperienceForm = ({ closePopupHandler, popupInfo: { data, isEdit } }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [index, setIndex] = useState("");
  const userInfo = useSelector(selectUserInfo);
  const { deleteExperience } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const [toggleSaveDisable, setToggleSaveDisable] = useState(false);
  const initialValues = {
    experience: [
      {
        role: data?.role ?? "",
        employmentType: data?.employmentType ?? "",
        organisationName: data?.organisationName ?? "",
        organisationId: data?.organisationId ?? "",
        location: data?.location ?? "",
        startDate:
          moment(data?.startDate)?.format("DD/MM/YYYY") ??
          data?.startDate ??
          "",
        endDate: data?.endDate
          ? moment(data?.endDate)?.format("DD/MM/YYYY")
          : "",
        headline: data?.headline ?? "",
        industry: data?.industry ?? "",
        description: data?.description ?? "",
        skills: data?.skills ?? {
          "Hard Skills": [],
          "Soft Skills": [],
          Mindset: [],
        },
        currentlyWorking: data?.currentlyWorking ?? false,
        organisationType: data?.organisationType ?? "",
        uploadUrl:
          data?.companyDetails ?? data?.instituteDetails
            ? data?.companyDetails?.logo ?? data?.instituteDetails?.logo
            : data?.uploadUrl ?? "",
      },
    ],
  };

  /******************** 
  @purpose :Add/Edit Delete Experience Form
  @Parameter : { }
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => EDIT_EXPERIENCE_SCHEMA(lang),
    onSubmit: async (values) => {
      try {
        setToggleSaveDisable(true);
        values.experience[index].endDate = values.experience[index]
          .currentlyWorking
          ? undefined
          : values.experience[index].endDate;
        values.experience[index].uploadUrl = null;
        values.experience[index] = omitBy(
          values.experience[index],
          (val) => val === null
        );
        if (data?.id) {
          await dispatch(
            updateExperience(values.experience, data?.id, () =>
              closePopupHandler()
            )
          );
        } else {
          await dispatch(
            addExperience(values.experience, () => closePopupHandler())
          );
        }
        dispatch(getExperienceList({ userId: userInfo?.id }));
        setToggleSaveDisable(false);
        dispatch(getSkillsData());
      } catch (error) {
        setToggleSaveDisable(false);
        console.log(error);
      }
    },
  });

  const deleteExperienceHandler = async () => {
    await dispatch(deleteExperienceItem(data.id, () => closePopupHandler()));
    await dispatch(getExperienceList({ userId: userInfo?.id }));
    dispatch(getSkillsData());
    dispatch(toggleModals({ deleteExperience: false }));
  };

  return (
    <>
      {/* Delete Expereience Modal */}
      <MainModal
        className="profile-photo-view custom-modal-footer"
        show={deleteExperience}
        keyModal="deleteExperience"
        centered={true}
        size={"w-auto"}
        body={
          <DeleteExperience deleteExperienceHandler={deleteExperienceHandler} />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Please confirm</h2>}
      />
      <Card className="card-md border-top-0 rounded-0">
        {/* <PerfectScrollbar> */}
        <Card.Body className="p-3 card-scroll">
          <FormikProvider value={formik}>
            <FieldArray
              name="experience"
              validateOnChange={true}
              render={(arrayHelpers) => {
                const experience = formik.values.experience;
                return (
                  <div>
                    {experience && experience.length > 0
                      ? experience.map((exp, index) => {
                          setIndex(index);
                          return (
                            <div key={exp.id}>
                              <h2 className="font-20 font-md-18 mb-4 pb-1">
                                {!data?.id &&
                                  ` ${lang("EXPERIENCE.TEXT.EXPERIENCE")} ${
                                    index + 1
                                  }`}
                                {experience.length > 1 && (
                                  <em
                                    className="bx custom-bx bx-x pointer pl-5 float-right"
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  ></em>
                                )}
                              </h2>

                              <Experience
                                i={index}
                                formik={formik}
                                type="profile"
                                data={data}
                              />
                            </div>
                          );
                        })
                      : null}

                    {!data?.id && experience.length < 3 && (
                      <div className="text-right mt-2">
                        <Button
                          size="sm"
                          variant="outline-info py-12 px-4 w-100 d-flex align-items-center justify-content-center"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              role: "",
                              employmentType: "",
                              organisationName: "",
                              location: "",
                              startDate: "",
                              endDate: "",
                              headline: "",
                              industry: "",
                              organisationType: "",
                              description: "",
                              skills: {
                                "Hard Skills": [],
                                "Soft Skills": [],
                                Mindset: [],
                              },
                              currentlyWorking: "",
                              organisationId: "",
                            })
                          }
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
          Cancel
        </Button>

        <div className="d-flex justify-content-between">
          {isEdit && (
            <Button
              variant="btn btn-dark font-weight-semibold mr-2"
              onClick={() => dispatch(toggleModals({ deleteExperience: true }))}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={formik.handleSubmit}
            variant="btn btn-info font-weight-semibold px-24"
            type="submit"
            disabled={toggleSaveDisable}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExperienceForm;
