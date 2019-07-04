
const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const publicDiriectionPath = path.join(__dirname, '../public');

app.use(express.static(publicDiriectionPath));

app.listen(port, () => {
  console.log(`Service is up on port ${port}`);
})
