const jwt = require('jsonwebtoken');
import { Response, NextFunction } from 'express';

const config = process.env;

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  if (config.USETOKEN === 'True') {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'];

    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: 'No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  }
  return next();
};

export const newToken = (id: number) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: 30000, // expires in 5min
  });
};

export default verifyToken;
