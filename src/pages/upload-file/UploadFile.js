import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./UploadFile.css";
import { useAppState } from "../../state/AppState";
import { readFileAsText } from "../../common/utils";

const UploadFile = () => {
  const { updateRawData } = useAppState();
  const navigate = useNavigate();

  const fileChangeHandler = (event) => {
    const fileList = event.target.files;
    console.log("files", fileList);

    const fileReadPromiseArray = [];

    for (const key in fileList) {
      const file = fileList[key];

      if (file instanceof File) {
        fileReadPromiseArray.push(readFileAsText(file));
      }
    }

    Promise.all(fileReadPromiseArray)
      .then((resultArray) => {
        const parsedFileDataList = [];
        resultArray.forEach((result) => parsedFileDataList.push(result));
        updateRawData(parsedFileDataList);
        navigate("/configure");
      })
      .catch((error) => console.log("file read error", error));
  };

  return (
    <div className="upload-container">
      <div className="inner-container">
        <h2>1. Select Schema File</h2>
        <h5>Select a local avro schema file to load</h5>
        <div>
          <input
            type="file"
            accept=".json"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={fileChangeHandler}
            multiple
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" color="primary" component="span">
              Upload from disk
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
