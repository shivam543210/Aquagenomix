import React, { useState, useRef } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const fileInputRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log('Project submitted:', { name: projectName, description: projectDescription });
    // Handle project submission logic here
  };

  const stats = [
    { label: "Total Projects", value: "8", color: "primary-blue" },
    { label: "Completed", value: "3", color: "secondary-blue" },
    { label: "Processing", value: "4", color: "primary-blue" },
    { label: "Species Found", value: "320", color: "primary-blue" }
  ];

  const navigationItems = [
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/7340fa4fc1f3b21f4a8d53ab4da810fb254674d6?placeholderIfAbsent=true",
      label: "New Analysis",
      isActive: false
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/4ac2f6ed3b531a10ab05bd97748d59740a48e9c7?placeholderIfAbsent=true",
      label: "Dashboard",
      isActive: true
    },
    {
      icon: "https://api.builder.io/api/v1/image/assets/TEMP/a7c3bc6462580fa2d290b3c542361421d619bad7?placeholderIfAbsent=true",
      label: "Analysis Section",
      isActive: false
    }
  ];

  const recentItems = [
    "Lake michigan sample of marine and",
    "Coral reef microbial ecosystem ecological network",
    "Arctic ocean deep sample"
  ];

  const projects = [
    {
      name: "Arctic Ocean Deep Sample",
      fileName: "arctic_deep_001.fastq",
      date: "2025-07-09",
      status: "Completed",
      sequence: "78,945",
      species: "127",
      actions: [
        "https://api.builder.io/api/v1/image/assets/TEMP/ccedafc351d4bd8b6df3a8a543d11397f776c950?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/TEMP/ca50164a8495f1605dc820ea91d0fea5f145d33f?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/TEMP/0d181bfa0bbf126d57add7dcc55c5db52f680bb0?placeholderIfAbsent=true"
      ]
    },
    {
      name: "Arctic Ocean Deep Sample",
      fileName: "arctic_deep_001.fastq",
      date: "2025-07-09",
      status: "Processing",
      sequence: "4796",
      species: "42",
      actions: [
        "https://api.builder.io/api/v1/image/assets/TEMP/7b77e1021bed5994ed24f030aaed90fea4529ff9?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/TEMP/ea3756eaf7b3359d603572dcaf4b605675c6976a?placeholderIfAbsent=true",
        "https://api.builder.io/api/v1/image/assets/TEMP/665bc3efdca6cbce0efff82851f2529938924127?placeholderIfAbsent=true"
      ]
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <aside className="sidebar-content">
            <div className="sidebar-main">
              <header className="sidebar-header">
                <div className="logo-container">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/146374c249c60c17a72b7ac6fc2634a61ada3a3f?placeholderIfAbsent=true"
                    className="logo"
                    alt="DNA Logo"
                  />
                </div>
                {/* Close button for mobile */}
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="close-button"
                  aria-label="Close sidebar"
                >
                  <svg
                    className="close-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </header>
              
              <div className="sidebar-sections">
                {/* Navigation */}
                <nav className="navigation">
                  <h2 className="navigation-title">Navigation</h2>
                  <ul className="navigation-list">
                    {navigationItems.map((item, index) => (
                      <li key={index} className={`navigation-item ${index > 0 ? 'navigation-item-spaced' : ''}`}>
                        <button className="navigation-button">
                          <img
                            src={item.icon}
                            className="navigation-icon"
                            alt={`${item.label} icon`}
                          />
                          <span className="navigation-label">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Recent Analysis */}
                <section className="recent-analysis">
                  <h2 className="recent-analysis-title">Recent Analysis</h2>
                  <ul className="recent-analysis-list">
                    {recentItems.map((item, index) => (
                      <li key={index} className={`recent-analysis-item ${index > 0 ? 'recent-analysis-item-spaced' : ''}`}>
                        <button className="recent-analysis-button">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* User Profile */}
            <footer className="user-profile">
              <div className="user-profile-content">
                <div className="user-info">
                  <div className="user-avatar">
                    B
                  </div>
                  <div className="user-details">
                    <h3 className="user-name">Benzack</h3>
                    <p className="user-role">Researcher</p>
                  </div>
                </div>
                <button className="settings-button">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/e1d78ab0b000342d855e021ed1227f4b38904a25?placeholderIfAbsent=true"
                    className="settings-icon"
                    alt="Settings"
                  />
                </button>
              </div>
            </footer>
          </aside>
        </div>
        
        {/* Main Content */}
        <div className="main-content2">
          <main className="main-wrapper">
            <div className="content-sections">
              <header className="main-header">
                <div className="header-content">
                  {/* Hamburger Menu - Only visible on mobile */}
                  <button
                    onClick={toggleSidebar}
                    className="hamburger-menu"
                    aria-label="Toggle sidebar"
                  >
                    <svg
                      className="hamburger-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <div className="header-text">
                    <h1 className="main-title">Analysis Workspace</h1>
                    <p className="main-subtitle">
                      Manage your genomic analyses and start new projects
                    </p>
                  </div>
                </div>
              </header>
              
              {/* Analysis Workspace */}
              <section className="analysis-workspace">
                <div className="workspace-content">
                  <div className="workspace-header">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/d53d10439e8adb356090a1fa1c7e608ee99f8e94?placeholderIfAbsent=true"
                      className="workspace-icon"
                      alt="Analysis icon"
                    />
                    <div className="workspace-text">
                      <h2 className="workspace-title">Start New Analysis</h2>
                      <p className="workspace-subtitle">
                        Upload your eDNA sequence file to begin genomic analysis.
                      </p>
                    </div>
                  </div>
                  
                  {/* File Upload */}
                  <div 
                    className={`file-upload ${isDragOver ? 'file-upload-dragover' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileClick}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".fasta,.fastq"
                      onChange={handleFileSelect}
                      className="file-input"
                      aria-label="Upload sequence file"
                    />
                    <div className="file-upload-content">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/051acc16ed02e679f97a038ca956b16e68b497cc?placeholderIfAbsent=true"
                        className="upload-icon"
                        alt="Upload icon"
                      />
                      <div className="upload-text">
                        <h3 className="upload-title">
                          {selectedFile ? selectedFile.name : "Upload the file"}
                        </h3>
                        <p className="upload-subtitle">
                          {selectedFile ? `Size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "or click here to browse"}
                        </p>
                      </div>
                      <div className="upload-info">
                        <img
                          src="https://api.builder.io/api/v1/image/assets/TEMP/63979f4a1e1554f7ec71d491710f7daf45f2c502?placeholderIfAbsent=true"
                          className="info-icon"
                          alt="Info icon"
                        />
                        <span className="info-text">
                          Support .fasta, fastq files up to 500MB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Form */}
                  <form onSubmit={handleProjectSubmit} className="project-form">
                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="projectName" className="form-label">
                          Project Name
                        </label>
                        <input
                          id="projectName"
                          type="text"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="form-input"
                          placeholder="Enter project name"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="projectDescription" className="form-label">
                          Project Description
                        </label>
                        <textarea
                          id="projectDescription"
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          className="form-textarea"
                          placeholder="Enter project description"
                          rows={1}
                        />
                      </div>
                    </div>
                    <button type="submit" className="submit-button">
                      Start Analysis
                    </button>
                  </form>
                </div>
              </section>

              {/* Stats Cards */}
              <section className="stats-section">
                {stats.map((stat, index) => (
                  <article key={index} className="stat-card">
                    <div className="stat-content">
                      <h3 className="stat-label">{stat.label}</h3>
                      <div className={`stat-value ${stat.color}`}>
                        {stat.value}
                      </div>
                    </div>
                    <div className="stat-background">
                      {stat.value}
                    </div>
                  </article>
                ))}
              </section>

              {/* Processing Dashboard */}
              <section className="processing-dashboard">
                <header className="dashboard-header">
                  <h2 className="dashboard-title">Processing Dashboard</h2>
                  <p className="dashboard-subtitle">
                    Your genomic analysis projects and their current status
                  </p>
                </header>
                
                <div className="dashboard-content">
                  {/* Desktop Table View */}
                  <div className="desktop-table">
                    <div className="table-header">
                      <div>Project Name</div>
                      <div>File Name</div>
                      <div>Date</div>
                      <div>Status</div>
                      <div className="text-center">Sequence</div>
                      <div className="text-center">Species</div>
                      <div className="text-center">Action</div>
                    </div>
                    
                    {projects.map((project, index) => (
                      <div key={index} className="table-row">
                        <div className="table-cell">{project.name}</div>
                        <div className="table-cell">{project.fileName}</div>
                        <div className="table-cell">{project.date}</div>
                        <div className={`status-badge ${project.status === 'Completed' ? 'status-completed' : 'status-processing'}`}>
                          {project.status}
                        </div>
                        <div className="table-cell text-center">{project.sequence}</div>
                        <div className="table-cell text-center">{project.species}</div>
                        <div className="action-buttons">
                          {project.actions.map((actionIcon, actionIndex) => (
                            <button key={actionIndex} className="action-button">
                              <img
                                src={actionIcon}
                                className="action-icon"
                                alt={`Action ${actionIndex + 1}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile/Tablet Card View */}
                  <div className="mobile-cards">
                    {projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <div className="card-content">
                          <div className="card-header">
                            <div className="card-info">
                              <h3 className="card-title">{project.name}</h3>
                              <p className="card-filename">{project.fileName}</p>
                            </div>
                            <div className={`status-badge-small ${project.status === 'Completed' ? 'status-completed' : 'status-processing'}`}>
                              {project.status}
                            </div>
                          </div>
                          
                          <div className="card-details">
                            <div className="card-detail">
                              <span className="detail-label">Date</span>
                              <span className="detail-value">{project.date}</span>
                            </div>
                            <div className="card-detail">
                              <span className="detail-label">Sequence</span>
                              <span className="detail-value">{project.sequence}</span>
                            </div>
                            <div className="card-detail">
                              <span className="detail-label">Species</span>
                              <span className="detail-value">{project.species}</span>
                            </div>
                          </div>
                          
                          <div className="card-actions">
                            <span className="actions-label">Actions:</span>
                            <div className="action-buttons">
                              {project.actions.map((actionIcon, actionIndex) => (
                                <button key={actionIndex} className="action-button">
                                  <img
                                    src={actionIcon}
                                    className="action-icon"
                                    alt={`Action ${actionIndex + 1}`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;