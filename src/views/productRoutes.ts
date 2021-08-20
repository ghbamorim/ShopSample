import { ProductController } from '../controllers/productController';
import { ValidationError } from '../models/types';
import { Router } from 'express';

export const productRoutes = Router();

productRoutes.post('/newProduct', async (request, response) => {
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

productRoutes.patch('/updateProduct', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const p = new ProductController();
    if (await p.updateProduct(request.body, errors)) {
      response.status(201).json({
        ok: true,
        message: 'Successfully updated',
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

productRoutes.get('/getProducts', async (request, response) => {
  try {
    const p = new ProductController();
    response.status(201).json(await p.getProducts());
  } catch (err) {
    response.status(400).json({
      ok: false,
      message: err.message,
      err: err,
    });
  }
});

productRoutes.patch('/save', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const p = new ProductController();
    if (await p.updateProduct(request.body, errors)) {
      response.status(201).json({
        ok: true,
        message: 'Successfully updated',
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