import { Router } from "express";
import HelperController from "./controller/HelperController";
import UserController from "./controller/UserController";

const router = Router();

router.get("/", HelperController.index)

router.post("/user/create/", UserController.create)

export default router;