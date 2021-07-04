const Utility = require("./commonUtil");



exports.formatEventData = (event) => {
  return getEventData(event);
};

function getEventData(event) {
  let obj = {
    id: event._id,
    title: event.title,
    eventType: event.type,  
    location: event.location,
    dateAndTime:Utility.formatTime(event.createdAt),
    createdAt: Utility.formatTimeInAMPM(event.createdAt.getTime()),
  
  };
  return obj;
}






