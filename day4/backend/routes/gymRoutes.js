import express from "express";
import {
  addMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember
} from "../controllers/gymControllers.js";

const router = express.Router();

router.post("/add", addMember);
router.get("/allMember", getAllMembers);
router.get("/singleMember", getSingleMember);
router.put("/update", updateMember);
router.delete("/delete", deleteMember);

export default router;