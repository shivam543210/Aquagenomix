import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const fileInputRef = useRef(null);

  // Initialize projectsData and pagination state
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/analysis?page=1&limit=100', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      
      // Check if we have the analyses array in the response
      const analyses = responseData.analyses || [];
      
      const formattedData = analyses.map(project => ({
        id: project._id,
        projectName: project.projectName || 'Unnamed Project',
        fileName: project.fileName,
        submissionDate: project.uploadDate ? new Date(project.uploadDate).toISOString().split('T')[0] : 'N/A',
        status: project.status === 'completed' ? 'Completed' : 'Processing',  // Capitalize status
        sequenceCount: project.summary ? project.summary.totalSequences : 'N/A',
        speciesFound: project.summary?.speciesFound?.length || 'N/A',
        speciesFoundList: project.summary?.speciesFound || [],  // Store actual species list
        averageConfidence: project.summary?.averageConfidence || 0,
        processingTime: project.summary?.processingTime || 0
      }));
      
      // Store pagination data
      const paginationData = responseData.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: formattedData.length,
        itemsPerPage: 10
      };
      
      setPagination(paginationData);
      setProjectsData(formattedData);
    } catch (e) {
      setError("Failed to load existing projects.");
      console.error("API fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      fetchProjects();
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragOver(false); };
  
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

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !projectName) {
      alert("Please select a file and enter a project name.");
      return;
    }

    const tempId = Date.now();
    const newProjectOptimistic = {
      id: tempId,
      projectName: projectName,
      fileName: selectedFile.name,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Processing',
      sequenceCount: '...',
      speciesFound: '...',
    };

    setProjectsData(prevProjects => [newProjectOptimistic, ...prevProjects]);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('projectName', projectName);
    formData.append('projectDescription', projectDescription);

    try {
      const response = await fetch('http://localhost:3000/api/analysis/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Analysis submission failed');
      }

      const result = await response.json();
      
      // Navigate to the pipeline page with the analysis data
      navigate('/pipeline', {
        state: {
          analysisData: {
            id: result._id,
            projectName: result.projectName || 'Unnamed Project',
            fileName: result.fileName,
            uploadDate: result.uploadDate,
            description: projectDescription,
            status: 'Processing'
          }
        }
      });

      // Clear form - Properly reset all form states
      setProjectName('');
      setProjectDescription('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Refresh the projects list to get latest data
      setTimeout(() => {
        fetchProjects();
      }, 1000);

    } catch (error) {
      console.error("Failed to start analysis:", error);
      setProjectsData(prevProjects => prevProjects.filter(p => p.id !== tempId));
      alert("Error submitting analysis. Please try again.");
    }
  };

  const totalProjects = projectsData.length;
  const completedProjects = projectsData.filter(p => p.status === 'Completed').length;
  const processingProjects = projectsData.filter(p => p.status === 'Processing').length;
  
  // Better calculation for species found
  const totalSpeciesFound = projectsData
    .filter(p => p.status === 'Completed' && p.speciesFound !== 'N/A' && p.speciesFound !== '...')
    .reduce((sum, project) => {
      const speciesCount = typeof project.speciesFound === 'number' ? project.speciesFound : parseInt(project.speciesFound) || 0;
      return sum + speciesCount;
    }, 0);

  const stats = [
    { label: "Total Projects", value: totalProjects, color: "primary-blue" },
    { label: "Completed", value: completedProjects, color: "secondary-blue" },
    { label: "Processing", value: processingProjects, color: "primary-blue" },
    { label: "Species Found", value: totalSpeciesFound, color: "primary-blue" }
  ];

  // Replace icon placeholders with actual SVG icons
  const navigationItems = [
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7L12 2z"/>
          <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z"/>
        </svg>
      ), 
      label: "New Analysis" 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      ), 
      label: "Dashboard" 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
          <path d="M19 4H15a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
        </svg>
      ), 
      label: "Analysis Section" 
    }
  ];

  // Recent analysis should show actual uploaded projects with details
  const recentAnalysisItems = projectsData
    .slice(0, 3)
    .map(project => ({
      name: project.projectName,
      status: project.status,
      date: project.submissionDate
    }));

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {isSidebarOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <aside className="sidebar-content">
            <div className="sidebar-main">
              <header className="sidebar-header">
                <div className="logo-container">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/146374c249c60c17a72b7ac6fc2634a61ada3a3f?placeholderIfAbsent=true" className="logo" alt="DNA Logo" />
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="close-button"
                  aria-label="Close sidebar"
                >
                  <svg className="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </header>
              <div className="sidebar-sections">
                <nav className="navigation">
                  <h2 className="navigation-title">Navigation</h2>
                  <ul className="navigation-list">
                    {navigationItems.map((item, index) => (
                      <li key={index} className={`navigation-item ${index > 0 ? 'navigation-item-spaced' : ''}`}>
                        <button className="navigation-button">
                          <span className="navigation-icon">{item.icon}</span>
                          <span className="navigation-label">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                <section className="recent-analysis">
                  <h2 className="recent-analysis-title">Recent Analysis</h2>
                  <ul className="recent-analysis-list">
                    {recentAnalysisItems.length > 0 ? (
                      recentAnalysisItems.map((item, index) => (
                        <li key={index} className={`recent-analysis-item ${index > 0 ? 'recent-analysis-item-spaced' : ''}`}>
                          <div className="recent-analysis-content">
                            <button className="recent-analysis-button">
                              <span className="project-name">{item.name}</span>
                             
                              
                            </button>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="recent-analysis-item">
                        <button className="recent-analysis-button">No recent analysis</button>
                      </li>
                    )}
                  </ul>
                </section>
              </div>
            </div>
            <footer className="user-profile">
              <div className="user-profile-content">
                <div className="user-info">
                  <div className="user-avatar">B</div>
                  <div className="user-details">
                    <h3 className="user-name">Benzack</h3>
                    <p className="user-role">Researcher</p>
                  </div>
                </div>
                <button className="settings-button">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/e1d78ab0b000342d855e021ed1227f4b38904a25?placeholderIfAbsent=true" className="settings-icon" alt="Settings" />
                </button>
              </div>
            </footer>
          </aside>
        </div>
        
        <div className="main-content2">
          <main className="main-wrapper">
            <div className="content-sections">
              <header className="main-header">
                <div className="header-content">
                  <button onClick={toggleSidebar} className="hamburger-menu" aria-label="Toggle sidebar">
                    <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <div className="header-text">
                    <h1 className="main-title">Analysis Workspace</h1>
                    <p className="main-subtitle">Manage your genomic analyses and start new projects</p>
                  </div>
                </div>
              </header>
              
              <section className="analysis-workspace">
                <div className="workspace-content">
                  <div className="workspace-header">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/d53d10439e8adb356090a1fa1c7e608ee99f8e94?placeholderIfAbsent=true" className="workspace-icon" alt="Analysis icon" />
                    <div className="workspace-text">
                      <h2 className="workspace-title">Start New Analysis</h2>
                      <p className="workspace-subtitle">Upload your eDNA sequence file to begin genomic analysis.</p>
                    </div>
                  </div>
                  
                  <div className={`file-upload ${isDragOver ? 'file-upload-dragover' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleFileClick}>
                    <input ref={fileInputRef} type="file" accept=".fasta,.fastq" onChange={handleFileSelect} className="file-input" aria-label="Upload sequence file" />
                    <div className="file-upload-content">
                      <img src="https://api.builder.io/api/v1/image/assets/TEMP/051acc16ed02e679f97a038ca956b16e68b497cc?placeholderIfAbsent=true" className="upload-icon" alt="Upload icon" />
                      <div className="upload-text">
                        <h3 className="upload-title">{selectedFile ? selectedFile.name : "Upload the file"}</h3>
                        <p className="upload-subtitle">{selectedFile ? `Size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "or click here to browse"}</p>
                      </div>
                      <div className="upload-info">
                        <img src="https://api.builder.io/api/v1/image/assets/TEMP/63979f4a1e1554f7ec71d491710f7daf45f2c502?placeholderIfAbsent=true" className="info-icon" alt="Info icon" />
                        <span className="info-text">Support .fasta, fastq files up to 500MB</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleProjectSubmit} className="project-form">
                    <div className="form-fields">
                      <div className="form-field">
                        <label htmlFor="projectName" className="form-label">Project Name</label>
                        <input id="projectName" type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="form-input" placeholder="Enter project name" required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="projectDescription" className="form-label">Project Description</label>
                        <textarea id="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="form-textarea" placeholder="Enter project description" rows={1} />
                      </div>
                    </div>
                    <button type="submit" className="submit-button">Start Analysis</button>
                  </form>
                </div>
              </section>

              <section className="stats-section">
                {stats.map((stat, index) => (
                  <article key={index} className="stat-card">
                    <div className="stat-content">
                      <h3 className="stat-label">{stat.label}</h3>
                      <div className={`stat-value ${stat.color}`}>{stat.value}</div>
                    </div>
                    <div className="stat-background">{stat.value}</div>
                  </article>
                ))}
              </section>

              <section className="processing-dashboard">
                <header className="dashboard-header">
                  <h2 className="dashboard-title">Processing Dashboard</h2>
                  <p className="dashboard-subtitle">Your genomic analysis projects and their current status</p>
                </header>
                
                <div className="dashboard-content">
                  {loading && <p style={{ color: 'white', textAlign: 'center' }}>Loading projects...</p>}
                  {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                  {!loading && !error && (
                    <>
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
                        
                        {projectsData.map((project) => (
                          <div key={project.id} className="table-row">
                            <div className="table-cell">{project.projectName}</div>
                            <div className="table-cell">{project.fileName}</div>
                            <div className="table-cell">{project.submissionDate}</div>
                            <div className={`status-badge ${project.status === 'Completed' ? 'status-completed' : 'status-processing'}`}>{project.status}</div>
                            <div className="table-cell text-center">{project.sequenceCount}</div>
                            <div className="table-cell text-center">{project.speciesFound}</div>
                            <div className="action-buttons">
                              {/* View Button - Always clickable */}
                              <Link 
                                to={`/results/${project.id}`}
                                state={{ 
                                  projectData: project,
                                  analysisId: project.id,
                                  apiUrl: `https://sih-backend-sw7d.onrender.com/api/analysis/${project.id}`
                                }}
                                className={`action-button ${project.status === 'Completed' ? 'action-view-button' : 'action-view-button-processing'}`}
                              >
                                <img src="https://api.builder.io/api/v1/image/assets/TEMP/ccedafc351d4bd8b6df3a8a543d11397f776c950?placeholderIfAbsent=true" className="action-icon" alt="View Results" />
                              </Link>
                              
                              <button className="action-button">
                                <img src="https://api.builder.io/api/v1/image/assets/TEMP/ca50164a8495f1605dc820ea91d0fea5f145d33f?placeholderIfAbsent=true" className="action-icon" alt="Download" />
                              </button>
                              
                              <button className="action-button">
                                <img src="https://api.builder.io/api/v1/image/assets/TEMP/0d181bfa0bbf126d57add7dcc55c5db52f680bb0?placeholderIfAbsent=true" className="action-icon" alt="Delete" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mobile-cards">
                        {projectsData.map((project) => (
                          <div key={project.id} className="project-card">
                            <div className="card-content">
                              <div className="card-header">
                                <div className="card-info">
                                  <h3 className="card-title">{project.projectName}</h3>
                                  <p className="card-filename">{project.fileName}</p>
                                </div>
                                <div className={`status-badge-small ${project.status === 'Completed' ? 'status-completed' : 'status-processing'}`}>{project.status}</div>
                              </div>
                              <div className="card-details">
                                <div className="card-detail"><span className="detail-label">Date</span><span className="detail-value">{project.submissionDate}</span></div>
                                <div className="card-detail"><span className="detail-label">Sequence</span><span className="detail-value">{project.sequenceCount}</span></div>
                                <div className="card-detail"><span className="detail-label">Species</span><span className="detail-value">{project.speciesFound}</span></div>
                              </div>
                              <div className="card-actions">
                                <span className="actions-label">Actions:</span>
                                <div className="action-buttons">
                                  {/* View Button - Always clickable for mobile */}
                                  <Link 
                                    to={`/results/${project.id}`}
                                    state={{ 
                                      projectData: project,
                                      analysisId: project.id,
                                      apiUrl: `https://sih-backend-sw7d.onrender.com/api/analysis/${project.id}`
                                    }}
                                    className={`action-button ${project.status === 'Completed' ? 'action-view-button' : 'action-view-button-processing'}`}
                                  >
                                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/ccedafc351d4bd8b6df3a8a543d11397f776c950?placeholderIfAbsent=true" className="action-icon" alt="View Results" />
                                  </Link>
                                  
                                  <button className="action-button">
                                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/ca50164a8495f1605dc820ea91d0fea5f145d33f?placeholderIfAbsent=true" className="action-icon" alt="Download" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
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
