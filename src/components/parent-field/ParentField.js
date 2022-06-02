import * as React from "react";
import { useState } from "react";
import Icon from "@mui/material/Icon";
import Collapsible from "../collapsible/Collapsible";
import "./ParentField.css";

const ParentField = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="parent-field-container" onClick={handleToggle}>
        <div className="parent-field-name">
          {isOpen ? <Icon>arrow_drop_down</Icon> : <Icon>arrow_right</Icon>}
          <span>{name}</span>
        </div>
        <div className="child-fields-header">
          <span>Columns</span>
          <span>Mask</span>
          <span>Encrypt</span>
        </div>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </>
  );
};

export default ParentField;
