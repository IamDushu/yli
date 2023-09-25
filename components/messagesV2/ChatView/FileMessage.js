import React from "react";
import { getFileInListing } from "store/actions";

const FileMessage = ({ message }) => {
  const downloadFile = async (file) => {
    try {
      const response = await getFileInListing(file.id);
      const buffer = Buffer.from(response);
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = file.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const getImageByExtension = (extension) => {
    if (extension === "pdf") return "/assets/images/homepage/pdf.png";
    else return "/assets/images/homepage/image.jpeg";
  };

  return (
    <div>
      {message?.metadata?.files?.map((file) => (
        <img
          src={getImageByExtension(file.extension)}
          alt=""
          className="mr-2 cursor-pointer"
          width={40}
          height={40}
          onClick={() => downloadFile(file)}
        />
      ))}
    </div>
  );
};

export default FileMessage;
