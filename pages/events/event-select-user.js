import React, { useState, } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
        label: user,
      };
    }));
  };

  return (
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
      autoHighlight
      getOptionLabel={(option) => option.label.firstName}
      renderOption={(props, option) => {
        return (<div onClick={() => onSelect(option.label)} className="d-flex align-items-center">
          <div>
            <img height="30px" src={option.label.profilePicURL} />
          </div>
          <div className="pl-2">
            <div>
              {`${option.label.firstName || ""} ${option.label.lastName || ""}`}
            </div>
            <div>
              <small>{`${option.label.currentPosition || "currentPosition"}`}</small>
            </div>
          </div>
        </div>)
      }}
      className="select-user-auto-complete"
    />
  );
};

export default EventSelectUser;
