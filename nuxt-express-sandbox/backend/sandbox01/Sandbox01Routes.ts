import express from "express";
import { executeGet, executePost } from "./Sandbox01Controller";

const router = express.Router();

router.get("/executeGet", executeGet);
router.post("/executePost", executePost);

export  {
  router as sandbox01Routes,
};
