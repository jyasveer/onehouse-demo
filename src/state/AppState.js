const { createContext, useState, useContext } = require("react");

const AppContext = createContext({
  rawData: [],
  processedData: [],
});

export const AppStateProvider = ({ children }) => {
  const [rawData, setRawData] = useState([]);
  const [maskedColumnList, setMaskedColumnList] = useState([]);
  const [encryptedColumnList, setEncryptedColumnList] = useState([]);

  const updateRawData = (newData) => {
    const newRawData = [...newData];
    setRawData(newRawData);
  };

  const resetMaskedColumnList = () => {
    setMaskedColumnList([]);
  };

  const updateMaskedColumnList = (columnName, isMasked) => {
    const maskList = [...maskedColumnList];
    if (isMasked) {
      const newColumnList = [...maskList, columnName];
      setMaskedColumnList(newColumnList);
    }
    if (!isMasked) {
      const indexToRemove = maskList.indexOf(columnName);
      if (indexToRemove !== -1) {
        maskList.splice(indexToRemove, 1);
        setMaskedColumnList(maskList);
      }
    }
  };

  const resetEncryptedColumnList = () => {
    setEncryptedColumnList([]);
  }

  const updateEncryptedColumnList = (columnName, isEncrypted) => {
    const encryptionList = [...encryptedColumnList];
    if (isEncrypted) {
      const newColumnList = [...encryptionList, columnName];
      setEncryptedColumnList(newColumnList);
    }
    if (!isEncrypted) {
      const indexToRemove = encryptionList.indexOf(columnName);
      if (indexToRemove !== -1) {
        encryptionList.splice(indexToRemove, 1);
        setEncryptedColumnList(encryptionList);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        rawData,
        updateRawData,
        maskedColumnList,
        updateMaskedColumnList,
        encryptedColumnList,
        updateEncryptedColumnList,
        resetMaskedColumnList,
        resetEncryptedColumnList
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
