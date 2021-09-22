const config = require('./config.js');
const setupKeybinds = require('./setup-keybinds.js');
const uiReady = require('./ui-ready.js');

const isTextBox = (element) => {
    var tagName = element.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') return true;
    else return false;
}
let prevVid;

if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(uiReady, 1);
} else {
    document.addEventListener("DOMContentLoaded", uiReady);
}
