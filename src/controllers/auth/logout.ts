import { config } from '@/config';
import User from '@/models/user';
import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response): Promise<void> => {
  // res.json({message:'logout successfully'})
  // return
  const userId = req.userId;

  try {
    await User.updateOne({ _id: userId }, { refreshToken: null });

    res.clearCookie('refreshToken', {
      httpOnly: config.NODE_ENV === 'production',
      secure: true,
      sameSite: 'strict', // match your cookie setup
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
  }
};
