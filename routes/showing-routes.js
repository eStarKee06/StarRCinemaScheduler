const { Router } = require('express');
const controller = require('./../controllers/showing-controller');

const router = Router();

router.get('/', controller.getAllShowings);
router.get('/:id', controller.getShowing);
router.post('/', controller.postShowing);
router.delete('/:id', controller.deleteShowing);
router.put('/:id', controller.putShowing);


//this is an example:
//router.post('/users', controllers.createUser)

module.exports = router