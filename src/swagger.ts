import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eigen Backend API',
      version: '1.0.0',
      description: 'API documentation for Backend Test Eigen'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.ts'], // ambil dari file routes
};

export const swaggerSpec = swaggerJsdoc(options);