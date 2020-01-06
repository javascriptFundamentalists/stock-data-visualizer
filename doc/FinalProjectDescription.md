# Final Project Description

**Due Date: January 10, 2019 11:59pm**

You will be working in a group of two or three people. Everyone must write for code for this project. What the project will be is up to your group, but you must meet a list of technical requirements in order to pass. In January, you will be showing off your project to potential employers. You are required to attend.

## Project Requirements

You must meet these requirements in order to pass.

- Your project must make one asynchronous call per person in your group.
- You must use an aysnchronous library or API that we covered in class (Fetch, Axios and/or Async & Await).
- You will need at least one API that will return images somewhere within the results. You must display images on the page from this API call.
- You must store content in simple data structures (arrays, objects and sets).
- Your code must contain at least one high order function with arrays (e.g. _Array.forEach_, _Array.map_, _Array.find_, _Array.filter_ and _Array.reduce_).
- Your code should not have any Cross Site Scripting (XSS) vulnerabilities. If you convert a string into HTML at any point, you must use a [library](https://www.npmjs.com/search?q=xss) to sanitize the HTML.
- You must have at least one arrow function (but we encourage you to use more than that).
- It will be an **automatic failure** if you use _var_.
- You must show and hide DOM elements on the screen.
- You must handle at least three different events.
- You must handle user input somewhere within the project. (For example, handle a search engine or display text that the user typed somewhere on the page).
- Limit your use of global variables. You can do this by organizing yours code. Some ideas are breaking your code into different functions, making use of the [Module Design Pattern](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know), and using ES6 Modules.
- You must create a new repository in [Github](https://github.com/) for this project. Everyone in the group should be contributors.

## Using APIs

Whichever API you choose, one person in the group will usually have to signup with an account. APIs will typically provide API keys, which must be included somewhere in the request. Reading the API documentation will be a large part of this project.

Please note that APIs are often rate limited. This means that they will block you after you make several requests within a day (usually around 1000 on the free tier). If the user will be making a search request, it is a good idea to [debounce](https://www.npmjs.com/package/debounce) the request, so that you and your group do not reach the quota.

Another thing to note is that you can run into Cross-Origin Resource Sharing (CORS) issues with some APIs. (Sometimes this happens because you are developing things locally and you are using HTTP instead of HTTPS). You know will know that you are experiencing a CORS issue when you see this in your browser's console:

```
Access to XMLHttpRequest at 'https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
spread.js:25 Uncaught (in promise) Error: Network Error
    at e.exports (spread.js:25)
    at XMLHttpRequest.d.onerror (spread.js:25)
```

To get around this, you can proxy your URL through another URL like `https://cors-anywhere.herokuapp.com/`

```
https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972
```

[You can read more about CORS here](https://www.codecademy.com/articles/what-is-cors).

### Update: Writing Your Own APIs

You are permitted to write your own APIs (or back-end), but if you opt to do this, we are requiring you to complete a reviewal process. You must submit a formal document to Jamal and Matina by **December 18th**. Your document must contain:
- Working examples of code that prove you have written your own API before. This does not have to be related to this project.
- If you are writing a back-end, the language you will be using, as well as a list of expected packages and any other things that must be installed.
- Installation instructions (this can be brief).
- A description of how or where you are going to get your data from.
- Specifications on your APIs e.g. URLs, HTTP methods, example request bodies and example request responses with HTTP status codes.

If Jamal and Matina deny your specification, you must pivot and use a third-party API.

Your APIs (and back-end) must meet the following conditions:
- You cannot use private resources like your web server on AWS or another host, your company’s web server, or database in the cloud. (You are permitted to write wrappers around public APIs and scrap popular websites for data). The reason for this is because if these resources go down, we do not want the other members in the group to suffer because they cannot show off their portfolio piece.
- It must be self contained. That means that whatever code you write for your back-end to run must go in the project’s Github repository. You are allowed to mock data as long as you also include it in your Github repository.
- It should not require numerous installations and it should not take more than five minutes to get up and going. Jamal and Matina need to be able to grade your project in a timely manner.
- It must work on Mac OSX and Windows. (Also, possible Docker, but the Jury is still out for that).

For those of you who want to write a back-end with Node.js, please note that we will not look at your back-end code, since it is out of scope. This means that **only your front-end code will count towards whether or not you pass.**

## Project Ideas

You are free to come with up with your own ideas and use any APIs you would like. However, here are two different ideas to get started.

### Movies with the Movie DB API

Develop a website like [The Movie DB](https://www.themoviedb.org/), where users can search for movies, find out which movies are playing near them, find the top rated movies, and get details about a single movie.

The Movie DB [provides three different movie APIs](https://www.themoviedb.org/documentation/api). You can [read the documentation on how to get started here](https://developers.themoviedb.org/3/getting-started/introduction). In order to use these APIs, at least one person in the group must [signup](https://www.themoviedb.org/documentation/api). When you signup, you will receive an API key. You will need to include the API key in the end of the URL of every AJAX request as a GET parameter. For example, to search for movies called _Frozen 2_, you would use this URL, replacing `<API_KEY>` with your API key.

```
https://api.themoviedb.org/3/search/movie?api_key=<API_KEY>&language=en-US&query=Frozen%202&page=1&include_adult=false
```

The Movie DB also provides a sandbox where you can experiment with making different API requests. Click on the [Try it out](https://developers.themoviedb.org/3/search/search-movies) button, enter your API key where it says "Your TMDb API key", and then click on the _Send Request_ button near the bottom of the page.

You can use the ID of a movie returned in the results of the [Search](https://developers.themoviedb.org/3/search/search-movies) or [Discover](https://developers.themoviedb.org/3/discover/movie-discover) API to then look up a specific movie with the [Find API](https://developers.themoviedb.org/3/find/find-by-id).

One thing to note about these API are that they do not send back the full image URL in the results. You will need to start the URL with `https://image.tmdb.org/t/p/w500/`. For example, if you get this response:

```json
"results": [
  {
      "poster_path": "/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg",
      "original_title": "Frozen II",
      "title": "Frozen II",
      // ...
  },
  // ...
```

The image URL should actually be `https://image.tmdb.org/t/p/w500/qdfARIhgpgZOBh3vfNhWS4hmSo3.jpg`. For more information, see the [documentation on images](https://developers.themoviedb.org/3/getting-started/images).

### Local Businesses with the Yelp Fusion API

Create an application that can search for local businesses, show business reviews and provide suggestions for related business. To this, you can use the [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started). You will need a Yelp account. On the [Yelp Fusion API Documentation](https://www.yelp.com/developers/documentation/v3) page, click on the "Create App" in the sidebar. You will get an API Key, which you can find on the [Manage App](https://www.codecademy.com/articles/what-is-cors) page. You will need this to make AJAX requests.

In order to get the Yelp API, you must 1.) proxy your requests to get around CORS issues and 2.) include the API Key as a Authorization header in the request. For example, to send a request to `https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972`, do the following, where `API_KEY` is a constant that is equal to your API key:

```javascript
axios
  .get(
    "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    }
  )
  .then(/* Handle response */);
```

To test the Yelp Fusion API in Postman, click on the tab that says _Authorization_, select _Bearer Token_ from the dropdown list, and paste your API key in the textbox where it says _Token_.

![Authorization Token in Postman](img/postman-authorization-token.png)

To get a user's latitude and longitude coordinates, you can make an AJAX request to `https://openweathermap.org/api`.

### Other Ideas

You can browse [RapidAPI](https://rapidapi.com/appetitoso/api/food-search-engine?endpoint=55aa28b0e4b095ed24af0705) to discover other APIs.

## Roles and Tasks

It is up to the group to decide how you will distribute the workload. In addition to what was taught in class, other possible roles you may consider are:

- Project Manager (creates tasks, delegates tasks, and sets deadlines)
- Designer (creates sketches, wireframes, mockups and/or other design artifacts)
- HTML / CSS developer
- Github Master (merges what goes on the shared repository's master branch)

No matter how you assign different roles within your, everyone must write code and they must demostrate that they learned the class materials.

## Project Mangement

We recommend that you choose some kind of project management application or system. We have used [Trello](https://trello.com/en-US) in the past. With Trello, you can create a "board", organize your tasks with "cards", and drag and drop different tasks onto "lists" like this:

![Example Trello Board](img/trello.png)

## Designing the Project

We realize that we did not teach design in this class, but there is no way to get around the fact that design must be a part of the process. We will not grade your project on how good it looks, but a good design will make a better impression with employers, so please try to make your application look as nice as possible.

## Version Control

All members in the group should share a Github repository where each member is a collaborator. We recommend either writing code on separate branches or doing pull requests. If you decide to do pull request, here is some guides on how to do this:

- [Creating a Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)
- [Approving a Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/approving-a-pull-request-with-required-reviews)

## Code Quality

While you will not fail if you do not meet these quality requirements, we encourage you to code to a professional standard. One of the goals of this project is to help you build a portfolio. Just like an interviewer will judge you on your attire, employers will judge you on the neatness of your code.

- You should have a README.md written in Markdown. It should explain what your project is, any getting started information and who the contributors are.
- You must not leave any debugging statements in your code. Remove any `console.log` statements from your code before committing.
- Choose descriptive and specific variable, constant and function names.
- Add comments to your code that is difficult to understand.
- Only have actual comments within comment tags. Do not commit code that you commented out for debugging purposes.
- Use proper indentation. (Prettier can take care of this).

## Graduation

You will be demonstrating your project on **January 16th** during the graduation ceremony. All members are required to be there. Keep in mind that potential employers will attend graduation, so put your best foot forward.
