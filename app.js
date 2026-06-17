const express = require('express');
const app = express();
const routes = require('./router');
require('dotenv').config();

app.use(express.json());
app.use("/V1", routes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});