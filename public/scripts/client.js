/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import characterCounter from "./composer-char-counter.js";
import toggleNewTweet from "./toggle-new-tweet.js";

// Function to run when page is ready

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
      <p>${escape(content.text)}</p>
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
};

//calculate ethe difference between current time and time tweet was created
const daysAgoTweet = function (time_created) {
  const difference = Date.now() - time_created;
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  return daysDifference;
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//formats tweet from text entered into the new_tweet form
const formatTweetByLinh = function (text) {
  const dateCreated = Date.now(); //returns 13 digit timestamp
  const tweet_data = {
    "user": {
      "name": "Linh",
      "avatars": "/images/profile-hex.png",
      "handle": "@lnguyen"
    },
    "content": {
      "text": escape(text)
    },
    "created_at": dateCreated
  }
  return tweet_data;
};

const checkValidText = function (text) {
  if (!text) {
    return false;
  } else if (text.length > 140) {
    return false;
  } else {
    return true;
  }
};

//render new tweet without adding to the database
const addNewTweet = function () {
  $('#new_tweet_form').submit(
    function (event) {
    event.preventDefault();
    const data = $(this).serializeArray();
    const new_tweet = data[0].value;

    if (checkValidText(new_tweet)) {

      $('.error-message').removeClass("error");
      const formated_object = formatTweetByLinh(new_tweet);

      const html_element = createTweetElement(formated_object);

      //TRYING TO ADD TO DATABASE
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        success: console.log("successfully added to db", data),
        dataType: null
      });

      $('#new_tweet_form')[0].reset();

      $('#tweet-container').prepend(html_element);
    } else {
      $('.error-message').addClass("error");
    }

  });
};
//add new tweet to database
// const newTweetData = function (tweet) {
//   $.ajax('/tweet', {method:})
// }

//adds tweet to tweet-container part of homepage
const renderTweets = function (data) {
  let markupArray = [];
  for (const tweet of data) {
    const tweet_html = createTweetElement(tweet);
    markupArray.push(tweet_html);
  }
  return markupArray.join("");
};

//FETCHING TWEETS FROM DATABASE
const loadTweets = function () {
  $.get("/tweets", function (data) {
    const tweets = renderTweets(data);
    $('#tweet-container').append(tweets);
  });
};

//LOAD EVENT LISTENERS
const onReady = () => {
  characterCounter();
  loadTweets();
  addNewTweet();
  toggleNewTweet();
};

//hide toggle box in the beginning (only need to be done once);
$(".new_tweet").hide(200);

// Run when page is ready
$(document).ready(onReady);


