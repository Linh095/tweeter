"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      newTweet.user = {
        "name": "Linh",
        "avatars": "/images/profile-hex.png",
        "handle": "@lnguyen"
      };
      console.log(newTweet);
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {

        const sortedTweets = db.tweets.sort((a, b) => {
          return a.created_at - b.created_at}).reverse();
        
        callback(null, sortedTweets);
      });
    }

  };
}
