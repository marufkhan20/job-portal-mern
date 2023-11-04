import React from "react";
import { AiFillFileText } from "react-icons/ai";

const FileView = ({ file, fileName }) => {
  const fileNameArr = fileName?.split(".");

  const ext = fileNameArr[fileNameArr?.length - 1];
  return (
    <div className="p-4 rounded border inline-block text-center">
      {ext === "jpg" ||
      ext === "jpeg" ||
      ext === "jfif" ||
      ext === "pjpeg" ||
      ext === "pjp" ||
      ext === "png" ||
      ext === "svg" ||
      ext === "webp" ? (
        <img
          className="w-[200px] h-[80px] rounded mx-auto"
          src={file}
          alt="file"
        />
      ) : (
        <div className="w-full h-full text-center">
          <AiFillFileText className="mx-auto text-4xl" />
        </div>
      )}
      <span className="mt-2 block font-semibold">{fileName}</span>
    </div>
  );
};

export default FileView;
