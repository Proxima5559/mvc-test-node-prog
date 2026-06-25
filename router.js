const controllers = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/insert', controllers.insert);
router.get('/getAll', controllers.getAll);
router.get('/get/:id', controllers.get);
router.put('/update/:id', controllers.update);
router.delete('/delete/:id', controllers.deleteOne);
// router.post('/increment-price', controllers.incrementPrice);
// router.post('/decrement-price', controllers.decrementPrice);
// router.get('/total-price', controllers.getTotalPrice);

module.exports = router;