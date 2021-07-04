const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventschema = new Schema({
  
    title:{ 
        type: String
    },
    type:{
        type: String
    },
    location:{
        type: String
    },
    dateAndTime:{
        type: Date, default: Date.now(), required: true
    },
    notification:{
        type: Boolean,
        default:true
    },
    isCompleted:{
       type:Boolean,
       default:false
    },
    isDelete: {
            type: Boolean, default: false
        },
    createdAt: {     
             type: Date, default: Date.now(), required: true
        },
        updatedAt: {

                type: Date,
        
        }
});

const events = mongoose.model('events', eventschema);

module.exports = events;