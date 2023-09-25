import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Form } from "react-bootstrap";
import { toggleModals } from "store/actions";
import { addVisibilityTags, getSetting } from "store/actions/visibility";
import { showMessageNotification } from "utils";
import { useTranslation } from "react-i18next";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const MentionsOrTags = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();

  const { tagsOptions } = useSelector(({ visibility }) => visibility);

  useEffect(() => {
    let body = {
      key: "tags_options",
    };
    dispatch(getSetting(body));
  }, []);

  useEffect(() => {
    setListing({
      all: {
        name: lang("MY_ACCOUNTS.COMMON.ALL"),
        isChecked: tagsOptions.all,
        isDisabled: true,
      },
      myConnection: {
        name: lang("MY_ACCOUNTS.COMMON.MY_CONNECTIONS"),
        isChecked: tagsOptions.myConnection,
        isDisabled: true,
      },
      myGrowthConnection: {
        name: lang("MY_ACCOUNTS.COMMON.MY_GROWTH_CONNECTIONS"),
        isChecked: tagsOptions.myGrowthConnection,
        isDisabled: true,
      },
      followers: {
        name: lang("MY_ACCOUNTS.COMMON.FOLLOWERS"),
        isChecked: tagsOptions.followers,
        isDisabled: true,
      },
      none: {
        name: lang("MY_ACCOUNTS.COMMON.NONE"),
        isChecked: tagsOptions.none,
      },
    });
  }, [tagsOptions]);

  const [listing, setListing] = useState({});

  /******************** 
@purpose : Used for checkbox change 
@Parameter : {}
@Author : INIC
******************/
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempList = Object.keys(listing).map((key) =>
      key === name ? { ...listing[key], isChecked: checked } : listing[key]
    );

    const [all, myConnection, myGrowthConnection, followers, none] = tempList;
    const myObj = { all, myConnection, myGrowthConnection, followers, none };

    setListing(myObj);
  };

  /******************** 
@purpose : Used for validation 
@Parameter : {}
@Author : INIC
******************/
  const validation = () => {
    if (
      listing.all.isChecked === false &&
      listing.myConnection.isChecked === false &&
      listing.myGrowthConnection.isChecked === false &&
      listing.followers.isChecked === false &&
      listing.none.isChecked === false
    ) {
      showMessageNotification("Please select option", "error");
      return false;
    } else if (
      listing.all.isChecked === tagsOptions.all &&
      listing.myConnection.isChecked === tagsOptions.myConnection &&
      listing.myGrowthConnection.isChecked === tagsOptions.myGrowthConnection &&
      listing.followers.isChecked === tagsOptions.followers &&
      listing.none.isChecked === tagsOptions.none
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
      let data;
      if (listing.none.isChecked) {
        data = {
          all: false,
          myConnection: false,
          myGrowthConnection: false,
          followers: false,
          none: listing.none.isChecked,
        };
      } else {
        data = {
          all: listing.all.isChecked,
          myConnection: listing.myConnection.isChecked,
          myGrowthConnection: listing.myGrowthConnection.isChecked,
          followers: listing.followers.isChecked,
          none: listing.none.isChecked,
        };
      }
      dispatch(addVisibilityTags(data));
      dispatch(toggleModals({ mentionsortags: false }));
    }
  };

  return (
    <>
      <Modal.Body className="p-4">
        <div className="common-searchbar">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
          <div className="mt-4">
            <ul className="list-unstyled model-listing-box">
              {Object.keys(listing).map((key, i) => (
                <li className="model-common-listing" key={i}>
                  <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                    <div>
                      <h5 className="text-body-14 mb-0">{listing[key].name}</h5>
                    </div>

                    <label htmlFor={key} className="mb-0 pr-0 ml-auto">
                      <input
                        type="checkbox"
                        name={key}
                        id={key}
                        autoComplete="off"
                        onChange={handleChange}
                        checked={listing[key]?.isChecked}
                        disabled={
                          listing.none.isChecked
                            ? listing[key]?.isDisabled == true
                            : listing[key]?.isDisabled == false
                        }
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
          variant="btn btn-btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ mentionsortags: false }))}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-btn btn-info font-weight-semibold px-30"
          onClick={() => saveHandler()}
        >
          {lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
