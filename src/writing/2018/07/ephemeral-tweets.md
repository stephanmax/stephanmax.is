---
title: "Ephemeral Tweets with Node and Webtask"
published: 2018-07-05
---

A couple of weeks ago I stumbled upon this article by Vicky Lai called [Why I’m automatically deleting my old tweets using AWS Lambda](https://victoria.dev/verbose/why-im-automatically-deleting-my-old-tweets-using-aws-lambda/). It hit me at a time when I just started to rekindle my love for minimalism and digital detox and I was immediately intrigued with the thought of making my tweets ephemeral, i.e. deleting them after a certain number of days. Because, let’s face it, a tweet from way back then should not have the power to let other people make assumptions on who you are today.

> We change our opinions, our desires, our habits. We are not stagnant beings, and we should not let ourselves be represented as such, however unintentionally.

After looking at [Vicky’s Go code](https://github.com/vickylai/ephemeral) I got excited to try this in Node and use [Webtask](https://webtask.io/) to host my [ephemeral-tweets](https://github.com/stephanmax/ephemeral-tweets) microservice.

## The Code

The code for ephemeral-tweets is written in ES6 and uses features like `const`, fat arrow functions, destructuring, and promises. I also use Webtask’s [secrets](https://webtask.io/docs/editor/secrets) (similar to environment variables, exposed via the microservice’s `context` parameter) for private Twitter credentials and the maximum age of the tweets you want to keep, represented in days.

```javascript
module.exports = function(context, done) {
  const maxTweetAge = context.secrets.MAX_TWEET_AGE * dayInMs

  const twitterClient = new Twitter({
    consumer_key: context.secrets.CONSUMER_KEY,
    consumer_secret: context.secrets.CONSUMER_SECRET,
    access_token: context.secrets.ACCESS_TOKEN,
    access_token_secret: context.secrets.ACCESS_TOKEN_SECRET
  })

  ...
}
```

I use the [twit library](https://github.com/ttezel/twit) to connect to and query the Twitter API, mainly because it offers all the convenience methods you would expect, supports promises, and exposes the full response object (for watching rate limits, for example).

The ephemeral-tweets microservice retrieves 200 tweets per call from your timeline (as per Twitter’s API limit for [GET statuses/user_timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html), filters them by `MAX_TWEET_AGE` and deletes the ones that are older.

In case you wondered why I left the `console.log` calls in there: Depending on how you develop your task (whether locally or inside the [Webtask Editor](https://webtask.io/docs/editor/logs)) Webtask pipes `console.log` output to the console or to the editor’s log panel which is great help during development.

```javascript
...

twitterClient.get('statuses/user_timeline', {
  count: 200
})
.then(({data: tweets}) => {
  let deleteRequests = tweets
    .filter(tweet => {
      return new Date() - new Date(tweet.created_at) > maxTweetAge
    })
    .map(tweet => {
      return new Promise((resolve, reject) => {
        twitterClient.post('statuses/destroy/:id', {
          id: tweet.id_str
        })
        .then(({data: deletedTweet}) => {
          console.log(`Deleted tweet #${deletedTweet.id_str}: "${deletedTweet.text}"`)
          resolve(deletedTweet)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    })

  return Promise.all(deleteRequests)
})
.then(deletedTweets => {
  console.log(`Done. Deleted ${deletedTweets.length} tweets.`)
  done(null, { deletedTweets })
})
.catch(done)
```

This is it! You can find [the code on GitHub](https://github.com/stephanmax/ephemeral-tweets) and refer to the [README](https://github.com/stephanmax/ephemeral-tweets#readme) for instructions on how to build, customize, schedule, and deploy this microservice for your own Twitter account.

## A Note on (Rate) Limits

There are some limits I want to point out, especially to people with a lot of tweets on their timeline wanting to run this task often in the beginning:

* Webtask will host this microservice for free as long as you stay below one call per second. Fair!
* You can retrieve your timeline tweets up to 900 times in 15 minutes (so once every second) with a maximum of 200 tweets per call. The 200 tweets are already hard-coded into ephemeral-tweets and the free tier of Webtask already limits you to one call per second, so you should be fine.
* Deleting tweets seems to have a rate limit (at least that’s what the [API docs](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id) imply), but I really did not understand how that looks like. I only found some limits for POST requests in the [Twitter Help Center](https://help.twitter.com/en/rules-and-policies/twitter-limits), but deleting tweets is not on the list. Then again, I never hit any limits for deleting tweets.
