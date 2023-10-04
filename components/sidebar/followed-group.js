import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "@routes";
import { getGroupsJoinedList } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const FollowedGroup = () => {
  const [lang] = useTranslation("language");
  const { groupsJoinedList } = useSelector(({ groups }) => groups);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      page: 1,
      pagesize: 5,
    };
    dispatch(getGroupsJoinedList(body, "group"));
  }, []);
  return (
    groupsJoinedList?.data?.length > 0 && (
      <div className="mb-3 followed-content-box">
        <Card className="rounded-0 border-0" sx={{boxShadow: 3}}>
          <Card.Header className="d-flex border-radius-0 border-bottom border-geyser py-2">
            <div className="w-100 d-flex border-0 p-0">
              <Card.Title className="text-body-16 mb-0 w-100 text-secondary">
                {lang("RIGHT_SIDEBAR.JOINED_GROUPS")}
              </Card.Title>
              <em className="icon icon-down-arrow ml-auto font-24 d-xl-none d-block"></em>
            </div>
          </Card.Header>

          <Card.Body className="px-0">
            <ul className="listing-section listing-content-start pt-first-0 border-first-0">
              {groupsJoinedList === undefined ||
              groupsJoinedList?.data?.length === 0 ? (
                <li className="listing-box font-regular px-3 pb-0">
                  <em className="font-12">
                    {lang("RIGHT_SIDEBAR.NO_JOINED_GROUPS")}
                  </em>
                </li>
              ) : (
                groupsJoinedList?.data?.length > 0 &&
                groupsJoinedList?.data?.map((data, i) => (
                  <li
                    className={`listing-box cursor-pointer font-12 font-weight-semibold px-3 ${
                      i === groupsJoinedList?.data?.length - 1 ? "pb-0" : ""
                    }`}
                    key={data?.groups?.id}
                  >
                    <div className="position-relative flex-shrink-0 mr-3">
                      <img
                        className="img-fluid w-h-84-48 border-radius-8"
                        src={data.groups.imageURL}
                      />
                    </div>
                    <Link
                      href={`/groups/${data.groups.name}/${data.groups.id}`}
                    >
                      <a
                        title=""
                        className="d-flex align-items-center sidebar-text text-body-14 text-ellipsis text-secondary"
                      >
                        {data?.groups?.name}
                      </a>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </Card.Body>
        </Card>
      </div>
    )
  );
};
export default FollowedGroup;
