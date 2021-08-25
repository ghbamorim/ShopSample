import { SaleController } from '../controllers/salesController';
import { ValidationError } from '../models/types';
import { Router } from 'express';

export const saleRoutes = Router();

saleRoutes.post('/new', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const u = new SaleController();
    if (await u.newSale(request.body, errors)) {
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

saleRoutes.patch('/update', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const p = new SaleController();
    if (await p.updateSale(request.body, errors)) {
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

saleRoutes.get('/getSales', async (request, response) => {
  try {
    const p = new SaleController();
    response.status(201).json(await p.getSales());
  } catch (err) {
    response.status(400).json({
      ok: false,
      message: err.message,
      err: err,
    });
  }
});

saleRoutes.post('/save', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const p = new SaleController();
    if (await p.save(request.body, errors)) {
      response.status(201).json({
        ok: true,
        message: 'Successfully updated',
      });
    } else {
      response.status(400).json({
        errors,
      });
    }
  } catch (ex) {
    response.status(400).json({
      ok: false,
      message: ex.message | ex,
      err: ex,
    });
  }
});
