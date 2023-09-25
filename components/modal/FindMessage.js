import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setSearchUser } from "store/actions";
import { Modal, Form } from "react-bootstrap";
import { debounce } from "lodash";
import { getLocalStorage } from "utils";
import { useYchat } from "hooks/useYchat";
import SearchMessageContainer from "components/messagesV2/ChatView/SearchMessageContainer";

const FindMessage = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [searchMessagesData, setSearchMessagesData] = useState([]);
  const { searchMessages } = useYchat();
  let mmLogin = getLocalStorage("mmLogin");
  if (mmLogin && typeof mmLogin === "string") {
    mmLogin = JSON.parse(mmLogin);
  }
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      dispatch(setSearchUser([]));
      setSearchMessagesData([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== "" && searchQuery.trim()) {
        searchMessages({
          search: searchQuery,
          page: 1,
          perPage: 10,
        }).then((response) => {
          if (response.posts) {
            const data = _.orderBy(
              Object.values(response.posts),
              (x) => new Date(x.create_at)
            );
            setSearchMessagesData(data);
          }
        })
    }
  }, [searchQuery]);

  const debounceSearchMessages = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500)
  );

  return (
    <>
      {/* <Form> */}
      <Modal.Body className="p-4">
        <div className="common-searchbar mb-3">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder={lang("MY_ACCOUNTS.COMMON.SEARCH")}
              onChange={(e) => debounceSearchMessages(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
        {searchMessagesData?.length > 0 ? (
          searchMessagesData?.map((message) => <SearchMessageContainer key={message.id} message={message}  />)
        ) : (
          <div className="text-center pt-5 pb-3">
            <div className="mb-3 icon-avatar-54">
              <span className="material-icons">search</span>
            </div>
            <h5>
              {searchQuery !== "" && searchQuery.trim()
                ? lang("MESSAGE.NO_RESULT", { query: searchQuery })
                : lang("MESSAGE.SEARCH_MESSAGES")}
            </h5>
            <p className="mb-0">{lang("MESSAGE.CHECK_SPELL")}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="custom-footer text-center d-flex border-top border-geyser justify-content-between" />
    </>
  );
};

export default FindMessage;
