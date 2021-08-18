import { ProductController } from '../controllers/productController';
import { ValidationError } from '../models/types';
import { Router } from 'express';

export const userRoutes = Router();

userRoutes.post('/newProduct', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const u = new ProductController();
    if (await u.newProduct(request.body, errors)) {
      response.status(201).json({
        ok: true,
        message: 'Successfully created',
      });
    } else {
      response.status(400).json({
        errors,
      });
    }
  } catch (err) {
    response.status(400).json({
      ok: false,
      message: err.message,
      err: err,
    });
  }
});
