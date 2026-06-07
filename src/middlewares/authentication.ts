import type { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { config } from "@/config";
import { TokenPayLoad, varifyAccessToken } from "@/lib/jwt";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      code: 'tokenError',
      message: 'Access token is required'
    });
    return;
  }

  if (!authorization.startsWith('Bearer ')) {
    res.status(401).json({
      code: 'tokenError',
      message: 'Invalid token format'
    });
    return;
  }

  const accessToken = authorization.split(' ')[1];

  try {
    

    const {userId}=varifyAccessToken(accessToken) as TokenPayLoad;
    req.userId=userId;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'tokenError',
        message: 'Access Token expired'
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
       code: 'invalidToken',
        message: 'Invalid token'
      });
      return;
    }

    res.status(500).json({
      code:'ServerError',
      message: 'Internal server error'
    });
  }
};