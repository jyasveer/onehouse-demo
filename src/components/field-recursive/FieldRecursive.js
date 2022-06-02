import { useAppState } from "../../state/AppState";
import Field from "../field/Field";
import ParentField from "../parent-field/ParentField";

const FieldRecursive = ({ data, parentDisplayKey }) => {

  const { rawData, updateRawData } = useAppState();

  const updateMasking = (field, isMasked) => {
    field.isMasked = isMasked;
    updateRawData(rawData);
  };

  const updateEncryption = (field, isEncrypted) => {
    field.isEncrypted = isEncrypted;
    updateRawData(rawData);
  };

  const updateDisplayKey = (field, parentKey) => {
    if (parentKey) {
      field.displayKey = `${parentKey}.${field?.name}`;
    }
  }

  // loop through the data
  // eslint-disable-next-line array-callback-return
  return data.map((item) => {
    // if its a leaf field render <Field />
    if (!item?.fields && !item?.type?.fields) {
      updateDisplayKey(item, parentDisplayKey);
      return <Field field={item} updateMasking={updateMasking} updateEncryption={updateEncryption} />;
    }
    // if its a parent field, render <ParentField />
    if (item?.fields || item?.type?.fields) {
      const fields = item?.fields ? item?.fields : item?.type?.fields;
      updateDisplayKey(item, parentDisplayKey);
      return (
        <ParentField name={item.name}>
          {/* recursive call to the fields for a parent field */}
          <FieldRecursive data={fields} parentDisplayKey={item.displayKey ? item.displayKey : item.name}/>
        </ParentField>
      );
    }
  });
};

export default FieldRecursive;
