import { Router } from "express";
import { UrlController } from "../controllers";

const router = Router();

router.post("/create", UrlController.createUrl);
router.get("/short/:id", UrlController.getUrlById);

export default router;
