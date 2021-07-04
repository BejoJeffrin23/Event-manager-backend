const momentTimezone = require("moment-timezone");
const moment = require("moment");
const Config = require('../../config');


exports.formatLogTime = () => {
    return momentTimezone().tz(Config.TIME_ZONE).format('MMMM Do YYYY, h:mm:ss a');
};

exports.getUTCDateFromTimestamp = (timeStamp) => {
    return momentTimezone.utc(timeStamp).toISOString();
};

exports.getMoment = (timeStamp) => {
    return moment(new Date(parseInt(timeStamp)));
};

