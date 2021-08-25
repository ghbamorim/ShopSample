require('dotenv-safe').config();
import express from 'express';
import { userRoutes } from './views/userRoutes';
import { productRoutes } from './views/productRoutes';
import { saleRoutes } from './views/salesRoutes';
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 2000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(session({ secret: process.env.SECRET }));
server.use('/v1/user', userRoutes);
server.use('/v1/product', productRoutes);
server.use('/v1/sale', saleRoutes);

server.listen(port);

export default server;
