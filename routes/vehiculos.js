var express = require('express');
var router = express.Router();
var vehiculoController = require('../controllers/vehiculo');

router.get('/', vehiculoController.vehiculo_list);
router.get('/create', vehiculoController.vehiculo_create_get);
router.post('/create', vehiculoController.vehiculo_create_post);
router.get('/:id/update', vehiculoController.vehiculo_update_get);
router.post('/:id/update', vehiculoController.vehiculo_update_post);
router.post('/:id/delete', vehiculoController.vehiculo_delete_post);



module.exports = router;