import { UserController } from '../controllers/userController';
import { ValidationError } from '../models/types';
import { Router } from 'express';

export const userRoutes = Router();

userRoutes.get('/teste', (request, response) => {
  return response.send('Hello2!');
});

userRoutes.post('/newUser', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const u = new UserController();
    if (await u.newUser(request.body, errors)) {
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

userRoutes.patch('/updateUser', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const u = new UserController();
    if (await u.updateUser(request.body, errors)) {
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

userRoutes.get('/getUsers', async (request, response) => {
  try {
    const u = new UserController();
    response.status(201).json(await u.getUsers());
  } catch (err) {
    response.status(400).json({
      ok: false,
      message: err.message,
      err: err,
    });
  }
});
