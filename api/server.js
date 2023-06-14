require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3001;

const employees = require('./employees');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/employees', employees);


app.listen(port, () => {
    console.log("Server started on: " + port);
});
