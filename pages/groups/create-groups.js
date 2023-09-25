import React, { useEffect, useState } from "react";
import { Layout } from "@components/layout";
import { Container } from "react-bootstrap";
import {
  RecentAddedGM,
  MyProfile,
  GrowthModal,
  MostFollowedContents,
  Add,
  FollowedGroup,
  UpgradeYourProfile,
  GrowthPartners,
} from "components/sidebar";
import { useRouter } from "next/router";
import WithAuth from "components/with-auth/with-auth";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createGroup, getGroupDetails } from "store/actions";
import GroupCreate from "components/groups/group-create";
import { CREATE_GROUP_VALIDATION } from "utils";
import { useTranslation } from "react-i18next";

const CreateGroups = () => {
  const [selectedType, setSelectedType] = useState("public");
  const router = useRouter();
  const { isEdit } = router.query;
  const { id } = router.query;
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [lang] = useTranslation("language");

  /******************** 
@purpose : useEffect
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    if (id) {
      dispatch(getGroupDetails(id));
    }
  }, []);

  /******************** 
@purpose : Used for formik initialValues
@Parameter : {}
@Author : INIC
******************/
  let initialValues = {
    name: "",
    description: "",
    tags: [],
    remarks: "",
    status: true,
    imageURL: "",
    // logo: "",
  };

  /******************** 
@purpose : Used for validation
@Parameter : { values }
@Author : INIC
******************/
  const validate = (values) => {
    let errors = {};

    if (values.imageURL === "") {
      errors.imageURL = "Image is required";
    }

    if (!values.name.trim()) {
      errors.name = "Group Name is required";
    }

    if (values.tags.length === 0) {
      errors.tags = lang("COMMON.MIN_ONE_TAG_REQUIRED");
    }
    if (values.tags.length > 3) {
      errors.tags = lang("COMMON.MAX_THREE_TAG_ALLOWED");
    }

    if (!values.description.trim()) {
      errors.description = "Description is required";
    } else if (values.description.length > 2000) {
      errors.description = lang("USER_DESCRIPTION.FORM.CHAR_2000");
    }
    if (values.remarks.length > 1000) {
      errors.remarks = "Maximum character limit is 1000";
    }
    return errors;
  };

  /******************** 
@purpose : Used for create group
@Parameter : { values }
@Author : INIC
******************/
  const onSubmit = async (values) => {
    setDisabled(true);
    let data = {
      name: values.name,
      hashTags: values.tags,
      imageURL: values.imageURL,
      // logo: values.logo,
      description: values.description,
      remarks: values.remarks,
      groupType: selectedType,
      status: values.status,
    };

    dispatch(createGroup(data)).then((groupData) => {
      // router.push({ pathname: "/groups" });
      router.push(`/groups/${groupData?.data?.name}/${groupData?.data?.id}`);
    });
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  /******************* 
@purpose : Image file upload
@Parameter : 
@Author : INIC
******************/
  const handleChange = (src) => {
    formik.setFieldValue("imageURL", src);
  };
  // const handleLogoChange = (src) => {
  //   formik.setFieldValue("logo", src);
  // };

  /******************* 
@purpose : Radio button select
@Parameter : 
@Author : INIC
******************/
  const radioChange = (e) => {
    setSelectedType(e.target.value);
  };

  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <Layout>
      <div className="inner-wrapper create-groups-box">
        <Container>
          <div className="d-flex flex-xl-nowrap flex-wrap">
            {/* left profile section */}
            <div className="left-profile-section">
              {/* profile section */}
              <MyProfile />

              {/* growth modal listing */}
              <GrowthModal />
              <Add />
            </div>

            {/* Create groups */}
            <GroupCreate
              formik={formik}
              disabled={disabled}
              handleChange={handleChange}
              // handleLogoChange={handleLogoChange}
              radioChange={radioChange}
              groupImage=""
              // groupLogo=""
              selectedType={selectedType}
            />

            {/* right blog section */}
            <div className="right-blog-section w-lg-100 p-md-0">
              <UpgradeYourProfile />

              {/* GrowthModal */}
              <GrowthModal />

              {/* GrowthPartners */}
              <GrowthPartners />

              {/* Recently Added to gm */}
              <RecentAddedGM />

              <FollowedGroup />

              {/* Most Followed Contents */}
              <MostFollowedContents />
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
export default WithAuth(CreateGroups);
