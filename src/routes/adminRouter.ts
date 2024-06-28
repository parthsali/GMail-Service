import express from "express";
import {
  errorController,
  successController,
  systemErrorController,
} from "../controllers/adminController";

const router = express.Router();

router.get("/success", successController);
router.get("/error", errorController);
router.get("/system-error", systemErrorController);

export default router;
