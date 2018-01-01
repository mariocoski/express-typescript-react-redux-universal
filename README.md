# express-typescript-react-redux-universal
Universal project which allows you to quickly get up and go with building any large scale java script app.

## Why universal? Because it is written in java script that can run on the client and server.

## It has a strong advantage of separating concerns (CLIENT and API part).

Other nice features:
- Hot Module Reloading - replacing modules that have been changed without full page refresh (speeds up development)
- Server Side Rendering - renders page on the server with initial state which helps with page load speed and SEO
- Code Splitting - utilizes asynchronous module loading only when module is needed. In this app code splitting is done on routing level.

## Technologies used:

CLIENT (UI)
[![Circle CI](https://circleci.com/gh/mariocoski/express-typescript-react-redux-universal/tree/master.svg?style=shield&circle-token=88e32946d9aeadd3a9aacb7871a857355da29cb6)](https://circleci.com/gh/mariocoski/express-typescript-react-redux-universal/tree/master)
[![codecov](https://codecov.io/gh/mariocoski/express-typescript-react-redux-universal/branch/master/graph/badge.svg)](https://codecov.io/gh/mariocoski/express-typescript-react-redux-universal)
- React.js v.16
- React Router v4
- Redux 
- Webpack with HMR setup and code splitting
- Server Side Rendering 
- Jest

API
- typescript(used in LL)
- sequelize (similar to knex)
- jest 
- JWT

## Setup

### API
1. Install all required dependencies:
```
cd api
npm install or yarn 
```
2. Configure your SQL settings specifying username, password, database and host in config (src/config/database.js)

3. Build your api
```
npm run build or yarn build
```
4. Start your api
```
npm run start or yarn start
```

### CLIENT
1. Install all required dependencies:
```
cd client
npm install or yarn 
```
2. Build your client
```
npm run build or yarn build
```
3. Start you client
Development:
```
npm run development or yarn development
```
Production:
```
yarn production
```

### Credits:
[https://github.com/joshuaslate/mern-starter]
[https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux]
