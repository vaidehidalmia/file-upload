const path = 'http://localhost:8000';

const ajaxCall = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        resolve(response.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFilesList = () => {
  const url = `${path}/list`;
  return ajaxCall(url);
}

export const downloadFile = (fileKey) => {
  const url = `${path}/downloadFile/${fileKey}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
