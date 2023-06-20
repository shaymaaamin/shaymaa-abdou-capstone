require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const crud = require('./crud');
const port = process.env.REACT_APP_BACKEND_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/assets', crud('assets'));
app.use('/employees', crud('employees'));
app.use('/jobs', crud('jobs'));

app.use('/faults', crud('faults'));
app.use('/priorities', crud('priorities'));
app.use('/skills', crud('skills'));
app.use('/statuses', crud('statuses'));
app.use('/types', crud('types'));


app.listen(port, () => {
    console.log("Server started on: " + port);
});
