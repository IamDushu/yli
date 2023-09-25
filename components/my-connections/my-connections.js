import React, { useEffect, useState, useCallback } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyConnectionsList,
  changeConnectionStatus,
  addRemoveGrowthPartner,
} from "store/actions/connections";
import Link from "next/link";
import { onImageError, getFullName } from "utils";
import Swal from "sweetalert2";
import { getGrowthPartnerList } from "store/actions";
import { useTranslation } from "react-i18next";
import {
  RemoveConnectionIcon,
  TrashBin,
  Connect,
} from "components/svg/connections";
import { debounce } from "lodash";

const MyConnectionsList = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pagesize = 20;
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
  }, [search, page]);

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
      confirmButtonText: lang("COMMON.YES"),
      denyButtonText: lang("COMMON.NO"),
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

  return (
    <React.Fragment>
      <Card.Body
        className={list === undefined ? "pb-5 px-1" : "py-3 px-1"}
        style={{ paddingTop: "21 px !important" }}
      >
        <div className="common-searchbar mb-3 px-12">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder={lang("CONNECTIONS.SEARCH_BY_NAME")}
              onChange={(e) => searchConnection(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
        {totalConnection > 0 && (
          <p className="px-12">
            {`${totalConnection} ${lang("CONNECTIONS.RECORDS_FOUND")}`}
          </p>
        )}
        <Container fluid>
          <Row className="custom-col-box four-grid-spacing-md row-col-10">
            {list ? (
              list.map((v, i) => (
                <Col md={4} xl={3} key={v.id} className="mb-sm-3">
                  <Card className="text-center  h-100 myconnection-card">
                    <Card.Header className="p-0">
                      <Link href={`/profile/${v.profileId}`}>
                        <div
                          style={{
                            backgroundImage: `url(${
                              v?.userDetails?.[0]?.profileBgURL ??
                              "../../assets/images/dashboard/cover-background-2.jpg"
                            })`,
                            borderRadius: "8px 8px 0px 0px",
                          }}
                          className="position-relative connection-user-cover-img"
                        >
                          <div className="d-flex mx-auto">
                            <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
                              <img
                                src={v.profilePicURL ?? ""}
                                alt={getFullName(v)}
                                width="72"
                                height="72"
                                className="d-flex img-fluid w-100 h-100"
                                onError={(e) => {
                                  onImageError(e, "profile", getFullName(v));
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card.Header>

                    <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
                      <Card.Title className="mb-1">
                        <Link href={`/profile/${v.profileId}`}>
                          <h5 className="text-body-14 mb-0 text-ellipsis pointer p-1">
                            {getFullName(v)}
                          </h5>
                        </Link>
                      </Card.Title>
                      <Card.Text className="mb-0 px-2">
                        <p className="mb-1 text-gray-darker font-12 text-ellipsis">
                          {v?.qualification
                            ? v?.qualification
                            : "No Position Added"}
                          {/* <br />
                        {v?.country
                          ? `${v?.country},${v?.city}`
                          : "No Location Added"} */}
                        </p>
                        <p className="font-12 text-gray-darker mb-2 text-ellipsis">
                          {v.mutualCount} {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                        </p>
                      </Card.Text>
                      <div className="text-gary font-medium mb-2 d-flex px-2">
                        <Button
                          title={
                            !v?.isGrowthConnection
                              ? "Add Growth Connection"
                              : "Remove Growth Connection"
                          }
                          variant="btn btn-outline-primary btn-small-icon w-100 mr-1"
                          onClick={() => {
                            handleAddRemoveGrowthConnection(
                              v?.userId,
                              !v?.isGrowthConnection
                            );
                          }}
                        >
                          {v?.isGrowthConnection ? (
                            <>
                              <RemoveConnectionIcon />
                              {lang("CONNECTIONS.REMOVE_TO_GC")}
                            </>
                          ) : (
                            <>
                              <Connect />
                              {lang("CONNECTIONS.ADD_TO_GC")}
                            </>
                          )}
                        </Button>
                        <Button
                          title="Delete"
                          variant="btn btn-small-icon btn-outline-gray w-100"
                          // style={{ border: "1px solid #0f6bbf" }}
                          onClick={() => deleteConnection(v?.id)}
                          // size="sm"
                        >
                          <TrashBin />
                          {lang("CONNECTIONS.DELETE")}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>{lang("CONNECTIONS.NO_CONNECTIONS_AVAILABLE")}</p>
            )}
          </Row>
        </Container>
      </Card.Body>
      {list && list?.total > pagesize && list?.data?.length < list?.total && (
        <div className="d-flex justify-content-center mt-2 border-geyser border-top">
          <Button
            variant="link"
            onClick={() => setPage(page + 1)}
            className="text-body-14 py-2 text-center load-more-color"
          >
            {lang("COMMON.LOAD_MORE")}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
export default MyConnectionsList;
