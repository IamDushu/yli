import React, { useEffect, useState } from "react";
import { Form, Row, Table } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "@routes";
import { getPeopleListing } from "store/actions/learningInstitute";
import Pagination from "rc-pagination";
import { onImageError } from "utils";
import { useRouter } from "next/router";
/*******************
@purpose : User Set Thankyou
@Author : INIC
******************/
export const MorePeople = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(4);
  const [searchText, setSearchText] = useState("");
  const { instituteId } = router.query;
  const { morepeople } = useSelector(({ ui }) => ui.modals, shallowEqual);
  const list = useSelector((state) => state?.learningInstitute?.peopleListPage);
  /*******************
  @purpose : People Listing 
  @Author : INIC
  ******************/
  useEffect(() => {
    if (instituteId && morepeople) {
      const data = {
        page,
        pagesize,
        searchText: searchText,
        order: [],
        learningInstituteId: instituteId,
        listingPage: true,
      };
      dispatch(getPeopleListing(data));
    }
  }, [instituteId, morepeople, page, searchText]);

  /********************************************************
   * Handle Pagination change
   * @author INIC
   * @param {number} pageNo
   * @param {number} pageSize
   * @returns {void}
   ********************************************************/
  const paginationChange = (page, pagesize) => {
    setPage(page);
    setPagesize(pagesize);
  };

  /********************************************************
   * Handle search change
   * @author INIC
   * @param {number} event e
   * @returns {void}
   ********************************************************/
  const handleSearchFilter = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div>
        <div className="">
          <Form>
            <div className="px-2 my-4 scroll-block">
              <div className="common-searchbar mt-3 mb-2">
                <Form.Group
                  controlId="formSearch"
                  className="position-relative mb-0"
                >
                  <Form.Control
                    type="text"
                    placeholder="Search here.."
                    onChange={(e) => handleSearchFilter(e)}
                  />
                  <div className="search-inner-icon">
                    <em className="bx bx-search"></em>
                  </div>
                </Form.Group>
              </div>

              {list?.rows?.length ? (
                <div>
                  <ul className="listing-section border-first-0">
                    {list?.rows?.map((data, index) => (
                      <li className="listing-box d-flex align-items-center">
                        <Link href="">
                          <picture className="user-profile-pic rounded-pill mr-3 flex-shrink-0 pointer">
                            <source
                              srcset={data?.userDetails?.profilePicURL}
                              type="image/jpg"
                            />
                            <img
                              src={data?.userDetails?.profilePicURL}
                              alt=""
                              width="36"
                              height="36"
                              onError={(e) => {
                                onImageError(
                                  e,
                                  "profile",
                                  `${data?.userDetails?.firstName} ${data?.userDetails?.lastName}`
                                );
                              }}
                            />
                          </picture>
                        </Link>
                        <div className="d-flex flex-wrap flex-md-nowrap justify-content-between w-100">
                          <div>
                            <Link href="">
                              <h5 className="text-body-14 font-weight-normal mb-1 pointer">
                                {data?.userDetails?.firstName +
                                  " " +
                                  data?.userDetails?.lastName}
                              </h5>
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No Record Found</p>
              )}
              {list?.total > pagesize && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    className="d-flex custom-pagination justify-content-center p-0 mt-3 mt-sm-0 mb-0"
                    pageSize={pagesize}
                    current={page}
                    total={list?.total}
                    onChange={paginationChange}
                  />
                </div>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
