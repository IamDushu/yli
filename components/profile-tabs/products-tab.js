import React, { Fragment, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getServicesList } from "store/actions/learningInstitute";
import { onImageError } from "utils";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getProductsList } from "store/actions";

const ProductsTab = ({ logo }) => {
  const [lang] = useTranslation("language");
  const dispatch = useDispatch();
  const router = useRouter();
  const { companyId } = router.query;
  const list = useSelector((state) => state?.company?.productsList);
  const loadMore = 10;
  const [page, setPage] = useState(1);
  const [pagesize, setPagesize] = useState(10);

  /*******************
  @purpose : Services Listing 
  @Author : INIC
  ******************/
  useEffect(() => {
    if (!_.isEmpty(companyId)) {
      let data = {
        companyId,
        page,
        pagesize,
        searchText: "",
      };
      dispatch(getProductsList(data));
    }
  }, [companyId, pagesize]);

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
  @Author : YLIWAY
  ******************/
  return (
    <Fragment>
      {/* product */}
      <Card className="my-4 mb-0">
        <Card.Body>
          <div className="d-flex justify-content-between  align-items-center mb-4">
            <h3 className="h6 mb-0">{lang("PROFILE_TABS.PRODUCTS")}</h3>
          </div>

          {list?.rows?.map((data, index) => (
            <>
              {index !== 0 && <hr className="my-4" />}
              <div className="d-flex flex-row" key={`product-row-${index}`}>
                <div className="overflow-hidden rounded-pill flex-shrink-0 mr-2 w-h-54">
                  <picture>
                    <source srcset={data?.image} type="image/png" />
                    <img
                      src={data?.image}
                      alt="expirince"
                      width="54"
                      height="54"
                      onError={(e) => {
                        if (data?.image?.length === 0) {
                          onImageError(e, "profile", data?.name);
                        } else {
                          e.target.src = logo;
                          e.target.alt = "failed to load image";
                          e.onerror = null;
                        }
                      }}
                    />
                  </picture>
                </div>
                <div className="exp-desc ml-2">
                  <h6 className="mb-2 text-body-16 pointer">
                    <a href={data?.linkContact} target="_blank">
                      {data?.name}
                    </a>
                  </h6>
                  <div className="text-body-14 d-flex flex-sm-row flex-column ">
                    <span className="mb-1">{data?.email}</span>
                    <span className="mb-1">
                      {" "}
                      {data?.contact && (
                        <>
                          <span className="px-2  lh-1 text-gray d-sm-inline d-none">
                            •
                          </span>{" "}
                          {data?.contact}
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-body-14 font-weight-normal mt-1 mb-0">
                    {data?.description}
                  </p>
                </div>
              </div>
            </>
          ))}
        </Card.Body>

        {list?.total > pagesize && (
          <span
            className="view-all text-secondary font-weight-semibold rounded-b-8 bg-blueberry-whip py-12 text-body-14 text-center pointer"
            onClick={handleLoadMore}
          >
            {lang("COMMON.VIEW_MORE")}
          </span>
        )}
      </Card>
    </Fragment>
  );
};
export default ProductsTab;
