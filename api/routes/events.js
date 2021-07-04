
const express = require('express');
const router = express.Router();


const eventsController = require('../controllers/events');


router.get('/', eventsController.getEvents);


router.delete('/:eventId', eventsController.deleteEvent);

router.post('/', eventsController.addEvent);

router.put('/:eventId',eventsController.updateEvent);



module.exports = router;
