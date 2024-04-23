# Simple Webserver

## What this project is about

This project is based on the `faker` library that can be found at [Github](https://github.com/faker-js/faker). This library creates fake data for different kinds of topics. All the project does is providing a webserver API, so that the `faker` library can be accessed under the hodd and spit out fake data for the requested topic.

## How it works

To start the webserver, simply type `npm start`. The webserver will then be available under `http://localhost:3000`. Whenmaking a request to this url, the server expects the following parameter:

| Parameter                         | Parameter Type | Purpose                                                                                                               | Example                                              |
| --------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| locale                            | URL            | Sets the language in which the faker library will respond                                                             | locale=en                                            |
| module                            | URL            | Chooses the module from which the function should be called                                                           | module=lorem                                         |
| function                          | URL            | Chooses the function to call from the chosen module                                                                   | function=sentences                                   |
| delay                             | URL            | Sets the amount of time for which the response should be delayed in millisenconds. May be omitted. Will default to 0. | delay=2000                                           |
| object with attribut `parameters` | URL            | Sets the parameters, that should be passed to the chosen function                                                     | `{  parameters: [   {min: 1, max: 2},   "---"  ]  }` |

An example request looks like this:
`http://localhost:3000/?locale=en&module=lorem&function=sentences&delay=1000&parameters=%7B%22parameters%22:%5B%7B%22min%22:1,%22max%22:3%7D,%22-.-.-.%22%5D%7D` with the url parameter `parameters` beeing of type stringified JSON with a content like `{  parameters: [   {min: 1, max: 3},   "---"  ]  }`.

For valid values for the different parameters, see the official docs at [fakerjs](https://fakerjs.dev/api/).

## How to start the application

It is highly recommended to use this webserver in a Docker environment. For that, there is a Dockerfile, that you can use to create a container out of it by running `docker build -t <name> .`, e. g. `docker build -t faker-webserver .`. After that, running the container just works like that `docker run -it -p 3000:3000 <name>`, e. g. `docker run -it -p 3000:3000 faker-webserver`.
Another possible way of running the application is by using docker compose via `docker compose up --build --remove-orphans`.
