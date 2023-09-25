import { debounce } from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Card, FormControl } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DASHBOARD } from "routes/urls";
import {
  getGMDepartmentList,
  getProfession,
  setGrowthProfession,
  setGrowthProject,
} from "store/actions";

function Department({ setShowDepartment }) {
  const [lang] = useTranslation("language");
  const router = useRouter();
  const dispatch = useDispatch();
  const { departmentList, professionList } = useSelector(
    (state) => state.growth
  );
  const [filterState, setFilterState] = useState({
    profession: true,
    department: true,
  });
  const [departmentId, setDepartmentId] = useState("");
  const [searchText, setSearchText] = useState({
    department: "",
    profession: "",
  });
  const [professionData, setProfessionData] = useState({
    description: null,
    profession: "",
  });
  useEffect(() => {
    dispatch(setGrowthProject("", ""));
  }, []);
  useEffect(() => {
    dispatch(getGMDepartmentList(searchText.department)).then((data) =>
      setDepartmentId(data[0]?.id)
    );
  }, [searchText.department]);

  useEffect(() => {
    if (departmentId !== "")
      dispatch(
        getProfession({
          parentId: 1,
          search: searchText.profession.toLowerCase(),
          departmentId,
        })
      ).then((data) => {
        setProfessionData({
          ...professionData,
          description: data[0]?.description,
          profession: data[0],
        });
      });
  }, [departmentId, searchText.profession]);

  const searchConnection = useCallback(
    debounce((e, type) => {
      if (type === "department") {
        setSearchText({ ...searchText, department: e.target.value });
      } else {
        setSearchText({ ...searchText, profession: e.target.value });
      }
    }, 500)
  );
  const nextHandler = () => {
    setShowDepartment(false)
    dispatch(setGrowthProfession(professionData.profession));
  };

  return (
    <Card>
      <Card.Body className="p-0">
        <div className="d-flex">
          <div className="w-25 border-right-geyser">
            <h6 className="font-16 p-3 border-bottom border-geyser mb-0 d-flex align-items-center justify-content-between">
              {lang("GROWTH_MODEL.DEPARTMENT_LIST")}
              <span
                className="material-icons font-18 pointer"
                onClick={() =>
                  setFilterState({
                    ...filterState,
                    department: !filterState?.department,
                  })
                }
              >
                {filterState.department ? "filter_alt_off" : "filter_alt"}
              </span>
            </h6>
            {filterState.department && (
              <div className="px-3 py-2 border-bottom border-geyser">
                <FormControl
                  type="text"
                  placeholder="Search..."
                  className="mr-sm-2"
                  autoComplete="off"
                  onChange={(e) => searchConnection(e, "department")}
                />
              </div>
            )}
            <ul className="listing-section listing-content-between active-inner gm-prof-list p-3">
              {departmentList.length > 0 &&
                departmentList.map((data) => (
                  <li className="listing-box" key={data?.id}>
                    <div
                      className={`d-flex pointer list-item align-items-center w-100 gm-prof-item ${data?.id === departmentId
                          ? "text-primary"
                          : "text-gray-darker"
                        }`}
                      onClick={() => setDepartmentId(data?.id)}
                    >
                      {data?.name}
                      <em
                        className={`icon ${data?.id === departmentId
                            ? "icon-right-gray-arrow ml-2"
                            : "icon-right-gray-arrow ml-2"
                          } ml-auto`}
                      ></em>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-28 border-right-geyser">
            <h6 className="font-16 p-3 border-bottom border-geyser mb-0 d-flex align-items-center justify-content-between">
              {lang("GROWTH_MODEL.PROFESSION_LIST")}
              <span
                className="material-icons font-18 pointer"
                onClick={() =>
                  setFilterState({
                    ...filterState,
                    profession: !filterState?.profession,
                  })
                }
              >
                {filterState.profession ? "filter_alt_off" : "filter_alt"}
              </span>
            </h6>
            {filterState.profession && (
              <div className="px-3 py-2 border-bottom border-geyser">
                <FormControl
                  type="text"
                  placeholder="Search..."
                  className="mr-sm-2"
                  onChange={(e) => searchConnection(e, "profession")}
                  autoComplete="off"
                />
              </div>
            )}
            <ul className="listing-section listing-content-between active-inner gm-prof-list gm-prof-search-height p-3">
              {professionList.length > 0 ? (
                professionList.map((data) => (
                  <li className="listing-box" key={data?.id}>
                    <div
                      className={`d-flex pointer list-item align-items-center w-100 gm-prof-item ${data?.id === professionData?.profession?.id
                          ? "text-primary"
                          : "text-gray-darker"
                        }`}
                      onClick={() =>
                        setProfessionData({
                          ...professionData,
                          description: data?.description,
                          profession: data,
                        })
                      }
                    >
                      {data?.name}
                      <em className="icon icon-right-gray-arrow ml-auto ml-2"></em>
                    </div>
                  </li>
                ))
              ) : (
                <li className="listing-box">
                  {lang("GROWTH_MODEL.NO_PROFESSION")}{" "}
                </li>
              )}
            </ul>
          </div>
          <div className="w-50">
            <h6 className="font-16 p-3 mb-0 border-bottom border-geyser">
              {lang("GROWTH_MODEL.DESCRIPTION")}
            </h6>
            <p className="mb-0 font-14 p-3">
              {professionData?.description ??
                lang("GROWTH_MODEL.NO_DESCRIPTION")}
            </p>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="custom-footer bg-white text-center d-flex border-top border-geyser justify-content-end p-3">
        <button
          className="btn btn-btn btn-dark font-weight-semibold mr-3"
          onClick={() => setShowDepartment(false)}
        >
          {lang("COMMON.CANCEL")}
        </button>
        <button
          className="btn btn-btn btn-info font-weight-semibold "
          onClick={nextHandler}
        >
          {lang("GROWTH_MODEL.ADD_PROFESSION")}
        </button>
      </Card.Footer>
    </Card>
  );
}

export default Department;
