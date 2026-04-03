const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'EventHub API',
        description: 'EventHub API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

// this is for generate the json file for swagger
swaggerAutogen(outputFile, endpointsFiles, doc);