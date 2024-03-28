import React, { useState } from "react";
import { Note } from "../type/types";

interface NoteFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  selectedNote: Note | null;
  handleAddNote: (event: React.FormEvent) => void;
  handleUpdateNote: (event: React.FormEvent) => void;
  setSelectedNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

const NoteForm: React.FC<NoteFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
  categories,
  selectedNote,
  handleAddNote,
  handleUpdateNote,
  setSelectedNote,
}) => {
  const [customCategory, setCustomCategory] = useState("");

  return (
    <div className="card">
      <div className="card-body">
        <form
          onSubmit={(event) =>
            selectedNote ? handleUpdateNote(event) : handleAddNote(event)
          }
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Contenido
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
              rows={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Categoría
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="">Todas las categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="__custom__">Agregar Categoría</option>
            </select>
          </div>
          {category === "__custom__" && (
            <div className="mb-3">
              <input
                id="customCategory"
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Nueva categoría"
                className="form-control"
                required
              />
            </div>
          )}
          <div>
            {category === "__custom__" && (
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    if (customCategory.trim() !== "") {
                      setCategory(customCategory);
                      setCustomCategory("");
                    }
                  }}
                >
                  Agregar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setCategory("");
                    setCustomCategory("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
            {selectedNote ? (
              <div className="mb-3">
                <button type="submit" className="btn btn-primary me-2">
                  Actualizar
                </button>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button type="submit" className="btn btn-success">
                Agregar Nota
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
