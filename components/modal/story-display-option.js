import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { addVisibilityStory, getSetting } from "store/actions/visibility";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const StoryDisplayOption = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { profileOptions } = useSelector(({ visibility }) => visibility);

  useEffect(() => {
    let body = {
      key: "profile_options",
    };
    dispatch(getSetting(body));
  }, []);

  useEffect(() => {
    setStoryCheck(profileOptions);
  }, [profileOptions]);

  const [storyCheck, setStoryCheck] = useState({});

  /******************** 
@purpose : Used for save handler
@Parameter : {}
@Author : INIC
******************/
  const saveHandler = () => {
    dispatch(addVisibilityStory(storyCheck));
    dispatch(toggleModals({ storydisplayoption: false }));
  };

  return (
    <>
      <Modal.Body className="p-4">
        {/* <PerfectScrollbar className="on-view-scroll mt-4"> */}
          <div>
            <ul className="list-unstyled model-listing-box">
              <li className="model-common-listing">
                <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <h5 className="text-body-14 mb-0">
                      {lang("MY_ACCOUNTS.COMMON.PUBLIC_MODE")}
                    </h5>
                  </div>
                  <div className="custom-radio custom-radio-outline mb-2">
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
                        checked={storyCheck?.public}
                        onClick={() =>
                          setStoryCheck({ public: true, private: false })
                        }
                      />
                      <span></span>
                    </label>
                  </div>
                </div>
              </li>
              <li className="model-common-listing">
                <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <h5 className="text-body-14 mb-0">
                      {lang("MY_ACCOUNTS.COMMON.PRIVATE_MODE")}
                    </h5>
                  </div>
                  <div className="custom-radio custom-radio-outline mb-2">
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
                        checked={storyCheck?.private}
                        onClick={() =>
                          setStoryCheck({ public: false, private: true })
                        }
                      />
                      <span></span>
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        {/* </PerfectScrollbar> */}
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ storydisplayoption: false }))}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          onClick={() => saveHandler()}
        >
          {lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
