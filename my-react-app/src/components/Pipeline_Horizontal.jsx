import React, { useState, useEffect, useCallback } from 'react';
import './Pipeline_Horizontal.css';

// Results Page Component
const ResultsPage = ({ sampleData, onBack }) => {
  return (
    <div className="results-container">
      <div className="results-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back to Pipeline
        </button>
        <div className="results-title">
          <h1>Analysis Results</h1>
          <p className="sample-name">{sampleData.name}</p>
        </div>
        <div className="results-status">
          <span className="status-badge completed">
            <i className="fas fa-check-circle"></i> Complete
          </span>
        </div>
      </div>

      <div className="results-content">
        {/* Summary Cards */}
        <div className="results-summary">
          <div className="summary-card">
            <div className="card-icon">
              <i className="fas fa-dna"></i>
            </div>
            <div className="card-content">
              <h3>Sequences Analyzed</h3>
              <span className="metric-value">47,832</span>
              <p className="metric-change">+12% from previous run</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon">
              <i className="fas fa-microscope"></i>
            </div>
            <div className="card-content">
              <h3>Species Identified</h3>
              <span className="metric-value">367</span>
              <p className="metric-change">+23 new discoveries</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="card-content">
              <h3>Novel Taxa</h3>
              <span className="metric-value">12</span>
              <p className="metric-change">Confidence 85%</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="card-content">
              <h3>Diversity Index</h3>
              <span className="metric-value">3.42</span>
              <p className="metric-change">Shannon Index</p>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="results-details">
          <div className="results-section">
            <h2>Taxonomic Breakdown</h2>
            <div className="taxonomy-chart">
              <div className="taxonomy-item">
                <span className="taxonomy-name">Arthropoda</span>
                <div className="taxonomy-bar">
                  <div className="bar-fill" style={{width: '35%'}}></div>
                </div>
                <span className="taxonomy-count">128 species (35%)</span>
              </div>
              <div className="taxonomy-item">
                <span className="taxonomy-name">Mollusca</span>
                <div className="taxonomy-bar">
                  <div className="bar-fill" style={{width: '28%'}}></div>
                </div>
                <span className="taxonomy-count">103 species (28%)</span>
              </div>
              <div className="taxonomy-item">
                <span className="taxonomy-name">Chordata</span>
                <div className="taxonomy-bar">
                  <div className="bar-fill" style={{width: '22%'}}></div>
                </div>
                <span className="taxonomy-count">81 species (22%)</span>
              </div>
              <div className="taxonomy-item">
                <span className="taxonomy-name">Cnidaria</span>
                <div className="taxonomy-bar">
                  <div className="bar-fill" style={{width: '15%'}}></div>
                </div>
                <span className="taxonomy-count">55 species (15%)</span>
              </div>
            </div>
          </div>

          <div className="results-section">
            <h2>Novel Species Discoveries</h2>
            <div className="novel-species-list">
              <div className="species-card">
                <div className="species-info">
                  <h4>Deep-sea Amphipod</h4>
                  <p>Confidence: 92% | Sequences: 234</p>
                  <span className="species-location">Depth: 3,247m</span>
                </div>
                <div className="species-status">
                  <span className="status-badge reviewing">Under Review</span>
                </div>
              </div>

              <div className="species-card">
                <div className="species-info">
                  <h4>Arctic Polychaete</h4>
                  <p>Confidence: 88% | Sequences: 156</p>
                  <span className="species-location">Depth: 2,890m</span>
                </div>
                <div className="species-status">
                  <span className="status-badge reviewing">Under Review</span>
                </div>
              </div>

              <div className="species-card">
                <div className="species-info">
                  <h4>Bioluminescent Copepod</h4>
                  <p>Confidence: 95% | Sequences: 312</p>
                  <span className="species-location">Depth: 1,456m</span>
                </div>
                <div className="species-status">
                  <span className="status-badge confirmed">Confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <button className="btn btn-primary">
            <i className="fas fa-download"></i> Download Report
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-share"></i> Share Results
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-microscope"></i> View Detailed Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

// Pipeline Stage Component
const PipelineStage = ({ stage, isActive, isCompleted, progress, onClick }) => {
  const getStatusBadge = () => {
    if (isCompleted) return { text: 'Completed', className: 'completed' };
    if (isActive) return { text: 'In Progress', className: 'in-progress' };
    if (progress > 0) return { text: 'Processing', className: 'processing' };
    return { text: 'Queued', className: 'queued' };
  };

  const status = getStatusBadge();
  const stageClassName = `pipeline-stage ${status.className}`;

  return (
    <div className={stageClassName} onClick={() => onClick(stage.id)}>
      <div className="stage-circle">
        <i className={`fas fa-${stage.icon}`}></i>
      </div>
      <div className="stage-info">
        <h3>{stage.name}</h3>
        <span className={`status-badge ${status.className}`}>
          {status.text}
        </span>
      </div>
      <div className="stage-progress">
        <div 
          className={`progress-bar ${isCompleted ? 'completed' : ''}`}
          style={{
            background: isCompleted 
              ? 'linear-gradient(90deg, #16a34a, #22c55e)'
              : `linear-gradient(90deg, 
                  rgba(59, 130, 246, 0.2) 0%, 
                  rgba(59, 130, 246, 0.8) ${progress}%, 
                  rgba(255, 255, 255, 0.1) ${progress}%)`
          }}
        ></div>
        <span className="progress-text">
          {isCompleted ? '✓ Done' : isActive ? `${Math.round(progress)}%` : 'Queued'}
        </span>
      </div>
    </div>
  );
};

// Stage Detail Modal Component
const StageModal = ({ stage, isOpen, onClose }) => {
  const stageDetails = {
    collection: {
      title: 'Sample Collection',
      description: 'Field collection and preservation of marine eDNA sample',
      subProcesses: [
        'GPS coordinates recorded: 70.2°N, 133.9°W',
        'Environmental parameters logged',
        'Sample preserved with RNA Later solution',
        'Chain of custody documentation completed',
        'Sample transported to laboratory'
      ]
    },
    extraction: {
      title: 'DNA Extraction',
      description: 'Extraction and purification of environmental DNA',
      subProcesses: [
        'Sample filtration and cell lysis',
        'DNA isolation using magnetic beads',
        'Purification and contaminant removal',
        'Quality assessment (A260/A280 ratio)',
        'Concentration measurement via fluorometry'
      ]
    },
    sequencing: {
      title: 'High-Throughput Sequencing',
      description: 'Illumina NovaSeq 6000 paired-end sequencing',
      subProcesses: [
        'PCR amplification of target regions',
        'Library preparation and barcoding',
        'Cluster generation on flow cell',
        'Sequencing by synthesis (2x300bp)',
        'Base calling and quality filtering'
      ]
    },
    classification: {
      title: 'AI-Powered Classification',
      description: 'Machine learning taxonomic assignment',
      subProcesses: [
        'Sequence preprocessing and trimming',
        'Feature extraction using TransformerXL',
        'Neural network classification',
        'Confidence scoring and validation',
        'Taxonomic hierarchy assignment'
      ]
    },
    results: {
      title: 'Results Compilation',
      description: 'Final analysis and report generation',
      subProcesses: [
        'Data validation and quality control',
        'Biodiversity metrics calculation',
        'Statistical analysis and visualization',
        'Report generation (PDF/HTML)',
        'Notification dispatch to research team'
      ]
    }
  };

  const details = stageDetails[stage];

  if (!isOpen || !details) return null;

  return (
    <div className="stage-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{details.title}</h2>
          <button onClick={onClose} className="modal-close">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <p className="stage-description">{details.description}</p>
          <h3>Sub-processes:</h3>
          <ul className="subprocess-list">
            {details.subProcesses.map((process, index) => (
              <li key={index}>{process}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

// Custom Hook for Pipeline Management
const usePipelineManager = () => {
  const [stages] = useState([
    {
      id: 'collection',
      name: 'Collection',
      icon: 'flask',
      duration: 0,
      status: 'completed'
    },
    {
      id: 'extraction',
      name: 'Extraction',
      icon: 'dna',
      duration: 6000
    },
    {
      id: 'sequencing',
      name: 'Sequencing',
      icon: 'chart-bar',
      duration: 8000
    },
    {
      id: 'classification',
      name: 'AI Classification',
      icon: 'brain',
      duration: 7000
    },
    {
      id: 'results',
      name: 'Results',
      icon: 'clipboard-check',
      duration: 5000
    }
  ]);

  const [currentStageIndex, setCurrentStageIndex] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stageProgress, setStageProgress] = useState({});
  const [completedStages, setCompletedStages] = useState(new Set(['collection']));

  const processStage = useCallback((stageIndex) => {
    return new Promise((resolve) => {
      const stage = stages[stageIndex];
      const duration = stage.duration;
      const interval = 50;
      const increment = (100 * interval) / duration;
      let progress = 0;

      const progressInterval = setInterval(() => {
        if (isPaused) {
          clearInterval(progressInterval);
          resolve();
          return;
        }

        progress += increment;

        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);

          setCompletedStages(prev => new Set([...prev, stage.id]));
          setStageProgress(prev => ({ ...prev, [stage.id]: 100 }));
          resolve();
        } else {
          setStageProgress(prev => ({ ...prev, [stage.id]: progress }));
        }
      }, interval);
    });
  }, [stages, isPaused]);

  const startPipeline = useCallback(async () => {
    if (isRunning) return;

    setIsRunning(true);
    setIsPaused(false);
    setIsCompleted(false);

    for (let i = currentStageIndex; i < stages.length; i++) {
      if (isPaused) {
        setCurrentStageIndex(i);
        break;
      }

      await processStage(i);

      if (i === stages.length - 1) {
        setIsRunning(false);
        setIsCompleted(true);
        setTimeout(() => {
          alert('🎉 Pipeline completed successfully!\n\nSample ARC-2024-003 has been fully processed.\n\nResults are now available for review.');
        }, 1000);
      }
    }
  }, [currentStageIndex, stages.length, processStage, isRunning, isPaused]);

  const pausePipeline = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
  }, []);

  const resetPipeline = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    setCurrentStageIndex(1);
    setStageProgress({});
    setCompletedStages(new Set(['collection']));
  }, []);

  return {
    stages,
    currentStageIndex,
    isRunning,
    isPaused,
    isCompleted,
    stageProgress,
    completedStages,
    startPipeline,
    pausePipeline,
    resetPipeline
  };
};

// Main Pipeline Component
const Pipeline = ({ onBack, onClose }) => {
  const {
    stages,
    currentStageIndex,
    isRunning,
    isPaused,
    isCompleted,
    stageProgress,
    completedStages,
    startPipeline,
    pausePipeline,
    resetPipeline
  } = usePipelineManager();

  const [selectedStage, setSelectedStage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStageClick = (stageId) => {
    setSelectedStage(stageId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStage(null);
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  const handleBackFromResults = () => {
    setShowResults(false);
  };

  const sampleInfo = {
    id: 'ARC-2024-003',
    name: 'Arctic Ocean Deep Sample',
    location: 'Beaufort Sea',
    depth: '3,247m',
    temperature: '1.2°C',
    collectionDate: '2024-12-11',
    collector: 'Dr. Sarah Chen'
  };

  // Show Results Page if completed and user clicked view results
  if (showResults) {
    return <ResultsPage sampleData={sampleInfo} onBack={handleBackFromResults} />;
  }

  return (
    <div className="pipeline-container">
      {/* Header */}
      <div className="pipeline-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="pipeline-title">
          <h1>Pipeline Workflow</h1>
          <p className="sample-name">{sampleInfo.name}</p>
        </div>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Pipeline Workflow - Always Horizontal */}
      <div className="pipeline-workflow">
        <div className="stage-container horizontal">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <PipelineStage
                stage={stage}
                isActive={index === currentStageIndex && isRunning}
                isCompleted={completedStages.has(stage.id)}
                progress={stageProgress[stage.id] || 0}
                onClick={handleStageClick}
              />
              {index < stages.length - 1 && (
                <div className={`connector-line ${
                  completedStages.has(stages[index + 1].id) ? 'active' : ''
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Sample Information */}
      <div className="sample-info">
        <div className="info-card">
          <h3>Sample Details</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Sample ID:</label>
              <span>{sampleInfo.id}</span>
            </div>
            <div className="info-item">
              <label>Location:</label>
              <span>{sampleInfo.location}</span>
            </div>
            <div className="info-item">
              <label>Depth:</label>
              <span>{sampleInfo.depth}</span>
            </div>
            <div className="info-item">
              <label>Temperature:</label>
              <span>{sampleInfo.temperature}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="pipeline-controls">
        {!isCompleted ? (
          <>
            <button 
              className="btn start-btn" 
              onClick={startPipeline}
              disabled={isRunning && !isPaused}
            >
              <i className="fas fa-play"></i> 
              {isPaused ? 'Resume' : isRunning ? 'Running...' : 'Start Processing'}
            </button>

            {isRunning && (
              <button className="btn pause-btn" onClick={pausePipeline}>
                <i className="fas fa-pause"></i> Pause
              </button>
            )}

            <button className="btn reset-btn" onClick={resetPipeline}>
              <i className="fas fa-redo"></i> Reset
            </button>
          </>
        ) : (
          <button className="btn results-btn" onClick={handleViewResults}>
            <i className="fas fa-chart-line"></i> View Results
          </button>
        )}
      </div>

      {/* Stage Detail Modal */}
      <StageModal
        stage={selectedStage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Pipeline;