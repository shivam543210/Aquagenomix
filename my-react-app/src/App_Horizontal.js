import React, { useState } from 'react';
import Pipeline from './components/Pipeline_Horizontal';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'pipeline':
        return (
          <Pipeline
            onBack={() => setCurrentView('dashboard')}
            onClose={() => setCurrentView('dashboard')}
          />
        );
      case 'dashboard':
      default:
        return (
          <div className="dashboard">
            <div className="hero-section">
              <h1>AquaGenomix</h1>
              <p className="hero-subtitle">AI-Powered Marine eDNA Analysis Platform</p>
              <div className="hero-description">
                Discover marine biodiversity through advanced environmental DNA analysis 
                and machine learning classification
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-dna"></i>
                </div>
                <div className="metric-content">
                  <h3>Sequences Processed</h3>
                  <span className="metric-value">285,996</span>
                  <div className="metric-trend">
                    <i className="fas fa-arrow-up"></i>
                    <span>+12% this month</span>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-microscope"></i>
                </div>
                <div className="metric-content">
                  <h3>Species Identified</h3>
                  <span className="metric-value">2,802</span>
                  <div className="metric-trend">
                    <i className="fas fa-arrow-up"></i>
                    <span>+8% this month</span>
                  </div>
                </div>
              </div>

              <div className="metric-card highlighted">
                <div className="metric-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="metric-content">
                  <h3>Novel Discoveries</h3>
                  <span className="metric-value">23</span>
                  <div className="metric-trend">
                    <i className="fas fa-arrow-up"></i>
                    <span>New this month</span>
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-icon">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <div className="metric-content">
                  <h3>Active Projects</h3>
                  <span className="metric-value">47</span>
                  <div className="metric-trend">
                    <i className="fas fa-arrow-up"></i>
                    <span>Across 12 expeditions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-grid">
                <div className="action-card primary" onClick={() => handleNavigate('pipeline')}>
                  <div className="action-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <div className="action-content">
                    <h3>AI Processing Pipeline</h3>
                    <p>Start new sample analysis with our advanced AI system</p>
                    <span className="action-cta">Start Analysis →</span>
                  </div>
                </div>

                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-upload"></i>
                  </div>
                  <div className="action-content">
                    <h3>Upload Sample</h3>
                    <p>Upload FASTQ/FASTA files with metadata</p>
                    <span className="action-cta">Upload Files →</span>
                  </div>
                </div>

                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="action-content">
                    <h3>View Analytics</h3>
                    <p>Explore biodiversity insights and trends</p>
                    <span className="action-cta">View Dashboard →</span>
                  </div>
                </div>

                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-microscope"></i>
                  </div>
                  <div className="action-content">
                    <h3>Novel Species</h3>
                    <p>Review and validate new discoveries</p>
                    <span className="action-cta">Explore →</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="activity-content">
                    <h4>Sample ARC-2024-003 Analysis Complete</h4>
                    <p>Arctic Ocean Deep Sample processed successfully</p>
                    <span className="activity-time">2 minutes ago</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon info">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="activity-content">
                    <h4>Novel Species Detected</h4>
                    <p>3 potentially new species identified in Mariana Trench samples</p>
                    <span className="activity-time">15 minutes ago</span>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon processing">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <div className="activity-content">
                    <h4>AI Model Updated</h4>
                    <p>New RAG model deployed with 94.3% accuracy</p>
                    <span className="activity-time">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {currentView === 'dashboard' && (
        <header className="app-header">
          <div className="nav-brand">
            <i className="fas fa-water"></i>
            <span>AquaGenomix</span>
          </div>
          <nav className="nav-menu">
            <button 
              className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavigate('dashboard')}
            >
              <i className="fas fa-chart-line"></i> Dashboard
            </button>
            <button 
              className={`nav-link ${currentView === 'pipeline' ? 'active' : ''}`}
              onClick={() => handleNavigate('pipeline')}
            >
              <i className="fas fa-cogs"></i> AI Pipeline
            </button>
            <button className="nav-link">
              <i className="fas fa-upload"></i> Upload
            </button>
            <button className="nav-link">
              <i className="fas fa-microscope"></i> Discovery
            </button>
            <button className="nav-link">
              <i className="fas fa-chart-bar"></i> Analytics
            </button>
            <button className="nav-link">
              <i className="fas fa-users"></i> Collaborate
            </button>
          </nav>
        </header>
      )}

      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;