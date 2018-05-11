# Match Filtering
## Developer
Carlos Augusto Abarca <cabarca01@gmail.com>
## Technology Stack
This project was developed in node.js using the ES6 standard. Tests are performed using the JEST testing framework.

The following is a list of project dependencies:

- express @ 4.16.3
- body-parser @ 1.18.2
- bootstrap @ 4.1.1
- express-handlebars @ 3.0.0
- handlebars-helpers @ 0.10.0
- haversine @ 1.1.0
- jquery @ 3.3.1
- lodash @ 4.17.10
- popper.js @ 1.12.9

Dev Dependencies:
- jest @ 22.3.0
- supertest @ 3.0.0
- rewire @ 4.0.1

## Installation
To install the application execute `npm install` in the console.

## Starting the application
To start the application execute `npm start` from within the root folder of the application. In the browser simply use the URL `http://localhost:3000/` to visit the application.

## Running the test suite
To execute tests execute `npm test` from within the root folder of the application.

## Considerations
- As you will find out soon enough I'm not a front-end developer. I used a simple Bootstrap interface to present the filtered results and made my best effort to make it look semi-presentable given the limitations of creativity + time constraints to hand in the exercise as soon as possible.

- As the logged in user of the application I created an independent user located in London. I used the coordinates provided in the *matches.json* file.

- I used the haversine.js library to implement distance calculation based on geolocation. 

- Testing is limited to the server-side components that I developed. I assume that the libraries used have been fully tested. In regards to the client side components, I performed manual testing and verified the expected results based on the data provided.

- The values used to set lower and upper boundaries for the filtering parameters are configured per environment in `/server/config/config.json`. This allows for the application to be flexible and allow changing this parameters without modifying the code.
