const express = require('express');
const app = express();
const routes = require('./router');
require('dotenv').config();

app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});