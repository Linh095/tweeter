const MAXCHARACTERS = 140;
// Function that updates character counter when user inputs text into new tweet textArea
const characterCounter = () => {
  $("#tweet-text").on("input", function() {
    // get length text in textarea
    const textLength = $(this).val().length;
    
    // calculate remaining characters
    const count = MAXCHARACTERS - textLength;

    // Add class to output when maximum character count has been reached, remove if above again
    const counter = $(".counter");
    count < 0 ? counter.addClass("over") : counter.removeClass("over");
    // update counter value
    counter.val(count);
  });
};

export default characterCounter;


