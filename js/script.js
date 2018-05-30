document.getElementById('hello').innerHTML = 'Here will be Yulia\'s ToDo list';

var timeline = require('./timeline.js');
var user = {
    name : "Yulya Lepskaya",
    messages : [
        "hello",
        "bye",
        "good night"
    ]
};

var timelineModule = new timeline(user);
timelineModule.setHeader(user);
timelineModule.setTimeline(user);


