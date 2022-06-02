import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppState } from "../../state/AppState";
import "./Configure.css";
import { FieldRecursive } from "../../components";

const Configure = () => {
  const { rawData } = useAppState();
  const navigate = useNavigate();

  console.log("raw data", rawData);

  const renderFormToConfigure = () => {
    const formToConfigure = rawData.map((fileData) => (
      <FieldRecursive data={[fileData]} key={fileData?.name} />
    ));
    console.log('rawData', rawData);
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
        <div>{renderFormToConfigure()}</div>
        <Button variant="outlined" onClick={goBack}>
          Go Back
        </Button>
      </div>
      <div className="right-section">
        <h2>Output</h2>
      </div>
    </div>
  );
};

export default Configure;
