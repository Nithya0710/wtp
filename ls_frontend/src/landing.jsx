import React, { useState, useEffect } from 'react';
import './App.css';
import foodVideo from './foodvid.mp4';
function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
      setMinimized(true);
    } else {
      setScrolled(false);
      setMinimized(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={scrolled} />
      <main>
        <VideoSection minimized={minimized} scrollToSection={scrollToSection} />
        <RecipesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = ({ scrolled }) => (
  <header className={`header ${scrolled ? 'scrolled' : ''}`}>
    <div className="brand">Recipe Realm</div>
    <nav>
      <a href="/signup">Sign Up</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
);

const VideoSection = ({ minimized, scrollToSection }) => (
  <section className="video-container">
   <video autoPlay muted loop playsInline className="video">
  <source src={foodVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>
    <div className={`video-overlay ${minimized ? 'minimized' : ''}`}>
      Recipe Realm
    </div>
  </section>
);

const RecipesSection = () => (
  <section id="recipes" class="curved-box">
    <h2>Our Delicious Recipes</h2>
    <p>
      Discover a world of culinary delights with our handpicked recipes from around the globe.
      Each recipe is crafted with love and passion, ensuring a delightful experience for your taste buds.
      Whether you're a novice cook or a seasoned chef, our collection has something for everyone.
    </p>
  </section>
);

const AboutSection = () => (
  <section id="about" class="curved-box">
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to Recipe Realm, your number one source for all things culinary. We're dedicated to providing you the very best recipes, with an emphasis on simplicity, flavor, and nutritional value.
      </p>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" class="curved-box">
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or comments, please don't hesitate to contact us. You can reach us at
        contact@reciperealm.com or call us at +91-7619590288. We're here to help you with all your culinary needs!
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <p style={{color: "#F6E7D2"}}>&copy; 2023 Recipe Realm. All rights reserved.</p>
    <ul>
      <li><a href="/signup">Sign Up</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </footer>
);

export default Landing;
