import React from "react";
import WithFormikField from "../with-formik-field/with-formik-field";
import { useDispatch } from "react-redux";
import { getGrowthPartnerList } from "store/actions";
import { onImageError } from "utils";
import { AsyncPaginate } from "react-select-async-paginate";

const GrowthConnectionSelectField = ({
  name,
  isMulti = true,
  placeholder,
  coaching = false,
  formik,
  ...otherProps
}) => {
  const dispatch = useDispatch();
  /******************** 
  @purpose : Used for custom options with dp
  @Parameter : {}
  @Author : INIC
  ******************/
  const loadOptions = async (search, prevOptions, { page }) => {
    try {
      const res = await dispatch(
        getGrowthPartnerList({
          searchText: search,
          page,
          pagesize: 10,
        })
      );
      const membersList = res?.data?.rows?.map((data) => ({
        label: `${data?.users?.firstName} ${data?.users?.lastName}`,
        value: `${data?.users?.firstName} ${data?.users?.lastName}`,
        profilePicURL: data?.users?.profilePicURL,
        id: data?.users?.id,
      }));
      return {
        options: membersList.length ? membersList : [],
        hasMore: res?.data?.rows?.length === 10,
        additional: { page: page + 1 },
      };
    } catch (error) {
      console.log(error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };
  return (
    <AsyncPaginate
      isMulti={isMulti}
      value={formik?.values[`selected_${name}`]}
      onChange={(selected) => {
        if (isMulti) {
          formik?.setFieldValue(
            name,
            selected?.map((data) => data.value)
          );
        } else {
          formik?.setFieldValue(name, selected?.value);
        }
        formik?.setFieldValue(`selected_${name}`, selected);
      }}
      placeholder={placeholder}
      loadOptions={loadOptions}
      additional={{ page: 1, pagesize: 10 }}
      debounceTimeout={500}
      components={{
        Option: ({ innerProps, data }) => (
          <div
            className="d-flex align-items-center"
            key={data?.id}
            {...innerProps}
          >
            <div className="py-2 px-3">
              <img
                src={data?.profilePicURL}
                width="32"
                height="32"
                className="rounded-circle"
                onError={(e) => onImageError(e, "peerproducer", data?.label)}
              />
            </div>
            <div className="ml-2">{data?.label}</div>
          </div>
        ),
      }}
    />
  );
};

export default WithFormikField(GrowthConnectionSelectField);
