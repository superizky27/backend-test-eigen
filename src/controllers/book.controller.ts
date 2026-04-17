import { Request, Response } from 'express';
import { getBooks } from '../services/book.service';

export const getBooksController = async (req: Request, res: Response) => {
  try {
    const result = await getBooks();

    res.json({
      success: true,
      data: result
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};