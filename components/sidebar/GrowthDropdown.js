import React from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { launchInstantMeeting } from "../../store/actions/yli-meet";

const GrowthDropdown = (props) => {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();

  const createMeeting = () => {
    const data = {
      meetingStatus: "Running",
      meetingType: "Instant",
    };
    dispatch(launchInstantMeeting(data)).then((res) => {
      router.push(`/yli-meet/${res.data.id}`);
    });
  };

  return (
      <Dropdown className="theme-dropdown-launch-room" drop="right">
        <Dropdown.Toggle className="w-100">
          <div className="d-flex justify-content-between">
            <div
              style={{
                color: "#595d61",
                fontSize: "0.75rem",
                paddingRight: "5.5rem",
              }}
            >
              {lang("GROWTH_TOOL.LAUNCH_ROOM")}
            </div>
            <em
              className="icon icon-right-gray-arrow"
              style={{ paddingRight: "7px" }}
            ></em>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{ height: "40px", padding: "0px", alignItems: "center" }}
        >
          <Dropdown.Item
            style={{
              height: "40px",
              padding: "0 10px 2px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={createMeeting}
          >
            <i class="bx bx-plus-circle font-26 ml-auto"></i>
            <span className="ml-2 mt-1 font-15">
              {lang("GROWTH_TOOL.START_MEETING")}
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );
};

export default GrowthDropdown;
