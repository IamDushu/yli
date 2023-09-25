import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/selectors/user";
import router from "next/router";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
const SignUpStep1 = dynamic(() =>
  import("components/sign-up-tabs").then((mod) => mod.SignUpStep1)
);
const SignUpStep2 = dynamic(() =>
  import("components/sign-up-tabs").then((mod) => mod.SignUpStep2)
);
const SignUpStep3 = dynamic(() =>
  import("components/sign-up-tabs").then((mod) => mod.SignUpStep3)
);
const SignUP = () => {
  const { isSignUpDetailsCompleted, email } = useSelector(selectUserInfo) || {};

  useEffect(() => {
    if (isSignUpDetailsCompleted !== false) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (email === undefined) {
      router.push("/");
    }
  }, [email]);

  const [lang] = useTranslation("language");

  const [currentStep, setCurrentStep] = useState(1);

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <Layout>
      <div className="inner-wrapper sign-up">
        <Container>
          <Card
            className="mb-4"
            style={{
              padding: "16px 0px",
            }}
          >
            <div>
              <h4 className="signup-heading">{lang("FORM.SIGNUP_HEADING")}</h4>
              <div className="signup-sub-heading">
                {lang("FORM.SIGNUP_SUB_HEADING")}
              </div>
            </div>
          </Card>

          <>
            {currentStep == 1 && (
              <SignUpStep1 changeStep={setCurrentStep} email={email} />
            )}

            {currentStep == 2 && <SignUpStep2 changeStep={setCurrentStep} />}

            {currentStep == 3 && <SignUpStep3 />}
          </>
          {/*  */}
        </Container>
      </div>
    </Layout>
  );
};
export default SignUP;
