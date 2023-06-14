const { writeFileSync } = require("fs");
const { resolve } = require("path");
const app = require('express').Router();

const dataJsonPath = resolve(__dirname, "./data.json");

app.get("/", (req, res) => {
    const employees = require(dataJsonPath);
    res.send(employees);
});
app.get("/:id", (req, res) => {
    const { id } = req.params;
    const employees = require(dataJsonPath);
    const employee = employees.find((e) => `${e.id}` === `${id}`);
    res.send(employee);
});

app.post("/", (req, res) => {
    try {
        const employee = req.body;
        const employees = require(dataJsonPath);
        employee.id = Math.max(...employees.map(e => e.id)) + 1;

        writeFileSync(
            dataJsonPath,
            JSON.stringify([...employees, employee], null, 4),
            "utf-8"
        );

        res.status(200).send(employee);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

app.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const employees = require(dataJsonPath);

        Object.assign(
            employees.find((e) => `${e.id}` === `${id}`),
            req.body
        );

        writeFileSync(
            dataJsonPath,
            JSON.stringify(employees, null, 4),
            "utf-8"
        );

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

app.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const employees = require(dataJsonPath);
        const newEmployees = employees.filter((e) => `${e.id}` !== `${id}`)

        writeFileSync(
            dataJsonPath,
            JSON.stringify(newEmployees, null, 4),
            "utf-8"
        );

        res.status(200).send({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

module.exports = app;