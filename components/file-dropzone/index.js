import React, { useRef, useState } from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const FileDropzone = ({
  onChange
}) => {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div
      className="file-dropzone-container"
      onClick={handleFileClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
        <SvgIcon>
          {UploadIcon()}
        </SvgIcon>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

const UploadIcon = () => (
  <svg width="202" height="202" viewBox="0 0 202 202" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M162.863 85.0574C157.139 56.0199 131.637 34.2207 101 34.2207C76.6758 34.2207 55.55 48.024 45.0292 68.224C19.695 70.9174 0 92.3799 0 118.387C0 146.247 22.6408 168.887 50.5 168.887H159.917C183.147 168.887 202 150.034 202 126.804C202 104.584 184.746 86.5724 162.863 85.0574ZM159.917 152.054H50.5C31.8992 152.054 16.8333 136.988 16.8333 118.387C16.8333 101.133 29.7108 86.7407 46.7967 84.9732L55.8025 84.0474L60.0108 76.0515C68.0067 60.649 83.6617 51.054 101 51.054C123.052 51.054 142.073 66.709 146.366 88.3399L148.891 100.965L161.768 101.891C174.898 102.732 185.167 113.758 185.167 126.804C185.167 140.692 173.804 152.054 159.917 152.054ZM67.3333 109.971H88.7958V135.221H113.204V109.971H134.667L101 76.304L67.3333 109.971Z" fill="#E7E0EB" />
  </svg>
);

export default FileDropzone;
