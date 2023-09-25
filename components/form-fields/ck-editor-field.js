import React from "react";
import CustomCkEditor from "components/form-fields/ckEditor/CkEditor";
const CkEditorField = ({ ...props }) => {
  return (
    <div>
      <CustomCkEditor {...props} />
    </div>
  );
};

export default CkEditorField;
