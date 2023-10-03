import React, { Fragment } from "react";
import { toggleModals } from "store/actions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { CREATE_NEW_CHANNEL, CREATE_NEW_YLIMEET_CHANNEL } from "utils";
import { useTranslation } from "react-i18next";
import { useYchat } from "hooks/useYchat";
import { CHAT_TEAM_ID } from "config";
import { useRouter } from "next/router";
import { createAndAddMemberInYliMeetGroup } from "store/actions/yli-meet";
import { CustomInputField } from "components/add-post-ui/custom-text-field";
import { Radio, Card, Grid } from "@mui/material";
import ModalFooter from "components/yli-modal/modalFooter";
import ModalBody from "components/yli-modal/modalBody";

const CreateChannel = (props) => {
  const [lang] = useTranslation("language");
  const { createPrivateChannel, currentChannelHandler } = useYchat();
  const dispatch = useDispatch();
  const router = useRouter();
  const { ylimeetId } = router.query;

  const initialValues = {
    name: "",
    display_name: "",
    purpose: "",
    type: "P",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: () =>
      props.isYliMeet === true
        ? CREATE_NEW_YLIMEET_CHANNEL(lang)
        : CREATE_NEW_CHANNEL(lang),
    onSubmit: async (values) => {
      const data = {
        ...values,
        team_id: CHAT_TEAM_ID,
        name: values.display_name.trim().replace(" ", "_").toLowerCase(),
      };
      if (props.isYliMeet) {
        const yliMeetdata = {
          id: ylimeetId,
          channelData: data,
        };
        await createAndAddMemberInYliMeetGroup(yliMeetdata).then((response) => {
          if (response.data) {
            dispatch(toggleModals({ createChannel: false, isYliMeet: false }));
            currentChannelHandler({ id: response.data.groupId });
          }
        });
        return;
      }
      await createPrivateChannel(data);
      dispatch(toggleModals({ createChannel: false, isYlimeet: false }));
    },
  });
  return (
    <Fragment>
      <ModalBody>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomInputField
              placeholder={lang("MESSAGE.ENTER_CHANNEL_NAME")}
              label={lang("MESSAGE.CHANNEL_NAME")}
              required={true}
              defaultValue={
                formik.values?.display_name && formik.values?.display_name
              }
              formik={formik}
              textarea={true}
              formikKey={`display_name`}
            />
            {formik?.touched?.display_name && formik?.errors?.display_name && (
              <small className="error form-text">
                {formik?.errors?.display_name}
              </small>
            )}
          </Grid>
          <Grid item xs={12}>
            <Card style={{ margin: "12px 0px 8px 0px" }}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#FDF8FD",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", padding: "8px 0px 2px 15px" }}>
                  <span className="d-inline-block mr-2">
                    <i class="bx bxs-lock bx-sm" />
                  </span>
                  <span className="d-inline-block ">
                    <p className="mb-0 font-12">Overline</p>
                    <p className="mb-0 font-18">Private Channel</p>
                    <p>Only invited members of your connections can join</p>
                  </span>
                </div>
                <div>
                  <Radio
                    checked={true}
                    color="primary"
                    style={{ color: "#6750A4", margin: "10px" }}
                  />
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <CustomInputField
              placeholder={lang("MESSAGE.ENTER_DESCRIPTION")}
              label={lang("MESSAGE.DESCRIPTION")}
              required={true}
              defaultValue={formik.values?.purpose && formik.values?.purpose}
              formik={formik}
              textarea={true}
              formikKey={`purpose`}
            />
            {formik?.touched?.purpose && formik?.errors?.purpose && (
              <small className="error form-text">
                {formik?.errors?.purpose}
              </small>
            )}
          </Grid>
        </Grid>
      </ModalBody>
      <div>
        <ModalFooter
          showCanel
          cancleHandleClick={() =>
            dispatch(toggleModals({ createChannel: false, isYlimeet: false }))
          }
          performButtonTitle={lang("COMMON.CREATE_CHANNEL")}
          performHandleClick={formik.handleSubmit}
        />
      </div>
    </Fragment>
  );
};

export default CreateChannel;
