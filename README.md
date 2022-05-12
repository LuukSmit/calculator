# React Template Web
<img src="https://cdn-images-1.medium.com/max/512/1*qUlxDdY3T-rDtJ4LhLGkEg.png" alt="React logo" width="256" height="auto">


## Documentatie

alle documentatie over de applictaie kun je vinden in de map: documentation

## Documentation

For a complete overview of our documentation run:

```sh
yarn jsdoc
```
or
```sh
npm run-script jsdoc
```


### Installation

This project requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run.

Install the dependencies and start the server.

```sh
$ cd react-calculator
$ npm install
$ yarn install
```


### Start server

```sh
$ yarn start
```


### Build

```sh
$ yarn build
```

### Build for Production

```sh
$ yarn build -p
```


### Errors

When encountering errors with npm or yarn, try removing the node_modules folder entirely.

run
```$ npm install ``` or ``` $ yarn install ```


#### Windows

In addition to removing the node_modules for windows users also delete the ``` package-lock.json ``` file and run:

```$ npm install ``` or ``` $ yarn install ```



# Best-practices

style files naming, always start with _ underscore and undercase.

## Naming Conventions - BEM


See: [BEM Naming convention - Block Element Modifier](http://getbem.com/)

## Stateless functional components

Use as many stateless functional components as you can. This Improves performance.

See: [Components and Props - React](https://reactjs.org/docs/components-and-props.html)

#### Page containers are called: Views
#### Controlling views / navigation flow are called: Controllers
#### Functional files are called: Handlers

## PropTypes

#### DefaultPropTypes

See: [PropTypes](https://www.npmjs.com/package/prop-types)
