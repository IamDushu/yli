import React, { useEffect, useState, useCallback } from "react";
import { Card, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyConnectionsList,
  changeConnectionStatus,
  addRemoveGrowthPartner,
} from "store/actions/connections";
import { getFullName, getLocalStorage } from "utils";
import Swal from "sweetalert2";
import {
  chatCreateUser,
  chatSignupUser,
  getGrowthPartnerList,
  getUserById,
} from "store/actions";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import SearchBar from "components/SearchBar";
import UserCard from "components/UserCard";
import { YliwayButton } from "components/button";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import { getOtherProfileInfo } from "store/actions/aboutUs";
import { useYchat } from "hooks/useYchat";
import { createMeeting } from "store/actions/yli-meet";

const MyConnectionsList = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { currentChannelHandler } = useYchat();
  const pagesize = 10;
  const list = useSelector((state) => state.connections.myConnectionList);
  const totalConnection = useSelector(
    (state) => state.connections.totalConnection
  );
  /******************** 
  @purpose : My Connections List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(
      getMyConnectionsList({
        page,
        pagesize: pagesize,
        search,
      })
    );
  }, [search, page, pagesize]);

  /******************** 
  @purpose : Delete Connection
  @Parameter : {}
  @Author : INIC
  ******************/
  const deleteConnection = (id) => {
    Swal.fire({
      text: lang("CONNECTIONS.CONNECTION_DELETE_MESSAGE"),
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: lang("COMMON.CONFIRM"),
      denyButtonText: lang("COMMON.CANCEL"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(
          changeConnectionStatus({
            id,
            status: "",
          })
        );
        dispatch(
          getMyConnectionsList({
            page,
            pagesize: pagesize,
            search,
          })
        );
        dispatch(
          getGrowthPartnerList({
            page,
            pagesize,
          })
        );
      }
    });
  };

  /******************** 
  @purpose : To add/remove growth connection
  @Parameter : {}
  @Author : INIC
  ******************/
  const handleAddRemoveGrowthConnection = async (id, status) => {
    let data = {
      connectionUserId: id,
      growthConnection: status,
    };
    await dispatch(addRemoveGrowthPartner(data));

    await dispatch(
      getMyConnectionsList({
        page,
        pagesize: pagesize,
        search,
      })
    );
    await dispatch(
      getGrowthPartnerList({
        page,
        pagesize,
      })
    );
  };

  const searchConnection = useCallback(
    debounce((value) => {
      setPage(1);
      setSearch(value);
    }, 500)
  );

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

  const messageHandler = (profileId) => {
    dispatch(getOtherProfileInfo(profileId)).then((res) => {
      if (res?.id) {
        sendDM(res);
      }
    });
  };

  const launchRoom = () => {
    dispatch(createMeeting({ router }));
  };

  return (
    <React.Fragment>
      <Card.Body
        className={list === undefined ? "pb-5 px-1" : "py-3 px-0"}
        style={{ paddingTop: "21 px !important" }}
      >
        <div className="common-searchbar mb-3">
          <SearchBar
            onChange={(e) => searchConnection(e.target.value)}
            placeholder={lang("CONNECTIONS.SEARCH_BY_NAME")}
          />
        </div>
        <Row
          className="custom-col-box four-grid-spacing-md row-col-10"
          style={{ columnGap: "0.5rem", rowGap: "1.5rem", margin: 0 }}
        >
          {list?.length ? (
            list?.map((listItem, index) => {
              const {
                userDetails,
                profilePicURL,
                qualification,
                mutualCount,
                profileId,
                id,
                isGrowthConnection,
                userId,
              } = listItem;
              const [{ profileBgURL }] = userDetails || [{}];
              return (
                <UserCard
                  key={index}
                  coverImage={profileBgURL}
                  profileImage={profilePicURL}
                  name={getFullName(listItem)}
                  position={qualification || lang("CONNECTIONS.NO_POSTION")}
                  mutualCountText={`${mutualCount} ${lang(
                    "CONNECTIONS.MUTUAL_CONTACTS"
                  )}`}
                  profileurl={`/profile/${profileId}`}
                  renderFooter={() => (
                    <Stack
                      direction="row"
                      justifyContent="space-evenly"
                      width="100%"
                    >
                      <Image
                        height={22}
                        width={22}
                        style={{ cursor: "pointer" }}
                        src="/assets/images/send-icon.svg"
                        title={lang("COMMON.SEND_MESSAGE")}
                        onClick={() => messageHandler(profileId)}
                      />
                      <Image
                        height={22}
                        width={22}
                        style={{ cursor: "pointer" }}
                        title={
                          !isGrowthConnection
                            ? lang("CONNECTIONS.ADD_TO_GROWTH_CONNECTIONS")
                            : lang("CONNECTIONS.REMOVE_FROM_GROWTH_CONNECTIONS")
                        }
                        src="/assets/images/add-to-gc-icon.svg"
                        onClick={() => {
                          handleAddRemoveGrowthConnection(
                            userId,
                            !isGrowthConnection
                          );
                        }}
                      />
                      <Image
                        height={22}
                        width={22}
                        style={{ cursor: "pointer" }}
                        src="/assets/images/video-call.svg"
                        title={lang("COMMON.LAUNCH_ROOM")}
                        onClick={launchRoom}
                      />
                      <Image
                        height={22}
                        width={22}
                        style={{ cursor: "pointer" }}
                        title="Delete"
                        src="/assets/images/cancel-icon.svg"
                        onClick={() => deleteConnection(id)}
                      />
                    </Stack>
                  )}
                />
              );
            })
          ) : (
            <p>{lang("CONNECTIONS.NO_REQUEST_THERE")}</p>
          )}
        </Row>
      </Card.Body>
      {totalConnection > pagesize && list?.length < totalConnection && (
        <YliwayButton
          label={
            <>
              <Image
                src={"/assets/images/plus-icon.svg"}
                height={18}
                width={18}
              />
              {lang("COMMON.LOAD_MORE")}
            </>
          }
          handleClick={() => setPage(page + 1)}
          size="small"
          textbutton
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.5rem",
            margin: "auto",
            color: "#48464A",
          }}
        />
      )}
    </React.Fragment>
  );
};
export default MyConnectionsList;
