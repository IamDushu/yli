import React, { useState, } from 'react';
import { AutoComplete } from 'antd';

const EventSelectUser = ({
  onSearchUser,
  onSelect,
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
    <AutoComplete
      style={{
        "width": "100%"
      }}
      autoFocus
      onSearch={handleSearch}
      placeholder="Invite participants"
      options={options}
    />
  );
};

export default EventSelectUser;
