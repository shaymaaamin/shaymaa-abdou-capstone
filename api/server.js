const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const { writeFileSync } = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/employees", (req, res) => {
    const employees = require("./employees.json");
    res.send(employees);
});
app.get("/employees/:id", (req, res) => {
    const { id } = req.params;
    const employees = require("./employees.json");
    const employee = employees.find((e) => `${e.id}` === `${id}`);
    res.send(employee);
});

app.post("/employees", (req, res) => {
    try {
        console.log('Adding new Employee!!');
        const employee = req.body;
        const employees = require("./employees.json");
        employee.id = employees.length + 1;

        writeFileSync(
            "./employees.json",
            JSON.stringify([...employees, employee], null, 4),
            "utf-8"
        );

        res.status(200).send(employee);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

app.put("/employees/:id", (req, res) => {
    try {
        const { id } = req.params;
        const employees = require("./employees.json");

        Object.assign(
            employees.find((e) => `${e.id}` === `${id}`),
            req.body
        );

        writeFileSync(
            "./employees.json",
            JSON.stringify(employees, null, 4),
            "utf-8"
        );

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log("Server started on: " + port);
});
