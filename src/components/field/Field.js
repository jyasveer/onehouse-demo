import { useState } from "react";
import "./Field.css";

const Field = ({ field, updateMasking, updateEncryption }) => {
  const [isMasked, setIsMasked] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const maskChangeHandler = () => {
    setIsMasked(!isMasked);
    if (!isMasked) {
      setIsEncrypted(false);
      updateEncryption(field, false);
    }
    updateMasking(field, !isMasked);
  };

  const encryptChangeHandler = () => {
    setIsEncrypted(!isEncrypted);
    if (!isEncrypted) {
      setIsMasked(false);
      updateMasking(field, false);
    }
    updateEncryption(field, !isEncrypted);
  };

  return (
    <div className="field">
      <span>{field?.name}</span>
      <input
        type="checkbox"
        checked={isMasked}
        name={`${field?.name}-mask-check`}
        onChange={maskChangeHandler}
      />
      <input
        type="checkbox"
        checked={isEncrypted}
        name={`${field?.name}-encrypt-check`}
        onChange={encryptChangeHandler}
      />
    </div>
  );
};

export default Field;
