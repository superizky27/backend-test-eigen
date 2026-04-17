import { Router } from 'express';
import { getBooksController } from '../controllers/book.controller';

const router = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books with available stock
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   stock:
 *                     type: integer
 */
router.get('/', getBooksController);

export default router;