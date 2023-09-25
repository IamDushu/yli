import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import {
  fetchCourses,
  getCourseDetail,
  newsFeedGMaction,
  postListing,
  toggleModals,
  getSingleBlogDetail,
  getLearningInstituteDetails,
  learningInstituteEvents,
  fetchLearningInstCourses,
  getSuggestedJobActivities,
} from "store/actions";
import {
  addGrowthModelActivities,
  getGrowthCoursesRooms,
  recentlyAddedToGM,
} from "store/actions/growth";
import {
  growthModelResourceFilterOptions,
  growthModelTypeFilterOptionschange,
  ADD_MORE_GM_SCHEMA,
  showMessageNotification,
} from "utils";
import { TextField, SelectField } from "components/form-fields";
import { useFormik } from "formik";
import { roomDetails, RoomList } from "store/actions/room";
import { getSearchResults } from "store/actions/search-result";
import { useRouter } from "next/router";

/*******************   
@purpose : User Set AddMoreActivity
@Author : INIC
******************/
export const AddToGMModal = ({
  data: data1,
  courseId,
  roomId,
  page,
  otherCourses,
  roomData,
  globalCourse,
  searchData,
  learningInst,
  instituteId,
  courseListComp,
  courseBanner,
  postDash,
  postLI,
  postArticle,
  eventtab,
  courseLI,
  vitualEvent,
  suggestedCourse,
  jobId,
  eventType,
  pagesize,
  searchText,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { growthModelDetail } = useSelector(({ growth }) => growth);
  const [optionsSkill, setOptionsSkill] = useState([]);
  const router = useRouter();
  const setTypeOptions = (value) => {
    switch (value) {
      case "Hard Skills":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Soft Skills":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Mindset":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Traction":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Distribution":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Support":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      case "Content":
        setOptionsSkill(growthModelTypeFilterOptionschange);
        break;
      default:
        setOptionsSkill([]);
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      skillArea: "",
      skillType: "",
      title: data1?.activityTitle,
      link: data1?.activityLink,
      activityId: data1?.activityId,
    },
    validationSchema: ADD_MORE_GM_SCHEMA(lang),
    onSubmit: (values) => {
      let data = {
        growthModelId: growthModelDetail.id,
        activities: [
          {
            skillArea: values.skillArea,
            skillTypes: [
              {
                typeName: values.skillType,
                data: [
                  {
                    activityLink: values.link,
                    activityTitle: values.title,
                    activityId: values?.activityId,
                  },
                ],
              },
            ],
          },
        ],
      };
      dispatch(addGrowthModelActivities(data)).then(() => {
        if (
          roomData === "roomList" ||
          roomData === "roomBanner" ||
          roomData === "otherRooms"
        ) {
          const payload = {
            page: 1,
            pagesize: 12,
            searchText: "",
            virtualEventType: data1?.activityCategory,
            language: "",
          };
          setTimeout(() => {
            dispatch(RoomList(payload));
          }, 2000);
        }
        if (
          courseBanner === "courseBanner" ||
          courseListComp === "courseListComp" ||
          otherCourses === "otherCoursesByAuthor"
        ) {
          const payload = {
            page: 1,
            pagesize: 12,
            searchText: "",
            courseLevel: "",
          };
          setTimeout(() => {
            dispatch(fetchCourses(payload));
          }, 2000);
        }
        if (globalCourse === "globalCourse") {
          const payload = {
            page: 1,
            pagesize: 10,
            searchText: searchData,
          };
          setTimeout(() => {
            dispatch(getSearchResults(payload));
          }, 2000);
        }
        if (courseId !== undefined) {
          setTimeout(() => {
            dispatch(getCourseDetail(courseId));
          }, 2000);
        }
        if (roomId !== undefined) {
          setTimeout(() => {
            dispatch(roomDetails(roomId));
          }, 2000);
        }
        if (data1?.activityCategory === "post" && postDash === "postDash") {
          const payload = {
            id: data1?.activityId,
            postId: data1?.postDetails,
            status: true,
            activityId: "",
            instituteId: "",
          };
          dispatch(newsFeedGMaction(payload)).then(() => {
            if (router.pathname === "/search-result") {
              dispatch(
                getSearchResults({
                  page: 1,
                  pagesize: 10,
                  searchText,
                })
              );
            } else {
              dispatch(
                postListing({
                  page: 1,
                  pagesize: 10,
                  instituteId: data1?.instituteId,
                  postType: "article",
                })
              );
            }
          });
          dispatch(recentlyAddedToGM());
        }
        if (page === "matchtogm") {
          dispatch(
            getGrowthCoursesRooms({
              page: 1,
              pagesize: 3,
            })
          );
        }
        if (learningInst === "learningInst" && instituteId) {
          setTimeout(() => {
            dispatch(getLearningInstituteDetails(instituteId));
          }, 3000);
        }
        if (postLI !== undefined && postLI === "postLI") {
          // dispatch(getLearningInstituteDetails(data1?.instituteId));
          const payload = {
            id: data1?.activityId,
            postId: data1?.postDetails,
            status: true,
            activityId: "",
            instituteId: data1?.instituteId,
          };
          dispatch(newsFeedGMaction(payload)).then(() => {
            setTimeout(() => {
              if (router.pathname === "/search-result") {
                dispatch(
                  getSearchResults({
                    page: 1,
                    pagesize: 10,
                    searchText,
                  })
                );
              } else {
                dispatch(
                  postListing({
                    page: 1,
                    pagesize: 10,
                    instituteId: data1?.instituteId,
                    postType: "article",
                  })
                );
              }
            }, 3000);
          });
        }
        if (postArticle !== undefined && postArticle === "postArticle") {
          const payload = {
            id: data1?.activityId,
            postId: data1?.postDetails,
            status: true,
            activityId: "",
            instituteId: data1?.instituteId,
          };
          dispatch(newsFeedGMaction(payload)).then(() => {
            setTimeout(() => {
              if (router.pathname === "/search-result") {
                dispatch(
                  getSearchResults({ page: 1, pagesize: 10, searchText })
                );
              } else {
                dispatch(
                  postListing({
                    page: 1,
                    pagesize: 10,
                    instituteId: data1?.instituteId,
                    postType: "article",
                  })
                );
              }
            }, 3000);
          });
        }
        if (eventtab === "eventtab") {
          const payload = {
            page: 1,
            pagesize: 10,
            instituteId: data1?.instituteId,
            virtualEventType: "event",
          };
          dispatch(learningInstituteEvents(payload));
        }
        if (courseLI === "courseLI") {
          const payload = {
            page,
            pagesize,
            searchText: "",
            instituteId: data1?.instituteId,
          };
          setTimeout(() => {
            dispatch(fetchLearningInstCourses(payload));
          }, 3000);
        }
        if (
          vitualEvent === "vitualEvent" ||
          vitualEvent === "vitualEventCR" ||
          vitualEvent === "vitualEventW" ||
          vitualEvent === "vitualEventMC"
        ) {
          const payload = {
            page,
            pagesize,
            instituteId: data1?.instituteId,
            virtualEventType: eventType,
          };
          dispatch(learningInstituteEvents(payload));
        }

        if (suggestedCourse === "suggestedCourse") {
          setTimeout(() => {
            const payload = {
              page: 1,
              pagesize: 10,
              jobId,
            };
            dispatch(getSuggestedJobActivities(payload));
          }, 3000);
        }
        showMessageNotification("Details Saved Successfully.");
      });

      if (roomData === "otherRooms") {
        dispatch(toggleModals({ addtoGrowthModelotherRoom: false }));
      }
      if (otherCourses === "otherCoursesByAuthor") {
        dispatch(toggleModals({ addtoGrowthModelOtherCourses: false }));
      }
      if (page === "matchtogm") {
        dispatch(toggleModals({ addtoGrowthModelMatchGM: false }));
      }
      if (learningInst === "learningInst") {
        dispatch(toggleModals({ addtoGrowthModellearningInst: false }));
      }
      if (globalCourse === "globalCourse") {
        dispatch(toggleModals({ addtoGrowthModelglobalCourse: false }));
      }
      if (postLI === "postLI") {
        dispatch(toggleModals({ addtoGrowthModelLi: false }));
      }
      if (eventtab === "eventtab") {
        dispatch(toggleModals({ addtoGrowthModelEvent: false }));
      }
      if (postArticle === "postArticle") {
        dispatch(toggleModals({ addtoGrowthModelArticle: false }));
      }
      if (courseLI === "courseLI") {
        dispatch(toggleModals({ addtoGrowthModelLICourse: false }));
      }
      if (vitualEvent === "vitualEvent") {
        dispatch(toggleModals({ addtoGrowthModelVirtualEvent: false }));
      }
      if (vitualEvent === "vitualEventCR") {
        dispatch(toggleModals({ addtoGrowthModelVirtualEventCR: false }));
      }
      if (vitualEvent === "vitualEventW") {
        dispatch(toggleModals({ addtoGrowthModelVirtualEventW: false }));
      }
      if (vitualEvent === "vitualEventMC") {
        dispatch(toggleModals({ addtoGrowthModelVirtualEventMC: false }));
      }
      if (suggestedCourse === "suggestedCourse") {
        dispatch(toggleModals({ addtoGrowthModelSAC: false }));
      } else {
        dispatch(toggleModals({ addtoGrowthModel: false }));
      }
    },
  });

  useEffect(() => {
    if (formik.values.skillArea !== "") {
      setTypeOptions(formik.values.skillArea);
    }
  }, [formik.values.skillArea]);

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body className="px-3 px-md-4 pt-3 pt-md-4">
          <Row>
            <Col xs={12} sm={6}>
              <Form.Group controlId="addActivitySelectBlock">
                <Form.Label>
                  {lang("GROWTH_MODEL.ADD_TO_GM_SSA")} <sup>*</sup>
                </Form.Label>
                <div className="custom-selectpicker">
                  <SelectField
                    menuPortalTarget={document?.querySelector("body")}
                    classNamePrefix={"custom-select"}
                    name="skillArea"
                    options={growthModelResourceFilterOptions}
                    formik={formik}
                    placeholder={lang("GROWTH_MODEL.ADD_TO_GM_SSA")}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group controlId="addActivityType">
                <Form.Label>
                  {lang("GROWTH_MODEL.ADD_TO_GM_SAT")} <sup>*</sup>
                </Form.Label>
                <div className="custom-selectpicker">
                  <SelectField
                    menuPortalTarget={document?.querySelector("body")}
                    classNamePrefix={"custom-select"}
                    name="skillType"
                    options={optionsSkill}
                    formik={formik}
                    placeholder={lang("GROWTH_MODEL.ADD_TO_GM_SAT")}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group controlId="addActivityLink">
                <TextField
                  type="url"
                  label={lang("GROWTH_MODEL.ADD_TO_GM_ENTERACTLINK")}
                  placeholder={lang("GROWTH_MODEL.ADD_TO_GM_ENTERACTLINK")}
                  name="link"
                  value={data1?.activityLink}
                  formik={formik}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group controlId="addActivityTitle">
                <TextField
                  type="text"
                  label={lang("GROWTH_MODEL.ADD_TO_GM_EAT")}
                  placeholder={lang("GROWTH_MODEL.ADD_TO_GM_EAT")}
                  name="title"
                  value={data1?.activityTitle}
                  readOnly={true}
                  formik={formik}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="footer border-top border-geyser p-3 pt-3 -md-4">
          <div className="d-flex flex-wrap justify-content-between flex-sm-nowrap activity-submit mt-0 w-100">
            <Button
              variant="btn btn-btn btn-dark font-weight-semibold"
              onClick={() => {
                if (roomData === "otherRooms") {
                  dispatch(toggleModals({ addtoGrowthModelotherRoom: false }));
                }
                if (otherCourses === "otherCoursesByAuthor") {
                  dispatch(
                    toggleModals({ addtoGrowthModelOtherCourses: false })
                  );
                }
                if (page === "matchtogm") {
                  dispatch(toggleModals({ addtoGrowthModelMatchGM: false }));
                }
                if (learningInst === "learningInst") {
                  dispatch(
                    toggleModals({ addtoGrowthModellearningInst: false })
                  );
                }
                if (globalCourse === "globalCourse") {
                  dispatch(
                    toggleModals({ addtoGrowthModelglobalCourse: false })
                  );
                }
                if (postLI !== undefined && postLI === "postLI") {
                  dispatch(toggleModals({ addtoGrowthModelLi: false }));
                }
                if (postArticle === "postArticle") {
                  dispatch(toggleModals({ addtoGrowthModelArticle: false }));
                }
                if (eventtab === "eventtab") {
                  dispatch(toggleModals({ addtoGrowthModelEvent: false }));
                }
                if (courseLI === "courseLI") {
                  dispatch(toggleModals({ addtoGrowthModelLICourse: false }));
                }
                if (vitualEvent === "vitualEvent") {
                  dispatch(
                    toggleModals({ addtoGrowthModelVirtualEvent: false })
                  );
                }
                if (vitualEvent === "vitualEventCR") {
                  dispatch(
                    toggleModals({ addtoGrowthModelVirtualEventCR: false })
                  );
                }
                if (vitualEvent === "vitualEventW") {
                  dispatch(
                    toggleModals({ addtoGrowthModelVirtualEventW: false })
                  );
                }
                if (vitualEvent === "vitualEventMC") {
                  dispatch(
                    toggleModals({ addtoGrowthModelVirtualEventMC: false })
                  );
                }
                if (suggestedCourse === "suggestedCourse") {
                  dispatch(toggleModals({ addtoGrowthModelSAC: false }));
                } else {
                  dispatch(toggleModals({ addtoGrowthModel: false }));
                }
              }}
            >
              {lang("GROWTH_MODEL.ADD_TO_GM_BACK_BTN")}
            </Button>
            <Button variant="btn btn-btn btn-info font-weight-semibold" type="submit">
              {lang("GROWTH_MODEL.ADD_TO_GM_SUBMIT_BTN")}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </>
  );
};
