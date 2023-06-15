require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/assets', require('./assets'));
app.use('/employees', require('./employees'));
app.use('/faults', require('./faults'));
app.use('/jobs', require('./jobs'));
app.use('/priorities', require('./priorities'));
app.use('/statuses', require('./statuses'));
app.use('/types', require('./types'));


app.listen(port, () => {
    console.log("Server started on: " + port);
});
