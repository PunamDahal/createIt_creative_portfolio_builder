import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css"; 

// Importing SVG icons as normal images
import homeIcon from "../../assets/home_icon.svg";
import templatesIcon from "../../assets/templates_icon.svg";
import draftsIcon from "../../assets/drafts_icon.svg";
import portfolioIcon from "../../assets/portfolio_icon.svg";
import settingsIcon from "../../assets/settings_icon.svg";

// Importing logo
import logo from "../../assets/logo/logo_b_w.png";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            {/* Logo */}
            <div className={styles.sidebarLogo}>
                <img src={logo} alt="Logo" />
            </div>

            {/* Menu Items */}
            <nav className={styles.sidebarMenu}>
                <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : styles.menuItem}>
                    <img src={homeIcon} alt="Home" className={styles.icon} />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/templates" className={({ isActive }) => isActive ? styles.active : styles.menuItem}>
                    <img src={templatesIcon} alt="Templates" className={styles.icon} />
                    <span>Templates</span>
                </NavLink>

                <NavLink to="/drafts" className={({ isActive }) => isActive ? styles.active : styles.menuItem}>
                    <img src={draftsIcon} alt="Drafts" className={styles.icon} />
                    <span>Drafts</span>
                </NavLink>

                <NavLink to="/portfolio" className={({ isActive }) => isActive ? styles.active : styles.menuItem}>
                    <img src={portfolioIcon} alt="Portfolio" className={styles.icon} />
                    <span>Portfolio</span>
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : styles.menuItem}>
                    <img src={settingsIcon} alt="Settings" className={styles.icon} />
                    <span>Settings</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
