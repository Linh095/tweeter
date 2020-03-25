/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import characterCounter from "./composer-char-counter.js";
// Function to run when page is ready
const onReady = () => {
  characterCounter();
};
// Run when page is ready
$(document).ready(onReady);

// modules.exports = {}

// export { funcOne, varOne, FuncTwo }
// export default funcOne;