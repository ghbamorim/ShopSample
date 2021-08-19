import express from 'express';
import { userRoutes } from './views/userRoutes';
import { productRoutes } from './views/productRoutes';

const port = process.env.PORT || 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/v1/users', userRoutes);
server.use('/v1/products', productRoutes);

server.listen(port);

export default server;
