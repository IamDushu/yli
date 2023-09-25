// EXTERNAL
import React, { useEffect, useState } from "react";
import { Table, Collapse } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
// INTERNAL
import {
  addRemoveGrowthPartner,
  getGrowthPartnerActivities,
  deleteGrowthPartnerActivities,
} from "store/actions";
import { formatDateTime } from "utils";
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddUpdateGCactivity = dynamic(() =>
  import("components/modal").then((mod) => mod.AddUpdateGCactivity)
);
import { toggleModals } from "store/actions";
import { useRouter } from "next/router";
import { createMeeting } from "store/actions/yli-meet";

function GrowthActivityList({
  icons,
  connectionActivity,
  messageHandler,
  getFilteredList,
}) {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const growthConnectionActivities = useSelector(
    (state) => state?.growth?.growthPartnerActivityList
  );
  const { addUpdateGCactivity } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const [currentPagesize, setCurrentPagesize] = useState(4);
  const [noteCollapseState, setNoteCollapseState] = useState({});

  const {
    msgtooltip,
    watchtooltip,
    showtooltip,
    canceltooltip,
    addTooltip,
    edittooltip,
    crosstooltip,
    upCollapse,
    downCollapse,
  } = icons;

  /******************** 
  @purpose : To get activity list
  @Parameter : {}
  @Author : INIC
  ******************/

  useEffect(() => {
    if (connectionActivity?.connectionUserId) {
      getActivities();
      setNoteCollapseState(() => ({}));
    }
  }, [connectionActivity]);

  useEffect(() => {
    if (currentPagesize > 4) {
      getActivities();
    }
  }, [currentPagesize]);

  /******************** 
  @purpose : To add/remove growth connection
  @Parameter : {}
  @Author : INIC
  ******************/
  const getActivities = () => {
    dispatch(
      getGrowthPartnerActivities({
        connectionUserId: connectionActivity?.connectionUserId,
        page: 1,
        pagesize: currentPagesize,
      })
    );
  };

  /******************** 
  @purpose : To remove gc activity
  @Parameter : {}
  @Author : YLIWAY
  ******************/
  const handleRemoveGCActivity = (id) => {
    dispatch(deleteGrowthPartnerActivities(id)).then((res) => {
      if (res?.status == 1) getActivities();
    });
  };

  /******************** 
  @purpose : To add/remove growth connection
  @Parameter : {}
  @Author : INIC
  ******************/
  const handleAddRemoveGrowthConnection = (connectionUserId, status) => {
    let data = {
      connectionUserId,
      growthConnection: status,
    };
    dispatch(addRemoveGrowthPartner(data)).then((res) => {
      if (res?.status === 1) {
        getFilteredList();
      }
    });
  };

  /******************** 
  @purpose : Lastname handler
  @Parameter : {}
  @Author : INIC
  ******************/
  const lastNameHandler = (userData, lastNameVisibility) => {
    if (
      lastNameVisibility === null ||
      lastNameVisibility?.settings?.all ||
      (userData?.growthConnectionData &&
        userData?.growthConnectionData?.isGrowthConnection &&
        lastNameVisibility?.settings?.myGrowthConnection) ||
      (userData?.connectionData &&
        userData?.connectionData[0]?.isConnection &&
        lastNameVisibility?.settings?.myConnection) ||
      (userData?.followData &&
        userData?.followData[0]?.isFollow &&
        lastNameVisibility?.settings?.followers)
    ) {
      return true;
    }
  };

  const launchRoom = () => {
    dispatch(createMeeting({ router }));
  };

  return (
    <div className="user-data">
      <div className="user-name d-flex align-items-center justify-content-between">
        <span className="ml-1">
          <span
            className="cursor-pointer font-20 text-primary font-weight-bold mr-1"
            onClick={() => {
              window.open(
                `/profile/${connectionActivity?.users?.profileId}`,
                "_blank"
              );
            }}
          >
            {connectionActivity?.users?.firstName}{" "}
            {lastNameHandler(
              connectionActivity?.users,
              connectionActivity?.users?.lastNameVisibility
            )
              ? connectionActivity?.users?.lastName
              : ""}
          </span>
          <span className="d-block d-sm-inline-block">
            <button
              type="button"
              className="btn px-2"
              data-toggle="tooltip"
              data-placement="top"
              title={lang("COMMON.SEND_MESSAGE")}
              onClick={() => {
                messageHandler(connectionActivity);
              }}
            >
              <img src={msgtooltip} />
            </button>
            <button
              type="button"
              className="btn px-2"
              data-toggle="tooltip"
              data-placement="top"
              title={lang("COMMON.LAUNCH_ROOM")}
              onClick={launchRoom}
            >
              <img src={watchtooltip} />
            </button>
            <button
              type="button"
              className="btn px-2"
              data-toggle="tooltip"
              data-placement="top"
              title={lang("COMMON.DELETE_GROWTH_CONNECTION")}
              onClick={() => {
                Swal.fire({
                  text: "Growth connection will be removed!",
                  icon: "warning",
                  showDenyButton: true,
                  confirmButtonText: "Confirm",
                  denyButtonText: "Cancel",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleAddRemoveGrowthConnection(
                      connectionActivity?.connectionUserId,
                      false
                    );
                  }
                });
              }}
            >
              <img src={canceltooltip} />
            </button>
          </span>
        </span>
        <button
          type="button"
          className="btn px-2"
          data-toggle="tooltip"
          data-placement="top"
          title={lang("COMMON.ADD_NEW_ACTIVITY")}
          onClick={() => {
            dispatch(
              toggleModals({ addUpdateGCactivity: true, gcActivityData: {} })
            );
          }}
        >
          <img src={addTooltip} />
        </button>
      </div>
      <Table className="border border-geyser br-8 custom-table vertical-center-table font-14 mb-0 table-borderless growth-con-table">
        <thead>
          <tr className="border-bottom-dark bg-doctor">
            <th className="skill-col text-black2 font-weight-bold font-12 text-uppercase"></th>
            <th className="skill-col text-black2 font-weight-bold font-12 text-uppercase">
              {lang("GROWTH_CONNECTIONS.ACTIVITY.TITLE")}
            </th>
            <th className="text-black2 font-weight-bold font-12 text-uppercase">
              {lang("GROWTH_CONNECTIONS.ACTIVITY.DATE")}
            </th>
            <th className=" text-black2 font-weight-bold font-12 text-uppercase">
              {lang("GROWTH_CONNECTIONS.ACTIVITY.GOAL")}
            </th>
            <th className="text-black2 font-weight-bold font-12 text-uppercase note-col">
              {lang("GROWTH_CONNECTIONS.ACTIVITY.NOTES")}
            </th>
            <th className="text-black2 font-weight-bold text-center font-12 text-uppercase">
              {lang("GROWTH_CONNECTIONS.ACTIVITY.ACTIONS")}
            </th>
          </tr>
        </thead>
        <tbody>
          {growthConnectionActivities?.rows?.length ? (
            growthConnectionActivities?.rows?.map((activity, index) => (
              <>
                <tr
                  className="text-gray text-nowrap border-bottom-dark"
                  key={`activity-${index}`}
                >
                  <td
                    className="text-wrap w-10 text-break text-black2 text-center font-12 font-weight-bold vertical-middle pointer"
                    onClick={() => {
                      setNoteCollapseState((prev) => ({
                        ...prev,
                        [index]: noteCollapseState[index] ? false : true,
                      }));
                    }}
                  >
                    <img
                      src={`${
                        noteCollapseState[index] ? upCollapse : downCollapse
                      }`}
                    />
                  </td>
                  <td className="text-wrap w-25 text-break text-black2 font-12 font-weight-bold vertical-middle">
                    {activity?.activity}
                  </td>
                  <td className="font-12 vertical-middle w-25 text-black2">
                    {formatDateTime(activity?.date)}
                  </td>
                  <td className="text-wrap w-25 text-break text-black2 font-12  vertical-middle">
                    {activity?.activityGoal}
                  </td>
                  <td className="note-col text-black2 font-12 vertical-middle text-ellipsis">
                    {activity?.note}
                  </td>
                  <td className="text-black2 vertical-middle text-ellipsis">
                    <div className="d-flex align-items-center justify-content-around">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          dispatch(
                            toggleModals({
                              addUpdateGCactivity: true,
                              gcActivityData: { ...activity },
                            })
                          );
                        }}
                      >
                        <img src={edittooltip} />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleRemoveGCActivity(activity?.id)}
                      >
                        <img src={crosstooltip} />
                      </div>
                    </div>
                  </td>
                </tr>
                {noteCollapseState[index] && (
                  <tr className="text-gray border-bottom-dark bg-doctor">
                    <td></td>
                    <td colSpan={5}>
                      <Collapse in={noteCollapseState[index]}>
                        <div className="d-flex">
                          <div className="mr-2 text-black2 font-weight-bold">
                            {lang("GROWTH_CONNECTIONS.ACTIVITY.NOTES")}:
                          </div>
                          <div>{activity?.note}</div>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <tr className="text-gray border-bottom-dark">
              <td colSpan={6} className="text-center">
                {lang("GROWTH_CONNECTIONS.ACTIVITY.NOT_AVAILABLE")}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {growthConnectionActivities?.total > currentPagesize && (
        <div className="text-center p-1 border-divider-color-bottom-left-right mb-4">
          <span
            className="text-primary pointer font-14-600"
            onClick={() => setCurrentPagesize((prevState) => prevState + 4)}
          >
            {" "}
            {lang("COMMON.LOAD_MORE")}
          </span>
        </div>
      )}
      <MainModal
        className="add-to-gmodal modal"
        show={addUpdateGCactivity}
        keyModal="addUpdateGCactivity"
        body={
          <AddUpdateGCactivity
            getActivities={getActivities}
            connectionActivity={connectionActivity}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("COMMON.ADD_ACTIVITY")}</h2>}
      />
    </div>
  );
}

export default GrowthActivityList;
