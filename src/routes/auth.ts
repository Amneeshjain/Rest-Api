import { Router } from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcrypt';

// custom modules

import register from '@/controllers/auth/register';
import validationError from '@/middlewares/validationError';
import expressRateLimit from '@/lib/expressRateLimit';
import User from '@/models/user';
import login from '@/controllers/auth/login';
import { logout } from '@/controllers/auth/logout';
import { authentication } from '@/middlewares/authentication';

const router = Router();

router.post(
  '/register',
  expressRateLimit('passReset'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email addres')
    .custom(async (value) => {
      const userExites = await User.exists({ email: value }).exec();
      if (userExites) {
        throw new Error('This email is allready in use');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be least 8 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['user', 'admin'])
    .withMessage('Role is not Support'),

  validationError,
  register,
);

router.post(
  '/login',
  expressRateLimit('auth'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email addres')
    .custom(async (email) => {
      const user = await User.exists({ email }).exec();
      if (!user) {
        throw new Error('no user found with this email');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be least 8 characters long')
    .custom(async (password, { req }) => {
      const { email } = req.body;

      const user = await User.findOne({ email })
        .select('password')
        .lean()
        .exec();

      if (!user) return;

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        throw new Error('Invalid passowrd');
      }
    }),
  validationError,
  login,
);

router.delete('/logout', expressRateLimit('basic'), authentication, logout);

export default router;
