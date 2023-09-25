import React, { useState, } from 'react';
import { AutoComplete } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';

const SelectUser = ({
  onSearchUser,
  onSelect,
  handleClose
}) => {
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    const payload = { "page": 1, "pagesize": 20, "search": value };
    const users = await onSearchUser(payload);
    if (!Array.isArray(users)) {
      setOptions([]);
      return;
    };

    setOptions(users.map((user) => {
      return {
        value: users.id,
        label: (<div onClick={() => onSelect(user)} className="d-flex align-items-center">
          <div>
            <img height="30px" src={user.profilePicURL} />
          </div>
          <div className="pl-2">
            <div>
              {`${user.firstName || ""} ${user.lastName || ""}`}
            </div>
            <div>
              <small>{`${user.currentPosition || "currentPosition"}`}</small>
            </div>
          </div>
        </div>),
      };
    }));
  };

  return (
    <div>
      <AutoComplete
        style={{
          width: 200,
        }}
        autoFocus
        onSearch={handleSearch}
        placeholder="Search by name..."
        className="select-user-auto-complete"
        options={options}
      />
      &nbsp;
      <CloseSquareFilled style={{fontSize: "33px"}} onClick={handleClose} />
    </div>
  );
};

export default SelectUser;
