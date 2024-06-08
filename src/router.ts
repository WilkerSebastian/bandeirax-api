import { Router } from "express";
import HelperController from "./controller/HelperController";

const router = Router();

router.get("/", HelperController.index)

export default router;