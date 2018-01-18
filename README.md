# Anonyboard

Anonyboard is an anonymous messaging board. There are no accounts, you manage your posts using a password. This is a project on [FreeCodeCamp](http://freecodecamp.com/)


## Getting Started ( WIP )

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* NodeJS & NPM
* MongoDB ( installed and running )
* Git ( optional )

### Installing

A step by step series of examples that tell you have to get a development env running

0. Clone or download the repository's zip file

```
git clone git@github.com:CodeDraken/anonyboard.git
```

**Setting up the Server**

1. CD into the folder and download the NPM packages by using `npm install` or `yarn` if you have Yarn.

```
cd anonyboard
yarn
```

2. Once the packages are installed you can start the server and the test suite. I recommend having two terminals or tabs open then run the following commands: ( see full list of commands in [package.json](package.json) )

Terminal 1
```
yarn start-watch
```

Terminal 2
```
yarn test-watch
```

The server and test suite will watch for changes and automatically restart. The server uses port 5000.
This is only the API server, we will setup the client next.

**Setting up the Client**

The client uses [create-react-app](https://github.com/facebookincubator/create-react-app) as a boilerplate.

1. CD into the client folder and download the NPM packages by using `npm install` or `yarn` if you have Yarn.

```
cd client
yarn
```

2. Once the packages are installed you can start the dev server and the test suite. I recommend having two terminals or tabs open then run the following commands: ( see full list of commands in [client/package.json](client/package.json) )

Terminal 1
```
yarn start
```

Terminal 2
```
yarn test
```

Create-react-app and the test suite will watch for changes and automatically restart. A browser window should automagically open and go to port 3000.


## Running the tests

**For the server**

Mocha and Expect is used for testing on the server.
```
yarn test-watch
```

**For the client**

Jest is used for testing on the client.
```
yarn test
```


### Coding style tests

This project uses the Standard coding style. You can lint by running
```
yarn lint
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [NodeJS](https://nodejs.org/) - Server
* [Express](https://github.com/expressjs/express) - Web framework for Node
* [React](https://github.com/facebook/react) - Front-end library for UI
* [MongoDB](https://www.mongodb.com/) - Database
* [StandardJS](https://standardjs.com/) - Coding style

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **CodeDraken** - *Main Developer* - [CodeDraken](https://github.com/CodeDraken)

See also the list of [contributors](https://github.com/CodeDraken/anonyboard/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Inspired by Reddit and designs on Dribbble
* FreeCodeCamp for the project idea
