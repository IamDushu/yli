import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useFormik } from "formik";
import { Stack, Typography, Select, Divider, MenuItem } from "@mui/material";
import { getGrowthPartnerList } from "store/actions";
import SearchBar from "components/SearchBar";
import Switch from "components/Switch";
import GrowthConnectionFilters from "./growth-connection-filters";
import GrowthConnectionsTable from "./GrowthConnectionsTable";
import { GROWTH_CONNECTIONS_FILTER_SCHEMA } from "utils";

function MyGrowthConnectionsList({ setShowPYMK }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lang] = useTranslation("language");
  const page = 1;
  const [pagesize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const searchedGcList = useSelector(
    (state) => state?.growth?.searchedGrowthPartnerList
  );
  const [list, setList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const initialValues = {
    name: "",
    profession: [],
    connectionGoals: [],
    country: "",
    region: "",
    province: "",
    city: "",
    searchText: "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: GROWTH_CONNECTIONS_FILTER_SCHEMA(lang),
    onSubmit: () => {
      getFilteredList();
    },
  });

  /*******************
  @purpose : To apply the filters
  @param   : {}
  @Author : INIC
  ******************/
  const getFilteredList = (isReset) => {
    const data = isReset
      ? {
          page,
          pagesize,
        }
      : {
          page,
          pagesize,
          searchText: formik.values.searchText,
          goals: formik.values?.connectionGoals?.length
            ? formik.values?.connectionGoals?.map((goal) => goal.value)
            : [],
          profession: formik.values.profession,
          country: formik.values?.selected_country?.label,
          state: formik.values?.selected_province?.label,
          city: formik.values.city,
        };
    dispatch(getGrowthPartnerList(data, true)).then((res) =>
      setTotal(res?.data?.total)
    );
  };
  /******************** 
  @purpose : Growth Connection List
  @Parameter : {}
  @Author : INIC
  ******************/
  useEffect(() => {
    setShowPYMK(false);
    getFilteredList();
  }, [formik?.values?.searchText, pagesize, page]);

  useEffect(() => {
    setList(searchedGcList);
  }, [searchedGcList]);

  /******************** 
  @purpose : Handles Growth Connection List search filter
  @Parameter : {}
  @Author : INIC
  ******************/
  const searchConnection = useCallback(
    debounce((value) => {
      setPageSize(10);
      formik.setFieldValue("searchText", value);
    }, 500)
  );

  return (
    <div className="w-100">
      <Card className="mt-3 mt-md-0 border-0">
        <Stack direction="row" gap="1rem" alignItems="center" marginTop="1rem">
          <div className="common-searchbar px-0 w-90 mb-sm-0 mb-2">
            {/* search for all criteria */}
            <SearchBar
              onChange={(e) => searchConnection(e.target.value)}
              placeholder={lang("CONNECTIONS.SEARCH_BY_NAME")}
            />
          </div>
          <Stack direction="row" alignItems="center" gap="0.375rem">
            <Switch
              size="large"
              onChange={() => setShowFilters((prevState) => !prevState)}
              checked={showFilters}
            />
            <Typography color="#6750A4" fontWeight={500} fontSize="0.875rem">
              {lang("COMMON.FILTERS")}
            </Typography>
          </Stack>
        </Stack>

        {/* growth connnection filters */}
        <GrowthConnectionFilters
          page={page}
          pagesize={pagesize}
          showFilters={showFilters}
          getFilteredList={getFilteredList}
          formik={formik}
        />

        <GrowthConnectionsTable
          page={page}
          pagesize={pagesize}
          setPageSize={setPageSize}
          total={total}
          growthConnections={list}
          getFilteredList={getFilteredList}
        />

        <Divider style={{ background: "#7A757F" }} />
        <Stack
          direction="row"
          margin="0.5rem 0"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
        >
          <Typography fontSize="14px" color="#000000">
            Rows per page
          </Typography>
          <Select
            //labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pagesize}
            fullWidth
            onChange={(e) => setPageSize(e.target.value)}
            size="small"
            sx={{ width: "100px" }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={75}>75</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Stack>
      </Card>
    </div>
  );
}

export default MyGrowthConnectionsList;
