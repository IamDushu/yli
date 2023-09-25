import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormControl, FormText } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { fetchTags } from "store/actions";
import { debounce } from "utils";

const TagComponent = ({
  formik,
  name,
  type,
  maxTags = 3,
  characterLimit = 60,
}) => {
  const [lang] = useTranslation("language");
  const [tagsSearch, setTagsSearch] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const tagsRef = useRef();

  useEffect(() => {
    if (tagsSearch !== "") {
      getTags();
    } else {
      setSuggestions([]);
    }
  }, [tagsSearch]);

  /******************** 
    @purpose : Used for new tag add
    @Parameter : { tag }
    @Author : INIC
    ******************/
  const handleAddition = (tag) => {
    let x = formik.values[name];
    // if (x.length >= maxTags) {
    //   return;
    // }
    if (!x.includes(tag)) {
      x.push(tag);
    }
    formik?.setFieldValue(name, x);
    setTagsSearch("");
    setTagInput("");
  };

  /******************** 
    @purpose : Used for tag remove
    @Parameter : { tag }
    @Author : INIC
    ******************/
  const handleDelete = (i) => {
    let x = formik.values[name];
    x.splice(i, 1);
    formik?.setFieldValue(name, x);
  };

  /******************** 
    @purpose : Used for tags search
    @Parameter : { tag }
    @Author : INIC
    ******************/
  const searchTags = useCallback(
    debounce((value) => {
      setTagsSearch(value);
    }, 500)
  );

  /******************* 
  @Purpose : Used for get tags
  @Parameter : {}
  @Author : INIC
  ******************/
  const getTags = async () => {
    let body = {
      searchText: tagsSearch,
    };
    const response = await fetchTags(body);
    let x = [];
    response?.data &&
      response.data.forEach((e, i) => {
        x.push({ id: i + 1, name: e.title });
      });
    setSuggestions(x);
  };

  /******************* 
  @Purpose : Script to detect outside click
  @Parameter : {}
  @Author : INIC
  ******************/
  document.addEventListener("mousedown", function (event) {
    if (tagsRef.current && !tagsRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  });

  return (
    <>
      <div className="tags-search-box">
        <div>
          <span>#</span>
          <FormControl
            type="text"
            placeholder={lang("ATRICLE.ENTER_TAG")}
            onChange={(e) => {
              // if (e.target.value.length > characterLimit) {
              //   return;
              // }
              setTagInput(e.target.value);
              searchTags(e.target.value);
            }}
            // disabled={formik?.values[name].length === maxTags ? true : false}
            readOnly={
              type === "institute" && formik?.values[name].length >= maxTags
                ? true
                : false
            }
            value={tagInput}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.code === "Comma" || e.code === "Enter") {
                e.preventDefault();
                if (tagInput !== "") {
                  handleAddition(tagInput);
                }
              }
            }}
            style={{ paddingLeft: "25px" }}
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="list-unstyled mt-0" ref={tagsRef}>
            {suggestions.map((v, i) => (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleAddition(v.name);
                }}
                key={i}
              >
                <li>{v.name}</li>
              </a>
            ))}
          </ul>
        )}
        <p className="text-right d-flex align-items-center mb-0">
          <span
            className={
              tagInput?.length < characterLimit
                ? "text-muted ml-auto font-14"
                : tagInput?.length > characterLimit
                ? "text-danger ml-auto font-14"
                : "text-muted ml-auto font-14"
            }
          >
            {tagInput?.length || 0}/
          </span>
          <span className="text-success">{characterLimit}</span>
        </p>

        {formik?.touched[name] && formik?.errors[name] && (
          <FormText className={"error"}>{formik?.errors[name]}</FormText>
        )}
      </div>
      <div className="tags mt-0">
        {formik?.values[name]?.length > 0 &&
          formik?.values[name]?.map((v, i) => (
            <span className="mr-2" key={i}>
              #{v}{" "}
              <em
                className="icon icon-close-white pointer"
                onClick={() => handleDelete(i)}
              ></em>
            </span>
          ))}
      </div>
    </>
  );
};

export default TagComponent;
