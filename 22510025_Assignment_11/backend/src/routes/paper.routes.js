import { Router } from "express";
import {
  getAllPapers,
  checkCitation,
  findPaperById,
  getClassificationById,
} from "../controllers/paper.controller.js";

const router = Router();

router.get("/", getAllPapers);
router.get("/check/:paperIdA/cites/:paperIdB", checkCitation);
router.get("/classify/:paperId", getClassificationById);
router.get("/paper/:paperId", findPaperById);

export default router;
