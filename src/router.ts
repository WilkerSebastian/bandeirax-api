import { Router } from "express";
import HelperController from "./controller/HelperController";
import UserController from "./controller/UserController";

const router = Router();

router.get("/", HelperController.index)

router.post(`/user/create/`, UserController.create)

router.patch("/user/validate/:id", UserController.validateView)

router.get("/validate/:message", UserController.validateView)

router.get("/user/verified/login/", UserController.verifiedLogin)

router.put("/user/update/", UserController.update)

router.delete("/user/delete/:key/:id", UserController.delete)

router.get("/user/count/", UserController.count)

export default router;