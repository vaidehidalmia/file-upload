import React, { useState, useEffect } from "react";
import "./App.css";
import { downloadFile, getFilesList } from './api';

function App() {
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    getFilesList().then(result => {
      setFilesList(result);
    });
  }, []); 

  const handleDownloadFile = async (fileKey) => {
    console.log(fileKey);
    const response = await downloadFile(fileKey);
    
    // Convert the response to a blob
    const blob = await response.blob();

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element, set the download attribute, and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileKey); // Use the fileKey or a custom name
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log(`Downloaded file: ${fileKey}`);
  }

  return (
    <div className="App">
      <ul id="files-list">
        {filesList &&
          filesList.map(file => (
            <li key={file.Key}>
              <div>{file.Key}</div>
              <button onClick={() => handleDownloadFile(file.Key)}>Download</button>
              <button>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;