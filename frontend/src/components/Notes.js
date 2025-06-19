import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";

function Notes({ token, logout, username }) {
  const [notes, setNotes] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);
const toggleDropdown = () => setShowDropdown((prev) => !prev);


  useEffect(() => {
    if (!token) return;

  axios
  .get(`${process.env.REACT_APP_API_URL}/notes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },

      })
      .then((res) => {
        console.log("Fetched notes:", res.data); //  DEBUG
        setNotes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          logout(); // Token expired or invalid
        }
      });
  }, [token]);

  const addNote = (title, content) => {
    axios
      .post(
        "http://localhost:8000/api/notes/",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setNotes([res.data, ...notes]))
      .catch((err) => console.error("Error adding note:", err));
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:8000/api/notes/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setNotes(notes.filter((note) => note.id !== id)))
      .catch((err) => console.error("Error deleting note:", err));
  };

  const updateNote = (id, title, content) => {
    axios
      .put(
        `http://localhost:8000/api/notes/${id}/`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) =>
        setNotes(notes.map((note) => (note.id === id ? res.data : note)))
      )
      .catch((err) => console.error("Error updating note:", err));
  };

return (
  <div>
    {/* Navbar */}
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Simple Notes</h2>
      <div style={styles.userSection}>
  <span style={styles.welcome}>Welcome, {username}</span>
  <div style={styles.avatarContainer}>
    <div style={styles.avatarCircle} onClick={toggleDropdown}>
      {username?.charAt(0).toUpperCase()}
    </div>
    {showDropdown && (
  <div style={styles.dropdown}>
    <div style={styles.dropdownItem}>Personal</div>
    <div style={styles.dropdownItem}>Settings</div>
    <div style={styles.dropdownItem}>Help</div>
    <button style={styles.dropdownItem} onClick={logout}>Logout</button>
  </div>
)}

  </div>
</div>

    </nav>

    <div style={styles.headerSection}>
      <h1 style={styles.heading}>Your Notes</h1>
      <p style={styles.subheading}>Add, edit, and manage your personal notes below.</p>
    </div>


    {/* Notes Content */}
    <div className="notes-page" style={styles.page}>
      <NoteForm onAddNote={addNote} />
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))
        )}
      </div>
    </div>
  </div>
);

}

const styles = {
  navbar: {
    backgroundColor: "#282c34",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  welcome: {
    fontSize: "1rem",
  },
  logoutBtn: {
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  page: {
    padding: "2rem",
  },
  avatarContainer: {
  position: "relative",
},

avatarCircle: {
  width: "40px",
  height: "40px",
  backgroundColor: "#3b82f6",
  color: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
},

dropdown: {
  position: "absolute",
  top: "50px",
  right: 0,
  backgroundColor: "white",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderRadius: "6px",
  overflow: "hidden",
  zIndex: 1,
},

dropdownItemHover: {
  backgroundColor: "#f1f5f9",
},
dropdownItem: {
  padding: "10px 15px",
  fontSize: "0.9rem",
  border: "none",
  background: "none",
  textAlign: "left",
  width: "100%",
  cursor: "pointer",
  color: "#111",
},

headerSection: {
  textAlign: "center",
  marginBottom: "2rem",
},
heading: {
  fontSize: "2rem",
  margin: 0,
  color: "#111827",
},
subheading: {
  fontSize: "1rem",
  color: "#6b7280",
  marginTop: "0.5rem",
},


};


export default Notes;
