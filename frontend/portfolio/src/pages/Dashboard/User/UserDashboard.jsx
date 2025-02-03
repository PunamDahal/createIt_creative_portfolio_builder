import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../../components/sidebar/sidebar"; 
import Header from "../../../components/Header/Header"
import styles from "./UserDashboard.module.css"; 

// Pages (Home, Templates, Drafts, Portfolio)
const Welcome = () => {
    const user = {
        avatarUrl: "", 
        name: "John Doe"
    };

    return (
        <div className={styles.home}>
            {/* Avatar Circle */}
            <div className={styles.avatarCircle}>
                <img src={user.avatarUrl} alt="User Avatar" className={styles.avatarImage} />
            </div>
            {/* Welcome Message */}
            <h2>Welcome, {user.name}!</h2>
        </div>
    );
};

const Templates = () => {
    return (
        <div className={styles.templates}>
            <h2>Templates</h2>
            <p>Here, you'll be able to create and manage templates.</p>
            {/* Add your card components for templates */}
        </div>
    );
};

const Drafts = () => {
    return (
        <div className={styles.drafts}>
            <h2>Drafts</h2>
            <p>Here are your drafts that you can edit or delete.</p>
            {/* Display your draft items here */}
        </div>
    );
};

const Portfolio = () => {
    return (
        <div className={styles.portfolio}>
            <h2>Portfolio</h2>
            <p>Here are your final portfolio templates.</p>
            {/* Display the final portfolio items */}
        </div>
    );
};

// UserDashboard Component
const UserDashboard = () => {
    return (
            <div className={styles.dashboard}>
            <Header />

                {/* Sidebar */}
                <Sidebar />

                {/* Content Section */}
                <div className={styles.content}>
                    <Routes>
                        <Route path="/welcome" component={Welcome} />
                        <Route path="/templates" component={Templates} />
                        <Route path="/drafts" component={Drafts} />
                        <Route path="/portfolio" component={Portfolio} />
                    </Routes>
                </div>
            </div>
    );
};

export default UserDashboard;
