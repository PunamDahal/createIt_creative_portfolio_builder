import React, { useState } from "react";

function Drafts({ drafts, updateDraft, deleteDraft }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", skills: [], experience: "" });

  function handleEdit(index) {
    setEditingIndex(index);
    setFormData(drafts[index]); 
  }

  function handleChange(e, field) {
    if (field === "skills") {
      setFormData({ ...formData, skills: e.target.value.split(",") });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  }

  function handleSave() {
    updateDraft(editingIndex, formData);
    setEditingIndex(null);
  }

  return (
    <div>
      <h2>Drafts</h2>
      {drafts.length === 0 ? (
        <p>No drafts yet.</p>
      ) : (
        drafts.map((draft, index) => (
          <div key={index} style={{ border: "1px solid black", padding: "10px", width: "200px", marginBottom: "10px" }}>
            <p><strong>Name:</strong> {draft.name}</p>
            <p><strong>Skills:</strong> {draft.skills.join(", ")}</p>
            <p><strong>Experience:</strong> {draft.experience}</p>
            <button onClick={() => handleEdit(index)}>Update</button>
            <button onClick={() => deleteDraft(index)}>Delete</button>
          </div>
        ))
      )}

      {editingIndex !== null && (
        <div style={{ border: "1px solid gray", padding: "20px", background: "#f8f8f8", position: "absolute", top: "20%", left: "30%" }}>
          <h3>Update Portfolio</h3>
          <label>Name:</label>
          <input type="text" value={formData.name} onChange={(e) => handleChange(e, "name")} /><br />
          
          <label>Skills (comma-separated):</label>
          <input type="text" value={formData.skills.join(",")} onChange={(e) => handleChange(e, "skills")} /><br />
          
          <label>Experience:</label>
          <input type="text" value={formData.experience} onChange={(e) => handleChange(e, "experience")} /><br />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditingIndex(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Drafts;