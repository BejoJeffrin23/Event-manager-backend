const moment = require('moment');
const momentTimezone = require('moment-timezone');
const config = require('../../config');
const mongoose = require('mongoose');

//console.log(' config ' + config.s3ImageStorage);

exports.isEmptyObject = (obj) => {
    if (obj == null || obj == undefined) {
        return true;
    }
    return !Object.keys(obj).length;
};

exports.isNotEmptyObject = (obj) => {
    if (obj === null || obj === undefined) {
        return false;
    }
    return Object.keys(obj).length;
};



exports.formatTime = (timestamp, arabicFormat) => {
    //console.log('timestamp ' + timestamp);
    let moment = formatWithTimeZone(timestamp);
    if (arabicFormat)
        moment.locale('ar-ly');
    return moment.format("hh:mm a");
};



exports.formatTo_h_mm_a = (timestamp, arabicFormat) => {
    //console.log('timestamp ' + timestamp);
    let moment = formatWithTimeZone(timestamp);
    if (arabicFormat)
        moment.locale('ar-ly');
    return moment.format("h:mm A");
};


exports.formatToDate = (timestamp) => {
    //console.log('timestamp ' + timestamp);
    let moment = formatWithTimeZone(parseInt(timestamp));
    return moment.format("L");
};

//'2019-04-29'
exports.formatTimeYYYYMMDD = (timestamp) => {
    //console.log('timestamp ' + timestamp);
    let moment = formatWithTimeZone(parseInt(timestamp));
    return moment.format("YYYY-MM-DD");
};

// "January 20th 2019, 2:23:53 pm"
exports.formatTimeInAMPM = (timestamp, arabicFormat) => {
    let moment = formatWithTimeZone(timestamp);
    if (arabicFormat)
        moment.locale('ar-ly');
    return moment.format("MMMM Do YYYY, h:mm:ss a");
};


// "January 20th 2019, 2:23:53 pm"
exports.formatTimeInAMPM_New = (timestamp) => {
    let moment = formatWithTimeZone(parseInt(timestamp));
    return moment.format("lll");
};

exports.convertToMoment = (date) => {
    return moment(date);
};

/* exports.convertToTimeZoneDate = (h, m, d) => {
    return new Date(h, m, d, 0, 0, 0).getTime();
}; */

function getMoment(timestamp) {
    return moment(new Date(parseInt(timestamp)));
}

function formatWithTimeZone(timestamp) {
    return momentTimezone.tz(timestamp, (process.env.TIME_ZONE || config.TIME_ZONE));
}

exports.timestampNow = () => {
    return new Date().getTime();
};







exports.showNullIfEmptyOrUndefined = (obj) => {
    if (obj === '' || obj === undefined || obj === 'undefined' || obj === 'null') {
        return null;
    }
    return obj;
};

exports.showEmptyString = (obj) => {
    if (obj === '' || obj === undefined || obj === 'undefined' || obj === 'null'||obj==='N/A') {
        return '';
    }
    return obj;
};


exports.checkIsEmptyOrNull = (obj) => {
    if (obj === '' || obj === undefined || obj === null ||
        obj === 'undefined' || obj === 'null') {
        return true;
    }
    return false;
};



exports.checkIfNotEmptyOrNotNull = (obj) => {
    if (obj === '' || obj === undefined || obj === null ||
        obj === 'undefined' || obj === 'null') {
        return false;
    }
    return true;
};

exports.checkIfTrue = (bool) => {
    let result=(bool.toString() === 'true'||bool.toString() === '1')
    return result;
};

exports.checkIfFalse = (bool) => {
    let result=(bool.toString() === 'false'||bool.toString() === '0')
    return result;
};


exports.convertToMongoObjectId = (id) => {
   if(id==='undefined'){
    return mongoose.Types.ObjectId(null);
   }else{
    return mongoose.Types.ObjectId(id);
   }
};


