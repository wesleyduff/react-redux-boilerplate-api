const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;        // set our port

import routes from './api_routes';

const swaggerJSDoc = require('swagger-jsdoc');


// Add createdAt to all POSTS
app.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

/* ---
Set Routes
 */
routes.setup(app);

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Hello i am swagger . I am one step ahead of postman. My job is to provide API description',
    host:'localhost:3001'
  }
};

// options for swagger jsdoc
var options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ['./tools/api_routes.js'], // path where API specification are written
};

// initialize swaggerJSDoc
var swaggerSpec = swaggerJSDoc(options);


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// route for swagger.json
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});



// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function validateCourse(course) {
  if (!course.title) return "Title is required.";
  if (!course.authorId) return "Author is required.";
  if (!course.category) return "Category is required.";
  return "";
}

// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
console.log('Magic happens on port ' + port);

