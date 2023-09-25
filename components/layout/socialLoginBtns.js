import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { googleLogin, facebookLogin, linkedinLogin } from "../../store/actions";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useDispatch } from "react-redux";
import {
  GOOGLE_CLIENT_ID,
  LINKEDIN_CLIENT_ID,
  FACEBOOK_APP_ID,
  APP_URL,
} from "config";
/******************** 
  @purpose : Social login buttons
  @Parameter : {  }
  @Author : INIC
  ******************/
const SocialLoginBtns = ({ inviteToken }) => {
  const dispatch = useDispatch();
  const linkedInRedirectURI = `${APP_URL}/linkedin`;

  const { linkedInLogin } = useLinkedIn({
    clientId: LINKEDIN_CLIENT_ID,
    scope: "r_emailaddress r_liteprofile",
    redirectUri: linkedInRedirectURI,

    onSuccess: (code) => {
      dispatch(
        linkedinLogin({
          code,
          redirect_uri: linkedInRedirectURI,
          invite: inviteToken,
        })
      );
    },
    onError: (error) => {},
  });

  /******************** 
  @purpose : Used for google login response
  @Parameter : { response }
  @Author : INIC
  ******************/

  const responseGoogle = (response) => {
    if (response?.tokenId) {
      dispatch(
        googleLogin({
          token: response.tokenId,
          invite: inviteToken,
          providerKey: response?.googleId,
        })
      );
    }
  };

  /******************** 
  @purpose : Used for facebook login response
  @Parameter : { response }
  @Author : INIC
  ******************/
  const responseFacebook = (response) => {
    if (response?.accessToken) {
      dispatch(
        facebookLogin({
          email: response.email,
          firstName: response.name,
          profilePicURL: response.picture.data.url,
          invite: inviteToken,
          providerKey: response?.userID,
        })
      );
    }
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/

  return (
    <ButtonGroup
      size="md"
      className="w-100 mb-4 mt-md-5 mt-3 pb-2 signin-with d-inlne-grid d-sm-inline-flex flex-wrap flex-sm-nowrap"
    >
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            className="bg-white text-mist-blue justify-content-center font-16 border-0 box-shadow-none d-flex align-items-center rounded-pill"
          >
            <div className="w-100-px d-flex align-items-center justify-content-start">
              <em className="icon-fb font-26 pr-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </em>
              Facebook
            </div>
          </Button>
        )}
      />

      <Button
        onClick={linkedInLogin}
        className="bg-white text-mist-blue justify-content-center font-16 border-0 box-shadow-none d-flex align-items-center rounded-pill"
      >
        <div className="w-100-px d-flex align-items-center justify-content-start">
          <em className="icon-linkedin font-26 pr-2">
            <span className="path1"></span>
            <span className="path2"></span>
          </em>
          Linkedin
        </div>
      </Button>

      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        disabled={false}
        render={(renderProps) => (
          <Button
            type="button"
            onClick={renderProps.onClick}
            className="bg-white text-mist-blue justify-content-center font-16 border-0 box-shadow-none d-flex align-items-center rounded-pill"
          >
            <div className="w-100-px d-flex align-items-center justify-content-start">
              <em className="icon-google font-26 pr-2">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
              </em>
              Google
            </div>
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </ButtonGroup>
  );
};

export default SocialLoginBtns;
