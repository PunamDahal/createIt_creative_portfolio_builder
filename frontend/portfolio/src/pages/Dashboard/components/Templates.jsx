import React, { useState } from "react";

function Templates({ moveToDrafts }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    skills: ["React", "JavaScript"],
    experience: "2 years",
  });

  function handleChange(e, field) {
    if (field === "skills") {
      setFormData({ ...formData, skills: e.target.value.split(",") });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  }

  function handleSave() {
    alert("Portfolio under construction");
    moveToDrafts(formData);
    setShowModal(false);
  }

  return (
    <div>
      <h2>Templates</h2>
      <div onClick={() => setShowModal(true)} style={{ border: "1px solid black", padding: "10px", width: "150px", cursor: "pointer" }}>
        Template 1
      </div>

      {showModal && (
        <div style={{ border: "1px solid gray", padding: "20px", background: "#f8f8f8", position: "absolute", top: "20%", left: "30%" }}>
          <h3>Edit Portfolio</h3>
          <label>Name:</label>
          <input type="text" value={formData.name} onChange={(e) => handleChange(e, "name")} /><br />
          
          <label>Skills (comma-separated):</label>
          <input type="text" value={formData.skills.join(",")} onChange={(e) => handleChange(e, "skills")} /><br />
          
          <label>Experience:</label>
          <input type="text" value={formData.experience} onChange={(e) => handleChange(e, "experience")} /><br />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Templates;