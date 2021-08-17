import {Router} from "express";
import {UserController} from "../controllers/userController"
import {ProductController} from "../controllers/productController"
import {ValidationError} from '../models/types'

export const router = Router();

router.get("/", (request, response) => {
  return response.send("Hello!");
});

router.post("/admin/user/newUser", async (request, response) => {
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

router.patch("/admin/user/updateUser", async (request, response) => {
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


router.get("/admin/user/getUsers", async (request, response) => {
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

router.post("/admin/products/newProduct", async (request, response) => {
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
