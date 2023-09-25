import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getSentConnectionsList,
  changeConnectionStatus,
} from "store/actions/connections";
import { onImageError, getFullName } from "utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CrossIcon } from "components/svg/connections";
import { debounce } from "lodash";

const SentConnectionRequest = ({ tabKey }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(8);
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
        className={list?.data === undefined ? "pb-5 px-1" : "py-3 px-1"}
        style={{ paddingTop: "21px !important" }}
      >
        <div className="common-searchbar mb-3 px-12">
          <Form.Group controlId="formSearch" className="position-relative mb-0">
            <Form.Control
              type="text"
              placeholder="Search by name..."
              onChange={(e) => searchConnection(e.target.value)}
            />
            <div className="search-inner-icon">
              <em className="bx bx-search"></em>
            </div>
          </Form.Group>
        </div>
        {list?.total > 0 && (
          <p className="px-12">
            {`${list?.total} ${lang("CONNECTIONS.RECORDS_FOUND")}`}
          </p>
        )}
        <Container fluid>
          <Row className="custom-col-box four-grid-spacing-md row-col-10">
            {list?.data ? (
              list?.data?.map((v, i) => (
                <Col md={4} xl={3} key={v?.id} className="mb-sm-3">
                  <Card className="text-center position-relative h-100 myconnection-card">
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
                        <p className="mb-1 font-12 text-gray-darker text-ellipsis">
                          {v?.qualification
                            ? v?.qualification
                            : "No Position Added"}
                          <br />
                        </p>
                        <p className="font-12 text-gray-darker mb-2 text-ellipsis">
                          {v.mutualCount} {lang("CONNECTIONS.MUTUAL_CONTACTS")}
                        </p>
                      </Card.Text>
                      <div className="text-gary font-medium mb-2 d-flex align-items-center justify-content-center">
                        <Button
                          title="Withdraw"
                          variant="btn btn-outline-gray btn-small-icon"
                          onClick={() => withdrawRequest(v.id)}
                        >
                          <CrossIcon />
                          {lang("CONNECTIONS.WITHDRAW")}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>{lang("CONNECTIONS.NO_REQUEST_THERE")}</p>
            )}
          </Row>
        </Container>
      </Card.Body>
      {list && list?.total > 8 && list?.data?.length < list?.total && (
        <div className="d-flex justify-content-center mt-2 border-geyser border-top">
          <Button
            variant="link"
            onClick={() => setPageSize(pagesize + 8)}
            className="text-body-14 py-2 text-center load-more-color"
          >
            {lang("COMMON.LOAD_MORE")}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
export default SentConnectionRequest;
