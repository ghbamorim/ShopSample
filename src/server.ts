import express from "express";
import {UserController} from "./controllers/userController"
import {ValidationError} from './models/types'

const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: true}))


server.get("/", (request, response) => {
  return response.send("Hello!");
});

server.post("/newUser", async (request, response) => {
  const errors : ValidationError[] = [];
  try{
    const u = new UserController();
    if (await u.newUser(request.body, errors)){
      response.status(201).json({
          ok : true,
          message: "Successfully created",
      });
  } else {
    response.status(400).json({
      errors
  });
  }
} catch (err) {
  response.status(400).json({
        ok: false,
        message: err.message,
        err: err
    });
}
});

export default server;