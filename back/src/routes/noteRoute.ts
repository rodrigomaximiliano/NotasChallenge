import express from "express";
import { getNotes, createNote, updateNote, deleteNote, archiveNote, unarchiveNote, getArchivedNotes, deleteArchivedNote } from "../controllers/noteController";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.put("/notes/:id/archive", archiveNote);
router.put("/notes/:id/unarchive", unarchiveNote);
router.get("/notes/archived", getArchivedNotes);
router.delete("/notes/archived/:id", deleteArchivedNote);

export default router;
