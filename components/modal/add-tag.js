import { Button, Form } from "react-bootstrap";
import { TagComponent } from "components/courses/upload-course";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import {
  getPurchasedFeatureList,
  toggleModals,
  updateUserInfo,
} from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { addTagsPreferences } from "store/actions/my-account";
import { Modal } from "react-bootstrap";
import {
  CATEGORY,
  CODE,
  PREFERENCE_TAGS,
  PREFERENCE_TAGS_WITH_LIMIT,
} from "utils";

const AddPreferenceTags = ({ userInfo }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const initialValues = {
    id: userInfo.id,
    tags: userInfo?.tags || [],
  };
  const [limit, setLimit] = useState(3);
  const [hasFeature, setHasFeature] = useState(true);
  const [code, setCode] = useState(null);
  const purchaseList = useSelector(
    (state) => state?.user?.monetisationPurchasedFeatureList
  );

  /******************** 
  @purpose : Used for getting purchase features list
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(getPurchasedFeatureList(CATEGORY.HASHTAGS));
  }, []);

  /******************** 
  @purpose : Used for setting tag limits
  @Parameter : { }
  @Author : INIC
  ******************/
  useEffect(() => {
    if (purchaseList?.length > 0) {
      const codes = purchaseList.map((purchase) => purchase?.code);
      if (codes?.length > 0) {
        if (codes.includes(CODE?.HASHTAG_10)) {
          setHasFeature(false);
          setLimit(10);
          setCode(CODE?.HASHTAG_10);
        } else if (codes.includes(CODE?.HASHTAG_6)) {
          setLimit(6);
          setCode(CODE?.HASHTAG_6);
        }
      }
    }
  }, [purchaseList]);

  /******************** 
  @purpose : Used for formik setup
  @Parameter : { }
  @Author : INIC
  ******************/
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () =>
      limit === -1
        ? PREFERENCE_TAGS(lang)
        : PREFERENCE_TAGS_WITH_LIMIT(lang, limit),
    onSubmit: async (values) => {
      await dispatch(addTagsPreferences({ ...values, code }));
      await dispatch(updateUserInfo(values, () => {}, false));
      await dispatch(toggleModals({ preferenceTag: false }));
    },
  });

  return (
    <React.Fragment>
      <Modal.Body className="p-0">
        <Form onSubmit={formik.handleSubmit} className="p-3">
          <Form.Label className="text-secondary ">
            {lang("MY_ACCOUNTS.COMMON.TAGS")}{" "}
            <sup className="text-danger">*</sup>
          </Form.Label>
          <TagComponent formik={formik} name="tags" />
        </Form>
        <div className="custom-footer d-flex justify-content-between border-top-dark">
            <Button
              variant="btn btn-dark font-weight-semibold "
              onClick={() => {
                dispatch(toggleModals({ preferenceTag: false }));
              }}
            >
              {lang("COMMON.CANCEL")}
            </Button>

            <div className="d-flex justify-content-between">
              <Button variant="btn btn-info font-weight-semibold" type="submit">
                {lang("COMMON.SAVE")}
              </Button>
            </div>
          </div>
      </Modal.Body>
      {formik?.touched.tags &&
        formik.errors.tags &&
        formik.values.tags.length > limit &&
        hasFeature && (
          <Modal.Footer className="d-block p-1 bg-secondary-lighter">
            <div className="d-sm-flex align-items-center justify-content-between ">
              <em className="bx bx-lock-alt font-18 pr-2 text-secondary-purple"></em>
              <div className="pr-md-3">
                <p className="text-body-14 text-secondary-purple font-weight-normal m-0">
                  {lang("FEATURESPLANS.UNLOCK_MORE_TAGS")}
                </p>
              </div>
              <div className="mt-sm-0 mt-3 ml-auto p-2">
                <Button
                  variant="info ml-sm-3 w-sm-100"
                  size="sm"
                  onClick={() =>
                    dispatch(toggleModals({ purchaseFeaturesPlans: true }))
                  }
                >
                  {lang("COMMON.UNLOCK")}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        )}
    </React.Fragment>
  );
};

export default AddPreferenceTags;
