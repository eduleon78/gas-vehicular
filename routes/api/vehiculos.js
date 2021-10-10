var express = require('express');
var router = express.Router();
var vehiculoController = require('../../controllers/api/vehiculoControllerAPI');

router.get('/', vehiculoController.vehiculo_list);
router.post('/create', vehiculoController.vehiculo_create);
router.delete('/delete', vehiculoController.vehiculo_delete);

module.exports = router;