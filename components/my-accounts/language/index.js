import React, { Fragment, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getCookie, setCookie } from "../../../utils";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguagePreference } from "store/actions/my-account";
import { selectUserInfo } from "store/selectors/user";

/******************** 
  @purpose : Edit Intro
  @Parameter : {}
  @Author : INIC
  ******************/
const Language = ({setCurrentSubMenu}) => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [lang] = useTranslation("language");

  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    let x = getCookie("language");

    x = x ? x : "en";

    setLanguage(x);
    setCurrentLanguage(x);
  }, []);

  const langOptions = [
    { value: "en", label: "English" },
    { value: "it", label: "Italian" },
  ];

  const changeLanguage = async () => {
    dispatch(
      changeLanguagePreference(
        {
          language,
        },
        userInfo
      )
    );
    setCurrentLanguage(language);
    if(language==="it"){
      setCurrentSubMenu("Lingue")
    }else{
      setCurrentSubMenu("Language")
    }
  };

  return (
    <Fragment>
      <Card className="mb-10">
        <Card.Body className="align-items-center justify-content-between">
          <div className="pr-md-3">
            <h4 className="text-body-16">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.LANGUAGE")}
            </h4>
            <p className="text-body-14 font-weight-normal m-0">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.LANGUAGE_DESCRIPTION")}
            </p>
            <p className="text-body-14 font-weight-normal mt-4">
              {lang("MY_ACCOUNTS.ACCOUNT_SETTINGS.LANGUAGE_SELECT_LABEL")}
              <div className="custom-selectpicker-xs mt-2 w-25 w-100-sm">
                <Select
                  options={langOptions}
                  onChange={(e) => {
                    let temp = e.value;
                    setLanguage(temp);
                  }}
                  value={langOptions.find((l) => l.value === language)}
                />
              </div>
            </p>
            <Button
              variant="dark-bt-secondary float-right"
              onClick={changeLanguage}
              disabled={language === currentLanguage}
            >
              {lang("MY_ACCOUNTS.COMMON.SAVE_CHANGES")}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Language;
