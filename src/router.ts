import { Router } from "express";
import HelperController from "./controller/HelperController";
import UserController from "./controller/UserController";

const router = Router();

router.get("/", HelperController.index)

router.post(`/user/create/:key`, UserController.create)

router.get("/user/validate/:idToken", UserController.validate)

router.get("/validate/:message", UserController.validateView)

router.get("/user/verified/login/:key", UserController.verifiedLogin)

router.put("/user/update/:key", UserController.update)

router.delete("/user/delete/:key/:id", UserController.delete)

router.get("/user/count/:key", UserController.count)

export default router;