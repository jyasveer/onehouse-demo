import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppState } from "../../state/AppState";
import "./Configure.css";
import { FieldRecursive } from "../../components";

const Configure = () => {
  const {
    rawData,
    maskedColumnList,
    encryptedColumnList
  } = useAppState();

  const navigate = useNavigate();

  console.log("app state", rawData, maskedColumnList, encryptedColumnList);

  const renderFormToConfigure = () => {
    const formToConfigure = rawData.map((fileData) => (
      <FieldRecursive data={[fileData]} key={fileData?.name} />
    ));
    return formToConfigure;
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="configure-container">
      <div className="left-section">
        <h2>2. Configure data masking and encryption</h2>
        <h5>Select columns to mask or encrypt</h5>
        <div className="left-content-section">{renderFormToConfigure()}</div>
        <Button variant="outlined" onClick={goBack}>
          Go Back
        </Button>
      </div>
      <div className="right-section">
        <h2>Output</h2>
        <h5>You have selected below columns for Encryption</h5>
        {encryptedColumnList.map((columnName, index) => (
          <div key={'encryption' + index}>
            {index + 1}. {columnName}
          </div>
        ))}
        <h5>You have selected below columns for Masking</h5>
        {maskedColumnList.map((columnName, index) => (
          <div key={'masking' + index}>
            {index + 1}. {columnName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configure;
