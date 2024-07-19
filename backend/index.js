const express = require('express')
const cors = require('cors');
const port = 8000
const app = express()

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})