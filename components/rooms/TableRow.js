import React, { useState } from "react";

function TableRow({ rowsData, deleteTableRows, handleChange }) {
  /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
  return rowsData.map((data, index) => {
    const { subject } = data;
    /******************* 
  @purpose : Rander HTML/ React Components
  @Author : INIC
  ******************/
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input
            type="text"
            value={subject}
            onChange={(evnt) => handleChange(index, evnt)}
            name="subject"
            className="form-control"
          />
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });
}

export default TableRow;
