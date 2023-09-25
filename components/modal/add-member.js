import React from "react";
import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import {
  addChannelMembers,
  getMessageListing,
  searchUserInChat,
  toggleModals,
} from "store/actions";
import { onImageError } from "utils";

const AddMember = ({ channelId }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      members: [],
    },
    onSubmit: async (values) => {
      let mmId;
      mmId = values.members.map(({ mmId }) => mmId);

      for (let i = 0; i < mmId.length; i++) {
        await dispatch(addChannelMembers({ user_id: mmId[i] }, channelId));
      }
      await dispatch(toggleModals({ addmembers: false }));
      await dispatch(getMessageListing(channelId));
    },
  });
  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        dispatch(
          searchUserInChat({
            search: inputValue,
            page: 1,
            perPage: 10,
            type: "privateChannel",
            channelId,
          })
        ).then((res) => {
          const membersList = [];
          res?.usersData?.map((data) => {
            membersList.push({
              label: `${data?.firstName} ${data?.lastName}`,
              value: data?.id,
              profilePicURL: data?.profilePicURL,
              id: data?.id,
              mmId: data?.mmId,
            });
          });

          callback(membersList);
        });
      }, 500);
    }
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Body className="p-4">
        <div className="common-searchbar mb-3">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <AsyncSelect
              isMulti
              menuPortalTarget={document?.querySelector("body")}
              classNamePrefix={"custom-select"}
              value={formik?.values["members"]}
              onChange={(selected) => {
                formik?.setFieldValue("members", selected);
              }}
              cacheOptions
              placeholder={"Search for people"}
              loadOptions={loadOptions}
              defaultOptions
              getOptionLabel={(options) => (
                <div className="d-flex" key={options?.id}>
                  <div>
                    <img
                      src={options?.profilePicURL}
                      width="40"
                      height="40"
                      className="rounded-circle"
                      onError={(e) =>
                        onImageError(e, "profile", options?.label)
                      }
                    />
                  </div>
                  <div className="ml-2">{options?.label}</div>
                </div>
              )}
            />
          </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <button
          type="button"
          className="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ addmembers: false }))}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-btn btn-info font-weight-semibold px-30"
          disabled={!formik.values.members.length || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Adding..." : "Add"}
        </button>
      </Modal.Footer>
    </Form>
  );
};

export default AddMember;
