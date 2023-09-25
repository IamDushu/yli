import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGrowthPartnerList, setGrowthPartnerList, toggleModals } from "store/actions";
import { getMyConnectionsList, getMyGrowthConnectionsList } from "store/actions/connections";
import { onImageError } from "utils";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import * as types from "../../store/actions/types";
import { useState } from "react";
import { Spin } from "antd";
import LoadingLayer from "components/zoom/loading-layer";
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const GrowthConnectionList = ({ isSelfProfile, userId }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");
  //const growthPartners = useSelector((state) => state?.growth?.growthPartners?.data?.rows);
  const [loading, isLoading] = useState(false)
  const growthPartners = useSelector(
    (state) => state?.growth.growthPartnerList
  );
  const router = useRouter()
  // fetch params from route
  const { profileId } = router.query

  useEffect(async () => {
    try {
      isLoading(true)
      const data = {
        page: 1,
        pageSize: 100,
        profileId: profileId ? profileId : undefined
      }
      await dispatch(setGrowthPartnerList({
        type: types.SET_GROWTH_PARTNER_LIST,
        payload: [],
      }))
      await dispatch(getGrowthPartnerList(data, false))
      //dispatch(
      //  getMyConnectionsList({
      //    userId: !isSelfProfile ? userId : undefined,
      //    page: 1,
      //    pagesize: 100,
      //    profileId: profileId ? profileId : undefined,
      //    isGrowth: true
      //  })
      //);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading(false)
    }
  }, []);

  return (
    <Modal.Body className="h-100vh">
      <div>
        {!loading ?
          growthPartners === undefined || growthPartners?.length === 0 ? (
            <h6>{lang("GROWTH_CONNECTIONS.NO_GROWTH_CONNECTIONS")}</h6>
          ) : (
            growthPartners &&
            growthPartners?.length > 0 &&
            growthPartners.map((item) => (
              <div
                className="d-flex align-items-center mb-3"
                key={item.id}
                onClick={() => {
                  window.open(`/profile/${item.users.profileId}`, "_self"),
                    dispatch(toggleModals({ connectionlist: false }));
                }}
              >
                <picture
                  className="user-profile-pic rounded-pill mr-2"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src={item.users.profilePicURL} type="image/jpg" />
                  <img
                    src={item.users.profilePicURL}
                    alt="profilePicURL"
                    width="70"
                    height="70"
                    onError={(e) => {
                      onImageError(
                        e,
                        "profile",
                        `${item.users.firstName} ${item.users.lastName}`
                      );
                    }}
                  />
                </picture>
                <div className="ml-2 text-left">
                  <h5 className="card-title font-16 text-secondary font-medium mb-10">
                    {item.users.firstName} {item.users.lastName}
                  </h5>
                </div>
              </div>
            ))
          )
          : (
            <center>
              <Spin size="24px" indicator={LoadingOutlined} />
            </center>
          )}
      </div>
    </Modal.Body>
  );
};
