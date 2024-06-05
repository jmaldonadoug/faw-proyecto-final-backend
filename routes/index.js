var express = require('express');
var router = express.Router();

const tareaController = require('../controllers/tarea');

router.get('/tareas', tareaController.index);

module.exports = router;
