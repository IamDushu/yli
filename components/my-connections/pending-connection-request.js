import React, { useEffect, useState, useCallback } from "react";
import { Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingConnectionsList,
  changeConnectionStatus,
  followUser,
  getMyConnectionsList,
} from "store/actions/connections";
import { getFullName } from "utils";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import UserCard from "components/UserCard";
import { YliwayButton } from "components/button";
import SearchBar from "components/SearchBar";

const PendingConnectionRequest = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const list = useSelector((state) => state.connections.pendingConnectionList);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getPendingConnectionsList({
        page: page,
        pagesize: 10,
        search,
      })
    );
  }, [page, search]);

  /**
   * Reject pending request
   * @param {*} id
   */
  const rejectRequest = async (id) => {
    await dispatch(
      changeConnectionStatus({
        id,
        status: "rejected",
      })
    );
    await dispatch(
      getPendingConnectionsList({
        page: page,
        pagesize: 8,
        search,
      })
    );
    setPage(1);
  };

  /**
   * Accept pending request
   * @param {*} id
   */
  const acceptRequest = async (v) => {
    await dispatch(
      changeConnectionStatus({
        id: v.id,
        status: "accepted",
      })
    );
    await dispatch(
      getPendingConnectionsList({
        page: page,
        pagesize: 8,
        search,
      })
    );
    await dispatch(followUser(v.userId, "connect"));
    await dispatch(
      getMyConnectionsList({
        page,
        pagesize: 20,
        search,
      })
    );
    setPage(1);
  };

  const searchConnection = useCallback(
    debounce((value) => {
      setPage(1);
      setSearch(value);
    }, 500)
  );

  return (
    <React.Fragment>
      <Card.Body
        className={list?.data === undefined ? "pb-5 px-1" : "py-3 p-0"}
        style={{ paddingTop: "21px !important" }}
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
          {list?.data?.length ? (
            list?.data?.map((listItem, index) => {
              const {
                userDetails,
                profilePicURL,
                qualification,
                mutualCount,
                profileId,
                id,
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
                    <React.Fragment>
                      <YliwayButton
                        title="Accept request"
                        primary
                        handleClick={() => acceptRequest(listItem)}
                        label={lang("CONNECTIONS.ACCEPT")}
                        size="extra-small"
                        style={{ padding: "0.05rem 0.5rem" }}
                      />
                      <YliwayButton
                        title="Reject request"
                        handleClick={() => rejectRequest(id)}
                        label={lang("CONNECTIONS.DENY")}
                        size="extra-small"
                        style={{
                          color: "#6750a4",
                          boxShadow: "none",
                          padding: "0.05rem 0.5rem",
                        }}
                      />
                    </React.Fragment>
                  )}
                />
              );
            })
          ) : (
            <p>{lang("CONNECTIONS.NO_REQUEST_THERE")}</p>
          )}
        </Row>
      </Card.Body>

      {list && list?.total > 10 && list?.data?.length < list?.total && (
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
          handleClick={() => setPageSize(pagesize + 8)}
          size="small"
          textbutton
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.5rem",
            margin: "auto",
            color: "#48464A",
            marginBottom: "1rem",
          }}
        />
      )}
    </React.Fragment>
  );
};
export default PendingConnectionRequest;
