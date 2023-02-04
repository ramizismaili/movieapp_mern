import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username minimum 8 characters!")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("Username already used!");
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters!"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword minimum 8 characters!")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password doesn't match!");
      return true;
    }),
  body("displayName")
    .isLength({ min: 8 })
    .withMessage("DisplayName minimum 8 characters!"),
  requestHandler.validate,
  userController.signup
);

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("Username is required!")
    .isLength({ min: 8 })
    .withMessage("Username minimum 8 characters"),
  body("password")
    .exists()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters!"),
  requestHandler.validate,
  userController.signin
);

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters!"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("new Password minimum 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirm NewPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirm NewPassword minimum 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("confirm NewPassword doesn't match");
      return true;
    }),
  requestHandler.validate,
  userController.updatePassword
);

router.get("/info", tokenMiddleware.auth, userController.getInfo);

router.get(
  "/favorites",
  tokenMiddleware.auth,
  favoriteController.getFavoritesOfUser
);

router.post(
  "/favorites",
  tokenMiddleware.auth,
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  body("mediaRate").exists().withMessage("mediaRate is required"),
  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);

export default router;
