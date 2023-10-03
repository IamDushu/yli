import React from "react";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import { getFullName } from "utils";
import UserCard from "../UserCard";
import { YliwayButton } from "../button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const Host = ({
  lang,
  selectedFilters,
  searchData,
  followRequest,
  unfollowRequest,
  deleteConnection,
  sendConnection,
  setShowAll,
  showAll,
  withdrawRequest,
  userId,
  userData,
  router,
}) => {
  return (
    // <div>
    //   {(selectedFilters.length === 0 ||
    //     selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES"))) &&
    //     searchData?.searchResults?.host?.rows.length > 0 && (
    //       <Card className="mb-3">
    //         <Card.Body className="p-0">
    //           <h3 className="h6 mb-0 px-3 py-12">
    //             {lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES")}
    //           </h3>
    //           <Container fluid>
    //             <Row className="custom-col-box four-grid-spacing-md row-col-10 pb-3">
    //               {searchData?.searchResults?.host?.rows?.map(
    //                 (teacher, key) => {
    //                   return (
    //                     key <= 3 &&
    //                     !showAll.yliGuides && (
    //                       <Col lg={3} sm={6} key={teacher?.id}>
    //                         <Card className="text-center position-relative h-100 myconnection-card overflow-hidden">
    //                           <Card.Header className="p-0">
    //                             <Link route={`/profile/${teacher?.profileId}`}>
    //                               <div
    //                                 style={{
    //                                   backgroundImage: `url(${
    //                                     teacher?.profileBgURL ??
    //                                     "../../assets/images/dashboard/cover-background-2.jpg"
    //                                   })`,
    //                                   borderRadius: "8px 8px 0px 0px",
    //                                 }}
    //                                 className="position-relative connection-user-cover-img"
    //                               >
    //                                 <div className="d-flex mx-auto">
    //                                   <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
    //                                     <img
    //                                       src={teacher?.profilePicURL || ""}
    //                                       className="d-flex img-fluid w-100 h-100"
    //                                       onError={(e) => {
    //                                         onImageError(
    //                                           e,
    //                                           "profile",
    //                                           `${teacher?.firstName} ${teacher?.lastName}`
    //                                         );
    //                                       }}
    //                                     />
    //                                   </div>
    //                                 </div>
    //                               </div>
    //                             </Link>
    //                           </Card.Header>
    //                           <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
    //                             <Card.Title className="mb-1">
    //                               <Link route={`/profile/${teacher.profileId}`}>
    //                                 <h5 className="text-body-14 mb-0 text-ellipsis pointer">
    //                                   {teacher.firstName}{" "}
    //                                   {lastNameHandler(
    //                                     teacher,
    //                                     teacher.lastNameVisibility,
    //                                     userData
    //                                   )
    //                                     ? teacher.lastName
    //                                     : ""}
    //                                 </h5>
    //                               </Link>
    //                             </Card.Title>
    //                             <div className="mb-0 px-2">
    //                               <p className="mb-1 text-gray-darker font-12 text-ellipsis">
    //                                 {teacher?.currentPosition?.trim()
    //                                   ? teacher?.currentPosition
    //                                   : "No Position Added"}
    //                               </p>
    //                               <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
    //                                 {teacher?.mutualCount}{" "}
    //                                 {lang("CONNECTIONS.MUTUAL_CONTACTS")}
    //                               </p>
    //                             </div>

    //                             {teacher.id !== userId && (
    //                               <div className="text-gary font-medium mb-3 d-flex px-2">
    //                                 {teacher?.connectionDetails
    //                                   ?.isConnection && (
    //                                   <>
    //                                     {/* <Button
    //                                       variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
    //                                       onClick={() =>
    //                                         router.push("/messages")
    //                                       }
    //                                     >
    //                                       {lang("COMMON.MESSAGE")}
    //                                     </Button>
    //                                     <Button
    //                                       variant="btn btn-outline-primary btn-small-icon w-100"
    //                                       onClick={() =>
    //                                         router.push(
    //                                           `/profile/${teacher.profileId}`
    //                                         )
    //                                       }
    //                                     >
    //                                       {lang("HEADER.VIEW_PROFILE")}
    //                                     </Button> */}
    //                                   </>
    //                                 )}
    //                                 {!teacher?.connectionDetails
    //                                   ?.isConnection &&
    //                                   teacher?.connectionDetails?.status ===
    //                                     null && (
    //                                     <Button
    //                                       variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
    //                                       onClick={() => {
    //                                         sendConnection(teacher?.id);
    //                                       }}
    //                                     >
    //                                       <Connect />
    //                                       {lang("COMMON.CONNECT")}
    //                                     </Button>
    //                                   )}
    //                                 {teacher?.connectionDetails?.status ===
    //                                   "requested" &&
    //                                   teacher?.connectionDetails
    //                                     ?.isConnection === false && (
    //                                     <Button
    //                                       variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
    //                                       onClick={() => {
    //                                         withdrawRequest(
    //                                           teacher?.connectionDetails?.id
    //                                         );
    //                                       }}
    //                                     >
    //                                       <CrossIcon />
    //                                       {lang("COMMON.WITHDRAW")}
    //                                     </Button>
    //                                   )}
    //                                 {!teacher?.connectionDetails?.isfollow && (
    //                                   <Button
    //                                     variant="btn btn-outline-primary btn-small-icon w-100"
    //                                     onClick={() => {
    //                                       followRequest(teacher?.id);
    //                                     }}
    //                                   >
    //                                     <Follow />
    //                                     {lang("COMMON.FOLLOW")}
    //                                   </Button>
    //                                 )}

    //                                 {teacher?.connectionDetails?.isfollow && (
    //                                   <Button
    //                                     variant="btn btn-outline-primary btn-small-icon w-100"
    //                                     onClick={() => {
    //                                       unfollowRequest(teacher?.id);
    //                                     }}
    //                                   >
    //                                     <UnFollow />
    //                                     {lang("COMMON.UNFOLLOW")}
    //                                   </Button>
    //                                 )}
    //                               </div>
    //                             )}
    //                           </Card.Body>
    //                         </Card>
    //                       </Col>
    //                     )
    //                   );
    //                 }
    //               )}
    //               {searchData?.searchResults?.host?.rows?.map(
    //                 (teacher, key) => {
    //                   return (
    //                     showAll.yliGuides && (
    //                       <Col lg={3} sm={6} key={teacher?.id}>
    //                         <Card className="text-center position-relative h-100 myconnection-card overflow-hidden">
    //                           <Card.Header className="p-0">
    //                             <Link route={`/profile/${teacher?.profileId}`}>
    //                               <div
    //                                 style={{
    //                                   backgroundImage: `url(${
    //                                     teacher?.profileBgURL ??
    //                                     "../../assets/images/dashboard/cover-background-2.jpg"
    //                                   })`,
    //                                   borderRadius: "8px 8px 0px 0px",
    //                                 }}
    //                                 className="position-relative connection-user-cover-img"
    //                               >
    //                                 <div className="d-flex mx-auto">
    //                                   <div className="user-profile-pic flex-shrink-0 w-h-70 border-0 rounded-pill pointer">
    //                                     <img
    //                                       src={teacher?.profilePicURL || ""}
    //                                       className="d-flex img-fluid w-100 h-100"
    //                                       onError={(e) => {
    //                                         onImageError(
    //                                           e,
    //                                           "profile",
    //                                           `${teacher?.firstName} ${teacher?.lastName}`
    //                                         );
    //                                       }}
    //                                     />
    //                                   </div>
    //                                 </div>
    //                               </div>
    //                             </Link>
    //                           </Card.Header>
    //                           <Card.Body className="d-flex flex-column h-100 p-0 pt-1 myconnection-body">
    //                             <Card.Title className="mb-1">
    //                               <Link route={`/profile/${teacher.profileId}`}>
    //                                 <h5 className="text-body-14 mb-0 text-ellipsis pointer">
    //                                   {teacher.firstName}{" "}
    //                                   {lastNameHandler(
    //                                     teacher,
    //                                     teacher.lastNameVisibility,
    //                                     userData
    //                                   )
    //                                     ? teacher.lastName
    //                                     : ""}
    //                                 </h5>
    //                               </Link>
    //                             </Card.Title>
    //                             <div className="mb-0 px-2">
    //                               <p className="mb-1 text-gray-darker font-12 text-ellipsis">
    //                                 {teacher?.currentPosition?.trim()
    //                                   ? teacher?.currentPosition
    //                                   : "No Position Added"}
    //                               </p>
    //                               <p className="text-body-12 mb-2 text-gray-darker text-ellipsis">
    //                                 {teacher?.mutualCount}{" "}
    //                                 {lang("CONNECTIONS.MUTUAL_CONTACTS")}
    //                               </p>
    //                             </div>

    //                             {teacher.id !== userId && (
    //                               <div className="text-gary font-medium mb-3 d-flex px-2">
    //                                 {teacher?.connectionDetails
    //                                   ?.isConnection && (
    //                                   <>
    //                                     {/* <Button
    //                                       variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
    //                                       onClick={() =>
    //                                         router.push("/messages")
    //                                       }
    //                                     >
    //                                       {lang("COMMON.MESSAGE")}
    //                                     </Button>
    //                                     <Button
    //                                       variant="btn btn-outline-primary btn-small-icon w-100"
    //                                       onClick={() =>
    //                                         router.push(
    //                                           `/profile/${teacher.profileId}`
    //                                         )
    //                                       }
    //                                     >
    //                                       {lang("HEADER.VIEW_PROFILE")}
    //                                     </Button> */}
    //                                   </>
    //                                 )}
    //                                 {!teacher?.connectionDetails
    //                                   ?.isConnection &&
    //                                   teacher?.connectionDetails?.status ===
    //                                     null && (
    //                                     <Button
    //                                       variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
    //                                       onClick={() => {
    //                                         sendConnection(teacher?.id);
    //                                       }}
    //                                     >
    //                                       <Connect />
    //                                       {lang("COMMON.CONNECT")}
    //                                     </Button>
    //                                   )}
    //                                 {teacher?.connectionDetails?.status ===
    //                                   "requested" &&
    //                                   teacher?.connectionDetails
    //                                     ?.isConnection === false && (
    //                                     <Button
    //                                       variant="btn btn-outline-primary mr-1  btn-small-icon w-100"
    //                                       onClick={() => {
    //                                         withdrawRequest(
    //                                           teacher?.connectionDetails?.id
    //                                         );
    //                                       }}
    //                                     >
    //                                       <CrossIcon />
    //                                       {lang("COMMON.WITHDRAW")}
    //                                     </Button>
    //                                   )}
    //                                 {!teacher?.connectionDetails?.isfollow && (
    //                                   <Button
    //                                     variant="btn btn-outline-primary btn-small-icon w-100"
    //                                     onClick={() => {
    //                                       followRequest(teacher?.id);
    //                                     }}
    //                                   >
    //                                     <Follow />
    //                                     {lang("COMMON.FOLLOW")}
    //                                   </Button>
    //                                 )}

    //                                 {teacher?.connectionDetails?.isfollow && (
    //                                   <Button
    //                                     variant="btn btn-outline-primary btn-small-icon w-100"
    //                                     onClick={() => {
    //                                       unfollowRequest(teacher?.id);
    //                                     }}
    //                                   >
    //                                     <UnFollow />
    //                                     {lang("COMMON.UNFOLLOW")}
    //                                   </Button>
    //                                 )}
    //                               </div>
    //                             )}
    //                           </Card.Body>
    //                         </Card>
    //                       </Col>
    //                     )
    //                   );
    //                 }
    //               )}
    //             </Row>
    //           </Container>
    //           {searchData?.searchResults?.host?.rows.length > 4 && (
    //             <div className="people-tab-view-all-button my-2 border-top border-geyser pt-2">
    //               <span
    //                 className="people-tab-view-all-button-text"
    //                 onClick={() => {
    //                   setShowAll({
    //                     ...showAll,
    //                     yliGuides: !showAll.yliGuides,
    //                   });
    //                 }}
    //               >
    //                 {!showAll.yliGuides
    //                   ? lang("COMMON.VIEW_ALL")
    //                   : lang("COMMON.VIEW_LESS")}
    //               </span>
    //             </div>
    //           )}
    //         </Card.Body>
    //       </Card>
    //     )}
    //   {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES")) &&
    //     searchData?.searchResults?.institute?.rows.length === 0 && <></>}
    // </div>
    <div style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}>
      {(selectedFilters.length === 0 ||
        selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES"))) &&
        searchData?.searchResults?.host?.rows.length > 0 && (
          <Card className="mb-4">
            <Card.Body className="p-0 pb-4">
              <h3
                className="mb-0 pl-3 pt-20"
                style={{
                  fontSize: "16px",
                  color: "#001551",
                  fontWeight: "500",
                  lineHeight: "24px",
                }}
              >
                {lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES")}
              </h3>

              <div className="d-flex justify-content-around mt-2 pl-4 pr-21">
                <Container fluid>
                  <Row className="custom-col-box two-grid-spacing-md row-col-4">
                    {searchData?.searchResults?.host?.rows?.map((host, key) => {
                      return (
                        key <= 5 &&
                        !showAll.host && (
                          <Col
                            xs={4}
                            md={4}
                            lg={2}
                            key={key}
                            className="p-0 d-flex justify-content-center mb-2 "
                          >
                            <UserCard
                              key={key}
                              coverImage={host?.profileBgURL}
                              profileImage={host?.profilePicURL}
                              name={getFullName(host)}
                              position={
                                host?.currentPosition || "No Position Added"
                              }
                              mutualCountText={`${host?.mutualCount} ${lang(
                                "CONNECTIONS.MUTUAL_CONTACTS"
                              )}`}
                              profileurl={`/profile/${host?.profileId}`}
                              renderFooter={() => (
                                <React.Fragment>
                                  {!host?.connectionDetails?.isConnection &&
                                    host?.connectionDetails?.status ===
                                      null && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.CONNECT")}
                                        primary
                                        handleClick={() => {
                                          sendConnection(host?.id);
                                        }}
                                        label={lang("CONNECTIONS.CONNECT")}
                                        size="extra-small"
                                        style={{
                                          padding: !host?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.2rem"
                                            : "0.05rem 0.4rem",
                                        }}
                                      />
                                    )}
                                  {host?.connectionDetails?.status ===
                                    "requested" &&
                                    host?.connectionDetails?.isConnection ===
                                      false && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.WITHDRAW")}
                                        primary
                                        handleClick={() => {
                                          withdrawRequest(
                                            host?.connectionDetails?.id
                                          );
                                        }}
                                        label={lang("CONNECTIONS.WITHDRAW")}
                                        size="extra-small"
                                        style={{
                                          padding: !host?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.2rem"
                                            : "0.05rem 0.4rem",
                                        }}
                                      />
                                    )}

                                  <YliwayButton
                                    title={
                                      host?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    handleClick={() =>
                                      host?.connectionDetails?.isfollow
                                        ? unfollowRequest(host?.id)
                                        : followRequest(host?.id)
                                    }
                                    label={
                                      host?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    size="extra-small"
                                    style={{
                                      color: "#6750a4",
                                      boxShadow: "none",
                                      padding: "0rem",
                                      "min-width": "30px",
                                    }}
                                  />
                                </React.Fragment>
                              )}
                            />
                          </Col>
                        )
                      );
                    })}
                    {searchData?.searchResults?.host?.rows?.map((host, key) => {
                      return (
                        showAll.host && (
                          <Col
                            xs={4}
                            md={4}
                            lg={2}
                            key={key}
                            className="p-0 d-flex justify-content-center mb-2"
                          >
                            <UserCard
                              key={key}
                              coverImage={host?.profileBgURL}
                              profileImage={host?.profilePicURL}
                              name={getFullName(host)}
                              position={
                                host?.currentPosition || "No Position Added"
                              }
                              mutualCountText={`${host?.mutualCount} ${lang(
                                "CONNECTIONS.MUTUAL_CONTACTS"
                              )}`}
                              profileurl={`/profile/${host?.profileId}`}
                              renderFooter={() => (
                                <React.Fragment>
                                  {!host?.connectionDetails?.isConnection &&
                                    host?.connectionDetails?.status ===
                                      null && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.CONNECT")}
                                        primary
                                        handleClick={() => {
                                          sendConnection(host?.id);
                                        }}
                                        label={lang("CONNECTIONS.CONNECT")}
                                        size="extra-small"
                                        style={{
                                          padding: !host?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.3rem"
                                            : "0.05rem 0.5rem",
                                        }}
                                      />
                                    )}
                                  {host?.connectionDetails?.status ===
                                    "requested" &&
                                    host?.connectionDetails?.isConnection ===
                                      false && (
                                      <YliwayButton
                                        title={lang("CONNECTIONS.WITHDRAW")}
                                        primary
                                        handleClick={() => {
                                          withdrawRequest(
                                            host?.connectionDetails?.id
                                          );
                                        }}
                                        label={lang("CONNECTIONS.WITHDRAW")}
                                        size="extra-small"
                                        style={{
                                          padding: !host?.connectionDetails
                                            ?.isConnection
                                            ? "0.05rem 0.3rem"
                                            : "0.05rem 0.5rem",
                                        }}
                                      />
                                    )}

                                  <YliwayButton
                                    title={
                                      host?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    handleClick={() =>
                                      host?.connectionDetails?.isfollow
                                        ? unfollowRequest(host?.id)
                                        : followRequest(host?.id)
                                    }
                                    label={
                                      host?.connectionDetails?.isfollow
                                        ? lang("CONNECTIONS.UN_FOLLOW")
                                        : lang("CONNECTIONS.FOLLOW")
                                    }
                                    size="extra-small"
                                    style={{
                                      color: "#6750a4",
                                      boxShadow: "none",
                                      padding: host?.connectionDetails?.isfollow
                                        ? "0.05rem 0.2rem"
                                        : "0.05rem 0.5rem",
                                      color: "#6750a4",
                                      boxShadow: "none",
                                      padding: "0rem",
                                      "min-width": "30px",
                                    }}
                                  />
                                </React.Fragment>
                              )}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </Container>
              </div>

              {searchData?.searchResults?.host?.rows.length > 4 && (
                <div className="people-tab-view-all-button border-geyser d-flex justify-content-center">
                  <span
                    className="people-tab-view-all-button-text py-2 d-flex ml-2 align-items-center"
                    onClick={() => {
                      setShowAll({
                        ...showAll,
                        host: !showAll.host,
                      });
                    }}
                  >
                    {!showAll.host ? (
                      <>
                        <AddIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.VIEW_ALL")}</span>
                      </>
                    ) : (
                      <>
                        <RemoveIcon fontSize="small" />
                        <span className="ml-2">{lang("COMMON.VIEW_LESS")}</span>
                      </>
                    )}
                  </span>
                </div>
              )}
            </Card.Body>
          </Card>
        )}

      {selectedFilters.includes(lang("GLOBAL_SEARCH.FILTER.YLI_GUIDES")) &&
        searchData?.searchResults?.host?.rows.length === 0 && <></>}
    </div>
  );
};

export default Host;
