import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {

  static validateJWT = (req: Request, res: Response, next: NextFunction) => {
    console.log('Paso por el middleware');
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'No token provided' });
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      // todo:
      // const payload

      req.body.token = token;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json('Internal Server Error')
    }

  }
}