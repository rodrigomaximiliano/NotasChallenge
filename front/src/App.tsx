import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Note } from "./type/types";
import "./App.css";
import Navbar from './components/Navbar';
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList"; 

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showArchivedNotes, setShowArchivedNotes] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const fetchedNotes: Note[] = await response.json();
        setNotes(fetchedNotes.filter(note => !note.archived));
        setArchivedNotes(fetchedNotes.filter(note => note.archived)); 
        const uniqueCategories = Array.from(new Set(fetchedNotes.filter(note => !note.archived).map(note => note.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      const newNote = await response.json();

      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setTitle("");
      setContent("");
      
      if (!categories.includes(category)) {
        setCategories((prevCategories) => [...prevCategories, category]);
      }
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
          }),
        }
      );
  
      const updatedNote = await response.json();
  
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNote.id ? updatedNote : note
        )
      );
      setTitle("");
      setContent("");
      setCategory("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDeleteNote = async (
    event: React.MouseEvent,
    id: number,
    isArchived: boolean
  ) => {
    event.stopPropagation();
  
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });
  
      if (isArchived) {
        setArchivedNotes((prevArchivedNotes) =>
          prevArchivedNotes.filter((note) => note.id !== id)
        );
      } else {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleArchiveNote = async (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${id}/archive`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const updatedNote = await response.json();
  
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setArchivedNotes((prevArchivedNotes) => [
        ...prevArchivedNotes.filter((note) => note.id !== id),
        updatedNote,
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUnarchiveNote = async (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${id}/unarchive`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const updatedNote = await response.json();
  
      setArchivedNotes((prevArchivedNotes) =>
        prevArchivedNotes.filter((note) => note.id !== id)
      );
      setNotes((prevNotes) => [...prevNotes, updatedNote]);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const filteredNotes = showArchivedNotes ? archivedNotes : notes;

  const filteredByCategoryNotes = category
    ? filteredNotes.filter((note) => note.category === category && note.archived === showArchivedNotes)
    : filteredNotes.filter((note) => note.archived === showArchivedNotes);

  return (
    <div className="app-container">
      <Navbar showArchivedNotes={showArchivedNotes} setShowArchivedNotes={setShowArchivedNotes} />
      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        categories={categories}
        selectedNote={selectedNote}
        handleAddNote={handleAddNote}
        handleUpdateNote={handleUpdateNote}
        setSelectedNote={setSelectedNote}
      />
      <NoteList 
        showArchivedNotes={showArchivedNotes}
        filteredByCategoryNotes={filteredByCategoryNotes}
        handleUnarchiveNote={handleUnarchiveNote}
        handleDeleteNote={handleDeleteNote}
        handleEditNote={handleEditNote}
        handleArchiveNote={handleArchiveNote}
      />
    </div>
  );
};

export default App;
