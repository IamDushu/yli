import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  getGrowthPartnerActivities,
  deleteGrowthPartnerActivities,
  addUpdateGrowthPartnerActivities,
} from "store/actions";
import { toggleModals } from "store/actions";
import { formatDateTime, showMessageNotification } from "utils";
import { YliwayButton } from "components/button";
import Image from "next/image";
import TextEditField from "./TextEditField";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const AddUpdateGCactivity = dynamic(() =>
  import("components/modal").then((mod) => mod.AddUpdateGCactivity)
);

const ActivityListTable = ({ open, connection }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const tableRef = useRef(null);
  const [currentPagesize, setCurrentPagesize] = useState(20);
  const [activityList, setActivityList] = useState([]);
  const [total, setTotal] = useState(0);
  const { addUpdateGCactivity, gcActivityConnectionUserId } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );

  const { connectionUserId } = connection;

  const getActivities = () => {
    dispatch(
      getGrowthPartnerActivities({
        connectionUserId,
        page: 1,
        pagesize: currentPagesize,
      })
    ).then((res) => {
      const {
        data: { total = 0, rows = [] },
      } = res;
      setActivityList(rows);
      setTotal(total);
    });
  };

  useEffect(() => {
    if (connectionUserId) {
      getActivities();
    }
  }, [connectionUserId]);

  useEffect(() => {
    if (currentPagesize > 20) {
      getActivities();
    }
  }, [currentPagesize]);

  const handleRemoveGCActivity = (id) => {
    dispatch(deleteGrowthPartnerActivities(id)).then((res) => {
      if (res?.status == 1) {
        getActivities();
      }
    });
  };

  const handleUpdateActivity = (field, value, activity) => {
    const payload = {
      id: activity.id,
      activity: activity.activity,
      date: moment(activity.date).format("DD/MM/YYYY"),
      activityGoal: activity.activityGoal,
      note: activity.note,
      connectionUserId,
      [field]: value,
    };
    dispatch(addUpdateGrowthPartnerActivities(payload)).then((res) => {
      if (res?.status === 1) {
        getActivities();
      }
    });
  };

  const tableWidth = tableRef?.current?.offsetWidth;

  return (
    <>
      <Box sx={{ margin: 1, borderBottom: "1px solid #E7E0EB" }}>
        <Table size="small" aria-label="purchases" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  width: tableWidth ? `${0.2 * tableWidth}px` : "20%",
                }}
              >
                {lang("GROWTH_CONNECTIONS.ACTIVITY.TITLE")}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  width: tableWidth ? `${0.15 * tableWidth}px` : "15%",
                }}
              >
                {lang("GROWTH_CONNECTIONS.ACTIVITY.DATE")}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  width: tableWidth ? `${0.2 * tableWidth}px` : "20%",
                }}
              >
                {lang("GROWTH_CONNECTIONS.ACTIVITY.GOAL")}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  width: tableWidth ? `${0.35 * tableWidth}px` : "40%",
                }}
              >
                {lang("GROWTH_CONNECTIONS.ACTIVITY.NOTES")}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  width: tableWidth ? `${0.1 * tableWidth}px` : "10%",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityList?.length ? (
              activityList.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell
                    sx={{
                      borderBottom: 0,
                      fontSize: "11px",
                      width: tableWidth ? `${0.2 * tableWidth}px` : "20%",
                    }}
                  >
                    <TextEditField
                      type="TEXT"
                      value={activity?.activity}
                      onSave={(val) =>
                        handleUpdateActivity("activity", val, activity)
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 0,
                      fontSize: "11px",
                      whiteSpace: "nowrap",
                      width: tableWidth ? `${0.15 * tableWidth}px` : "15%",
                    }}
                  >
                    {formatDateTime(activity?.date)}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 0,
                      fontSize: "11px",
                      width: tableWidth ? `${0.2 * tableWidth}px` : "20%",
                    }}
                  >
                    <TextEditField
                      type="TEXT"
                      value={activity?.activityGoal}
                      onSave={(val) =>
                        handleUpdateActivity("activityGoal", val, activity)
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 0,
                      fontSize: "11px",
                      width: tableWidth ? `${0.4 * tableWidth}px` : "40%",
                    }}
                  >
                    <TextEditField
                      type="TEXTAREA"
                      value={activity?.note}
                      onSave={(val) =>
                        handleUpdateActivity("note", val, activity)
                      }
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: 0,
                      fontSize: "11px",
                      width: tableWidth ? `${0.1 * tableWidth}px` : "10%",
                    }}
                  >
                    <Image
                      src="/assets/images/delete-icon.svg"
                      height={24}
                      width={24}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveGCActivity(activity?.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={4}
                  sx={{
                    borderBottom: 0,
                    fontSize: "11px",
                  }}
                  align="center"
                >
                  {lang("GROWTH_CONNECTIONS.ACTIVITY.NOT_AVAILABLE")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <YliwayButton
          label={
            <>
              <Image
                src={"/assets/images/plus-icon.svg"}
                height={18}
                width={18}
              />
              {lang("COMMON.ADD_ACTIVITY")}
            </>
          }
          handleClick={() =>
            dispatch(
              toggleModals({
                addUpdateGCactivity: true,
                gcActivityData: {},
                gcActivityConnectionUserId: connection?.connectionUserId,
              })
            )
          }
          size="extra-small"
          textbutton
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.5rem",
            margin: "auto",
            color: "#48464A",
          }}
        />
      </Box>
      <MainModal
        className="add-to-gmodal modal v4-modal"
        show={
          addUpdateGCactivity &&
          gcActivityConnectionUserId === connection?.connectionUserId
        }
        keyModal="addUpdateGCactivity"
        body={
          <AddUpdateGCactivity
            getActivities={getActivities}
            connectionActivity={connection}
          />
        }
        headerClassName="mb-50 block md-mb-30"
        header={<h2 className="h6 mb-0">{lang("COMMON.ADD_ACTIVITY")}</h2>}
      />
    </>
  );
};

export default ActivityListTable;
