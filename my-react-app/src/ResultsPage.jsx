import React, { useState, useEffect } from 'react';
import { Download, Plus, BarChart3, Eye, ArrowLeft, ExternalLink, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: 'white',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  sidebar: {
    width: '320px',
    backgroundColor: '#1f2937',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
    flexShrink: 0
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px'
  },
  logo: {
    width: '32px',
    height: '32px',
    backgroundColor: '#3b82f6',
    borderRadius: '4px'
  },
  navSection: {
    marginBottom: '32px'
  },
  navTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '16px',
    userSelect: 'none',
    outline: 'none',
    '&:hover': {
      backgroundColor: 'rgba(75, 85, 99, 0.5)',
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(0)'
    },
    '&:focus': {
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
    }
  },
  navItemHover: {
    backgroundColor: 'rgba(75, 85, 99, 0.5)'
  },
  navItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px'
  },
  recentSection: {
    marginBottom: '32px'
  },
  recentTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  recentItem: {
    color: '#d1d5db',
    fontSize: '16px'
  },
  userProfile: {
    backgroundColor: '#374151',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  userAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #60a5fa, #6b7280)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  userDetails: {
    flexGrow: 1
  },
  userName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0
  },
  userRole: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: 0
  },
  exitButton: {
    color: '#d41a1aff',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: 'rgb(55, 65, 81)',
    transition: 'background-color 0.2s',
  },
  mainContent: {
    flexGrow: 1,
    padding: '32px',
    overflowX: 'auto',
    minWidth: 0
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '16px'
  },
  mainTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '8px',
    margin: 0
  },
  mainSubtitle: {
    fontSize: '20px',
    color: '#9ca3af',
    margin: 0
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(90deg, #3b82f6, #93c5fd)',
    color: '#1f2937',
    borderRadius: '9999px',
    padding: '16px 24px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    border: 'none'
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px'
  },
  card: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  statCard: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  statTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  statValue: {
    color: '#60a5fa',
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  statUnit: {
    color: '#9ca3af',
    fontSize: '14px'
  },
  imageContainer: {
    width: '100%',
    height: '192px',
    backgroundColor: '#0d9488',
    borderRadius: '8px',
    marginBottom: '16px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  infoTitle: {
    color: '#9ca3af',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  infoSubtitle: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  infoDescription: {
    color: '#d1d5db',
    fontSize: '14px',
    marginBottom: '16px',
    lineHeight: 1.5
  },
  knowMoreButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#60a5fa',
    fontSize: '14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  confidenceCard: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  confidenceTitle: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '24px'
  },
  confidenceMeterContainer: {
    width: '100%',
    maxWidth: '384px',
    marginBottom: '24px'
  },
  confidenceMeter: {
    position: 'relative',
    height: '24px',
    background: 'linear-gradient(90deg, #ef4444, #f59e0b, #10b981)',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  confidenceIndicator: {
    position: 'absolute',
    top: '4px',
    left: '79%',
    height: '16px',
    width: '4px',
    backgroundColor: 'white',
    borderRadius: '2px',
    transform: 'translateX(-50%)'
  },
  confidenceLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#9ca3af',
    marginTop: '4px'
  },
  confidenceValue: {
    fontSize: '64px',
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: '24px'
  },
  legendContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  legendBox: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  legendText: {
    fontSize: '14px',
    color: '#d1d5db'
  },
  chartContainer: {
    height: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartTitle: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
  },
  legendGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    fontSize: '14px',
    marginTop: '16px'
  },
  legendItemGrid: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  legendColorBox: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  legendItemText: {
    color: '#d1d5db'
  },
  legendItemValue: {
    color: '#9ca3af',
    marginLeft: 'auto'
  },
  placeholder: {
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: '18px'
  }
};

const SidebarIcon = ({ Icon, altText, isSelected }) => (
  <div style={{...styles.iconContainer, color: isSelected ? '#60a5fa' : '#9ca3af'}}>
    <Icon size={24} />
  </div>
);

const UserProfile = ({ name, role }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div style={styles.userProfile}>
      <div style={styles.userAvatar}>
        {name.charAt(0)}
      </div>
      <div style={styles.userDetails}>
        <h3 style={styles.userName}>{name}</h3>
        <p style={styles.userRole}>{role}</p>
      </div>
      <button 
        style={styles.exitButton}
        onClick={handleLogout}
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

const StatCard = ({ title, value, unit }) => (
  <div style={styles.statCard}>
    <h3 style={styles.statTitle}>{title}</h3>
    <p style={styles.statValue}>{value}</p>
    <p style={styles.statUnit}>{unit}</p>
  </div>
);

const CustomPieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const createPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY, 
      "L", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <svg width="280" height="280" viewBox="0 0 280 280">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const startAngle = cumulativePercentage * 3.6;
          const endAngle = (cumulativePercentage + percentage) * 3.6;
          cumulativePercentage += percentage;

          return (
            <path
              key={index}
              d={createPath(140, 140, 100, startAngle, endAngle)}
              fill={item.color}
              stroke="#1F2937"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="140" cy="140" r="60" fill="#1F2937" />
      </svg>
    </div>
  );
};

const CustomConfidenceMeter = ({ value }) => {
  return (
    <div style={styles.confidenceMeterContainer}>
      <div style={styles.confidenceMeter}>
        <div style={styles.confidenceIndicator} />
      </div>
      <div style={styles.confidenceLabels}>
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the analysis ID and API URL from the navigation state
  const { analysisId, apiUrl } = location.state || {};

  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!analysisId || !apiUrl) {
        setError("No analysis ID or API URL provided");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analysis data');
        }

        const data = await response.json();
        setAnalysisData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [analysisId, apiUrl]);

  // Loading state
  if (loading) {
    return <div style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{color: 'white'}}>Loading analysis data...</h2>
    </div>;
  }

  // Error state
  if (error) {
    return <div style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{color: 'red'}}>{error}</h2>
    </div>;
  }

  // If we have no data
  if (!analysisData) {
    return <div style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{color: 'white'}}>No analysis data available</h2>
    </div>;
  }

  // Calculate confidence value as a percentage
  const confidenceValue = Math.round(analysisData.summary.averageConfidence * 100);

  // Create pie chart data from species found
  const colors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  const pieChartData = analysisData.summary.speciesFound.map((species, index) => ({
    name: species.replace(/_/g, ' '),
    value: Math.round(100 / analysisData.summary.speciesFound.length), // Equal distribution for now
    color: colors[index % colors.length]
  }));

  const handleNavItemHover = (e) => {
    if (!e.target.classList?.contains('selected')) {
      e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
    }
  };

  const handleNavItemLeave = (e) => {
    if (!e.target.classList?.contains('selected')) {
      e.target.style.backgroundColor = 'transparent';
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <div style={styles.logo}></div>
          </div>
          
          <div style={styles.navSection}>
            <nav>
              <h2 style={styles.navTitle}>Navigation</h2>
              <div style={styles.navList}>
                <button 
                  style={{...styles.navItem, border: 'none', width: '100%', backgroundColor: 'transparent'}}
                  onClick={() => navigate('/dashboard')}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.5)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <SidebarIcon Icon={Plus} altText="New Analysis" />
                  <span>New Analysis</span>
                </button>
                <button 
                  style={{...styles.navItem, ...styles.navItemSelected, border: 'none', width: '100%'}}
                  onClick={() => navigate('/dashboard')}
                >
                  <SidebarIcon Icon={BarChart3} altText="Dashboard" isSelected={true} />
                  <span>Dashboard</span>
                </button>
                <button 
                  style={{...styles.navItem, border: 'none', width: '100%', backgroundColor: 'transparent'}}
                  onClick={() => navigate('/dashboard')}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.5)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <SidebarIcon Icon={Eye} altText="Analysis Section" />
                  <span>Analysis Section</span>
                </button>
              </div>
            </nav>
          </div>
          
          <div style={styles.recentSection}>
            <h2 style={styles.recentTitle}>Recent Analysis</h2>
            <div style={styles.recentList}>
              {location.state?.recentAnalyses?.map((analysis, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/results/${analysis.id}`, {
                    state: {
                      projectData: analysis,
                      analysisId: analysis.id,
                      apiUrl: `https://sih-backend-sw7d.onrender.com/api/analysis/${analysis.id}`
                    }
                  })}
                  style={{
                    ...styles.recentItem,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px',
                    borderRadius: '4px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(75, 85, 99, 0.5)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {analysis.projectName}
                </button>
              )) || (
                <div style={styles.recentItem}>No recent analyses</div>
              )}
            </div>
          </div>
        </div>
        
        <UserProfile name="Benzack" role="Researcher" />
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.mainHeader}>
          <div>
            <button 
              style={styles.backButton}
              onClick={() => navigate('/dashboard')}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1f2937'}
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h1 style={styles.mainTitle}>{location.state?.projectData?.projectName || 'Analysis Results'}</h1>
            <p style={styles.mainSubtitle}>
              Status: {analysisData.status} 
              {analysisData.status === 'completed' && ` - Processing Time: ${analysisData.summary.processingTime.toFixed(2)}s`}
            </p>
          </div>
          <button 
            style={styles.downloadButton}
            onClick={async () => {
              try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`https://sih-backend-sw7d.onrender.com/api/analysis/${analysisId}/download`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                
                if (!response.ok) throw new Error('Download failed');
                
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `analysis-${analysisId}-report.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              } catch (error) {
                alert('Failed to download report: ' + error.message);
              }
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <Download size={20} />
            Download Report
          </button>
        </div>

        <div style={styles.contentSection}>
          {/* Stats Row */}
          <div style={styles.statsGrid}>
            <StatCard 
              title="Species Found" 
              value={analysisData.summary.speciesFound.length} 
              unit="unique species identified" 
            />
            <StatCard 
              title="Total Sequences" 
              value={analysisData.summary.totalSequences.toLocaleString()} 
              unit="sequences processed" 
            />
            <StatCard 
              title="Average Confidence" 
              value={`${confidenceValue}%`}
              unit="sequence identification accuracy" 
            />
          </div>

          {/* Info Cards Row */}
          <div style={styles.twoColumnGrid}>
            <div style={styles.card}>
              <div style={styles.imageContainer}>
                <img 
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop" 
                  alt="Foraminifera" 
                  style={styles.image}
                />
              </div>
              <div>
                <p style={styles.infoTitle}>About species</p>
                <h3 style={styles.infoSubtitle}>
                  Foraminifera — Nature's Microscopic Architects
                </h3>
                <p style={styles.infoDescription}>
                  Tiny marine organisms with intricate calcium shells that record Earth's ancient oceans and shape modern seafloors.
                </p>
                <a 
                  href={`https://www.ncbi.nlm.nih.gov/search/all/?term=${analysisData.summary.speciesFound[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.knowMoreButton}
                >
                  Know More
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div style={styles.confidenceCard}>
              <h3 style={styles.confidenceTitle}>Confidence Level</h3>
              <CustomConfidenceMeter value={confidenceValue} />
              <div style={styles.confidenceValue}>{confidenceValue}%</div>
              <div style={styles.legendContainer}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendBox, backgroundColor: '#ef4444'}}></div>
                  <span style={styles.legendText}>Low Confidence</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendBox, backgroundColor: '#f59e0b'}}></div>
                  <span style={styles.legendText}>Mid Confidence</span>
                </div>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendBox, backgroundColor: '#10b981'}}></div>
                  <span style={styles.legendText}>High Confidence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div style={styles.twoColumnGrid}>
            <div style={styles.card}>
              <h3 style={styles.chartTitle}>Species Distribution</h3>
              <div style={styles.chartContainer}>
                <CustomPieChart data={pieChartData} />
              </div>
              <div style={styles.legendGrid}>
                {pieChartData.map((entry, index) => (
                  <div key={index} style={styles.legendItemGrid}>
                    <div 
                      style={{...styles.legendColorBox, backgroundColor: entry.color}}
                    ></div>
                    <span style={styles.legendItemText}>{entry.name}</span>
                    <span style={styles.legendItemValue}>{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.placeholder}>
              <div style={styles.placeholderText}>Additional Chart Placeholder</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}