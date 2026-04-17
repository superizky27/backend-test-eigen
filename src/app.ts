import express from 'express';
import bookRoutes from './routes/book.routes';
import memberRoutes from './routes/member.routes';
import borrowRoutes from './routes/borrow.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { errorHandler } from './utils/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/', borrowRoutes);

app.use(errorHandler);

// root
app.get('/', (req, res) => {
  res.json({
    message: 'Backend Test Eigen Running 🚀'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});