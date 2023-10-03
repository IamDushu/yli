// external packages
import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { Stack } from "@mui/material";
import { YliwayButton } from "components/button";
import { Input, DatePicker } from "components/form-fields";
import { GROWTH_CONNECTIONS_ACTIVITY_SCHEMA } from "utils";
import { addUpdateGrowthPartnerActivities, toggleModals } from "store/actions";

export const AddUpdateGCactivity = ({ connectionActivity, getActivities }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { gcActivityData } = useSelector(({ ui }) => ui.modals, shallowEqual);

  /******************** 
  @purpose : To intialize formik
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const formik = useFormik({
    initialValues: {
      id: gcActivityData?.id || "",
      activity: gcActivityData?.activity || "",
      date: gcActivityData?.date
        ? moment(gcActivityData?.date).format("DD-MM-YYYY")
        : moment().format("DD-MM-YYYY"),
      activityGoal: gcActivityData?.activityGoal || "",
      note: gcActivityData?.note || "",
    },
    enableReinitialize: true,
    validationSchema: GROWTH_CONNECTIONS_ACTIVITY_SCHEMA(lang),
    onSubmit: (values) => {
      const data = {
        ...values,
        connectionUserId: connectionActivity?.connectionUserId,
      };
      if (!data?.id) {
        delete data.id;
      }
      dispatch(addUpdateGrowthPartnerActivities(data)).then((res) => {
        if (res?.status === 1) {
          getActivities();
          dispatch(
            toggleModals({
              addUpdateGCactivity: false,
              gcActivityConnectionUserId: null,
            })
          );
          formik.resetForm();
        }
      });
    },
  });

  return (
    <>
      <Stack gap="2rem" padding="2rem 1.5rem">
        <Input
          fullWidth
          name="activity"
          label={`${lang(
            "GROWTH_CONNECTIONS.ACTIVITY.ENTER_ACTIVITY_TITLE"
          )} *`}
          formik={formik}
          placeholder={lang("GROWTH_CONNECTIONS.ENTER")}
          maxLength={100}
        />

        <DatePicker
          name="date"
          label={lang("GROWTH_CONNECTIONS.DATE")}
          formik={formik}
          minDate={moment().startOf("day")}
          format="DD/MM/YYYY"
        />

        <Input
          fullWidth
          name="activityGoal"
          label={`${lang("GROWTH_CONNECTIONS.ACTIVITY.ENTER_ACTIVITY_GOAL")} *`}
          formik={formik}
          placeholder={lang("GROWTH_CONNECTIONS.ENTER")}
          multiline
          maxRows={3}
          maxLength={100}
        />

        <Input
          fullWidth
          name="note"
          label={lang("GROWTH_CONNECTIONS.ACTIVITY.ADD_NOTES_OPTIONAL")}
          formik={formik}
          placeholder={lang("GROWTH_CONNECTIONS.WRITE_HERE")}
          multiline
          maxRows={4}
          maxLength={3000}
        />
      </Stack>

      <Modal.Footer className="custom-footer text-center d-flex justify-content-end">
        <YliwayButton
          primary
          label={lang("COMMON.ADD")}
          handleClick={formik.handleSubmit}
        />
      </Modal.Footer>
    </>
  );
};
