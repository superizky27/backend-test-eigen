import { Router } from 'express';
import { borrowBook, returnBook } from '../services/borrow.service';
import Joi from 'joi';

const router = Router();

const borrowSchema = Joi.object({
  memberCode: Joi.string().required(),
  bookCode: Joi.string().required()
});

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Borrow successful
 *       400:
 *         description: Error
 */
router.post('/borrow', async (req, res) => {
  try {
    const { error } = borrowSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { memberCode, bookCode } = req.body;

    const result = await borrowBook(memberCode, bookCode);

    res.json({
      success: true,
      data: result
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Return successful
 *       400:
 *         description: Error
 */
router.post('/return', async (req, res) => {
  try {
    const { error } = borrowSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const { memberCode, bookCode } = req.body;

    await returnBook(memberCode, bookCode);

    res.json({
      success: true,
      message: "Book returned successfully"
    });

  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

export default router;