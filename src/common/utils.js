export const readFileAsText = (file) => {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      const result = JSON.parse(fr.result);
      resolve(result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsText(file);
  });
};

export const updateOutputColumnList = (fileData, maskedList = [], encryptionList = []) => {
  fileData.forEach(item => {
    if (!item?.fields && !item?.type?.fields) {
      if (item.isMasked) {
        maskedList.push(item.displayKey);
      }
      if (item.isEncrypted) {
        encryptionList.push(item.displayKey);
      }
    }
    if (item?.fields || item?.type?.fields) {
      const fields = item?.fields ? item?.fields : item?.type?.fields;
      updateOutputColumnList(fields);
    }
  });
};
