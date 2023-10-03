import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { TextAreaField } from "components/form-fields";
import { ChatContext } from "context/ChatContext";
import { useFormik } from "formik";
import MoodIcon from "@mui/icons-material/Mood";
import {
  fileUploadMessage,
  fileUploadMM,
  getMessageListing,
  getThreadMessages,
  replyMessage,
} from "store/actions/chat";
import Picker from "@emoji-mart/react";
import { useYchat } from "hooks/useYchat";
import { YliwayButton } from "components/button";

const MessageBox = ({ isThread }) => {
  const [fileIds, setFileIds] = useState([]);
  const dispatch = useDispatch();
  const { sendMessage } = useYchat();
  const { currentChannel, activeThread } = useContext(ChatContext);
  const [addEmoji, setAddEmoji] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: "",
      selectedImages: [],
      file_ids: [],
    },
    onSubmit: async (values, { resetForm }) => {
      if (isThread) {
        const data = {
          channelId: currentChannel?.id,
          messageId: activeThread?.id,
          ...values,
        };
        await dispatch(replyMessage(data));
        dispatch(getMessageListing(currentChannel?.id));
      } else if (fileIds?.length) {
        const data = {
          channel_id: currentChannel?.id,
          file_ids: fileIds,
          message: values.message,
        };

        await dispatch(fileUploadMessage(data));
        setFileIds([]);
      } else {
        const data = {
          channel_id: currentChannel?.id,
          ...values,
        };
        sendMessage(data);
      }
      resetForm();
      if (isThread) dispatch(getThreadMessages(activeThread.id));
    },
  });

  /************************************** 
  @purpose : Used for remove image index
  @Parameter : {}
  @Author : YLIWAY
  *************************************/
  const removeItem = (index) => {
    const newItems = [...formik.values.selectedImages];
    newItems.splice(index, 1);
    formik.setFieldValue("selectedImages", newItems);
  };
  /************************************** 
  @purpose : Used for handle Emoji
  @Parameter : {}
  @Author : YLIWAY
  *************************************/
  const handleEmoji = (e) => {
    const text = formik.values.message + e.native;
    formik.setFieldValue("message", text);
  };
  /************************************** 
  @purpose : Used for submit Form handler
  @Parameter : {}
  @Author : YLIWAY
  *************************************/
  const submitHandler = async (e) => {
    e.preventDefault();
    for (let i = 0; i < formik.values.selectedImages.length; i++) {
      const formData = new FormData();
      formData.append("image", formik.values.selectedImages[i]);
      formData.append("channelId", currentChannel?.id);
      try {
        const response = await dispatch(fileUploadMM(formData));
        setFileIds((prevIds) => [...prevIds, response?.file_infos[0]?.id]);
      } catch (error) {
        console.log(error);
      }
    }
    formik.handleSubmit();
  };

  return (
    <>
      <div className="message-box mb-2">
        <div className="position-relative w-100 ">
          <TextAreaField
            className="message-box-input py-2 font-sm-14"
            style={{ borderRadius: "0", borderColor: "#d1d5db" }}
            placeholder="Write a message..."
            formik={formik}
            name="message"
            required={true}
          />

          <div className="message-text-options d-flex">
            <MoodIcon
              sx={{ color: "#49454E" }}
              onClick={() => {
                setAddEmoji(!addEmoji);
              }}
            />
            {addEmoji && (
              <div className="emoji-overlay-popup">
                <Picker
                  onEmojiSelect={(e) => {
                    setAddEmoji(false);
                    handleEmoji(e);
                  }}
                  theme="light"
                  previewPosition="none"
                />
              </div>
            )}
          </div>
        </div>
        <div className="message-box-button ml-2">
          <YliwayButton
            primary
            size={isThread ? "small" : "large"}
            label={"Send"}
            handleClick={submitHandler}
            disabled={
              !formik.values.message.trim() &&
              !formik.values.selectedImages.length
            }
          />
        </div>
      </div>
      <div className="row row-col-10 three-grid-spacing">
        {formik?.values?.selectedImages?.length > 0 &&
          formik?.values?.selectedImages?.map((imageUrl, index) => (
            <div className="col-md-4">
              <div
                key={index}
                className="border-radius-8 border border-geyser p-2 d-flex"
              >
                <img
                  src={
                    imageUrl?.type?.includes("pdf")
                      ? "/assets/images/homepage/pdf.png"
                      : "/assets/images/homepage/image.jpeg"
                  }
                  alt=""
                  className="mr-2"
                  width={40}
                  height={40}
                />
                <div className="flex-grow-1">
                  <p className="mb-1 font-weight-bold text-ellipsis w-180">
                    {imageUrl?.name}
                  </p>
                  <span className="d-block font-12 text-gray-darker">
                    {imageUrl?.type} {Math.round(imageUrl?.size / 1024)}KB
                  </span>
                </div>
                <i
                  className="material-icons font-18 text-gray-darker cursor-pointer ml-2"
                  onClick={() => removeItem(index)}
                >
                  close
                </i>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MessageBox;
