import express from 'express';
import { router } from './views/routes';
import { userRoutes } from './views/userRoutes';

const port = process.env.PORT || 2000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/v1', router);
server.use('/v2', userRoutes);

server.listen(port);

export default server;
