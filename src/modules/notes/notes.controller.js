import { notesModel } from "../../../models/notes.model.js";
import jwt from "jsonwebtoken";

const addNote = async (req, res) => {
  const { title, desc, createdBy } = req.body;
  await notesModel.insertMany({ title, desc, createdBy });
  res.json({ message: "success" });
};

/** */

/**
 * * 1-updateOne()
 * * 2-updateMany()
 * * 3-replaceOne()
 * * 4-findByIdAndUpdate()
 * * 5-findOneAndReplace()
 * * 6-findOneAndUpdate()
 */
const updateNote = async (req, res) => {
  const { title, desc, id } = req.body;
  let note = await notesModel.findByIdAndUpdate(
    id,
    { title, desc },
    { new: true }
  );
  if (!note) return res.json({ message: "note not found" });
  res.json({ message: "success", note });
};

/**
 *^  1-deleteOne()
 *^  2-deleteMany()
 *^  3-findOneAndDelete()
 *^  4-findOneAndRemove() => dep
 * *  5-findByIdAndDelete()
 *^  6-findByIdAndRemove() => dep
 *^  7-remove() => dep
 *
 */
const deleteNote = async (req, res) => {
  const { id } = req.body;
  let note = await notesModel.findByIdAndDelete(id);
  if (!note) return res.json({ message: "note not found" });
  res.json({ message: "success", note });
};

const getAllNotes = async (req, res) => {
  let note = await notesModel.find({}).populate("createdBy", "name -_id");
  res.json({ message: "success", note });
};

const getUserNotes = async (req, res) => {
  const { createdBy } = req.params;
  let note = await notesModel.find({ createdBy });

  res.json({ message: "success", note });
};

export { addNote, updateNote, deleteNote, getAllNotes, getUserNotes };
