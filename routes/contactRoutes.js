import express from "express";
import {
  save,
  getContact,
  getContactById,
  updateContactById
} from "../controller/contactController.js";

const router = express.Router();

router.post("/save", save);
router.get("/getAllContacts", getContact);
router.get("/:id", getContactById);
router.put("/update/:id", updateContactById);

export const contactRoutes = router;
