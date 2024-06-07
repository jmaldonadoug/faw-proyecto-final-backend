var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth-controller');
const tareaController = require('../controllers/tarea');

router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

router.get('/tareas', tareaController.index);
router.get('/tareas/search', tareaController.search);
router.post('/tarea/store', tareaController.store);
router.post('/tarea/:id/finish', tareaController.finish);

module.exports = router;
