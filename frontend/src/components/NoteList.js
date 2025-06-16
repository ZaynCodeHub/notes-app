import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onEdit }) {
  return (

    

    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default NoteList;
