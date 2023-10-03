import React, { useState, useEffect, } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';

const SelectUser = ({
  onSearchUser,
  onSelect,
  handleClose,
  visible,
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!visible) {
      setOptions([]);
    }
  }, [visible])

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
    <div className="select-user-auto-complete-wrapper">
      <Autocomplete
        value={null}
        disablePortal
        options={options}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField
          {...params}
          variant="standard"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          label="Search by name..."
        />}
        className="select-user-auto-complete"
      />
      &nbsp;
      <CloseIcon fontSize="small" onClick={handleClose} />
    </div>
  );
};

export default SelectUser;
