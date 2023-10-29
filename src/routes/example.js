const express = require('express');
const router = express.Router();
//import controllers
const controllers = require('../controllers/example');
router.get('/', (req,res) => controllers.test(req, res));

module.exports = router;