import { CKEditor } from "@ckeditor/ckeditor5-react";
import YliwayEditor from "ckeditor5-custom-build";
import { useEffect, useState } from "react";
import { FormText } from "react-bootstrap";

class MyUploadAdapter {
  constructor(loader) {
    //super(loader);

    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  async upload() {
    const file = await this.loader.file;
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve({ default: fileReader.result });
      };
      fileReader.onerror = () => {
        reject(this);
      };
      fileReader.readAsDataURL(file);
    });
  }
}

const TOOLBAR_ITEMS = [
  "undo",
  "redo",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "subscript",
  "superscript",
  "|",
  "bulletedList",
  "numberedList",
  "outdent",
  "indent",
  "|",
  "blockquote",
  "alignment:left",
  "alignment:right",
  "alignment:center",
  "alignment:justify",
  "|",
  "insertTable",
  "specialCharacters",
  "|",
  "heading",
  "fontSize",
  "fontFamily",
  "link",
];

const IMAGE_UPLOAD_TOOLBAR_CONFIG = ["|", "imageInsert", "imageUpload"];

function CKEditorComponent({ ...props } = {}) {
  const {
    formik,
    name,
    onChange,
    count,
    countName = "",
    allowImageUpload,
  } = props || {};

  if (formik && name) {
    const existingValue = formik?.values?.[name];
    if (existingValue) {
      props.data = existingValue;
    }
  }

  const [value, setValue] = useState(props?.data || props?.initData || "");

  useEffect(() => {
    setValue(props?.data || props?.initData || "");
  }, [props?.data, props.initData]);

  return (
    <div className={props?.className}>
      <CKEditor
        {...(props || {})}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new MyUploadAdapter(loader);
          };
        }}
        editor={YliwayEditor}
        data={value || ""}
        config={{
          toolbar: {
            shouldNotGroupWhenFull: true,
            items: [
              ...TOOLBAR_ITEMS,
              ...(allowImageUpload ? IMAGE_UPLOAD_TOOLBAR_CONFIG : []),
            ],
          },
          fontSize: {
            options: [9, 11, 13, "default", 17, 19, 21],
          },
          wordCount: {
            onUpdate: (stats) => {
              if (formik && countName && formik?.setFieldValue) {
                formik?.setFieldValue?.(countName, stats.characters);
              }
            },
          },
        }}
        onChange={(e, editor) => {
          try {
            const data = editor.getData()?.trim() || "";

            setValue(data);
            if (typeof onChange === "function") {
              onChange(data);
            }
            if (formik && name && formik?.setFieldValue) {
              formik?.setFieldValue?.(name, data);
            }
          } catch (e) {
            console.log("ERROR IN ON CHANGE", e);
          }
        }}
      />
      {formik &&
        (formik?.touched?.[name] || formik?.touched?.[countName]) &&
        (formik?.errors?.[name] || formik?.errors?.[countName]) && (
          <FormText className={"error"}>
            {formik?.errors[name] || formik?.errors[countName]}
          </FormText>
        )}
      {count && countName && (
        <p className="text-right d-flex align-items-center justify-content-end ck-para">
          <span
            className={
              formik.values[countName] > count
                ? "text-danger"
                : "primary-blue-css"
            }
          >
            {formik.values[countName]}/
          </span>
          <span className="count-ckeditor-css">{count}</span>
        </p>
      )}
    </div>
  );
}

export default CKEditorComponent;
