import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Welcome from "../components/Welcome";
import Templates from "../components/Templates";
import Drafts from "../components/Drafts";
import Portfolio from "../components/Portfolio";
import Settings from "../components/Settings";
import styles from "./UserDashboard.module.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);

  function moveToDrafts(portfolioData) {
    setDrafts([...drafts, portfolioData]);
  }

  function updateDraft(index, updatedData) {
    const newDrafts = [...drafts];
    newDrafts[index] = updatedData;
    setDrafts(newDrafts);
  }

  function deleteDraft(index) {
    setDrafts(drafts.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.dashboard}>
      <Sidebar navigate={navigate} />
      <div className={styles.mainContent}>
        <Routes path="/dashboard/user/*">
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/templates" element={<Templates moveToDrafts={moveToDrafts} />} />
          <Route path="/drafts" element={<Drafts drafts={drafts} updateDraft={updateDraft} deleteDraft={deleteDraft} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserDashboard;