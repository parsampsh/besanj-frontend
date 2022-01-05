# Frontend of Besanj
This project is the frontend app for Besanj project. The backend API is available [here](https://github.com/parsampsh/besanj-django).

## Getting started
To run the project, you have to have `nodejs` and `npm` installed on your system. Then enter:

```shell
$ cd <project-dir>
$ npm install
$ npm start
```

Then you will be able to see the app in your browser. But to connect frontend app to backend, you must edit file `src/Api.js` and change variable `baseUrl` to the url which backend API is accessible on.

Also for building the production output of this app, you can run this command:

```shell
$ npm build
```

Then the output stuff are available at directory `build`

