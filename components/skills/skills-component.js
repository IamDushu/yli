import React from "react";
import { useDispatch } from "react-redux";
import { getSkillType } from "store/actions/skills";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  MINDSET_SKILLS_AREA_ID,
  SOFT_SKILLS_AREA_ID,
  HARD_SKILLS_AREA_ID,
} from "config";
import { AsyncPaginate } from "react-select-async-paginate";

const SkillsComponent = ({ skills, formik, skillValue }) => {
  const dispatch = useDispatch();
  const [lang] = useTranslation("language");

  /******************** 
  @purpose : Used for get skill type
  @Parameter : {  }
  @Author : INIC
  ******************/
  const loadOptions = async (areaId, search, prevOptions, { page }) => {
    try {
      const res = await dispatch(
        getSkillType(areaId, "profile", null, {
          page: page,
          pagesize: 100,
          searchText: search,
        })
      );
      const skillList = res?.map((data) => ({
        label: data?.name,
        value: data?.id,
      }));
      return {
        options: skillList.length ? skillList : [],
        hasMore: skillList?.length === 100,
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
    <Form>
      <Form.Group>
        <Form.Label>{lang("JOBS.JOB_OFFERS.HARD_SKILLS")} </Form.Label>
        <AsyncPaginate
          isMulti
          defaultValue={
            skillValue?.["Hard Skills"]?.map((el) => {
              return {
                value: el,
                label: el,
              };
            }) ?? []
          }
          onChange={(selected) => {
            const selectedValue = [];
            selected.map(({ label }) => selectedValue.push(label));
            formik?.setFieldValue(`${skills}["Hard Skills"]`, selectedValue);
          }}
          loadOptions={(search, prevOptions, { page }) =>
            loadOptions(HARD_SKILLS_AREA_ID, search, prevOptions, { page })
          }
          placeholder={lang("COMMON.SELECT")}
          additional={{ page: 1, pagesize: 100 }}
          debounceTimeout={500}
          noOptionsMessage={() => lang("SKILLS.NO_SKILL_OPTIONS")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>{lang("JOBS.JOB_OFFERS.SOFT_SKILLS")} </Form.Label>
        <AsyncPaginate
          isMulti
          defaultValue={
            skillValue?.["Soft Skills"]?.map((el) => {
              return {
                value: el,
                label: el,
              };
            }) ?? []
          }
          onChange={(selected) => {
            const selectedValue = [];
            selected.map(({ label }) => selectedValue.push(label));
            formik?.setFieldValue(`${skills}["Soft Skills"]`, selectedValue);
          }}
          loadOptions={(search, prevOptions, { page }) =>
            loadOptions(SOFT_SKILLS_AREA_ID, search, prevOptions, { page })
          }
          placeholder={lang("COMMON.SELECT")}
          additional={{ page: 1, pagesize: 100 }}
          debounceTimeout={500}
          noOptionsMessage={() => lang("SKILLS.NO_SKILL_OPTIONS")}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>{lang("JOBS.JOB_OFFERS.MINDSET")} </Form.Label>
        <AsyncPaginate
          isMulti
          defaultValue={
            skillValue?.Mindset?.map((el) => {
              return {
                value: el,
                label: el,
              };
            }) ?? []
          }
          onChange={(selected) => {
            const selectedValue = [];
            selected.map(({ label }) => selectedValue.push(label));
            formik?.setFieldValue(`${skills}.Mindset`, selectedValue);
          }}
          loadOptions={(search, prevOptions, { page }) =>
            loadOptions(MINDSET_SKILLS_AREA_ID, search, prevOptions, { page })
          }
          placeholder={lang("COMMON.SELECT")}
          additional={{ page: 1, pagesize: 100 }}
          debounceTimeout={500}
          noOptionsMessage={() => lang("SKILLS.NO_SKILL_OPTIONS")}
        />
      </Form.Group>
    </Form>
  );
};

export default SkillsComponent;
