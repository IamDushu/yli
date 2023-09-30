import React, { useEffect, useState, useCallback } from "react";
import { Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  getSentConnectionsList,
  changeConnectionStatus,
} from "store/actions/connections";
import { getFullName } from "utils";
import { useTranslation } from "react-i18next";
import { CrossIcon } from "components/svg/connections";
import { debounce } from "lodash";
import SearchBar from "components/SearchBar";
import UserCard from "components/UserCard";
import { YliwayButton } from "components/button";

const SentConnectionRequest = ({ tabKey }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const list = useSelector((state) => state.connections.sentConnectionList);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getSentConnectionsList({
        page,
        pagesize,
        search,
      })
    );
  }, [pagesize, search]);

  const withdrawRequest = async (id) => {
    await dispatch(
      changeConnectionStatus({
        id,
        status: "withdrawl",
      })
    );
    await dispatch(
      getSentConnectionsList({
        page,
        pagesize,
        search,
      })
    );
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
        className={list?.data === undefined ? "pb-5 px-0" : "py-3 px-0"}
        style={{ paddingTop: "21px !important" }}
      >
        <div className="common-searchbar mb-3">
          <SearchBar
            placeholder={lang("CONNECTIONS.SEARCH_BY_NAME")}
            onChange={(e) => searchConnection(e.target.value)}
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
                        title="Cancel"
                        handleClick={() => withdrawRequest(id)}
                        label={
                          <>
                            <CrossIcon fill="#6750a4" />
                            {lang("COMMON.CANCEL")}
                          </>
                        }
                        size="extra-small"
                        style={{
                          color: "#6750a4",
                          border: "1px solid #7A757F",
                          display: "flex",
                          alignItems: "center",
                          columnGap: "0.5rem",
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
          handleClick={() => setPageSize(pagesize + 10)}
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
export default SentConnectionRequest;
