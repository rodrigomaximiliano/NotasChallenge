import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await prisma.note.findMany();
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, content, category } = req.body;
        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                category,
                archived: false,
            },
        });
        res.json(newNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;
        const existingNote = await prisma.note.findUnique({
            where: { id: Number(id) },
        });

        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        const updatedNote = await prisma.note.update({
            where: { id: Number(id) },
            data: { title, content, category },
        });
        res.json(updatedNote);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existingNote = await prisma.note.findUnique({
            where: { id: Number(id) },
        });

        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        await prisma.note.delete({ where: { id: Number(id) } });
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const archiveNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existingNote = await prisma.note.findUnique({
            where: { id: Number(id) },
        });

        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        const updatedNote = await prisma.note.update({
            where: { id: Number(id) },
            data: { archived: true },
        });
        res.json(updatedNote);
    } catch (error) {
        console.error("Error archiving note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const unarchiveNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existingNote = await prisma.note.findUnique({
            where: { id: Number(id) },
        });

        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        const updatedNote = await prisma.note.update({
            where: { id: Number(id) },
            data: { archived: false },
        });
        res.json(updatedNote);
    } catch (error) {
        console.error("Error unarchiving note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getArchivedNotes = async (req: Request, res: Response) => {
    try {
        const archivedNotes = await prisma.note.findMany({ where: { archived: true } });
        res.json(archivedNotes);
    } catch (error) {
        console.error("Error fetching archived notes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteArchivedNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.note.delete({ where: { id: Number(id) } });
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting archived note:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
