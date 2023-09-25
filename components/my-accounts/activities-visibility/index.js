import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";

const MainModal = dynamic(() =>
  import("components/modal").then((mod) => mod.MainModal)
);
const MentionsOrTags = dynamic(() =>
  import("components/modal").then((mod) => mod.MentionsOrTags)
);
const ConnectionStatus = dynamic(() =>
  import("components/modal").then((mod) => mod.ConnectionStatus)
);
/******************** 
  @purpose : Activities Visibility
  @Parameter : {}
  @Author : INIC
  ******************/
function ActivitiesVisibility() {
  const [lang] = useTranslation("language");
  const { mentionsortags, connectionstatus } = useSelector(
    ({ ui }) => ui.modals,
    shallowEqual
  );
  const [data] = useState([
    {
      title: lang(
        "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.CONNECTION_STATUS"
      ),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.CONNECTION_STATUS_DESCRIPTION"
      ),
      toggle: { connectionstatus: true },
    },
    {
      title: lang("MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.MENTION_TAGS"),
      subTitle: lang(
        "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.MENTION_TAGS_DESCRIPTION"
      ),
      toggle: { mentionsortags: true },
    },
  ]);
  const dispatch = useDispatch();
  return (
    <>
      <Card>
        <Card.Body>
          <ul className="listing-section border-first-0 pt-first-0 pb-last-0 py-lg">
            {data.map((list, i) => (
              <li
                className="listing-box d-sm-flex d-block justify-content-between"
                key={i}
              >
                <div className="pr-md-3">
                  <h4 className="text-body-16">{list.title}</h4>
                  <p className="text-body-14 font-weight-normal m-0">
                    {list.subTitle}
                  </p>
                </div>
                <div className="mt-sm-0 mt-3">
                  <Button
                    variant="outline-info ml-sm-3 w-sm-100"
                    size="sm"
                    onClick={() => dispatch(toggleModals(list.toggle))}
                  >
                    {lang("MY_ACCOUNTS.COMMON.CHANGE")}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
      {/******************* 
           @purpose : Mentions or tags for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="mentions-or-tags custom-modal-footer"
        show={mentionsortags}
        keyModal="mentionsortags"
        centered
        body={<MentionsOrTags />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0 ">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.MENTION_TAGS"
              )}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.MENTION_TAGS_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />

      {/******************* 
           @purpose : Connection status for My accounts Modal
           @Author : INIC
           ******************/}
      <MainModal
        className="connection-status custom-modal-footer"
        show={connectionstatus}
        keyModal="connectionstatus"
        centered
        body={<ConnectionStatus />}
        headerClassName="mb-50 block md-mb-30"
        header={
          <div>
            <h2 className="h6 m-0">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.CONNECTION_STATUS_PRIVACY"
              )}
            </h2>
            <p className="mb-0 mt-1 text-body-14 font-weight-normal">
              {lang(
                "MY_ACCOUNTS.VISIBILITY.ACTIVITIES_VISIBILITY.CONNECTION_STATUS_DESCRIPTION"
              )}
            </p>
          </div>
        }
      />
    </>
  );
}

export default ActivitiesVisibility;
