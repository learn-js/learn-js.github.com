---
title: "Using the Flatsheet API as replacement for Tabletop.js and Google Spreadsheets"
slug: using-flatsheet-api-as-replacement-for-tabletopjs-google-spreadsheets
published: true
layout: post
type: post
---

Sometimes I've got a simple dataset that a client or team member needs to edit, but is simple enough that creating it as part of the website database would be overkill.

We don't need to create a model, controller, and views just for a list of locations with descriptions that are going on a map.

We don't need to create a custom post type in Wordpress just to manage regularly changing list of projects that an organization is working on.

But for projects like those listed above, it is useful to be able to present that kind of information dynamically. Non-technical teammates need to have a place where they can edit each item in the list. We need a JSON API for that list so that we can integrate it into our other content.

People have used Google Spreadsheets for this, but this has a few problems:

- It's a hack that relies on Google not changing how they expose the data.
- For high-traffic applications, you may need to worry about Google rate-limiting requests.
- Google spreadsheets is overkill for what is basically a JSON editor.
- POST/PUT/DELETE requests requires the Google API, which is not simple.

So when you have a dataset that changes regularly either through a teammate editing properties and you need a JSON API of that data for integration with a website or app that is running in production, what do you do?

The existence of the Google Spreadsheets + Tabletop.js approach shows that _something_ is needed. Flatsheet could be that something.

I made it as an internal tool for my own journalism / civic technology projects, and decided others may want to use it asl well. More info at [flatsheet.io](http://flatsheet.io).


### Flatsheet currently two API endpoints.

**To get a list of sheets:** [https://app.flatsheet.io/api/v1/sheets?username=example](https://app.flatsheet.io/api/v1/sheets?username=example)

**To get individual sheets:** [https://app.flatsheet.io/api/v1/sheets/:id](https://app.flatsheet.io/api/v1/sheets/tcuxl49owsafl-jgp5qrta)

## Sheet list response example

When requesting: `https://app.flatsheet.io/api/v1/sheets?username=example`

We get this JSON response:

```
[
  {
    id: 1,
    slug: "tcuxl49owsafl-jgp5qrta",
    name: "Pizza",
    description: "A sheet about pizza.",
    url: "http://flatsheet.herokuapp.com/sheets/tcuxl49owsafl-jgp5qrta"
  }
]
```

## Single sheet response example

When requesting: `https://app.flatsheet.io/api/v1/sheets/tcuxl49owsafl-jgp5qrta`

We get this JSON response:

```
{
  id: 1,
    slug: "tcuxl49owsafl-jgp5qrta",
    name: "Pizza",
    description: "A sheet about pizza.",
  rows: [
    {
      toppings: "pepperoni, olive, sausage",
      cheese: "cheddar",
      crust: "deep dish"
    },
    {
      toppings: "salmon, artichoke, basil",
      cheese: "mozzarella",
      crust: "thin"
    }
  ],
  created_at: "2014-04-24T03:22:03.255Z",
  updated_at: "2014-04-24T03:25:14.359Z"
}
```

## Example usage of the Flatsheet API Javascript client:

Install:

```
npm install --save flatsheet
```

Usage:

```
var Flatsheet = require('flatsheet');

var flatsheet = new Flatsheet();

/* list of user's sheets */
flatsheet.list('example', function(error, response){
  console.log(error, response)
});

/* specific sheet */
flatsheet.sheet('tcuxl49owsafl-jgp5qrta', function (error, response){
  var rows = response.rows;
});
```

[GitHub repo for flatsheet-javascript-client.](https://github.com/flatsheet/flatsheet-javascript-client)

## Simple example of sheet API usage using [browser-request](http://npmjs.org/browser-request):

```
var request = require('browser-request');

var uri = 'https://app.flatsheet.io/api/v1/sheets/tcuxl49owsafl-jgp5qrta';

request({ uri:uri, json:true }, getRows);

function getRows (error, response, body) {
  if(error) throw error;
  var rows = body.rows;
  console.log(rows);
}
```

## Another example using jQuery:

```
var uri = 'https://app.flatsheet.io/api/v1/sheets/tcuxl49owsafl-jgp5qrta';

$.ajax(uri).done(function( data ) {
  var rows = data.rows;
  console.log(rows);
});
```

Learn more about Flatsheet at [flatsheet.io](http://flatsheet.io).