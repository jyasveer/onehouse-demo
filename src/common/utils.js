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
