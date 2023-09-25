import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getFollowerListing,
  getPeopleListing,
} from "store/actions/learningInstitute";
import FollowerFilters from "./people-tab-components/follower-filter";
import FollowerList from "./people-tab-components/follower-list";
import PeopleList from "./people-tab-components/people-list";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { getFollowerListingCo, getPeopleListingCo } from "store/actions";

const PeopleTabs = ({ isFilter = true }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  const router = useRouter();
  const [followerPagesize, setFollowerPagesize] = useState(4);
  const [peoplePagesize, setPeoplePagesize] = useState(4);
  const { instituteId, companyId } = router.query;
  /******************** 
  @purpose : Used for filter followers
  @Parameter : {}
  @Author : INIC
  ******************/
  const initialValues = {
    city: "",
    selected_city: "",
    state: "",
    selected_state: "",
    country: "",
    selected_country: "",
    startDate: "",
    endDate: "",
    isFollowers: "",
    selected_isFollowers: "",
    currentPosition: "",
    selected_currentPosition: "",
    searchText: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      getPeopleAndFoolowers();
    },
  });

  /*******************
  @purpose : People Listing 
  @Author : INIC
  ******************/
  // useEffect(() => {
  //   if (activeTab === "people") {
  //     getLearningDetails();
  //     // getPeopleAndFoolowers();
  //   }
  // }, [activeTab]);

  /*******************
  @purpose : People Listing 
  @Author : INIC
  ******************/
  useEffect(() => {
    const debouncedFunction = debounce(async () => {
      await getPeopleAndFoolowers();
    }, 500);
    debouncedFunction();
  }, [formik.values?.searchText]);

  /*******************
  @purpose : Follower more listing 
  @Author : INIC
  ******************/
  useEffect(() => {
    if (followerPagesize > 4) {
      getPeopleAndFoolowers(true, false);
    }
  }, [followerPagesize]);

  /*******************
  @purpose : People more listing 
  @Author : INIC
  ******************/
  useEffect(() => {
    if (peoplePagesize > 4) {
      getPeopleAndFoolowers(false, true);
    }
  }, [peoplePagesize]);

  /*******************
  @purpose : To fetch peoples and followers listing
  @param   : {}
  @Author : INIC
  ******************/
  const getPeopleAndFoolowers = (
    moreFollower = true,
    morePeople = true,
    toClear = false
  ) => {
    const objectToSend = { ...formik.values };
    objectToSend.country = formik.values?.selected_country?.label;
    objectToSend.state = formik.values?.selected_state?.label;
    objectToSend.city = formik.values?.selected_city?.label;
    objectToSend.currentPosition =
      formik.values?.selected_currentPosition?.label;
    if (toClear) {
      objectToSend = { ...initialValues };
    }
    const followerData = {
      page: 1,
      pagesize: followerPagesize,
      ...(instituteId !== undefined
        ? { learningInstituteId: instituteId }
        : companyId !== undefined
        ? { companyId }
        : {}),
    };
    const peopleData = {
      page: 1,
      pagesize: peoplePagesize,
      ...(instituteId !== undefined
        ? { learningInstituteId: instituteId }
        : companyId !== undefined
        ? { companyId }
        : {}),
    };
    if (moreFollower) {
      instituteId !== undefined
        ? dispatch(getFollowerListing({ ...followerData, ...objectToSend }))
        : companyId !== undefined &&
          dispatch(getFollowerListingCo({ ...followerData, ...objectToSend }));
    }

    if (morePeople) {
      instituteId !== undefined
        ? dispatch(getPeopleListing({ ...peopleData, ...objectToSend }))
        : companyId !== undefined &&
          dispatch(getPeopleListingCo({ ...peopleData, ...objectToSend }));
    }
  };
  /*******************
  @purpose : To reset form 
  @param   : {}
  @Author : INIC
  ******************/
  const clearFilters = () => {
    formik.resetForm({ values: initialValues });
    getPeopleAndFoolowers(true, true, true);
  };

  /*******************
  @purpose : Rander H=ML/ React Components
  @Author : INIC
  ******************/
  return (
    <React.Fragment>
      {/* filter Card */}
      <FollowerFilters
        isFilter={isFilter}
        formik={formik}
        clearFilters={clearFilters}
      />
      {/* My Follower card */}
      <FollowerList
        followerPagesize={followerPagesize}
        setFollowerPagesize={setFollowerPagesize}
      />

      {/* My people card */}
      <PeopleList
        peoplePagesize={peoplePagesize}
        setPeoplePagesize={setPeoplePagesize}
      />
    </React.Fragment>
  );
};
export default PeopleTabs;
