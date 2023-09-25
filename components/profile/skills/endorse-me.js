import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { onImageError } from "utils";
import Link from "next/link";
import Select from "react-select";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getEndorsedList, toggleModals, userSkillsList } from "store/actions";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";
import dynamic from "next/dynamic";
import { debounce } from "lodash";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const EndorsePopup = dynamic(() => import("./endorse-popup"));

const EndorsedMe = ({
  skillList,
  hardSkills,
  softSkills,
  mindset,
  otherProfileId,
}) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { endorseList, requestSkillList } = useSelector(
    (state) => state.skillReducer
  );
  const { endorsepopup } = useSelector(({ ui }) => ui.modals, shallowEqual);

  const [skillArea, setSkillArea] = useState({
    value: lang("SKILLS.TEXT.HARD_SKILLS"),
    label: lang("SKILLS.TEXT.HARD_SKILLS"),
  });
  const [options, setOptions] = useState({
    skillsOption: [],
  });
  const [state, setState] = useState({
    filters: false,
    pagesize: 4,
    userSkills: [],
    userName: "",
  });
  const [endorseDetail, setEndorseDetails] = useState("");
  const skillAreaOptions = [
    {
      value: lang("SKILLS.TEXT.HARD_SKILLS"),
      label: lang("SKILLS.TEXT.HARD_SKILLS"),
    },
    {
      value: lang("SKILLS.TEXT.SOFT_SKILLS"),
      label: lang("SKILLS.TEXT.SOFT_SKILLS"),
    },
    {
      value: lang("SKILLS.TEXT.MINDSET"),
      label: lang("SKILLS.TEXT.MINDSET"),
    },
  ];
  useEffect(() => {
    dispatch(
      getEndorsedList({
        page: 1,
        pagesize: state.pagesize,
        userSkills: state.userSkills.map(({ value }) => value),
        userName: state.userName,
      })
    );
  }, [state.pagesize, state.userName, state.userSkills]);

  const pageSizeHandler = () => {
    setState({ ...state, pagesize: state.pagesize + 4 });
  };

  /***************************************************
  @Purpose :useEffect for user list
  @Parameter : {}
  @Author : INIC
  ***************************************************/
  useEffect(() => {
    if (state.filters) {
      dispatch(userSkillsList(skillArea.value));
    }
  }, [state.filters, skillArea]);

  /***************************************************
  @Purpose :Get Skill listing 
  @Parameter : {}
  @Author : INIC
  ***************************************************/
  const getUserSkills = () => {
    const userSkillArray = [];

    const selectedSkills =
      skillArea.value === lang("SKILLS.TEXT.HARD_SKILLS")
        ? hardSkills
        : skillArea.value === lang("SKILLS.TEXT.SOFT_SKILLS")
        ? softSkills
        : mindset;
    selectedSkills?.map((skill) => {
      userSkillArray.push({
        label: skill.skillType,
        value: skill.id,
      });
      setOptions({ ...options, skillsOption: userSkillArray });
    });
  };

  /************************************************************ 
    @purpose : Debounce function for search users
    @Parameter : { group }
    @Author : INIC
    **********************************************************/
  const searchUsers = useCallback(
    debounce((value) => {
      setState({ ...state, userName: value });
    }, 500)
  );

  const loadSkillOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          userSkillsList(skillArea?.value, {
            page: 1,
            pagesize: 50,
            searchText: inputValue || "",
          })
        ).then((res) => {
          const skillList = [];
          res?.data?.map((data) => {
            skillList.push({
              label: data.name,
              value: data.userSkillId,
            });
          });

          callback(skillList);
        });
      }, 500);
    }
  };

  return (
    <Card className="mt-4 mb-4">
      <Card.Header className="d-sm-flex justify-content-between align-items-center">
        <h4 className="mb-2 mb-sm-0 font-20 font-weight-bold">
          {lang("SKILLS.FORM.WHO_ENDORSED_ME")}
        </h4>
        <Button
          variant="outline-info"
          className="d-flex ml-sm-auto filter-btn  align-items-center"
          onClick={() => setState({ ...state, filters: !state.filters })}
        >
          <span class="material-icons font-20">filter_alt</span>
          {lang("SKILLS.FORM.FILTERS")}
        </Button>
      </Card.Header>
      {state.filters && (
        <Form className="mx-3 mb-3 p-3 border-dark border endorsed-me">
          <Row>
            <Col md={12}>
              <span className="font-weight-bold mb-3 d-inline-block">
                {lang("SKILLS.FORM.FILTERS")}
              </span>
            </Col>
            <Col md={4}>
              <Form.Label>{lang("SKILLS.FORM.USER")}</Form.Label>

              <input
                className="form-control"
                placeholder={lang("COMMON.SEARCH")}
                onChange={(e) => searchUsers(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Label>{lang("SKILLS.FORM.SKILL_AREA")}</Form.Label>
              <Select
                menuPortalTarget={document?.querySelector("body")}
                classNamePrefix={"custom-select"}
                options={skillAreaOptions}
                value={skillArea}
                onChange={(e) => setSkillArea(e)}
              />
            </Col>
            <Col md={4}>
              <Form.Label>{lang("SKILLS.TEXT.SKILLS")}</Form.Label>
              <AsyncSelect
                isMulti
                type="multi"
                menuPortalTarget={document?.querySelector("body")}
                classNamePrefix={"custom-select"}
                onChange={(e) => {
                  setState({
                    ...state,
                    userSkills: e,
                  });
                }}
                defaultValue={state.userSkills}
                loadOptions={loadSkillOptions}
                noOptionsMessage={({ inputValue }) =>
                  inputValue
                    ? lang("SKILLS.NO_SKILL_OPTIONS")
                    : lang("SKILLS.SEARCH_FOR_SKILLS")
                }
              />
            </Col>
          </Row>
        </Form>
      )}

      <Card.Body className="pt-0 pb-sm-0">
        <Row className="custom-col-box four-grid-spacing-md row-col-10">
          {endorseList && endorseList?.data?.length ? (
            endorseList?.data?.map((data) => (
              <Col
                md={4}
                xl={3}
                className="mb-sm-3 "
                key={data?.endorsedByUser?.id}
              >
                <Card className="text-center position-relative h-100  border-dark rounded-t-8">
                  <Card.Header className="p-0">
                    <Link href={`/profile/${data?.endorsedByUser?.profileId}`}>
                      <div className="position-relative connection-user-cover-img">
                        <div className="d-flex mx-auto">
                          <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                            <img
                              src={data?.endorsedByUser?.profilePicURL ?? ""}
                              className="d-flex img-fluid w-100 h-100"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${data?.endorsedByUser?.firstName} ${data?.endorsedByUser?.lastName}`
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card.Header>

                  <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
                    <Card.Title className="mb-1">
                      <Link
                        href={`/profile/${data?.endorsedByUser?.profileId}`}
                      >
                        <h5 className="text-body-14 mb-0 text-ellipsis pointer px-1 text-secondary">
                          {data?.endorsedByUser?.firstName}{" "}
                          {data?.endorsedByUser?.lastName}
                        </h5>
                      </Link>
                    </Card.Title>
                    <div className="mb-0 px-2">
                      <p className="mb-1 text-secondary font-weight-regular font-12 ">
                        {data?.endorsedByUser?.currentPosition ?? ""}
                      </p>
                      {/*   <p className="text-body-12 mb-2 text-gray text-ellipsis">
                        Endorsed skills
                      </p> */}
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-secondary-lighter py-2">
                    <span
                      className="text-secondary-purple font-weight-bold cursor-pointer"
                      onClick={() => {
                        setEndorseDetails(data);
                        dispatch(toggleModals({ endorsepopup: true }));
                      }}
                    >
                      {lang("SKILLS.FORM.ENDORS")}
                    </span>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <li className="listing-box d-flex align-items-center mb-3 ml-2">
              {lang("SKILLS.FORM.NO_ENDORSMENTS")}
            </li>
          )}
        </Row>
      </Card.Body>
      {endorseList?.total > 4 && state.pagesize < endorseList?.total && (
        <Card.Footer className="bg-white people-tab-view-all-button border-geyser border-top py-2">
          <span
            className="people-tab-view-all-button-text load-more-color"
            onClick={() => pageSizeHandler()}
          >
            {lang("COMMON.LOAD_MORE")}
          </span>
        </Card.Footer>
      )}
      <MainModal
        show={endorsepopup}
        keyModal="endorsepopup"
        body={
          <EndorsePopup skillList={skillList} endorseDetail={endorseDetail} />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">{lang("SKILLS.TEXT.ENDORSE_ME")}</h2>}
      />
    </Card>
  );
};

export default EndorsedMe;
