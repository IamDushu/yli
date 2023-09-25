import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFacultyList } from "store/actions/learningInstitute";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { onImageError } from "utils";

const FacultiesTabs = () => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { instituteId } = router.query;
  const list = useSelector((state) => state?.learningInstitute?.facultyList);
  const loadMore = 5;
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);

  /*******************
  @purpose : Faculty Listing 
  @Author : INIC
  ******************/
  useEffect(() => {
    if (!_.isEmpty(instituteId)) {
      let data = {
        instituteId: instituteId,
        page,
        pagesize,
        searchText: "",
      };
      dispatch(getFacultyList(data));
    }
  }, [instituteId, pagesize]);

  /******************* 
  @Purpose : Used for loading more services
  @Parameter : {}
  @Author : INIC
  ******************/
  const handleLoadMore = () => {
    setPagesize((pagesize) => pagesize + loadMore);
  };

  /*******************
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return (
    <>
      {/* My uploaded cource */}
      <Card className="my-4 mb-0">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3 align-items-md-center flex-sm-row flex-column">
            <h3 className="h6 mb-2 mb-sm-0">
              {lang("PROFILE_TABS.FACULTIES")}
            </h3>
          </div>
          {list?.rows?.length > 0
            ? list?.rows?.map((data, index) => (
                <>
                  {index !== 0 && <hr className="my-4" />}
                  <div className="d-flex flex-row" key={index}>
                    <div className="w-h-54 overflow-hidden rounded-pill flex-shrink-0 mr-2">
                      <picture onContextMenu={(e) => e.preventDefault()}>
                        <source srcset={data?.image} type="image/png" />
                        <img
                          src={data?.image}
                          alt="expirince"
                          width="54"
                          height="54"
                          onError={(e) => {
                            onImageError(e, "profile", data?.name);
                          }}
                        />
                      </picture>
                    </div>
                    <div className="exp-desc ml-2">
                      <h6 className="mb-2 text-body-16">
                        <a href={data?.facultyLink} target="_blank">
                          {data?.name}
                        </a>
                      </h6>
                      <span className="text-gray text-body-14  d-block mb-2">
                        {data?.designation}
                      </span>
                      <p
                        className="text-body-14 font-weight-normal mt-1 mb-0"
                        dangerouslySetInnerHTML={{
                          __html: data?.description,
                        }}
                      />
                    </div>
                  </div>
                </>
              ))
            : ""}
        </Card.Body>
        {list?.total > pagesize && (
          <span
            className=" view-all text-secondary font-weight-semibold rounded-b-8 bg-blueberry-whip py-12  text-body-14 text-center pointer"
            onClick={handleLoadMore}
          >
            {lang("COMMON.VIEW_MORE")}
          </span>
        )}
      </Card>
    </>
  );
};
export default FacultiesTabs;
