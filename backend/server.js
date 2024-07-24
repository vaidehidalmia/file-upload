const express = require('express')
const cors = require('cors')
const port = 8000
const app = express()

const { getFilesList, downloadFile } = require('./s3')

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/list', async (req, res) => {
  try {
    const bucketData = await getFilesList();
    res.send(bucketData.Contents);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
});

app.get('/downloadFile/:fileKey', async (req, res) => {
  const { fileKey } = req.params;
  try {
    const file = await downloadFile(fileKey);
    res.send(file);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})