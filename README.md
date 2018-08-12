<h1 align="center">
  <br>
  <a href="#"><img src="./client/src/assets/images/logo.png" alt="react-express-boilerplate" width="100"></a>
  <br>
  React Express Boilerplate
  <br>
</h1>
<p align="center">
    <img src='https://forthebadge.com/images/badges/made-with-javascript.svg' />
    <img src='https://forthebadge.com/images/badges/uses-css.svg' />
    <img src='https://forthebadge.com/images/badges/validated-html5.svg' />
    <img src='https://forthebadge.com/images/badges/uses-html.svg' />
</p>
<h4 align="center">React Express Boilerplate with React, Node (Node 8.11.3)</h4>


[![React](https://img.shields.io/badge/react-16.2.0-lightgrey.svg)](https://github.com/facebook/react)
[![Node](https://img.shields.io/badge/node-8.9.4-yellow.svg)](https://nodejs.org/en/download/)
[![Jest](https://img.shields.io/badge/Jest-22.4.3-lightgrey.svg)](https://jestjs.io/)

- This repo holds the entire front end code base for React Express Boilerplate.The code is written in React 16, with node express server to act as a proxy layer between back-end and front-end.
- This repo was bootstrapped with CRA(CREATE-REACT-APP) and has been ejected.
- For styling we are using normal css with flex box
- Test cases are written in Jest and snapshot tests in Enzyme

## 📦 Table of Contents

1.  [Requirements](#requirements)
2.  [Installation](#getting-started)
3.  [Running the Project](#running-the-project)
4.  [Project Structure](#project-structure)
5.  [Routing](#routing)
6.  [Development Tools](#development-tools)
7.  [Building for Production](#building-for-production)
    - [Deployment](#deployment)

## 💼 Requirements

- node `^8.11.3`
- yarn `^1.7.0` or npm `^3.10.10`

## 💾 Installation

After confirming that your environment meets the above [requirements](#requirements), you can start this project by following the steps mentioned below:-

```bash
$ git clone https://github.com/vivek12345/react-express-boilerplate.git
$ cd react-express-boilerplate
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn install # Install project dependencies (or `npm install`)
```

## ▶️ Running the Project

After completing the [installation](#installation) step, you're ready to start the project!
When you are running this project for the first time, you need to follow these steps:-

Since the project relies on a lot of environment variables, one needs to create a copy of the properties_sample.env file inside config folder and save as properties.env
```bash
# For development environment

$ cp env/properties_sample.env env/properties.env # Make a properties.env file from properties_sample.env

```
Make changes in it according to the environment variables you need, we use [dotenv](https://www.npmjs.com/package/dotenv) which will read all environment variables from properties.env and set them on process.env

### For react and express project execution

```bash
# For development environment

$ yarn dev:build-client # Build the client bundles (or `npm run dev:build-client`)
$ yarn dev:server # Runs the nodemon server to start express server (or `npm run dev:server`)
$ yarn dev # Run the client build and server in watch mode and start the nodemon server(all in parallel) (or `npm run dev`)

```

```bash
# For development environment

$ yarn start # In production we would just run this command to start our node or pm2 servert

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn <script>`                                |Description|
|-----------------------------------------------|-----------|
|`yarn start`                                   |Starts node app at `localhost:8000` by default|
|`yarn dev`                                     |Starts client build and nodemon server in parallel|
|`yarn dev:build-client`                        |Runs webpack in watch mode and serves react app at `localhost:3000`|
|`yarn dev:server`                              |Runs nodemon server at localhost:3000 for express app|
|`yarn build`                                   |Builds the app in production mode and serves files from build folder|
|`yarn lint-staged`                             |Runs prettier and eslint fixes|
|`yarn build:staging`                           |Builds the app in staging mode and serves files from build folder|
|`yarn eslint:fix`                              |Runs all eslint fixes|
```

## ✏️ Project Structure

The project structure using CRA directory structure where folders are grouped into containers and components and since we are using redux, we do have actions, reducers, selectors, hocs, store and helpers.
This structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications.
To understand what goes inside components and what inside containers, please check out this [component-state-vs-redux-store](https://medium.com/netscape/component-state-vs-redux-store-1eb0c929277) by [Vivek Nayyar](twitter.com/viveknayyar09).

```
├── build                                           # All production ready files with minified JS, html and css files
├── client                                          # All react related code will go here
│   ├── config                                      # All CRA related config goes here including paths, environment variables and │jest config goes here
│   ├── public                                      # Static public assets used while in dev mode
│   ├── scripts                                     # All webpack related code
│   │   ├── build.js                                # Script for making production bundle
│   │   ├── start.js                                # Script for development mode
│   │   ├── test.js                                 # Script for test mode
│   ├── src                                         # Client Application source code
│   │   ├── helpers                                 # All api helpers, utils, local storage, analytics and config helpers go inside this folder
│   │   ├── components                              # Global Reusable Components
│   │   │   ├── ComponentName                       # Component Name Folder and every component will have a index.js and css file
│   │   │   │   ├── index.js                        # Main file which exports the component
│   │   │   │	├── ComponentName.js                # Main component code
│   │   │   │	├── ComponentName.css               # Styling for the component
│   │   ├── pages                                   # Global Reusable Components
│   │   │   ├── PageName                            # Component Name Folder and every component will have a index.js and css file
│   │   │   │   ├── index.js                        # Main file which exports the component
│   │   │   │	├── PageName.js                     # Main component code
│   │   │   │	├── PageName.css                    # Styling for the component
│   │   ├── assets                                  # Any images, fonts and icons which need to be cache bursted go here
│   │   ├── index.js                                # Application bootstrap and rendering
│   │   ├── constants                               # Folder for constants file
│   │   ├── Routes.js                               # All application client side routes using react-router
├── env                                             # All environment variables to be configured from here
│   ├── properties.sample.env                       # Sample file for setting up environment vars
├── server                                          # Express application that provides webpack middleware
│   ├── controllers                                 # All route controlling logic will go here for example authentication controller
│   ├── middleware                                  # Middleware for checking JWT token in every api call 
│   ├── models                                      # Schema for mongo db documents
│   ├── router                                      # Main express route handlers
│   │   ├── BaseRouter.js                           # Base routes which the other routers extend
│   │   ├── Router.js                               # Express router for server side rendering the react app
│   │   ├── ApiRouter.js                            # API router for all back end api calls
│   ├── constants.js                                # All server needed constants can be found here
│   ├── index.js                                    # Entry point for the node js server
├── webpack                                         # All front end and back end webpack config will go here
│   ├── webpack.config.dev.js                       # webpack file for dev environment
│   ├── webpack.config.prod.js                      # webpack file for prod environment
│   ├── webpackDevServer.config.dev.js              # webpack dev server for dev work
├── .babelrc                                        # Babel file for es6 and react code transpilation
├── .gitignore                                      # The name says it all
├── .eslintrc.js                                    # This file maintains all end points of the back end routes
├── .prettierrc                                     # Prettier config
├── package.json                                    # All npm dependencies can be found here
├── README.md                                       # Readme file for the whole app
├── yarn.lock                                       # Yarn lock file for locking the dependency versions
```

## 🚀 Routing

We use `react-router` [route definitions](https://github.com/ReactTraining/react-router)
See the [project structure](#project-structure) section for more information.

## ⚙️ Development Tools

### Prettier

- We use `prettier` for code formatting.Here is the link to downlod the same.[Prettier](https://www.npmjs.com/package/prettier)

- Make sure you are using vscode and your vscode user_settings has the following code:-

```bash
{
    "editor.fontSize": 12,
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "prettier.eslintIntegration": true,
}
```

## 🚚 Building for Production

## Deployment

- Deployment will always happen from the `release` branch on production.
- Any production related environment variables need to be configured on env/properties.env.Take a copy of sample and edit values for prod environment
- ci folder has a docker script to deploy all the code in a docker instance
- yarn build will built the production build
- yarn start will start the node server or pm2 server( which ever we chose to go with)
