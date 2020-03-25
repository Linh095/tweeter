$(document).ready( ()=> {
  console.log("DOM is ready!");
  alert("DOM is ready!");
});

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
    console.log(count);
  });
};

export default characterCounter;


