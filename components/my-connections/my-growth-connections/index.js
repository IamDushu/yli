// External
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useFormik } from "formik";

// INTERNAL

import {
  chatCreateUser,
  chatSignupUser,
  getGrowthPartnerList,
  getUserById,
} from "store/actions";
import GrowthConnectionFilters from "./growth-connection-filters";
import GrowthConnectionList from "./growth-connection-list";
import GrowthActivityList from "./growth-activity-list";

import { useRouter } from "next/router";
import { useYchat } from "hooks/useYchat";
import { getOtherProfileInfo } from "store/actions/aboutUs";
import { GROWTH_CONNECTIONS_FILTER_SCHEMA, getLocalStorage } from "utils";

function MyGrowthConnectionsList({ setShowPYMK }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lang] = useTranslation("language");
  const page = 1;
  const [pagesize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const searchedGcList = useSelector(
    (state) => state?.growth?.searchedGrowthPartnerList
  );
  const [list, setList] = useState([]);
  const [connectionActivity, setConnectionActivity] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const { currentChannelHandler } = useYchat();

  const icons = {
    msgtooltip: "assets/images/msg-tooltip.svg",
    watchtooltip: "assets/images/watch-tooltip.svg",
    showtooltip: "assets/images/show-tooltip.svg",
    canceltooltip: "assets/images/cancel-tooltip.svg",
    addTooltip: "assets/images/ic-add.svg",
    checkOutlineIcon: "assets/images/check-outline-ico.svg",
    crosstooltip:"assets/images/cross-gc.svg",
    edittooltip:"assets/images/edit_gc.svg",
    upCollapse:"assets/images/up_collapse.svg",
    downCollapse:"assets/images/down_collapse.svg"
  };

  const initialValues = {
    name: "",
    profession: [],
    connectionGoals: [],
    country: "",
    region: "",
    province: "",
    city: "",
    searchText: "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: GROWTH_CONNECTIONS_FILTER_SCHEMA(lang),
    onSubmit: () => {
      getFilteredList();
    },
  });

  /*******************
  @purpose : To apply the filters
  @param   : {}
  @Author : INIC
  ******************/
  const getFilteredList = (isReset) => {
    const data = isReset
      ? {
          page,
          pagesize,
        }
      : {
          page,
          pagesize,
          searchText: formik.values.searchText,
          goals: formik.values?.connectionGoals?.length
            ? formik.values?.connectionGoals?.map((goal) => goal.value)
            : [],
          profession: formik.values.profession,
          country: formik.values?.selected_country?.label,
          state: formik.values?.selected_province?.label,
          city: formik.values.city,
        };
    dispatch(getGrowthPartnerList(data, true)).then((res) =>
      setTotal(res?.data?.total)
    );
  };
  /******************** 
  @purpose : Growth Connection List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    setShowPYMK(false);
    getFilteredList();
  }, [formik?.values?.searchText, pagesize, page]);

  useEffect(() => {
    setList(searchedGcList);
  }, [searchedGcList]);

  /******************** 
  @purpose : To set active connection for activity
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    if (list?.length) {
      setConnectionActivity(list[0]);
    } else {
      setConnectionActivity({});
    }
  }, [list]);

  /******************** 
  @purpose : Handles Growth Connection List search filter
  @Parameter : {}
  @Author : INIC
  ******************/
  const searchConnection = useCallback(
    debounce((value) => {
      setPageSize(10);
      formik.setFieldValue("searchText", value);
    }, 500)
  );

  /******************** 
  @purpose : message handler
  @Parameter : {user}
  @Author : INIC
  ******************/
  const messageHandler = (user) => {
    dispatch(getOtherProfileInfo(user?.users?.profileId)).then((res) => {
      if (res?.id) {
        sendDM(res);
      }
    });
  };

  /******************* 
@purpose : Send DM to platform user
@Parameter : 
******************/
  const sendDM = async (otherUserData) => {
    let chatRes;
    let mmLogin = getLocalStorage("mmLogin");
    if (mmLogin && typeof mmLogin === "string") {
      mmLogin = JSON.parse(mmLogin);
    }

    if (otherUserData?.mmRegister) {
      let userMmId = otherUserData?.mmId;
      if (!userMmId) {
        const res = await getUserById(otherUserData?.id);
        userMmId = res?.mmId;
      }
      chatRes = await chatCreateUser({
        ids: [userMmId, mmLogin?.mmId],
      });
    } else {
      let userEmail = otherUserData?.email;
      if (!userEmail || userEmail === "HIDDEN") {
        const user = await getUserById(otherUserData?.id);
        userEmail = user.email;
      }
      const res = await dispatch(
        chatSignupUser(
          {
            email: userEmail,
          },
          "profile"
        )
      );
      chatRes = await chatCreateUser({
        ids: [res?.id, mmLogin?.mmId],
      });
    }
    currentChannelHandler(chatRes);
    router.push("/messages");
  };

  return (
    <div className="w-100">
      <Card className="mb-3 mt-3 mt-md-0 mb-md-4 border-0">
        {/* search for all criteria */}
        <Card.Header className="pr-2 pl-0 py-2 py-sm-1">
          <div className="d-sm-flex align-items-center">
            <div className="common-searchbar px-12 w-90 mb-sm-0 mb-2">
              <Form.Group
                controlId="formSearch"
                className="position-relative mb-0"
              >
                <Form.Control
                  type="text"
                  placeholder={lang("CONNECTIONS.SEARCH_BY_NAME")}
                  onChange={(e) => searchConnection(e.target.value)}
                />
                <div className="search-inner-icon">
                  <em className="bx bx-search"></em>
                </div>
              </Form.Group>
            </div>
            <div className="d-flex border-geyser border-top-0 border-bottom-0 pl-3 pl-sm-0 w-auto my-1 pr-2 pointer">
              <Button
                variant="primary bg-white text-primary  py-8 hover-primary shadow-none d-flex align-items-center"
                onClick={() => {
                  setShowFilters((prevState) => !prevState);
                }}
              >
                {lang("ROOMS_FILTER.FILTERS")}
                <div className="material-icons ml-3">
                  {!showFilters ? "expand_more" : "expand_less"}
                </div>
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="border-top border-geyser">
          {/* growth connnection filters */}
          <GrowthConnectionFilters
            page={page}
            pagesize={pagesize}
            showFilters={showFilters}
            getFilteredList={getFilteredList}
            formik={formik}
          />

          {/* List of growth connections */}
          <GrowthConnectionList
            page={page}
            pagesize={pagesize}
            setPageSize={setPageSize}
            total={total}
            icons={icons}
            growthConnections={list}
            setConnectionActivity={setConnectionActivity}
            messageHandler={messageHandler}
            getFilteredList={getFilteredList}
          />

          {/* Detail of activity for specific connection */}
          {connectionActivity?.connectionUserId && (
            <GrowthActivityList
              page={page}
              pagesize={pagesize}
              connectionActivity={connectionActivity}
              icons={icons}
              messageHandler={messageHandler}
              getFilteredList={getFilteredList}
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyGrowthConnectionsList;
