import express from "express";
import {
  userLoginController,
  userRegisterController,
} from "../controller/authController.js";
import { requireSignin } from "../middleware/authMiddleware.js";
import { chatBot } from "../controller/openAiController.js";

const router = express.Router();

//USER REGISTER
router.post("/register", userRegisterController);
//USER LOGIN
router.post("/login", userLoginController);
//PRIVATE ROUTE FOR HOME PAGE
router.get("/home", requireSignin, (req, res) => {
  res.send({ ok: true });
});
//Chat Bot route
router.post("/chat", chatBot);

export default router;
