/******************* 
@Purpose : Used for checking file size of profile picture
@Parameter : file
@Author : INIC
******************/
export const checkIfFilesAreTooBigPP = (files) => {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }
  return valid;
};

/******************* 
@Purpose : Used for checking file types of profile picture
@Parameter : file
@Author : INIC
******************/
export const checkIfFilesAreCorrectTypePP = (files) => {
  let valid = true;
  if (files) {
    files.map((file) => {
      if (!["application/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
};
