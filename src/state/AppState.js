const { createContext, useState, useContext } = require("react");

const AppContext = createContext({
  rawData: [],
  processedData: []
});

export const AppStateProvider = ({ children }) => {

  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  const updateRawData = (newData) => {
    const newRawData = [...newData];
    setRawData(newRawData);
  }

  const updateProcessedData = (newData) => {
    const newProcessedData = [...newData];
    setProcessedData(newProcessedData);
  }

  return (
    <AppContext.Provider value={{ rawData, processedData, updateRawData, updateProcessedData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
}