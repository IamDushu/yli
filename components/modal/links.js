import React, { useEffect, useState } from "react";
import { Button,  Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { addVisibilityLinks, getSetting } from "store/actions/visibility";
import { showMessageNotification } from "utils";
import { useTranslation } from "react-i18next";

/*******************   
@purpose : User Set Thankyou
@Author : INIC
******************/
export const Links = () => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const { linksOptions } = useSelector(({ visibility }) => visibility);

  useEffect(() => {
    let body = {
      key: "links_options",
    };
    dispatch(getSetting(body));
  }, []);

  useEffect(() => {
    setListing({
      all: {
        name: lang("MY_ACCOUNTS.COMMON.ALL"),
        isChecked: linksOptions.all,
        isDisabled: true,
      },
      myConnection: {
        name: lang("MY_ACCOUNTS.COMMON.MY_CONNECTIONS"),
        isChecked: linksOptions.myConnection,
        isDisabled: true,
      },
      myGrowthConnection: {
        name: lang("MY_ACCOUNTS.COMMON.MY_GROWTH_CONNECTIONS"),
        isChecked: linksOptions.myGrowthConnection,
        isDisabled: true,
      },
      followers: {
        name: lang("MY_ACCOUNTS.COMMON.FOLLOWERS"),
        isChecked: linksOptions.followers,
        isDisabled: true,
      },
      none: {
        name: lang("MY_ACCOUNTS.COMMON.NONE"),
        isChecked: linksOptions.none,
      },
    });
  }, [linksOptions]);

  const [listing, setListing] = useState({});

  const [tableShow, setTableShow] = useState(true);

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
      listing.all.isChecked === linksOptions.all &&
      listing.myConnection.isChecked === linksOptions.myConnection &&
      listing.myGrowthConnection.isChecked ===
        linksOptions.myGrowthConnection &&
      listing.followers.isChecked === linksOptions.followers &&
      listing.none.isChecked === linksOptions.none
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
      dispatch(addVisibilityLinks(data));
      dispatch(toggleModals({ links: false }));
    }
  };

  return (
    <>
      <Modal.Body className="p-4">
          {tableShow && (
            <div>
              <ul className="list-unstyled model-listing-box">
                {Object.keys(listing).map((key, i) => (
                  <li className="model-common-listing" key={i}>
                    <div className="custom-checkbox checkbox-blue d-flex justify-content-between">
                      <div>
                        <h5 className="text-body-14 mb-0">
                          {listing[key].name}
                        </h5>
                      </div>
                      <label htmlFor={key} className="mb-0 mr-3 pr-0 ml-auto">
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
          )}
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between">
        <Button
          variant="btn btn-dark font-weight-semibold"
          onClick={() => dispatch(toggleModals({ links: false }))}
        >
          {lang("COMMON.CANCEL")}
        </Button>
        <Button
          variant="btn btn-info font-weight-semibold px-5"
          onClick={() => saveHandler()}
        >
          {lang("COMMON.SAVE")}
        </Button>
      </Modal.Footer>
    </>
  );
};
