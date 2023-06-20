const express = require('express');

const knexfile = require('./knexfile.js');
const knex = require('knex')(knexfile);

module.exports = (tableName) => {
    const router = express.Router();

    // Get all records
    router.get('/', async (req, res) => {
        try {
            const records = await knex(tableName).select('*');
            res.json(records);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // Get a single record
    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const record = await knex(tableName).select('*').where({ id }).first();
            if (!record) {
                return res.status(404).json({ msg: 'record not found' });
            }
            res.json(record);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // Create a record
    router.post('/', async (req, res) => {
        try {
            const newRecord = req.body;
            const record = await knex(tableName).insert(newRecord);
            res.json(record[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // Update a record
    router.put('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const updatedRecord = req.body;
            delete updatedRecord.created_at;
            delete updatedRecord.updated_at;
            
            const record = await knex(tableName).where({ id }).update(updatedRecord);
            if (!record) {
                return res.status(404).json({ msg: 'record not found' });
            }
            res.json(record[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // Delete a record
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const record = await knex(tableName).where({ id }).del();
            if (!record) {
                return res.status(404).json({ msg: 'record not found' });
            }
            res.json({ msg: 'record deleted' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    return router;
}