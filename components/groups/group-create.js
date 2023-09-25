import CropImages from "components/CropImages/CropImages";
import { useRouter } from "next/router";
import React from "react";
import { Form, Row, Col, Button, Card, FormText } from "react-bootstrap";
import { TagComponent } from "components/courses/upload-course";
import { useTranslation } from "react-i18next";

/******************** 
  @purpose : Create Group
  @Parameter : {formik,handleChange,radioChange,groupImage,selectedType}
  @Author : INIC
******************/
function GroupCreate({
  formik,
  handleChange,
  // handleLogoChange,
  radioChange,
  groupImage,
  // groupLogo,
  selectedType,
  disabled,
}) {
  const router = useRouter();
  const { isEdit } = router.query;
  const [lang] = useTranslation("language");
  return (
    <div className="post-section mt-md-0 mt-4">
      <Card>
        <Card.Header>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h5 className="mb-0">
              {isEdit === "true"
                ? lang("GROUP.COMMON.EDIT_GROUP")
                : lang("GROUP.COMMON.CREATE_GROUP")}
            </h5>
          </div>
        </Card.Header>
        <Card.Body className="pt-2">
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12}>
                <Form.Group controlId="createGroupUploadPhoto">
                  <Form.Label>
                    {lang("GROUP.CREATE_GROUP.UPLOAD_PHOTO")}
                    <sup>*</sup>
                  </Form.Label>
                  {router.pathname === "/groups/edit-groups" ? (
                    <>
                      <CropImages
                        type="groups"
                        isEdit={isEdit}
                        groupImage={groupImage}
                        handleChange={handleChange}
                        bannerSize={true}
                      />
                    </>
                  ) : (
                    <>
                      <CropImages
                        type="groups"
                        isEdit={isEdit}
                        handleChange={handleChange}
                        bannerSize={true}
                      />
                    </>
                  )}

                  {formik?.touched.imageURL && formik?.errors.imageURL && (
                    <FormText className={"error"}>
                      {formik.errors.imageURL}
                    </FormText>
                  )}
                </Form.Group>
              </Col>
              {/* <Col sm={12}>
                <Form.Group>
                  <Form.Label>
                    {lang("GROUP.CREATE_GROUP.UPLOAD_LOGO")}
                  </Form.Label>
                  {router.pathname === "/groups/edit-groups" ? (
                    <>
                      <CropImages
                        type="groups"
                        isEdit={isEdit}
                        groupImage={groupLogo}
                        handleChange={handleChange}
                        logoSize={true}
                      />
                    </>
                  ) : (
                    <>
                      <CropImages
                        type="groups"
                        isEdit={isEdit}
                        handleChange={handleLogoChange}
                        logoSize={true}
                      />
                    </>
                  )}

                  {formik?.touched.logo && formik?.errors.logo && (
                    <FormText className={"error"}>
                      {formik.errors.logo}
                    </FormText>
                  )}
                </Form.Group>
              </Col> */}
              <Col sm={12}>
                <Form.Group controlId="createGroupName">
                  <Form.Label>
                    {lang("GROUP.CREATE_GROUP.GROUP_NAME")}
                    <sup>*</sup>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter group name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik?.touched.name && formik?.errors.name && (
                    <FormText className={"error"}>
                      {formik.errors.name}
                    </FormText>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="group">
                  <Form.Label className="text-secondary ">
                    {lang("GROUP.CREATE_GROUP.ADD_TAGS")}{" "}
                    <sup className="text-danger">*</sup>
                  </Form.Label>
                  <TagComponent formik={formik} name="tags" />
                </Form.Group>
              </Col>
            </Row>
            {/* Description : START */}
            <Form.Group controlId="createGroupDescription">
              <Form.Label>
                {lang("GROUP.CREATE_GROUP.GROUP_DESC")}
                <sup>*</sup>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write here..."
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <p className="text-right d-flex align-items-center">
                {formik?.touched.description && formik?.errors.description && (
                  <FormText className={"error"}>
                    {formik.errors.description}{" "}
                  </FormText>
                )}
                <span
                  className={
                    formik.values["description"]?.length < 2000
                      ? "text-muted ml-auto font-14"
                      : formik.values["description"]?.length > 2000
                      ? "text-dange ml-auto font-14r"
                      : "text-muted ml-auto font-14"
                  }
                >
                  {formik.values["description"]?.length}/
                </span>
                <span className="text-success">{2000}</span>
              </p>
            </Form.Group>
            {/* Description : END */}

            {/* Rules of conduct : START */}
            <Form.Group controlId="createGroupRemarks">
              <Form.Label>
                {lang("GROUP.CREATE_GROUP.RULE_OF_CONDUCT")}
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write here..."
                rows={4}
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
              />
              <p className="text-right d-flex align-items-center">
                {formik?.touched.remarks && formik?.errors.remarks && (
                  <FormText className={"error"}>
                    {formik.errors.remarks}{" "}
                  </FormText>
                )}
                <span
                  className={
                    formik.values["remarks"]?.length < 1000
                      ? "text-muted ml-auto font-14"
                      : formik.values["remarks"]?.length > 1000
                      ? "text-dange ml-auto font-14r"
                      : "text-muted ml-auto font-14"
                  }
                >
                  {formik.values["remarks"]?.length}/
                </span>
                <span className="text-success">{1000}</span>
              </p>
            </Form.Group>
            {/* Rules of conduct : END */}

            <div className="custom-radio custom-radio-outline mb-2">
              <p className="mb-2">{lang("GROUP.CREATE_GROUP.PERMISSION")}</p>{" "}
              {/*add p tag 27-06-2022*/}
              <label
                htmlFor="check"
                className="text-body-14 mb-1 font-weight-normal"
              >
                <input
                  type="radio"
                  name="cssradio"
                  id="check"
                  autoComplete="off"
                  value="public"
                  checked={selectedType === "public"}
                  onClick={radioChange}
                />
                <span></span> {lang("GROUP.CREATE_GROUP.GROUP_PUBLIC")}
              </label>
            </div>
            <div className="custom-radio custom-radio-outline">
              <label
                htmlFor="Normal"
                className="text-body-14 font-weight-normal"
              >
                <input
                  type="radio"
                  name="cssradio"
                  id="Normal"
                  autoComplete="off"
                  value="private"
                  checked={selectedType === "private"}
                  onClick={radioChange}
                />
                <span></span> {lang("GROUP.CREATE_GROUP.GROUP_PRIVATE")}
              </label>
            </div>

            <div className="text-center mt-3 d-flex justify-content-between mb-xl-0">
              <Button
                onClick={() => router.push("/groups")}
                variant="btn btn-dark"
                className="btn-dark"
              >
                {lang("COMMON.CANCEL")}
              </Button>
              <Button disabled={disabled} type="submit" variant="btn btn-info">
                {isEdit === "true"
                  ? lang("GROUP.COMMON.UPDATE_GROUP")
                  : lang("GROUP.COMMON.CREATE_GROUP")}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default GroupCreate;
