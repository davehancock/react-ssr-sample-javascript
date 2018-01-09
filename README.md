# react-ssr-sample-javascript

[![CircleCI](https://circleci.com/gh/daves125125/react-ssr-sample-javascript.svg?style=svg&circle-token=351a0655f5ad396218295e697f5c631bf0a31fae)](https://circleci.com/gh/daves125125/react-ssr-sample-javascript)

This project demonstrates rendering a react app on the server side using NodeJS.


## TL;DR

The client side code consists of a small React app that uses some popular libraries such as react-router, bootstrap etc. It
features a page that has dynamic data with state inserted from the server side which can then also be later updated on the client side.

The server side code consists of a simple NodeJS application that renders a client side javascript React application. Some portion
of the client side code is imported directly into the server side JS - one key benefit of writing Isomorphic apps.

This is made possible due to a few polyfills, babel transpiling and webpack configuration for both the client and server side.


## Run

This sample has been packaged as a docker container and can be ran by executing:

```
docker run -p8080:8080 daves125125/react-ssr-sample-javascript
```

Navigate to `localhost:8080/` to see the sample running.


## Build / Run from source


To install dependencies
```
yarn install
```

To start the client side locally (port 3000):
```
yarn start:client
```

To build the client side:
```
yarn build:client
```

To start the server side locally (port 8080) - N.B: requires client side to be built first:
```
yarn start:server
```

To build both client and server side from source locally:
```
yarn build
```

Or, via Docker:

```
yarn install && yarn build
docker build -t test .
docker run -p8080:8080 test
```


## How this works / Areas of interest

The JS code is split into two main bundles, the client.js and server.js. These are built as independent source sets
by Webpack. Both the server.js and client.js depend upon the the main React App itself with the only difference being
that the client side component includes client side specific code such as browser routing, and the server side code includes
server side routing and injection of initial state.

The Server side JS simply imports the React "App" component directly and then renders the result to a string which is then
injected into the html template.

Regarding SSR, the main files of interest are:

- react-src/client.js
- react-src/server.js
- src/index.js (contains the entrypoint and definition of routes)
- src/render.js (contains the rendering logic and injection into the html template)


## Performance

The below have been collected from repeated runs using the AB testing tool. This has been ran on a MacBook Pro (Retina, 13-inch, Early 2015)

|                     | At Rest / Startup  | Under Load  |
| ------------------- |:------------------:| -----------:|
| Render Speed (ms)   | ~17                | ~14         |
| Throughput (msgs/s) | ~57                | ~68         |
| Memory Usage (Mb)   | ~19                | ~60         |


## Known TODOs

- Caching could be easily implemented, both on the templates and the server side state within the service.
- Properly strip down webpack config and ejected create-react-app to barebones needed
- Refactor the server side code in places to be more JS idiomatic, as well as switching out callbacks for promise based APIs etc
