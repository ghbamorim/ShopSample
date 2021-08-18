import { Router } from 'express';

export const router = Router();

router.get('/', (request, response) => {
  return response.send('Hello!');
});
