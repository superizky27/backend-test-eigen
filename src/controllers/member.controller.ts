import { Request, Response } from 'express';
import { getMembers } from '../services/member.service';

export const getMembersController = async (req: Request, res: Response) => {
  try {
    const result = await getMembers();

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