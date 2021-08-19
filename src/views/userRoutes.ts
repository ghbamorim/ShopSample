import { UserController } from '../controllers/userController';
import { ValidationError } from '../models/types';
import { Router } from 'express';
import auth, { newToken } from '../middleware/auth';

export const userRoutes = Router();

userRoutes.post('/login', async (request, response, next) => {
  const errors: ValidationError[] = [];
  try {
    const u = new UserController();
    const user = await u.findUserForLogin(request.body, errors);
    if (user) {
      const id = user.id;
      const token = newToken(id);
      return response.json({ auth: true, token: token });
    }
    response.status(500).json({ message: 'Invalid credentials!' });
  } catch (err) {
    response.status(400).json({
      ok: false,
      message: err.message,
      err: err,
    });
  }
});

userRoutes.post('/newUser', async (request, response) => {
  const errors: ValidationError[] = [];
  const token = request.headers['x-access-token'];
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

userRoutes.get('/get', auth, async (request, response) => {
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

userRoutes.post('/delete', async (request, response) => {
  const errors: ValidationError[] = [];
  try {
    const u = new UserController();
    if (await u.deleteUser(request.body, errors)) {
      response.status(201).json({
        ok: true,
        message: 'Successfully deleted',
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
