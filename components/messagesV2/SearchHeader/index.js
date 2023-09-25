import React from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { toggleModals } from "store/actions";
const FindMessage = dynamic(() => import("components/modal/FindMessage"));
const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const SearchHeader = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const { searchMessage } = useSelector(({ ui }) => ui.modals, shallowEqual);

  return (
    <div className="bg-white p-12 py-1 d-flex align-items-center justify-content-between message-border">
      <div className="border-geyser search-box my-0">
        <input
          type="select"
          className="write-message search-message w-100 font-14"
          placeholder={lang("MESSAGE.SIMPLE_SEARCH")}
          readOnly={true}
          onClick={() => dispatch(toggleModals({ searchMessage: true }))}
        />
        <div className="search-icon">
          <span className="bx bx-search text-gray font-20"></span>
        </div>
      </div>
      <MainModal
        className="profile-photo-view custom-modal-footer"
        show={searchMessage}
        keyModal="searchMessage"
        centered
        body={<FindMessage />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">{lang("MESSAGE.SEARCH_MESSAGES")}</h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal pr-4">
              {lang("MESSAGE.TYPE_MESSAGE")}
            </p>
          </div>
        }
      />
    </div>
  );
};

export default SearchHeader;
