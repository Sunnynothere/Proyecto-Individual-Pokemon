const { Router } = require('express');
const router = Router();
const pokemon = require('./pokemon');
const type = require('./type');

router.use('/pokemon', pokemon);
router.use('/types', type);

module.exports = router;