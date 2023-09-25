import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { changePreferences } from "../../store/actions/my-account";
import { toggleModals } from "../../store/actions";
import { selectUserPreferences } from "../../store/selectors/account-setting";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const ProfilePhotoView = () => {
  const [lang] = useTranslation("language");
  const pfOptions = [
    lang("MY_ACCOUNTS.FORM.PREFERENCES.ALL"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.MY_CONNECTIONS"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.MY_GROWTH_CONNECTIONS"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.FOLLOWERS"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.TEACHERS"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.COACH"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.HOSTS"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.TRAINER"),
    lang("MY_ACCOUNTS.FORM.PREFERENCES.COMPANIES"),
  ];
  const dispatch = useDispatch();
  const userPreferences = useSelector(selectUserPreferences);
  const [searchText, setSearchText] = useState("");
  const initialState = {
    all: userPreferences?.all || false,
    myConnections: userPreferences?.myConnections || false,
    myGrowthConnections: userPreferences?.myGrowthConnections || false,
    followers: userPreferences?.followers || false,
    teachers: userPreferences?.teachers || false,
    coach: userPreferences?.coach || false,
    hosts: userPreferences?.hosts || false,
    trainer: userPreferences?.trainer || false,
    companies: userPreferences?.companies || false,
  };
  const [preferences, setPreferences] = useState(initialState);

  const handleChange = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleSubmit = () => {
    dispatch(
      changePreferences(preferences, () =>
        dispatch(toggleModals({ profilephotoview: false }))
      )
    );
    setPreferences(initialState);
  };

  const filteredPfOptions = pfOptions.filter((pf) => {
    let title = pf.replace(/([A-Z])/g, " $1").toLowerCase();
    return title.includes(searchText.toLowerCase());
  });

  return (
    <>
      <Modal.Body className="p-4">
        <div className="common-searchbar">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
          <div className="mt-4">
            <ul className="list-unstyled model-listing-box">
              {filteredPfOptions.map((pf, idx) => {
                let title = pf.replace(/([A-Z])/g, " $1");
                title = title.charAt(0).toUpperCase() + title.slice(1);

                return (
                  <li className="model-common-listing" key={idx}>
                    <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                      <div>
                        <h5 className="text-body-14 mb-0">{title}</h5>
                      </div>
                      <div></div>
                      <label className="mb-0 pr-0 ml-auto">
                        <input
                          type="checkbox"
                          name="csscheckbox"
                          checked={preferences[pf]}
                          onChange={() => handleChange(pf, !preferences[pf])}
                        />
                        <span></span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ profilephotoview: false }))}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-30"
          onClick={handleSubmit}
        >
          {lang("COMMON.UPDATE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
