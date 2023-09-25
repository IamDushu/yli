import React, { useEffect, useState } from 'react';

export const usePopup = () => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);

  const togglePop = (show, isEdit = false, data = null) => {
    setShow(show);
    setIsEdit(isEdit);
    setData(data);
  };

  return [{ show, isEdit, data }, togglePop];
};
