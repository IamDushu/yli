import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModals } from "store/actions";
import { getMyConnectionsList } from "store/actions/connections";
import { onImageError } from "utils";
import { Modal } from "react-bootstrap";

export const ConnectionList = ({ isSelfProfile, userId }) => {
  const dispatch = useDispatch();
  const { myConnectionList, totalConnection } = useSelector(
    (state) => state.connections
  );

  /******************** 
  @purpose : My Connections List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    dispatch(
      getMyConnectionsList({
        userId: !isSelfProfile ? userId : undefined,
        page: 1,
        pagesize: 100,
      })
    );
  }, []);

  return (
    <Modal.Body className="h-100vh">
      <div>
        {myConnectionList === undefined || myConnectionList?.length === 0 ? (
          <h6>No Connections Found</h6>
        ) : (
          myConnectionList &&
          myConnectionList?.length > 0 &&
          myConnectionList.map((item) => (
            <div
              className="d-flex align-items-center mb-3"
              key={item.id}
              onClick={() => {
                window.open(`/profile/${item.profileId}`, "_self"),
                  dispatch(toggleModals({ connectionlist: false }));
              }}
            >
              <picture
                className="user-profile-pic rounded-pill mr-2"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src={item.profilePicURL} type="image/jpg" />
                <img
                  src={item.profilePicURL ?? ""}
                  alt="profilePicURL"
                  width="70"
                  height="70"
                  onError={(e) => {
                    onImageError(
                      e,
                      "profile",
                      `${item.firstName} ${item.lastName}`
                    );
                  }}
                />
              </picture>
              <div className="ml-2 text-left">
                <h5 className="card-title font-16 text-secondary font-medium mb-10">
                  {item.firstName} {item.lastName}
                </h5>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal.Body>
  );
};
