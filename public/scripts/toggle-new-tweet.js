
// hide and show input form by click
// const firstHideNewTweet = function() {
//   $(".new_tweet").hide(200)
//   hidenTextArea = false;
// }

let hidenTextArea = false;
const toggleNewTweet = () => {
  $(".write-span").click(function () {

  if (hidenTextArea === false) {
    $(".new_tweet").show(200)
    $("#tweet-text").focus()
    hidenTextArea = true;
  } else {
    $(".new_tweet").hide(200)
    hidenTextArea = false;
  }
});
} 

export default toggleNewTweet;