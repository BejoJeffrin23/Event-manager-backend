

const events = require('../models/events');
const Utility = require('../utilities/commonUtil');
const Config = require('../../config');
const DataUtil= require('../utilities/data');


//add event
exports.addEvent = (req, res) => {

    if (req.errors) {
        return res.status(409).send(req.errors);
    }

    let newStaticData = new events(
        {
            'title': req.body.title,
            'location': req.body.location,
            'notification': req.body.notification,
            'type':req.body.eventType,
            'dateAndTime':req.body.dateAndTime,
            'createdAt':Utility.currentTimeNow(),
            'updatedAt':Utility.currentTimeNow(),


        }
    );
     console.log('art',newStaticData)

    newStaticData.save(err => {
        if (err) {
            //  console.log('error ' + err);
            return res.status(500).send('Problem in adding event');
        }
        res.status(200).json({ message: 'event added sucessfully' });
    });
};

// get all events
exports.getEvents = (req, res) => {

    const query = { isDelete:false };
    events
    .aggregate([
        {$match:query},
        { $sort: { 'createdAt': 1 } },
    ])
        .exec((err, docs) => {
            if (err) {
                //console.log('error ' + err);
                return res.status(500).send('Problem in retrieving about us');
            }
            //console.log('docs len ' + docs.length);
            if (Utility.isEmptyObject(docs)) {
                return res.status(404).send('Data not found');
            }
          

            res.status(200).json({
                message: 'events retrieved sucessfully',
            //    docs: docs,
                events: docs.map(doc=>{return DataUtil.formatEventData(doc)}),

                businessEvents:checkNumberOfEvents(docs,'business'),

                personalEvents:checkNumberOfEvents(docs,'personal')
              
            });
      
    });
};




// update event 
exports.updateEvent = (req, res) => {
    const query = { _id:Utility.convertToMongoObjectId(req.params.eventId) };
    let updateDoc = 
        {
            'title': req.body.title,
            'location': req.body.location,
            'notification': req.body.notification,
            'type':req.body.eventType,
            'dateAndTime':req.body.dateAndTime,
            'updatedAt':Utility.currentTimeNow(),

        }
     const projection = {
        "$set": updateDoc
    };

    events
        .findOneAndUpdate(query, projection)
        .exec((err, docs) => {
            if (err) {
                //console.log('error ' + err);
                return res.status(500).send('Problem in updating event ');
            }
            if (Utility.isEmptyObject(docs)) {
                return res.status(404).send('Data not found');
            }
            res.status(200).json({
                message: 'event updated sucessfully'
            });
        });
};



// delete event
exports.deleteEvent = (req, res) => {
    const query = { _id:Utility.convertToMongoObjectId(req.params.eventId) };
    let updateDoc = 
        {
           isDelete:true
        }
     const projection = {
        "$set": updateDoc
    };

    events
        .findOneAndUpdate(query, projection)
        .exec((err, docs) => {
            if (err) {
                //console.log('error ' + err);
                return res.status(500).send('Problem in deleting event ');
            }
            if (Utility.isEmptyObject(docs)) {
                return res.status(404).send('Data not found');
            }
            res.status(200).json({
                message: 'event deleted sucessfully'
            });
        });
};

function checkNumberOfEvents(docs,type){
let count=0

    docs.map(events=>{
        if(events.type===type){
           count+=1
        }
    })
    return count
}

