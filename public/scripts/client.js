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

//makes markup to be added to page's html when new tweet is posted
const createTweetElement = function (tweetData) {
  const { user, content, created_at } = tweetData;
  const days = daysAgoTweet(created_at);

  const markup = ` <article class="display-tweet">
      <a class="handle">${user.handle}</a>
      <header>
        <div>
          <img src=${user.avatars} alt="profile picture of ${user.name}">
          <p>${user.name}</p> 
        </div>
      </header>
      <p>${content.text}</p>
      <footer>
        <h6 class="days-tweet">${days} days ago</h6>
        <div class="social-icons">
          <i class="fab fa-font-awesome-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
    return markup;
}

//calculate ethe difference between current time and time tweet was created
const daysAgoTweet = function (time_created) {
  const difference = Date.now() - time_created;
  const daysDifference = Math.floor(difference/1000/60/60/24);
  return daysDifference;
}

//formats tweet from text entered into the new_tweet form
const formatTweetByLinh = function(text_object) {
  const dateCreated = Date.now(); //returns 13 digit timestamp
  const text = text_object[0].value;
  console.log("data value", text);
  //NEED TO CHANGE THIS TO GET USER INFORMATION FROM COOKIES LATER
  const tweet_data = {
    "user": {
      "name": "Linh",
      "avatars": "/images/profile-hex.png",
      "handle": "@lnguyen"
    },
    "content": {
      "text": text
    },
    "created_at": dateCreated
  }
  return tweet_data;
}

//adds tweet to tweet-container part of homepage
const renderTweets = function(data) {
  let markupArray = [];
  for (const tweet of data) {
    const tweet_html = createTweetElement(tweet);
    markupArray.push(tweet_html);
  }
  return markupArray.join("");
}

//FETCHING TWEETS FROM DATABASE
const loadTweets = function(){
  $.get("/tweets", function(data){
    const tweets = renderTweets(data);
    $('#tweet-container').append(tweets);
  });
}
loadTweets();

//EVENT LISTENERS
// Run when page is ready
$(document).ready(onReady);

//listen for submission of new_tweet form
$('#new_tweet_form').submit(function(event) {
  event.preventDefault();
  const tweetData = $(this).serializeArray();
  console.log(tweetData);
  appendNewTweet(tweetData);
});