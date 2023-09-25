import React from "react";
import { Button, Card } from "react-bootstrap";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { EDIT_CERTIFICATE_SCHEMA } from "../../../utils";
import {
  addCertification,
  deleteCertification,
  getCertificationList,
  updateCertification,
} from "../../../store/actions/certification";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsData } from "store/actions";
import Certifications from "components/sign-up-tabs/certifications";
import moment from "moment";
import { selectUserInfo } from "store/selectors/user";
/******************** 
  @purpose :Certificate Form
  @Parameter : {}
  @Author : INIC
  ******************/
const CertificateForm = ({
  closePopupHandler,
  popupInfo: { data, isEdit },
  isSelfProfile,
}) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const initialValues = {
    certificate: [
      {
        title: data?.title || "",
        issuingOrganization: data?.issuingOrganization || "",
        url: data?.url || "",
        issuedDate: data?.issuedDate
          ? moment(data?.issuedDate).format("DD/MM/YYYY")
          : "",
        expirationDate: data?.expirationDate
          ? moment(data?.expirationDate).format("DD/MM/YYYY")
          : "",
        credentialId: data?.credentialId || "",
        credentialUrl: data?.credentialUrl || "",
        description: data?.description || "",
        skills: data?.skills || {
          "Hard Skills": [],
          "Soft Skills": [],
          Mindset: [],
        },
        organisationType: data?.organisationType || "",
      },
    ],
  };

  /******************** 
  @purpose :Add/Edit and delete Certificate
  @Parameter : {}
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () => EDIT_CERTIFICATE_SCHEMA(lang),
    onSubmit: async (values) => {
      if (data?.id)
        await dispatch(
          updateCertification(values.certificate, data?.id, () =>
            closePopupHandler()
          )
        );
      else
        await dispatch(
          addCertification(values.certificate, () => closePopupHandler())
        );
      await dispatch(getCertificationList({ userId: userInfo?.id }));
      try {
        await dispatch(getSkillsData());
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDelete = () => {
    dispatch(
      deleteCertification(data.id, () => {
        closePopupHandler();
        dispatch(getCertificationList({ userId: userInfo?.id }));
        dispatch(getSkillsData());
      })
    );
  };
  return (
    <>
      <Card className="card-md">
        {/* <PerfectScrollbar> */}
        <Card.Body className="p-3 card-scroll">
          <FormikProvider value={formik}>
            <FieldArray
              name="certificate"
              validateOnChange={true}
              render={(arrayHelpers) => {
                const certificate = formik.values.certificate;
                return (
                  <div>
                    {certificate && certificate.length > 0
                      ? certificate.map((cer, index) => (
                          <div key={cer.id} className="mb-4">
                            <h2 className="font-20 font-md-18 mb-4 pb-1">
                              {!data?.id &&
                                `${lang("CERTIFICATE.TEXT.CERTIFICATE")} ${
                                  index + 1
                                }`}
                              {certificate.length > 1 && (
                                <em
                                  className="bx custom-bx bx-x pointer pl-5 float-right"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                ></em>
                              )}
                            </h2>

                            <Certifications
                              i={index}
                              formik={formik}
                              type="profile"
                              isEdit={isEdit}
                              data={data}
                            />
                          </div>
                        ))
                      : null}

                    {!data?.id && certificate.length < 3 && (
                      <div className="text-right mt-2 border-top pt-4 border-geyser">
                        <Button
                          size="sm"
                          variant="outline-info py-12 px-4 w-100 d-flex align-items-center justify-content-center"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              title: "",
                              issuingOrganization: "",
                              url: "",
                              issuedDate: "",
                              expirationDate: "",
                              credentialId: "",
                              credentialUrl: "",
                              description: "",
                              skills: {
                                "Hard Skills": [],
                                "Soft Skills": [],
                                Mindset: [],
                              },
                              organisationType: "",
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
            variant="btn btn-info font-weight-semibold px-24 "
            type="submit"
          >
            {lang("COMMON.SAVE")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CertificateForm;
