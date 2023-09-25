/********************************************************
 * To return experience data array after single experience detail update
 * @author INIC
 * @param {Array} experienceDataList experience data listing
 * @param {Object} experienceDetailToUpdate new experience detail
 * @returns {Array} updated experience detail array
 ********************************************************/
export const updateDataList = (
  experienceDataList,
  experienceDetailToUpdate
) => {
  const experienceDetailIndex = experienceDataList.findIndex(
    (experienceDetail) => experienceDetail.id === experienceDetailToUpdate.id
  );
  experienceDataList.splice(experienceDetailIndex, 1, experienceDetailToUpdate);
  return [...experienceDataList];
};

/********************************************************
 * To return  data array after delete operation
 * @author INIC
 * @param {Array} dataList experience data listing
 * @param {string} id id of object to be deleted
 * @returns {Array} updated experience detail array
 ********************************************************/
export const removeDetail = (dataList, id) => {
  const data = [...dataList];
  const dataIdx = data.findIndex((detail) => detail.id === id);
  data.splice(dataIdx, 1);
  return data;
};
