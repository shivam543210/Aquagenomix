import React from 'react';
import { Link } from 'react-router-dom'; // <-- ADDED THIS IMPORT
import './LandingPage.css';

// Import local assets for icons
import dnaIcon from "./assets/dna-icon.png";
import dnaIcon2 from "./assets/dna-icon2.png";
import flaskIcon from "./assets/flask-icon.png";
import chartIcon from "./assets/chart-icon.png";
import lineIcon from "./assets/line-icon.png";
import mapIcon from "./assets/map-icon.png";
import stackIcon from "./assets/stack-icon.png";
import lightningIcon from "./assets/lightning-icon.png";
import shieldIcon from "./assets/shield-icon.png";
import scatterIcon from "./assets/scatter-icon.png";

const HowItWorksCard = ({ icon, title, description }) => (
  <div className="how-it-works-card">
    <div className="card-content">
      <img src={icon} alt={`${title} icon`} className="card-icon" loading='lazy'/>
      <div className="card-text">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div className="landing-page-wrapper">
      <div className="landing-page">
        <div className="hero-section">
          <nav className="navbar">
            <div className="navbar-logo">
              <div className="dna-icon-container">
                <img src={dnaIcon} alt="DNA Icon" className="dna-icon" />
              </div>
              <span className="logo-text">AquaGenomix</span>
            </div>
            <div className="navbar-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#documentation" className="nav-link">Documentation</a>
              <a href="#about" className="nav-link">About</a>
            </div>
            <div className="navbar-auth">
              {/* UPDATED: Login and Sign Up buttons now link to the dashboard */}
              <Link to="/login"> {/* Add this Link wrapper */}
                <button className="login-button">Login</button>
              </Link>
              <Link to="/signup"> {/* Changed from /dashboard to /signup */}
                <button className="signup-button">Sign Up</button>
              </Link>
            </div>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">Unlock Hidden Species in Your Samples.</h1>
            <p className="hero-subtitle">Let our AI uncover what traditional methods might miss.</p>
            {/* UPDATED: Discover Now button now links to the dashboard */}
            <Link to="/signup"> {/* Changed from /dashboard to /signup */}
              <button type="button" className="discover-button">Discover Now</button>
            </Link>
          </div>
        </div>
        <div className="main-content">
          <section className="how-it-works-section">
            <h2 className="section-title">How it works</h2>
            <div className="cards-container">
              <HowItWorksCard
                icon={flaskIcon}
                title="Collection"
                description="Gather environmental samples from the field."
              />
              <HowItWorksCard
                icon={dnaIcon2}
                title="eDNA Extraction"
                description="Isolate DNA fragments from collected samples."
              />
              <HowItWorksCard
                icon={chartIcon}
                title="Sequencing"
                description="Convert extracted DNA into digital sequences."
              />
              <HowItWorksCard
                icon={lineIcon}
                title="AI Classification"
                description="Identify species and classify biodiversity patterns."
              />
              <HowItWorksCard
                icon={mapIcon}
                title="Insights"
                description="Generate reports and visualize key findings."
              />
              <HowItWorksCard
                icon={stackIcon}
                title="Result"
                description="Review final outcomes and export your analysis."
              />
            </div>
          </section>
          <section className="key-features-section">
            <h2 className="section-title">Key Features</h2>
            <div className="cards-container">
              <HowItWorksCard
                icon={lightningIcon}
                title="AI-powered Classification"
                description="State-of-the-art machine learning leverages massive genomic datasets for precise species identification."
              />
              <HowItWorksCard
                icon={shieldIcon}
                title="Database-Free Discovery"
                description="Discover novel species and microbial communities without existing reference databases. Ideal for exploring unknown ecosystems."
              />
              <HowItWorksCard
                icon={scatterIcon}
                title="Interactive Dashboards"
                description="Beautiful, responsive visualizations with drill-down capabilities, export options, and customizable charting features."
              />
            </div>
          </section>
        </div>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="dna-icon-container">
                <img src={dnaIcon} alt="DNA Icon" className="dna-icon" />
              </div>
              <span className="logo-text">AquaGenomix</span>
            </div>
            <div className="footer-links">
              <a href="#terms" className="footer-link">Terms & Conditions</a>
              <a href="#privacy" className="footer-link">Privacy Policy</a>
            </div>
            <span className="footer-copyright">© 2025 Copyright by Team Abyss</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;