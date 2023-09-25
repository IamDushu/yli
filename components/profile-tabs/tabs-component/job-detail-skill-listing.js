import React from "react";
const JobDetailSkillListing = ({ mapData }) => {
  /*******************
@purpose : Rander HTML/ React Components
@Author : INIC
******************/

  return (
    <>
      {mapData?.map((s, index) => {
        return (
          <tr key={index}>
            {/* <td>{s?.skillArea}</td> */}
            <td>{s?.profession}</td>
            <td>{s?.skillType?.label}</td>
            <td>{s?.weightAge}</td>
          </tr>
        );
      })}
    </>
  );
};
export default JobDetailSkillListing;
