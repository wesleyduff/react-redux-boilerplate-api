
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./apiRoutes/index');
const swaggerUi = require('swagger-ui-express');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;        // set our port







// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

const swaggerJSDoc = require('swagger-jsdoc');


// import * as routes from './apiRoutes'
// ROUTES BASIC
//app.get('/authors', routes.authors);

// Add createdAt to all POSTS
app.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});



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
  apis: ['./tools/routes.js'], // path where API specification are written
};

// initialize swaggerJSDoc
var swaggerSpec = swaggerJSDoc(options);


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// route for swagger.json
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

routes.setup(app);



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

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/', router);



// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
console.log('Magic happens on port ' + port);

