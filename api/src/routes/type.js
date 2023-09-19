const { Router } = require('express');

const { Type } = require('../db');
const { getTypes } = require('./controllers/typecon');
const router = Router();

router.get('/', async(req, res) => {
    try{
        const getType = await getTypes();
        return res.status(200).send(getType);
    } catch(error) {
        return res.status(400).send('Could not find types');
    };
});

module.exports = router;