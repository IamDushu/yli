import React from "react";
import { TextAreaField, TextField } from "components/form-fields";
import { Col, Form, Row, Modal, Card } from "react-bootstrap";
import { toggleModals } from "store/actions";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { CREATE_NEW_CHANNEL, CREATE_NEW_YLIMEET_CHANNEL } from "utils";
import { useTranslation } from "react-i18next";
import { useYchat } from "hooks/useYchat";
import { CHAT_TEAM_ID } from "config";
import { useRouter } from "next/router";
import { createAndAddMemberInYliMeetGroup } from "store/actions/yli-meet";

const CreateChannel = (props) => {
  const [lang] = useTranslation("language");
  const { createPrivateChannel , currentChannelHandler} = useYchat();
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
            currentChannelHandler({ id: response.data.groupId});
          }
        });
        return;
      }
      await createPrivateChannel(data);
      dispatch(toggleModals({ createChannel: false, isYlimeet: false }));
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body>
        <Row>
          <Col md={12}>
            <Form.Group>
              <TextField
                type="text"
                label="Channel Name"
                placeholder="Enter channel name"
                formik={formik}
                name="display_name"
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Card>
              <div className="p-3 d-flex align">
                <span className="d-inline-block mr-2">
                  <i class="bx bxs-lock bx-sm" />
                </span>
                <span className="d-inline-block ">
                  <h6>Private Channel</h6>
                  <p>Only invited members of your connections can join</p>
                </span>
              </div>
            </Card>
          </Col>
          <Col md={12}>
            <Form.Group className="mt-3">
              <TextAreaField
                type="text"
                label="Description"
                placeholder="Enter description"
                formik={formik}
                required={props.isYliMeet && false}
                name="purpose"
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between p-3">
        <button
          type="button"
          className="btn btn-btn btn-dark font-weight-semibold"
          onClick={() =>
            dispatch(toggleModals({ createChannel: false, isYlimeet: false }))
          }
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-btn btn-info font-weight-semibold m-0"
        >
          Create Channel
        </button>
      </Modal.Footer>
    </Form>
  );
};

export default CreateChannel;
