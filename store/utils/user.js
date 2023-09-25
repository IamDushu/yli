/********************************************************
 * To return updated user detail after profile description update
 * @author INIC
 * @param {string | object} userInfo userInfo
 * @param {object} descriptionDetailToUpdate new description detail
 * @returns {object} updated user details
 ********************************************************/
export const getUpdatedUserInfo = (userInfo, descriptionDetailToUpdate) => {
  if (!userInfo) return descriptionDetailToUpdate;

  let userInfoObject = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
  return Object.assign({}, userInfoObject, descriptionDetailToUpdate);
};
