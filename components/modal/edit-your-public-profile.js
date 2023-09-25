import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { toggleModals } from "store/actions";
import {
  addVisibilityPublicProfile,
  getSetting,
} from "store/actions/visibility";
import { showMessageNotification } from "utils";
import { useTranslation } from "react-i18next";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const EditYourPublicProfile = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { publicProfile } = useSelector(({ visibility }) => visibility);

  useEffect(() => {
    let body = {
      key: "public_profile_options",
    };
    dispatch(getSetting(body));
  }, []);

  useEffect(() => {
    setProfileList({
      profilePic: {
        name: lang("MY_ACCOUNTS.COMMON.PROFILE_PHOTO"),
        isChecked: publicProfile.profilePic,
      },
      shortDescription: {
        name: lang("MY_ACCOUNTS.COMMON.OVERVIEW"),
        isChecked: publicProfile.shortDescription,
      },
      description: {
        name: lang("MY_ACCOUNTS.COMMON.DESCRIPTION"),
        isChecked: publicProfile.description,
      },
      workExperience: {
        name: lang("MY_ACCOUNTS.COMMON.EDUCATION"),
        isChecked: publicProfile.workExperience,
      },
      experience: {
        name: lang("MY_ACCOUNTS.COMMON.EXPERIENCE"),
        isChecked: publicProfile.experience,
      },
      certification: {
        name: lang("MY_ACCOUNTS.COMMON.CERTIFICATE"),
        isChecked: publicProfile.certification,
      },
      language: {
        name: lang("MY_ACCOUNTS.COMMON.LANGUAGE"),
        isChecked: publicProfile.language,
      },
    });
  }, [publicProfile]);

  const [profileList, setProfileList] = useState({});

  const [search, setSearch] = useState("");

  /******************** 
@purpose : Used for checkbox change 
@Parameter : {}
@Author : INIC
******************/
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempList = Object.keys(profileList).map((key) =>
      key === name
        ? { ...profileList[key], isChecked: checked }
        : profileList[key]
    );

    const [
      profilePic,
      shortDescription,
      description,
      workExperience,
      experience,
      certification,
      language,
    ] = tempList;

    const myObj = {
      profilePic,
      shortDescription,
      description,
      workExperience,
      experience,
      certification,
      language,
    };

    setProfileList(myObj);
  };

  /******************** 
@purpose : Used for validation 
@Parameter : {}
@Author : INIC
******************/
  const validation = () => {
    if (
      profileList.profilePic.isChecked === false &&
      profileList.shortDescription.isChecked === false &&
      profileList.description.isChecked === false &&
      profileList.workExperience.isChecked === false &&
      profileList.experience.isChecked === false &&
      profileList.certification.isChecked === false &&
      profileList.language.isChecked === false
    ) {
      showMessageNotification("Please select option", "error");
      return false;
    } else if (
      profileList.profilePic.isChecked === publicProfile.profilePic &&
      profileList.shortDescription.isChecked ===
        publicProfile.shortDescription &&
      profileList.description.isChecked === publicProfile.description &&
      profileList.workExperience.isChecked === publicProfile.workExperience &&
      profileList.experience.isChecked === publicProfile.experience &&
      profileList.certification.isChecked === publicProfile.certification &&
      profileList.language.isChecked === publicProfile.language
    ) {
      showMessageNotification("Already Updated");
      return false;
    } else {
      return true;
    }
  };

  /******************** 
@purpose : Used for save handler
@Parameter : {}
@Author : INIC
******************/
  const saveHandler = () => {
    if (validation()) {
      let data = {
        profilePic: profileList.profilePic.isChecked,
        shortDescription: profileList.shortDescription.isChecked,
        description: profileList.description.isChecked,
        workExperience: profileList.workExperience.isChecked,
        experience: profileList.experience.isChecked,
        certification: profileList.certification.isChecked,
        language: profileList.language.isChecked,
      };
      dispatch(addVisibilityPublicProfile(data));
      dispatch(toggleModals({ edityourpublicprofile: false }));
    }
  };

  const filteredPfOptions = Object.keys(profileList).filter((pf) => {
    let title = pf.replace(/([A-Z])/g, " $1").toLowerCase();
    return title.includes(search.toLowerCase());
  });

  return (
    <>
      {/* <Form> */}
      <Modal.Body className="p-4">
        <div className="common-searchbar">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
        <div className="mt-4">
          <ul className="list-unstyled model-listing-box">
            {filteredPfOptions.map((key, i) => (
              <li className="model-common-listing" key={i}>
                <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                  <div>
                    <h5 className="text-body-14 mb-0 mb-0">
                      {profileList[key].name}
                    </h5>
                  </div>
                  <div></div>
                  <label htmlFor={key} className="mb-0 pr-0 ml-auto">
                    <input
                      type="checkbox"
                      name={key}
                      id={key}
                      autoComplete="off"
                      onChange={handleChange}
                      checked={profileList[key]?.isChecked}
                    />
                    <span></span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() =>
            dispatch(toggleModals({ edityourpublicprofile: false }))
          }
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
      {/* </Form> */}
    </>
  );
};
