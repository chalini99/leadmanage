import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getLeads)
  .post(createLead);

router.route("/:id")
  .put(updateLead)
  .delete(deleteLead);

export default router;