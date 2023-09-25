import GroupCreate from "components/groups/group-create";
import { Layout } from "components/layout";
import {
  Add,
  FollowedGroup,
  GrowthModal,
  GrowthPartners,
  MostFollowedContents,
  MyProfile,
  RecentAddedGM,
  UpgradeYourProfile,
} from "components/sidebar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, getGroupDetails } from "store/actions";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

function EditGroups() {
  const { groupDetails } = useSelector(({ groups }) => groups);
  const groupImage = groupDetails?.imageURL;
  // const groupLogo = groupDetails?.logo;
  const [lang] = useTranslation("language");
  const [groupData, setGroupData] = useState({
    groupName: "",
    groupDesc: "",
    groupRemark: "",
    groupTags: [],
  });

  const [selectedType, setSelectedType] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  /******************** 
@purpose : useEffect
@Parameter : {}
@Author : INIC
******************/
  useEffect(() => {
    dispatch(getGroupDetails(id));
  }, []);

  useEffect(() => {
    setGroupData({
      groupName: groupDetails?.name,
      groupTags: groupDetails?.hashTags,
      groupDesc: groupDetails?.description,
      groupRemark: groupDetails?.remarks,
      groupImageURL: groupDetails?.imageURL,
    });
    setSelectedType(groupDetails?.groupType);
  }, [groupDetails]);

  /******************** 
@purpose : Used for formik initialValues
@Parameter : {}
@Author : INIC
******************/
  let initialValues = {
    name: groupData.groupName,
    tags: groupData.groupTags,
    description: groupData.groupDesc,
    remarks: groupData.groupRemark,
    imageURL: groupData.groupImageURL,
    // logo: groupData.logo,
    status: true,
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
    let data = {
      id,
      name: values.name,
      hashTags: values.tags,
      imageURL: values.imageURL,
      // logo: values.logo,
      description: values.description,
      remarks: values.remarks,
      groupType: selectedType,
      status: values.status,
    };

    await dispatch(createGroup(data));
    router.push({ pathname: "/groups" });
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
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
              handleChange={handleChange}
              // handleLogoChange={handleLogoChange}
              radioChange={radioChange}
              groupImage={groupImage}
              // groupLogo={groupLogo}
              selectedType={selectedType}
            />

            {/* right blog section */}
            <div className="right-blog-section">
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
}

export default EditGroups;
