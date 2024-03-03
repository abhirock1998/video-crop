import React from "react";
import UploadIcon from "./UploadIcon";

const UploadFile = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <UploadIcon />
      <p className="mb-2 text-[12px] text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </p>
    </div>
  );
};

export default UploadFile;
