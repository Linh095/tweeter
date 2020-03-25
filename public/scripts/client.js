/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

composer-char-counter.js
const MAXCHARACTERS = 140;
// Function that updates character counter when user inputs text into new tweet textArea
const characterCounter = () => {
  $("#tweet-text").on("input", function() {
    // get length text in textarea
    const textLength = $(this).val().length;
    // select counter output element
    const counter = $(this).siblings(".counter");
    // calculate remaining characters
    const count = MAXCHARACTERS - textLength;
    // Add class when maximum character count has been reached, remove if above again
    count < 0 ? counter.addClass("over") : counter.removeClass("over");
    // update counter value
    counter.val(count);
  });
};
export default characterCounter;

client.js
import characterCounter from "./composer-char-counter.js";
// Function to run when page is ready
const onReady = () => {
  characterCounter();
};
// Run when page is ready
$(document).ready(onReady);

modules.exports ={}

export { funcOne, varOne, FuncTwo ... }
export default funcOne;