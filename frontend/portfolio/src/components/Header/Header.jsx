import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Left - Logo */}
      <Link to="/" className={styles.logo}>CreateIt</Link>

      {/* Center - Scrolling Text */}
      <Link to="/About" className={styles.scrollingTextContainer}>
        <p className={styles.scrollingText}>
          Welcome ✨ CreateIt is a creative portfolio builder that allows you to easily create and showcase personalized portfolios. Lazy to design your own portfolio? No worries! Fetch your GitHub or LinkedIn data to create one effortlessly. Looking for something more personalized? Premium features offer a whole lot more creative customization.CreateIt is a creative portfolio builder that allows you to easily create and showcase personalized portfolios. Lazy to design your own portfolio? No worries! Fetch your GitHub or LinkedIn data to create one effortlessly. Looking for something more personalized? Premium features offer a whole lot more creative customization.🚀 Stay tuned for updates!
        </p> 
      </Link>

      {/* Right - Create with us Link */}
      <Link to="/login" className={styles.createLink}>
        Create with us
      </Link>
    </header>
  );
};

export default Header;
