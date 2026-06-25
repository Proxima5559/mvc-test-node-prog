require('dotenv').config(); 
const express = require('express');
const app = express();
const routes = require('./router');
const connectDB = require('./config');

const port = process.env.PORT; 

app.use(express.json());
app.use("/V1", routes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed. Server not started.", err);
  });