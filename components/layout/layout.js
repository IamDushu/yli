import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("./header"));
const Footer = dynamic(() => import("./footer"));
const MetaTags = dynamic(() => import("./meta-tags"));

import { useRouter } from "next/router";

const DeleteMessage = dynamic(() => import("components/modal/delete-message"));
const AddPost = dynamic(() =>
  import("components/modal/add-your-post/add-post")
);
const SharePost = dynamic(() =>
  import("components/modal/add-your-post/share-post")
);
const PublishArticle = dynamic(() =>
  import("components/modal/publish-article")
);
const ViewCertificate = dynamic(() =>
  import("components/modal/view-certificate")
);
const GroupMemberDelete = dynamic(() =>
  import("components/modal/group-member-delete")
);
const ReportPostModal = dynamic(() =>
  import("components/modal/report-post")
);
const ReportPost = dynamic(() =>
import("components/dashboard/Posts/ReportPost")
)
const MainModal = dynamic(() =>
  import("./../modal").then((mod) => mod.MainModal)
);
const Registration = dynamic(() =>
  import("./../modal").then((mod) => mod.Registration)
);
const LoginNew = dynamic(() =>
  import("./../modal").then((mod) => mod.LoginNew)
);
const ForgotPassword = dynamic(() =>
  import("./../modal").then((mod) => mod.ForgotPassword)
);
const OtpVerification = dynamic(() =>
  import("./../modal").then((mod) => mod.OtpVerification)
);
const SetNewPassword = dynamic(() =>
  import("./../modal").then((mod) => mod.SetNewPassword)
);
const Thankyou = dynamic(() =>
  import("./../modal").then((mod) => mod.Thankyou)
);

const CourseType = dynamic(() =>
  import("./../modal").then((mod) => mod.CourseType)
);
const UploadPdf = dynamic(() =>
  import("./../modal").then((mod) => mod.UploadPdf)
);
const CreateGroups = dynamic(() =>
  import("./../modal").then((mod) => mod.CreateGroups)
);

const GroupDeleteConfirms = dynamic(() =>
  import("./../modal").then((mod) => mod.GroupDeleteConfirms)
);
const EnterOtp = dynamic(() =>
  import("./../modal").then((mod) => mod.EnterOtp)
);
const AddCredit = dynamic(() =>
  import("./../modal").then((mod) => mod.AddCredit)
);
const Redeem = dynamic(() => import("./../modal").then((mod) => mod.Redeem));
const PhotoPost = dynamic(() =>
  import("./../modal").then((mod) => mod.PhotoPost)
);
const PhotoPostV2 = dynamic(() =>
  import("./../modal").then((mod) => mod.PhotoPostV2)
);
const VideoPost = dynamic(() =>
  import("./../modal").then((mod) => mod.VideoPost)
);
const AddMoreActivity = dynamic(() =>
  import("./../modal").then((mod) => mod.AddMoreActivity)
);
const DocumentPost = dynamic(() =>
  import("./../modal").then((mod) => mod.DocumentPost)
);
const CreatePoll = dynamic(() =>
  import("./../modal").then((mod) => mod.CreatePoll)
);
const WriteAnArticle = dynamic(() =>
  import("./../modal").then((mod) => mod.WriteAnArticle)
);
const AddCard = dynamic(() => import("./../modal").then((mod) => mod.AddCard));
const VotesPoll = dynamic(() =>
  import("./../modal").then((mod) => mod.VotesPoll)
);
const JoinRequestGroup = dynamic(() =>
  import("./../modal").then((mod) => mod.JoinRequestGroup)
);
const LikeListCounter = dynamic(() =>
  import("./../modal").then((mod) => mod.LikeListCounter)
);
const AddExperience = dynamic(() =>
  import("./../modal").then((mod) => mod.AddExperience)
);
const AddEducation = dynamic(() =>
  import("./../modal").then((mod) => mod.AddEducation)
);
const AddCertificate = dynamic(() =>
  import("./../modal").then((mod) => mod.AddCertificate)
);
const TeacherOption = dynamic(() =>
  import("./../modal").then((mod) => mod.TeacherOption)
);
const SuccessModel = dynamic(() =>
  import("./../modal").then((mod) => mod.SuccessModel)
);
const AutomaticGMModel = dynamic(() =>
  import("./../modal").then((mod) => mod.AutomaticGMModel)
);
const AddParticipants = dynamic(() =>
import("./../modal").then((mod) => mod.AddParticipants)
);
const UgradePlans = dynamic(() =>
import("./../modal").then((mod) => mod.UpgradePlan)
);

const Endorsements = dynamic(() => import("components/modal/endorsement"));
export const Layout = ({ children, removeSidebar, isJoinRoom = false }) => {
  const {
    login,
    register,
    forgetPassword,
    setNewPassword,
    otpVerification,
    thankyou,
    coursetype,
    uploadpdf,
    creategroups,
    addpost,
    isEdit,
    groupdeleteconfirms,
    enterotp,
    addcredit,
    redeem,
    photopost,
    photopostv2,
    videopost,
    documentpost,
    addmoreactivity,
    createpoll,
    writeanarticle,
    addcard,
    endorsements,
    votespoll,
    joinrequestgroup,
    likelistcounter,
    sharepost,
    publishArticle,
    reportpost,
    groupmemberdelete,
    addexperience,
    addcertificate,
    addeducation,
    teacheroption,
    success,
    viewcertificate,
    automaticgmmodel,
    deleteMessage,
    addparticipants,
    upgradeplans,
  } = useSelector(({ ui }) => ui.modals, shallowEqual);

  const router = useRouter();
  const [lang] = useTranslation("language");
  const [showSearchList, setShowSearchList] = useState("mega-search d-none");
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <div
      className="d-flex flex-column h-100"
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          setShowSearchList("mega-search d-none");
        }
      }}
    >
      {/****************
      @purpose : SEO Intigration
      @Author : INIC
      ******************/}
      <MetaTags />
      {/******************* 
      @purpose :Header Components
      @Author : INIC
      ******************/}
      <div>
        <div></div>
      </div>

      <Header
        setShowSearchList={setShowSearchList}
        showSearchList={showSearchList}
        isJoinRoom={isJoinRoom}
      />
      <main
        className={`main-layout flex-shrink-0 ${router.pathname === "/messages" ? "" : ""
          }`}
        onClick={() => setShowSearchList("mega-search d-none")}
      >
        {" "}
        {children}{" "}
      </main>

      {/******************* 
      @purpose :Registration Modal
      @Author : INIC
        ******************/}
      <MainModal
        show={register}
        title={lang("COMMON.SIGN_UP_TITLE")}
        keyModal="register"
        body={<Registration />}
        headerClassName="block"
      />
      {/******************* 
      @purpose :Login Modal
      @Author : INIC
      ******************/}
      {/* New file added for login redesign */}
      <LoginNew
        className="sign-in-modal login-new-modal"
        show={login}
        title={`${lang("COMMON.SIGN_IN_TO_CONTINUE")}`}
        keyModal="login"
      />

      {/******************* 
          @purpose :Forgot password Modal
          @Author : INIC
          ******************/}
      <MainModal
        className="forget-password header-logins-modal"
        show={forgetPassword}
        title={lang("COMMON.FORGOT_PASSWORD_TITLE")}
        keyModal="forgetPassword"
        body={<ForgotPassword />}
        headerClassName="mb-50 block md-mb-30"
      />
      {/******************* 
          @purpose :OTP verification Modal
          @Author : INIC
          ******************/}
      <MainModal
        className="otp-verification header-logins-modal"
        show={otpVerification}
        title={lang("COMMON.OTP_VERIFICATION_TITLE")}
        keyModal="otpVerification"
        body={<OtpVerification />}
        headerClassName="mb-50 block md-mb-30"
      />
      {/******************* 
          @purpose :Set New Password Modal
          @Author : INIC
          ******************/}
      <MainModal
        show={setNewPassword}
        title={lang("COMMON.SET_PASSWORD_TITLE")}
        keyModal="setNewPassword"
        body={<SetNewPassword />}
        headerClassName="mb-50 block md-mb-30"
      />
      {/******************* 
          @purpose : Thankyou modal
          @Author : INIC
          ******************/}
      <MainModal
        className="thankyou-modal header-logins-modal"
        show={thankyou}
        title={lang("COMMON.SET_THANKYOU_TITLE")}
        keyModal="thankyou"
        body={<Thankyou />}
        headerClassName="mb-50 block md-mb-30"
        backdrop="static"
        redirectUrl="/dashboard"
      />

      {/******************* 
          @purpose : Success modal
          @Author : INIC
          ******************/}
      <MainModal
        className="success-model"
        show={success}
        keyModal="success"
        body={<SuccessModel />}
        headerClassName="mb-50 block md-mb-30"
        backdrop="static"
        redirectUrl="/dashboard"
      />

      {/******************* 
           @purpose : CourseType Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="course-type custom-modal-footer modal-md"
        show={coursetype}
        keyModal="coursetype"
        body={<CourseType />}
        headerClassName=""
        header={<h2 className="h6 m-0">Choose Your Course Type</h2>}
      />
      {/******************* 
           @purpose : UploadPdf Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="upload-pdf modal-md"
        show={uploadpdf}
        keyModal="uploadpdf"
        body={<UploadPdf />}
        headerClassName="p-0"
      />
      {/******************* 
           @purpose : Create Groups Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="create-groups custom-modal-footer modal"
        show={creategroups}
        keyModal="creategroups"
        body={<CreateGroups />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 m-0 font-sm-16">
            {lang("GROUP.COMMON.SENT_INVITE_TO_YOUR_CONTACTS")}
          </h2>
        }
      />

      {/******************* 
           @purpose : post photo Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="PhotoPost header-none-modal"
        show={photopost}
        keyModal="photopost"
        closeIcon={false}
        body={<PhotoPost />}
        header={<div className="photo-post-header m-0">{lang("DASHBOARD.ADD_POST.PHOTO_POST")}</div>}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : post photo Modal V2
           @Author : INIC
           ******************/}

      {photopostv2 && <PhotoPostV2 show={photopostv2} />}

      {/******************* 
           @purpose : post video Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="VideoPost header-none-modal"
        show={videopost}
        keyModal="videopost"
        closeIcon={false}
        body={<VideoPost />}
        header={<div className="video-post-header m-0">{lang("DASHBOARD.ADD_POST.VIDEO_POST")}</div>}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : post documents Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="documentpost header-none-modal"
        show={documentpost}
        keyModal="documentpost"
        body={<DocumentPost />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : Dashboard page add post Modal
           @Author : INIC
           ******************/}
      {/* <MainModal
        className="addpost img-view custom-modal-footer"
        show={addpost}
        keyModal="addpost"
        backdrop="static"
        body={<AddPost />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 m-0">
            {isEdit
              ? lang("DASHBOARD.ADD_POST.EDIT_POST")
              : lang("DASHBOARD.ADD_POST.CREATE_POST")}
          </h2>
        }
      /> */}
      {/******************* 
           @purpose : userpost voterList Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="votespoll"
        show={votespoll}
        keyModal="votespoll"
        body={<VotesPoll />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : report post Modal
           @Author : YLIWAY
           ******************/}
      <ReportPostModal
        className="report-post"
        open={reportpost}
        keyModal="reportpost"
        centered
        body={<ReportPost />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : Group Delete confirms
           @Author : INIC
           ******************/}
      <MainModal
        className="account-suspention-confirms modal-md"
        show={groupdeleteconfirms}
        keyModal="groupdeleteconfirms"
        centered
        body={<GroupDeleteConfirms />}
        headerClassName="mb-50 block md-mb-30"
      />

      <MainModal
        className="account-suspention-confirms modal-md"
        show={groupmemberdelete}
        keyModal="groupmemberdelete"
        centered
        body={<GroupMemberDelete />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : EnterOtp email for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="enter-otp"
        show={enterotp}
        keyModal="enterotp"
        centered
        body={<EnterOtp />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : Add credit for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="add-credit custom-modal-footer"
        show={addcredit}
        keyModal="addcredit"
        centered
        body={<AddCredit />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">{lang("COURSES.ADD_CREDIT")}</h2>}
      />
      {/******************* 
           @purpose : Add card for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="add-card custom-modal-footer"
        show={addcard}
        keyModal="addcard"
        centered
        body={<AddCard />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">{lang("COMMON.ADD_CARD")}</h2>}
      />

      {/******************* 
           @purpose : Redeem for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="redeem"
        show={redeem}
        keyModal="redeem"
        centered
        header={
          <h2 className="font-28 font-md-18 font-weight-semibold text-secondary mb-0">
            {lang("MY_ACCOUNTS.FORM.REDEEM.REDEEM")}
          </h2>
        }
        body={<Redeem />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : Add More Activity  Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="add-more-activity custom-modal-footer"
        show={addmoreactivity}
        keyModal="addmoreactivity"
        body={<AddMoreActivity />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Add More</h2>}
      />

      {/******************* 
           @purpose : Create poll an popup from post
           @Author : INIC
           ******************/}
      <MainModal
        className="create-poll custom-modal-footer add-poll-post"
        show={createpoll}
        keyModal="createpoll"
        body={<CreatePoll />}
        headerClassName="mb-50 block md-mb-30"
        header={<div className="share-poll-header m-0">{lang("DASHBOARD.POLL.SHARE_POLL")}</div>}
      />

      {/******************* 
           @purpose : Write an article an popup from post
           @Author : INIC
           ******************/}
      <MainModal
        className="write-an-article"
        show={writeanarticle}
        keyModal="writeanarticle"
        body={<WriteAnArticle />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : Write an article an popup from post
           @Author : INIC
           ******************/}
      <MainModal
        className="join-request-group custom-modal-footer"
        show={joinrequestgroup}
        keyModal="joinrequestgroup"
        body={<JoinRequestGroup />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Manage your Contacts</h2>}
      />

      {/******************* 
           @purpose : Like-List-Counter in dashboard poll an popup from post
           @Author : INIC
           ******************/}
      <MainModal
        className="Like-List-Counter"
        show={likelistcounter}
        keyModal="likelistcounter"
        body={<LikeListCounter />}
        headerClassName="mb-50 block md-30"
        header={
          <h3 className="font-24 font-md-18 font-weight-semibold text-secondary">
            {lang("DASHBOARD.POSTS.LIKES_MODAL.HEADER_NAME")}
          </h3>
        }
      />

      {/******************* 
           @purpose : share post modal
           @Author : INIC
           ******************/}
      <MainModal
        show={sharepost}
        keyModal="sharepost"
        body={<SharePost />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <h2 className="h6 m-0">
            {isEdit
              ? lang("DASHBOARD.ADD_POST.EDIT_SHARED_POST")
              : lang("DASHBOARD.ADD_POST.SHARE_POST")}
          </h2>
        }
      />
      {/******************* 
           @purpose : Publish article modal
           @Author : INIC
           ******************/}
      <MainModal
        show={publishArticle}
        keyModal="publishArticle"
        body={<PublishArticle />}
        headerClassName="mb-50 block md-mb-30"
      />

      {/******************* 
           @purpose : Teacher addexperience
           @Author : INIC
           ******************/}
      <MainModal
        className="custom-modal-footer "
        show={addexperience}
        keyModal="addexperience"
        body={<AddExperience />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0 font-1">Add Experience</h2>}
      />

      {/******************* 
      @purpose : Teacher certification
      @Author : INIC
      ******************/}
      <MainModal
        className="custom-modal-footer "
        show={addcertificate}
        keyModal="addcertificate"
        body={<AddCertificate />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Add Certification</h2>}
      />
      {/******************* 
       @purpose : Teacher education
      @Author : INIC
      ******************/}
      <MainModal
        className="custom-modal-footer"
        show={addeducation}
        keyModal="addeducation"
        body={<AddEducation />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Add Education</h2>}
      />
      {/******************* 
       @purpose : Teacher option
      @Author : INIC
      ******************/}
      <MainModal
        className="bussness-option"
        show={teacheroption}
        keyModal="teacheroption"
        noScroll={true}
        body={<TeacherOption />}
        headerClassName="mb-50 block md-mb-30 border-0"
        header={
          <h2 className="h6 m-0 font-16 font-sm-14">
            {lang("BUSINESS.BOOST")}
          </h2>
        }
      />

      {/******************* 
       @purpose : View Certificate
      @Author : INIC
      ******************/}
      <MainModal
        className="view-certificate"
        show={viewcertificate}
        keyModal="viewcertificate"
        body={<ViewCertificate />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">View Certificate</h2>}
      />

      <MainModal
        className="view-certificate custom-modal-footer header-none-modal"
        show={automaticgmmodel}
        size="xxxl"
        keyModal="automaticgmmodel"
        body={<AutomaticGMModel />}
      // headerClassName="mb-50 block md-mb-30"
      // header={<h2 className="h6 m-0">View Certificate</h2>}
      />
      {/******************* 
           @purpose :  Endorsement modal
           @Author : INIC
           ******************/}
      <MainModal
        className="endorsements custom-modal-footer"
        show={endorsements}
        keyModal="endorsements"
        centered
        body={<Endorsements />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">Endorsements</h2>
          </div>
        }
      />
      <MainModal
        className="profile-photo-view custom-modal-footer"
        show={deleteMessage}
        keyModal="deleteMessage"
        centered={false}
        body={<DeleteMessage />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Confirm Message Delete</h2>}
      />
      {/******************* 
      @purpose :Add Participants for YMeet
      @Author : 
        ******************/}
      <MainModal
        className="add-participants custom-modal-footer"
        show={addparticipants}
        keyModal="addparticipants"
        centered
        body={<AddParticipants />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">Add Participants</h2>}
      />
       {/******************* 
      @purpose :Upgrade Plans for YMeet
      @Author : 
        ******************/}
      <MainModal
        className="upgrade-plans custom-modal-footer"
        show={upgradeplans}
        keyModal="upgradeplans"
        centered
        body={<UgradePlans />}
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 m-0">YLIMEET - Plans</h2>}
      />
      {/******************* 
      @purpose :Footer Components
      @Author : INIC
      ******************/}
      {removeSidebar !== "footer" && <Footer />}
    </div>
  );
};
