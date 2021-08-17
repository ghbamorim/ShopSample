import express from "express";
import {router} from "./views/routes"

const port = process.env.PORT || 2000
const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true}))
server.use("/v1", router)
server.listen(port);


export default server;