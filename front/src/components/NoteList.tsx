import React from 'react';
import { Note } from '../type/types';

interface NoteListProps {
  showArchivedNotes: boolean;
  filteredByCategoryNotes: Note[];
  handleUnarchiveNote: (event: React.MouseEvent, id: number) => void;
  handleDeleteNote: (event: React.MouseEvent, id: number, isArchived: boolean) => void;
  handleEditNote: (note: Note) => void;
  handleArchiveNote: (event: React.MouseEvent, id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  showArchivedNotes,
  filteredByCategoryNotes,
  handleUnarchiveNote,
  handleDeleteNote,
  handleEditNote,
  handleArchiveNote
}) => {

  const confirmDelete = (event: React.MouseEvent, id: number) => {
    const confirmDelete = window.confirm("¿Seguro que desea eliminar esta nota?");
    if (confirmDelete) {
      handleDeleteNote(event, id, false);
    }
  };

  return (
    <div className="notes-grid">
     <h2 style={{ marginLeft: '130px' }} className={showArchivedNotes ? "text-white" : ""}>
        {showArchivedNotes ? "Notas Archivadas" : "Notas Activas"}
      </h2>
      <div className="row">
        {filteredByCategoryNotes.map((note) => (
          <div key={note.id} className="col-lg-4 mb-4">
            <div className="card card-hover"> {/* Aquí agregamos la clase card-hover */}
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.content}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Categoría: {note.category}
                  </small>
                </p>
                {showArchivedNotes ? (
                  <button
                    onClick={(event) => handleUnarchiveNote(event, note.id)}
                    className="btn btn-warning btn-sm mx-1"
                  >
                    Desarchivar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={(event) => confirmDelete(event, note.id)}
                      className="btn btn-danger btn-sm mx-1"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEditNote(note)}
                      className="btn btn-primary btn-sm mx-1"
                    >
                      Editar
                    </button>
                    {note.archived ? (
                      <button
                        onClick={(event) => handleUnarchiveNote(event, note.id)}
                        className="btn btn-warning btn-sm mx-1"
                      >
                        Desarchivar
                      </button>
                    ) : (
                      <button
                        onClick={(event) => handleArchiveNote(event, note.id)}
                        className="btn btn-info btn-sm mx-1"
                      >
                        Archivar
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
