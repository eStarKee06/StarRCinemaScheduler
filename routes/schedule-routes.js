const { Router } = require('express');
const controller = require('./../controllers/schedule-controller');

const router = Router();

router.get('/', controller.getAllSchedules);
router.get('/:id', controller.getSchedule);
router.post('/', controller.postSchedule);
router.delete('/:id', controller.deleteSchedule);
router.put('/:id', controller.putSchedule);


//this is an example:
//router.post('/users', controllers.createUser)

module.exports = router