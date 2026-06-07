import { config } from '@/config';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import User, { IUser } from '@/models/user';
import { Request, Response } from 'express';
type RequestBody = Pick<IUser, 'email'>;

const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body as RequestBody;
  try {
    const user = await User.findOne({ email }).exec();

    if (!user) return;
    const refreshToken = generateRefreshToken({ userId: user._id });
    const accessToken = generateAccessToken({ userId: user._id });

    user.refreshToken = refreshToken;

    await user.save();
    res.cookie('refreshtoken', refreshToken, {
      maxAge: config.COOKIE_MAX_AGE,
      httpOnly: config.NODE_ENV === 'production',
      secure: true,
    });

    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
      accessToken,
    });
  } catch (error) {
    // console.log('error during the register a user ',error)
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server Error',
    });
  }
};

export default login;
