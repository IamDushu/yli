import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { EDIT_LANGUAGE_SCHEMA } from "../../../utils";
import { SelectField } from "../../form-fields";
import {
  addLanguage,
  deleteLanguage,
  updateLanguage,
} from "../../../store/actions/language";
import { useDispatch, useSelector } from "react-redux";
import { LanguageList } from "store/actions/room";
import { getUserProfileData } from "store/actions";
import { useRouter } from "next/router";
/******************** 
  @purpose : Language proficiency options
  @Parameter : { }
  @Author : INIC
  ******************/
const options = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];
/******************** 
  @purpose : Language Form
  @Parameter : { }
  @Author : INIC
  ******************/

const LanguageForm = ({ closePopupHandler, popupInfo: { data, isEdit } }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [langOptions, setLangOptions] = useState([]);
  const router = useRouter();
  const { languageList } = useSelector((state) => state.room);
  const id = data?.id;
  const initialValues = {
    id,
    name: data?.name,
    proficiency: data?.proficiency || data?.level,
    selected_proficiency:
      options.find(({ value }) => value === data?.proficiency) || null,
  };
  /******************** 
  @purpose : Add/Edit Delete Language 
  @Parameter : { }
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema: EDIT_LANGUAGE_SCHEMA(lang),
    onSubmit: async (values) => {
      if (values.id)
        await dispatch(updateLanguage(values, () => closePopupHandler()));
      else await dispatch(addLanguage(values, () => closePopupHandler()));
      await dispatch(getUserProfileData());
    },
  });
  /******************** 
  @purpose : Language list options
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(LanguageList());
  }, []);
  const handleDelete = async () => {
    await dispatch(deleteLanguage(data.id, () => closePopupHandler()));
    router.push({
      pathname: `/profile/${router.query.profileId}`,
      query: { profileTab: 'ShortDescription' },
    });
  };
  /******************** 
@purpose : Used for get Languages
@Parameter : {  }
@Author : INIC
******************/
  const getLanguages = () => {
    const languages = [];
    languageList.map((langData) => {
      languages.push({
        label: langData.name,
        value: langData.name,
      });
      setLangOptions(languages);
    });
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="rounded-8 overflow-hidden">
      <div className="p-3">
        <Form.Group controlId="formEditLangType">
          <div className="custom-selectpicker">
            <SelectField
              defaultValue={{
                value: data?.name,
                label: data?.name,
              }}
              options={langOptions}
              onMenuOpen={getLanguages}
              maxMenuHeight={110}
              name="name"
              label={lang("LANGUAGE.FORM.LANGUAGE")}
              formik={formik}
            />
          </div>
        </Form.Group>
        <Row className="mt-3">
          <Col sm={12}>
            <Form.Group controlId="formEditLangProficiency">
              <div className="custom-selectpicker">
                <SelectField
                  options={options}
                  maxMenuHeight={110}
                  label={lang("LANGUAGE.FORM.PROFICIENCY")}
                  name="proficiency"
                  formik={formik}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className="custom-footer d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold mb-0 mb-md-0"
          onClick={() => closePopupHandler()}
        >
          {lang("COMMON.CANCEL")}
        </Button>

        <div className="d-flex justify-content-between">
          {isEdit && (
            <Button
              variant="btn btn-dark font-weight-semibold mr-3"
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
    </Form>
  );
};

export default LanguageForm;
