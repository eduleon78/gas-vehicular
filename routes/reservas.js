var express = require('express');
var router = express.Router();
var reservaController = require('../controllers/reserva');

router.get('/', reservaController.reserva_list);
router.get('/create', reservaController.reserva_create_get);
router.post('/create', reservaController.reserva_create_post);
/* router.get('/:id/update', vehiculoController.vehiculo_update_get);
router.post('/:id/update', vehiculoController.vehiculo_update_post);
router.post('/:id/delete', vehiculoController.vehiculo_delete_post); */



module.exports = router;