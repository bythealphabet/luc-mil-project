import express from "express";
import { contact } from "../controllers/contact";

const router = express.Router();

router.route("/api/contact").post(contact);

export default router;
