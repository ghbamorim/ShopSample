import express from "express";
import {UserController} from "./controllers/userController"
import {ProductController} from "./controllers/productController"
import {ValidationError} from './models/types'


const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

server.get("/", (request, response) => {
  return response.send("Hello!");
});

server.post("/admin/user/newUser", async (request, response) => {
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

server.patch("/admin/user/updateUser", async (request, response) => {
  const errors : ValidationError[] = [];
  try{
    const u = new UserController();
    if (await u.updateUser(request.body, errors)){
      response.status(201).json({
          ok : true,
          message: "Successfully updated",
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


server.get("/admin/user/getUsers", async (request, response) => {
  try{
    const u = new UserController();
    response.status(201).json(await u.getUsers());
  }
  catch (err) {
  response.status(400).json({
        ok: false,
        message: err.message,
        err: err
    });
}
});

server.post("/admin/products/newProduct", async (request, response) => {
  const errors : ValidationError[] = [];
  try{
    const u = new ProductController();
    if (await u.newProduct(request.body, errors)){
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