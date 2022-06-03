import { useAppState } from "../../state/AppState";
import Field from "../field/Field";
import ParentField from "../parent-field/ParentField";

const FieldRecursive = ({ data, parentDisplayKey }) => {
  const {
    rawData,
    updateRawData,
    updateMaskedColumnList,
    updateEncryptedColumnList,
  } = useAppState();

  const updateMasking = (field, isMasked) => {
    field.isMasked = isMasked;
    updateRawData(rawData);
    updateMaskedColumnList(field?.displayKey, isMasked);
  };

  const updateEncryption = (field, isEncrypted) => {
    field.isEncrypted = isEncrypted;
    updateRawData(rawData);
    updateEncryptedColumnList(field?.displayKey, isEncrypted);
  };

  const updateDisplayKey = (field, parentKey) => {
    if (parentKey) {
      field.displayKey = `${parentKey}.${field?.name}`;
    }
    return field.displayKey;
  };

  // loop through the data
  // eslint-disable-next-line array-callback-return
  return data.map((item) => {
    // if its a leaf field render <Field />
    if (!item?.fields && !item?.type?.fields) {
      const key = updateDisplayKey(item, parentDisplayKey);
      return (
        <Field
          field={item}
          updateMasking={updateMasking}
          updateEncryption={updateEncryption}
          key={key}
        />
      );
    }
    // if its a parent field, render <ParentField />
    if (item?.fields || item?.type?.fields) {
      const fields = item?.fields ? item?.fields : item?.type?.fields;
      const key = updateDisplayKey(item, parentDisplayKey);
      return (
        <ParentField name={item.name} key={key}>
          {/* recursive call to the fields for a parent field */}
          <FieldRecursive
            data={fields}
            parentDisplayKey={item.displayKey ? item.displayKey : item.name}
          />
        </ParentField>
      );
    }
  });
};

export default FieldRecursive;
