import { Router } from 'express';
import { getMembersController } from '../controllers/member.controller';

const router = Router();

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members with borrowed book count
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *                   borrowedBooks:
 *                     type: integer
 */
router.get('/', getMembersController);

export default router;