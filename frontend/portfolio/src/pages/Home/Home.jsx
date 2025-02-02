import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Header />

      <main>
        <section className={styles.intro}>
          <h2>Create Your Portfolio with Ease!</h2>
          <p>Develop a stunning portfolio in minutes.</p>
        </section>
        <section className={styles.intro}>
          <img src="mockup1.jpg" alt="Portfolio Example" />
          <img src="mockup2.jpg" alt="Portfolio Example" />
          <img src="mockup3.jpg" alt="Portfolio Example" />
        </section>
        <section className={styles.content}>
          <div className={styles.image}>
            <img src="portfolio-mockup.jpg" alt="Portfolio Example" />
          </div>
          <div className={styles.text}>
            <h3>Why us?</h3>
            <p>
              We make portfolio building effortless by handling the structure
              and styling for you. Just add your projects, and
              publish.
            </p>
          </div>
          <div className={styles.text}>
            <h3>Creative. Fast. Personal.</h3>
            <p>
              Choose from unique templates that highlight your skills and
              achievements beautifully.
            </p>
          </div>
        </section>
       
      </main>

      <Footer />
    </div>
  );
};

export default Home;
