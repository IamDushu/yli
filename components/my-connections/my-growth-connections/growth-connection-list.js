// EXTERNAL
import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Swal from "sweetalert2";
import { createMeeting } from "../../../store/actions/yli-meet";

// INTERNAL
import {
  addRemoveGrowthPartner,
  manageGrowthPartnershipGoals,
} from "store/actions";
import { connectionGoals } from "utils";

function GrowthConnectionList({
  pagesize,
  setPageSize,
  total,
  icons,
  setConnectionActivity,
  messageHandler,
  growthConnections,
  getFilteredList,
}) {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { msgtooltip, watchtooltip, showtooltip, canceltooltip } = icons;

  /******************** 
  @purpose : Handles goals update
  @Parameter : {connectionUserId, goals}
  @Author : INIC
  ******************/
  const handleGoalUpdate = (connectionUserId, goals) => {
    dispatch(
      manageGrowthPartnershipGoals({
        connectionUserId,
        goals,
      })
    ).then((res) => {
      if (res.status == 1) getFilteredList();
    });
  };

  /******************** 
  @purpose : To add/remove growth connection
  @Parameter : {connectionUserId, status}
  @Author : INIC
  ******************/
  const handleAddRemoveGrowthConnection = (connectionUserId, status) => {
    let data = {
      connectionUserId,
      growthConnection: status,
    };
    dispatch(addRemoveGrowthPartner(data)).then((res) => {
      if (res.status === 1) getFilteredList();
    });
  };

  /******************** 
  @purpose : Lastname handler
  @Parameter : {userData, lastNameVisibility}
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

  const goalTranslation = {
    "Visibility Partner": lang("GROWTH_CONNECTIONS.VISIBILITY_PARTNER"),
    "Channel Partner": lang("GROWTH_CONNECTIONS.CHANNEL_PARTNER"),
    "Business Partner": lang("GROWTH_CONNECTIONS.BUSINESS_PARTNER"),
    "Know-how exchange": lang("GROWTH_CONNECTIONS.KNOW_HOW_EXCHANGE"),
  };

  return (
    <>
      <Table
        className={`custom-table vertical-center-table font-14 mb-0 table-borderless border border-geyser br-8 growth-con-table ${
          total > growthConnections?.length ? "" : "mb-4"
        }`}
      >
        <thead>
          <tr className="border-bottom-dark bg-doctor text-ellipsis text-uppercase">
            <th className="skill-col text-black2 font-weight-bold font-12">
              {lang("GROWTH_CONNECTIONS.GROWTH_CONNECTIONS")}
            </th>
            <th className="text-black2 font-weight-bold font-12 text-uppercase prof-width">
              {lang("GROWTH_CONNECTIONS.FILTER.PROFESSION")}
            </th>
            <th className=" text-black2 font-weight-bold font-12 text-uppercase">
              {lang("GROWTH_CONNECTIONS.FILTER.CONNECTION_GOALS")}
            </th>
            <th className=" text-black2 font-weight-bold text-center w-160 font-12 d-block text-uppercase">
              {lang("COMMON.ACTION")}
            </th>
          </tr>
        </thead>
        <tbody>
          {growthConnections === undefined ||
          (Array.isArray(growthConnections) &&
            growthConnections.length === 0) ? (
            <tr>
              <td colSpan={4} className="text-center">
                {lang("CONNECTIONS.NO_CONNECTIONS_AVAILABLE")}
              </td>
            </tr>
          ) : (
            growthConnections?.map((user, index) => (
              <tr
                className="text-gray text-nowrap border-bottom-dark"
                key={`gc-${index}`}
              >
                <td className="text-wrap w-25 text-break text-primary font-12 font-weight-bold vertical-middle">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      window.open(
                        `/profile/${user?.users?.profileId}`,
                        "_blank"
                      );
                    }}
                  >
                    {user?.users?.firstName}{" "}
                    {lastNameHandler(
                      user?.users,
                      user?.users?.lastNameVisibility
                    )
                      ? user?.users?.lastName
                      : ""}
                  </span>
                </td>
                <td className="font-12 vertical-middle prof-width">
                  <p className="mb-0 font-12 text-ellipsis">
                    {" "}
                    {user?.users?.currentPosition
                      ? user?.users?.currentPosition
                      : lang("CONNECTIONS.NO_POSTION")}
                  </p>
                </td>
                <td className="prof-width">
                  <Form.Group className="mb-0">
                    <div className="custom-multiselectcheck-courses">
                      <ReactMultiSelectCheckboxes
                        options={connectionGoals?.map((goal) => {
                          return {
                            label: goalTranslation[goal.value],
                            value: goal.value,
                          };
                        })}
                        name="connectionGoal"
                        id="connectionGoal"
                        value={
                          user?.goals
                            ? user?.goals?.map((goal) => ({
                                label: goal,
                                value: goal,
                              }))
                            : []
                        }
                        getDropdownButtonLabel={({
                          placeholderButtonLabel,
                        }) => {
                          const goalsArr = user?.goals || [];
                          return (
                            <>
                              <div
                                className={
                                  goalsArr?.length
                                    ? "text-secondary  w-100"
                                    : "text-gray"
                                }
                              >
                                {goalsArr?.length
                                  ? `${goalTranslation[goalsArr[0]]}`
                                  : lang("COMMON.SELECT")}
                                <span className="text-gray font-12">{`${
                                  goalsArr.length > 1
                                    ? ` & ${goalsArr?.length - 1} more`
                                    : ""
                                } `}</span>
                              </div>
                              <em className="icon icon-down-arrow-grey"></em>
                            </>
                          );
                        }}
                        defaultValue={
                          user?.goals
                            ? user?.goals?.map((goal) => ({
                                label: goal,
                                value: goal,
                              }))
                            : []
                        }
                        onChange={(selectedOptions) => {
                          const goals = selectedOptions.map(
                            (option) => option.value
                          );
                          handleGoalUpdate(user?.connectionUserId, goals);
                        }}
                        placeholder={lang("COMMON.SELECT")}
                      />
                    </div>
                  </Form.Group>
                </td>
                <td className="text-primary text-underline font-weight-bold w-160 pointer">
                  <button
                    type="button"
                    class="btn px-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={lang("COMMON.SEND_MESSAGE")}
                    attr
                    onClick={() => {
                      messageHandler(user);
                    }}
                  >
                    <img src={msgtooltip} />
                  </button>
                  <button
                    type="button"
                    class="btn px-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={lang("COMMON.LAUNCH_ROOM")}
                    onClick={launchRoom}
                  >
                    <img src={watchtooltip} />
                  </button>
                  <button
                    type="button"
                    class="btn px-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={lang("COMMON.VIEW")}
                    onClick={() => setConnectionActivity(user)}
                  >
                    <img src={showtooltip} />
                  </button>
                  <button
                    type="button"
                    class="btn px-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={lang("COMMON.DELETE_GROWTH_CONNECTION")}
                    onClick={() => {
                      Swal.fire({
                        text: lang(
                          "GROWTH_CONNECTIONS.GROWTH_CONNECTION_REMOVAL"
                        ),
                        icon: "warning",
                        showDenyButton: true,
                        confirmButtonText: lang("COMMON.CONFIRM"),
                        denyButtonText: lang("COMMON.CANCEL"),
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleAddRemoveGrowthConnection(
                            user?.connectionUserId,
                            false
                          );
                        }
                      });
                    }}
                  >
                    <img src={canceltooltip} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {total > growthConnections?.length && (
        <div className="text-center p-1 border-divider-color-bottom-left-right mb-4">
          <span
            className="text-primary pointer font-14-600"
            onClick={() => setPageSize(pagesize + 10)}
          >
            {" "}
            {lang("COMMON.LOAD_MORE")}
          </span>
        </div>
      )}
    </>
  );
}

export default GrowthConnectionList;
