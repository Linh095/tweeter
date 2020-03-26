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
const formatTweet = function(text_object) {
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
const appendNewTweet = function(tweet_data) {
  const tweetFormatted = formatTweet(tweet_data);
  const tweet = createTweetElement(tweetFormatted);
  $('#tweet-container').append(tweet);
}


//example data will have to replace with method from getting stuff from database
const exampleTweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};
//adding example tweet to the page
const $tweet = createTweetElement(exampleTweetData);
$('#tweet-container').append($tweet);


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