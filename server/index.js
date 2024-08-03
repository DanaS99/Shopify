const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./route/itemRoutes');
require('./db'); // Ensure your DB connection is established

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/api', itemRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
