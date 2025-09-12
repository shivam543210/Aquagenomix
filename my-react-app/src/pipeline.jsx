// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PipelinePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Get analysis data passed from Dashboard
//   const analysisData = location.state?.analysisData;
  
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [processingSubStep, setProcessingSubStep] = useState(0);

//   // Updated pipeline stages for eDNA analysis
//   const pipelineStages = [
//   {
//     id: 'upload',
//     name: 'File Processing',
//     icon: '📁',
//     status: 'pending',
//     duration: 2000, // Reduced from 3000 to 800ms
//     subProcesses: [
//       'File validation',
//       'Format verification', 
//       'Quality check',
//       'Metadata extraction',
//       'Preprocessing complete'
//     ]
//   },
//   {
//     id: 'extraction',
//     name: 'Sequence Extraction',
//     icon: '🧬',
//     status: 'pending',
//     duration: 3000, // Reduced from 4000 to 1000ms
//     subProcesses: [
//       'Reading FASTA/FASTQ',
//       'Sequence parsing',
//       'Quality filtering',
//       'Duplicate removal',
//       'Sequence preparation'
//     ]
//   },
//   {
//     id: 'sequencing',
//     name: 'Data Analysis',
//     icon: '📊',
//     status: 'pending',
//     duration: 200, // Reduced from 5000 to 1200ms
//     subProcesses: [
//       'Sequence alignment',
//       'Database matching',
//       'Pattern recognition',
//       'Statistical analysis',
//       'Data compilation'
//     ]
//   },
//   {
//     id: 'classification',
//     name: 'AI Classification',
//     icon: '🤖',
//     status: 'pending',
//     duration: 3000, // Reduced from 4500 to 1000ms
//     subProcesses: [
//       'Model initialization',
//       'Feature extraction',
//       'Neural network analysis',
//       'Confidence scoring',
//       'Taxonomy assignment'
//     ]
//   },
//   {
//     id: 'results',
//     name: 'Results Generation',
//     icon: '📋',
//     status: 'pending',
//     duration: 1000, // Reduced from 3000 to 800ms
//     subProcesses: [
//       'Data validation',
//       'Report generation',
//       'Visualization creation',
//       'Export preparation',
//       'Analysis complete'
//     ]
//   }
// ];

//   // Use actual project data if available, otherwise use defaults
//   const sampleDetails = {
//     projectName: analysisData?.projectName || 'Unknown Project',
//     fileName: analysisData?.fileName || 'Unknown File',
//     uploadDate: analysisData?.uploadDate ? new Date(analysisData.uploadDate).toLocaleDateString() : new Date().toLocaleDateString(),
//     projectId: analysisData?.id || 'N/A',
//     description: analysisData?.description || 'No description provided',
//     status: analysisData?.status || 'Processing',
//     fileSize: analysisData?.fileSize || 'Unknown',
//     analysisType: 'eDNA Classification',
//     estimatedTime: '15-20 minutes'
//   };

//   const [stages, setStages] = useState(pipelineStages);

//   // Redirect back to dashboard if no analysis data
//   useEffect(() => {
//     if (!analysisData) {
//       console.log('No analysis data found, redirecting to dashboard');
//       navigate('/dashboard');
//     }
//   }, [analysisData, navigate]);

//   // Auto-start processing when component mounts (if analysis data exists)
//   useEffect(() => {
//     if (analysisData && !isProcessing && !isCompleted) {
//       // Auto-start after a brief delay
//       const timer = setTimeout(() => {
//         startProcessing();
//       }, 300);
      
//       return () => clearTimeout(timer);
//     }
//   }, [analysisData]);

//   useEffect(() => {
//     if (isProcessing && currentStep < stages.length) {
//       const currentStageSubProcesses = stages[currentStep].subProcesses;
//       const subStepInterval = stages[currentStep].duration / currentStageSubProcesses.length;

//       const processSubSteps = () => {
//         let subStep = 0;
//         const subStepTimer = setInterval(() => {
//           setProcessingSubStep(subStep);
//           subStep++;
          
//           if (subStep >= currentStageSubProcesses.length) {
//             clearInterval(subStepTimer);
            
//             // Update stage status to completed
//             setStages(prev => 
//               prev.map((stage, index) => 
//                 index === currentStep 
//                   ? { ...stage, status: 'completed' }
//                   : stage
//               )
//             );

//             // Move to next step after a brief delay
//             setTimeout(() => {
//               if (currentStep < stages.length - 1) {
//                 setCurrentStep(prev => prev + 1);
//                 setProcessingSubStep(0);
//               } else {
//                 // All stages completed
//                 setIsProcessing(false);
//                 setIsCompleted(true);
//                 setProcessingSubStep(0);
//               }
//             }, 800);
//           }
//         }, subStepInterval);
//       };

//       // Update current stage to processing
//       setStages(prev => 
//         prev.map((stage, index) => 
//           index === currentStep 
//             ? { ...stage, status: 'processing' }
//             : stage
//         )
//       );

//       processSubSteps();
//     }
//   }, [isProcessing, currentStep, stages.length]);

//   const startProcessing = () => {
//     setIsProcessing(true);
//     setIsCompleted(false);
//     setCurrentStep(0);
//     setProcessingSubStep(0);
//     setShowResults(false);
//     setStages(pipelineStages.map(stage => ({ ...stage, status: 'pending' })));
//   };

//   const handleClose = () => {
//     // Navigate back to dashboard
//     navigate('/dashboard');
//   };

//   const handleViewResults = () => {
//     // Navigate to results page with project data
//     navigate(`/results/${analysisData.id}`, {
//       state: { 
//         projectData: {
//           id: analysisData.id,
//           projectName: analysisData.projectName,
//           fileName: analysisData.fileName,
//           status: 'Completed',
//           submissionDate: new Date(analysisData.uploadDate).toISOString().split('T')[0],
//           sequenceCount: Math.floor(Math.random() * 10000) + 1000, // Simulated
//           speciesFound: Math.floor(Math.random() * 50) + 10, // Simulated
//           averageConfidence: (Math.random() * 20 + 80).toFixed(1), // Simulated 80-100%
//         },
//         analysisId: analysisData.id
//       }
//     });
//   };

//   const getStageStatus = (index) => {
//     if (index < currentStep) return 'completed';
//     if (index === currentStep && isProcessing) return 'processing';
//     if (index === currentStep && isCompleted && index === stages.length - 1) return 'completed';
//     return 'pending';
//   };

//   const getProgress = (index) => {
//     if (index < currentStep) return 100;
//     if (index === currentStep && isProcessing) {
//       const totalSubProcesses = stages[index].subProcesses.length;
//       return ((processingSubStep + 1) / totalSubProcesses) * 100;
//     }
//     if (index === currentStep && isCompleted && index === stages.length - 1) return 100;
//     return 0;
//   };

//   const getSubProcessStatus = (stageIndex, subProcessIndex) => {
//     if (stageIndex < currentStep) return 'completed';
//     if (stageIndex === currentStep) {
//       if (isProcessing && subProcessIndex <= processingSubStep) return 'completed';
//       if (isProcessing && subProcessIndex === processingSubStep + 1) return 'active';
//       if (isCompleted && stageIndex === stages.length - 1) return 'completed';
//     }
//     return 'pending';
//   };

//   // Don't render if no analysis data
//   if (!analysisData) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.errorMessage}>
//           <h2>No Analysis Data Found</h2>
//           <p>Redirecting to dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <style>{`
//         @keyframes pulse {
//           0% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.05); opacity: 0.8; }
//           100% { transform: scale(1); opacity: 1; }
//         }

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes progressFill {
//           from { width: 0%; }
//           to { width: var(--progress-width); }
//         }

//         @keyframes glow {
//           0% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.3); }
//           50% { box-shadow: 0 0 40px rgba(33, 150, 243, 0.6); }
//           100% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.3); }
//         }

//         @keyframes sparkle {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         .processing {
//           animation: pulse 2s infinite, glow 2s infinite;
//         }

//         .completed-animation {
//           animation: slideIn 0.5s ease-out;
//         }

//         .progress-bar-fill {
//           animation: progressFill 0.3s ease-out forwards;
//         }

//         .sparkle-effect {
//           background: linear-gradient(
//             90deg,
//             rgba(33, 150, 243, 0.1) 0%,
//             rgba(33, 150, 243, 0.3) 50%,
//             rgba(33, 150, 243, 0.1) 100%
//           );
//           background-size: 200% 100%;
//           animation: sparkle 2s infinite;
//         }

//         .hover-effect:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 30px rgba(33, 150, 243, 0.4);
//           transition: all 0.3s ease;
//         }

//         .sub-process-item {
//           opacity: 0.6;
//           transition: all 0.3s ease;
//         }

//         .sub-process-active {
//           opacity: 1;
//           color: #2196f3;
//           font-weight: 600;
//           transform: translateX(5px);
//         }

//         .sub-process-completed {
//           opacity: 1;
//           color: #4caf50;
//         }

//         .sub-process-pending {
//           opacity: 0.4;
//           color: #9ca3af;
//         }

//         .results-modal {
//           animation: slideIn 0.5s ease-out;
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .fade-in-up {
//           animation: fadeInUp 0.6s ease-out;
//         }

//         .connector-line {
//           background: linear-gradient(90deg, #333 0%, #2196f3 50%, #333 100%);
//           background-size: 200% 100%;
//           animation: sparkle 3s infinite;
//         }

//         .processing-spinner {
//           animation: spin 1s linear infinite;
//         }

//         .stage-card-processing {
//           border: 2px solid #ff9800 !important;
//           background: rgba(255, 152, 0, 0.15) !important;
//         }

//         .stage-card-completed {
//           border: 2px solid #4caf50 !important;
//           background: rgba(76, 175, 80, 0.15) !important;
//         }
//       `}</style>

//       {/* Header with Project Info */}
//       <div style={styles.header}>
//         <div style={styles.projectInfo}>
//           <h1 style={styles.title}>Processing: {sampleDetails.projectName}</h1>
//           <div style={styles.projectMeta}>
//             <span style={styles.metaItem}>📁 {sampleDetails.fileName}</span>
//             <span style={styles.metaItem}>📅 {sampleDetails.uploadDate}</span>
//             <span style={styles.metaItem}>🔬 {sampleDetails.analysisType}</span>
//           </div>
//         </div>
//         <div style={styles.headerButtons}>
//           {isCompleted && (
//             <>
//               <button
//                 style={styles.viewResultsBtn}
//                 className="hover-effect"
//                 onClick={handleViewResults}
//               >
//                 <span style={styles.buttonIcon}>📊</span>
//                 View Results
//               </button>
//               <button
//                 style={styles.closeBtn}
//                 className="hover-effect"
//                 onClick={handleClose}
//               >
//                 <span style={styles.buttonIcon}>🏠</span>
//                 Back to Dashboard
//               </button>
//             </>
//           )}
//           {!isProcessing && !isCompleted && (
//             <button
//               style={styles.startBtn}
//               className="hover-effect"
//               onClick={startProcessing}
//             >
//               <span style={styles.buttonIcon}>▶️</span>
//               Start Processing
//             </button>
//           )}
//           {isProcessing && (
//             <button
//               style={styles.cancelBtn}
//               className="hover-effect"
//               onClick={handleClose}
//             >
//               <span style={styles.buttonIcon}>✕</span>
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Pipeline Container */}
//       <div style={styles.pipelineContainer} className="fade-in-up">
//         <div style={styles.pipelineStages}>
//           {stages.map((stage, index) => (
//             <React.Fragment key={stage.id}>
//               <div 
//                 style={{
//                   ...styles.stage,
//                   ...(getStageStatus(index) === 'processing' && styles.processingStage),
//                   ...(getStageStatus(index) === 'completed' && styles.completedStage)
//                 }}
//                 className={`
//                   ${getStageStatus(index) === 'processing' ? 'processing' : ''}
//                   ${getStageStatus(index) === 'completed' ? 'completed-animation' : ''}
//                   hover-effect
//                 `}
//               >
//                 <div 
//                   style={styles.stageCard}
//                   className={`
//                     ${getStageStatus(index) === 'processing' ? 'stage-card-processing' : ''}
//                     ${getStageStatus(index) === 'completed' ? 'stage-card-completed' : ''}
//                   `}
//                 >
//                   {/* Stage Icon */}
//                   <div style={{
//                     ...styles.stageIcon,
//                     ...(getStageStatus(index) === 'processing' && styles.processingIcon),
//                     ...(getStageStatus(index) === 'completed' && styles.completedIcon)
//                   }}>
//                     <span 
//                       style={styles.iconText}
//                       className={getStageStatus(index) === 'processing' ? 'processing-spinner' : ''}
//                     >
//                       {stage.icon}
//                     </span>
//                   </div>

//                   {/* Stage Name */}
//                   <h3 style={styles.stageName}>{stage.name}</h3>

//                   {/* Status Badge */}
//                   <div style={{
//                     ...styles.statusBadge,
//                     ...(getStageStatus(index) === 'processing' && styles.processingBadge),
//                     ...(getStageStatus(index) === 'completed' && styles.completedBadge)
//                   }}>
//                     {getStageStatus(index) === 'processing' ? 'PROCESSING' : 
//                      getStageStatus(index) === 'completed' ? 'COMPLETED' : 'PENDING'}
//                   </div>

//                   {/* Sub Processes */}
//                   <div style={styles.subProcesses}>
//                     {stage.subProcesses.map((process, subIndex) => {
//                       const subStatus = getSubProcessStatus(index, subIndex);
//                       return (
//                         <div 
//                           key={subIndex}
//                           className={`
//                             sub-process-item
//                             ${subStatus === 'active' ? 'sub-process-active' : ''}
//                             ${subStatus === 'completed' ? 'sub-process-completed' : ''}
//                             ${subStatus === 'pending' ? 'sub-process-pending' : ''}
//                           `}
//                           style={styles.subProcess}
//                         >
//                           <span style={{
//                             ...styles.subProcessIcon,
//                             ...(subStatus === 'completed' && styles.completedSubProcessIcon),
//                             ...(subStatus === 'active' && styles.activeSubProcessIcon),
//                             ...(subStatus === 'pending' && styles.pendingSubProcessIcon)
//                           }}>
//                             {subStatus === 'completed' ? '✓' : 
//                              subStatus === 'active' ? '●' : '○'}
//                           </span>
//                           <span style={styles.subProcessText}>{process}</span>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* Progress Bar */}
//                   <div style={styles.progressBar}>
//                     <div 
//                       style={{
//                         ...styles.progressFill,
//                         width: `${getProgress(index)}%`,
//                         ...(getStageStatus(index) === 'processing' && styles.processingProgress),
//                         ...(getStageStatus(index) === 'completed' && styles.completedProgress)
//                       }}
//                       className={getStageStatus(index) === 'processing' ? 'sparkle-effect' : ''}
//                     ></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Connector Line */}
//               {index < stages.length - 1 && (
//                 <div style={{
//                   ...styles.connector,
//                   ...(index < currentStep && styles.completedConnector)
//                 }} className="connector-line"></div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {/* Sample Details */}
//       <div style={styles.sampleDetails} className="fade-in-up">
//         <h2 style={styles.detailsTitle}>Analysis Information</h2>
//         <div style={styles.detailsGrid}>
//           {Object.entries(sampleDetails).map(([key, value]) => (
//             <div key={key} style={styles.detailItem} className="hover-effect">
//               <span style={styles.detailLabel}>
//                 {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
//               </span>
//               <span style={styles.detailValue}>{value}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Processing Status Overlay */}
//       {isProcessing && (
//         <div style={styles.statusOverlay}>
//           <div style={styles.statusCard}>
//             <div style={styles.processingSpinner} className="processing-spinner">⚡</div>
//             <h3 style={styles.statusTitle}>Processing {sampleDetails.projectName}</h3>
//             <p style={styles.statusText}>
//               <strong>{stages[currentStep]?.name}</strong>
//               <br />
//               {stages[currentStep]?.subProcesses[processingSubStep]}
//             </p>
//             <div style={styles.overallProgress}>
//               <div 
//                 style={{
//                   ...styles.overallProgressFill,
//                   width: `${((currentStep + (processingSubStep + 1) / stages[currentStep]?.subProcesses.length) / stages.length) * 100}%`
//                 }}
//                 className="progress-bar-fill sparkle-effect">
//               </div>
//             </div>
//             <div style={styles.progressText}>
//               {Math.round(((currentStep + (processingSubStep + 1) / stages[currentStep]?.subProcesses.length) / stages.length) * 100)}% Complete
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Results Modal */}
//       {showResults && (
//         <div style={styles.modal} onClick={() => setShowResults(false)}>
//           <div style={styles.modalContent} className="results-modal" onClick={e => e.stopPropagation()}>
//             <div style={styles.modalHeader}>
//               <h2 style={styles.modalTitle}>🎉 Analysis Complete - {sampleDetails.projectName}</h2>
//               <button style={styles.modalClose} onClick={() => setShowResults(false)}>✕</button>
//             </div>
//             <div style={styles.modalBody}>
//               <div style={styles.resultsGrid}>
//                 <div style={styles.resultCard} className="hover-effect">
//                   <h3 style={styles.resultTitle}>Species Identified</h3>
//                   <div style={styles.resultValue}>{Math.floor(Math.random() * 50) + 10}</div>
//                   <div style={styles.resultSubtext}>Marine organisms detected</div>
//                 </div>
//                 <div style={styles.resultCard} className="hover-effect">
//                   <h3 style={styles.resultTitle}>Confidence Score</h3>
//                   <div style={styles.resultValue}>{(Math.random() * 20 + 80).toFixed(1)}%</div>
//                   <div style={styles.resultSubtext}>Classification accuracy</div>
//                 </div>
//                 <div style={styles.resultCard} className="hover-effect">
//                   <h3 style={styles.resultTitle}>Processing Time</h3>
//                   <div style={styles.resultValue}>18.5s</div>
//                   <div style={styles.resultSubtext}>Total analysis duration</div>
//                 </div>
//                 <div style={styles.resultCard} className="hover-effect">
//                   <h3 style={styles.resultTitle}>Data Quality</h3>
//                   <div style={styles.resultValue}>Excellent</div>
//                   <div style={styles.resultSubtext}>Q30 score: 95.7%</div>
//                 </div>
//               </div>
              
//               <div style={styles.actionButtons}>
//                 <button style={styles.downloadBtn} className="hover-effect" onClick={handleViewResults}>
//                   📊 View Full Results
//                 </button>
//                 <button style={styles.exportBtn} className="hover-effect" onClick={handleClose}>
//                   🏠 Back to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Updated styles with new elements
// const styles = {
//   container: {
//     background: 'linear-gradient(135deg, #0d1421 0%, #1a2332 50%, #0d1421 100%)',
//     minHeight: '100vh',
//     padding: '2rem',
//     fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     color: '#ffffff',
//     position: 'relative',
//   },

//   errorMessage: {
//     textAlign: 'center',
//     padding: '4rem',
//     background: 'rgba(244, 67, 54, 0.1)',
//     borderRadius: '12px',
//     border: '1px solid rgba(244, 67, 54, 0.3)',
//   },

//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '3rem',
//     flexWrap: 'wrap',
//     gap: '1rem',
//   },

//   projectInfo: {
//     flex: 1,
//   },

//   title: {
//     fontSize: '2.2rem',
//     fontWeight: '700',
//     background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
//     backgroundClip: 'text',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     margin: '0 0 1rem 0',
//     letterSpacing: '-0.5px',
//   },

//   projectMeta: {
//     display: 'flex',
//     gap: '1.5rem',
//     flexWrap: 'wrap',
//   },

//   metaItem: {
//     fontSize: '0.9rem',
//     color: '#9ca3af',
//     padding: '0.5rem 1rem',
//     background: 'rgba(255, 255, 255, 0.08)',
//     borderRadius: '8px',
//     border: '1px solid rgba(255, 255, 255, 0.15)',
//   },

//   headerButtons: {
//     display: 'flex',
//     gap: '1rem',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },

//   startBtn: {
//     background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
//     color: 'white',
//     border: 'none',
//     padding: '0.875rem 1.75rem',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
//   },

//   viewResultsBtn: {
//     background: 'linear-gradient(135deg, #2196f3, #1976d2)',
//     color: 'white',
//     border: 'none',
//     padding: '0.875rem 1.75rem',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
//   },

//   closeBtn: {
//     background: 'linear-gradient(135deg, #6c757d, #495057)',
//     color: 'white',
//     border: 'none',
//     padding: '0.875rem 1.75rem',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)',
//   },

//   cancelBtn: {
//     background: 'linear-gradient(135deg, #f44336, #d32f2f)',
//     color: 'white',
//     border: 'none',
//     padding: '0.875rem 1.75rem',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
//   },

//   buttonIcon: {
//     fontSize: '1.1rem',
//   },

//   pipelineContainer: {
//     background: 'rgba(42, 52, 65, 0.95)',
//     backdropFilter: 'blur(1px)',
//     borderRadius: '20px',
//     padding: '3rem',
//     marginBottom: '2.5rem',
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
//     border: '1px solid rgba(255, 255, 255, 0.15)',
//   },

//   pipelineStages: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     gap: '1rem',
//     overflowX: 'auto',
//     padding: '1rem 0',
//   },

//   stage: {
//     flex: '1',
//     minWidth: '240px',
//     position: 'relative',
//     transition: 'all 0.3s ease',
//   },

//   processingStage: {
//     transform: 'scale(1.05)',
//   },

//   completedStage: {
//     transform: 'scale(1.02)',
//   },

//   stageCard: {
//     background: 'rgba(33, 150, 243, 0.12)',
//     border: '2px solid rgba(33, 150, 243, 0.4)',
//     borderRadius: '16px',
//     padding: '2rem',
//     textAlign: 'center',
//     transition: 'all 0.3s ease',
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     backdropFilter: 'blur(2px)',
//   },

//   stageIcon: {
//     width: '80px',
//     height: '80px',
//     borderRadius: '50%',
//     background: 'linear-gradient(135deg, #2196f3, #1976d2)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '0 auto 1.5rem auto',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
//   },

//   processingIcon: {
//     background: 'linear-gradient(135deg, #ff9800, #f57400)',
//     boxShadow: '0 4px 20px rgba(255, 152, 0, 0.6)',
//   },

//   completedIcon: {
//     background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
//     boxShadow: '0 4px 20px rgba(76, 175, 80, 0.6)',
//   },

//   iconText: {
//     fontSize: '2rem',
//     color: 'white',
//   },

//   stageName: {
//     fontSize: '1.25rem',
//     fontWeight: '700',
//     color: '#ffffff',
//     margin: '0 0 1rem 0',
//     letterSpacing: '0.5px',
//   },

//   statusBadge: {
//     display: 'inline-block',
//     padding: '0.375rem 1rem',
//     borderRadius: '20px',
//     fontSize: '0.75rem',
//     fontWeight: '700',
//     letterSpacing: '1px',
//     marginBottom: '1.5rem',
//     textTransform: 'uppercase',
//     background: 'rgba(255, 255, 255, 0.15)',
//     color: '#ffffff',
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//   },

//   processingBadge: {
//     background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.25), rgba(245, 124, 0, 0.25))',
//     color: '#ff9800',
//     border: '1px solid #ff9800',
//   },

//   completedBadge: {
//     background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.25), rgba(46, 125, 50, 0.25))',
//     color: '#4caf50',
//     border: '1px solid #4caf50',
//   },

//   subProcesses: {
//     flex: 1,
//     textAlign: 'left',
//     marginBottom: '1.5rem',
//   },

//   subProcess: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.75rem',
//     padding: '0.5rem 0',
//     fontSize: '0.9rem',
//     color: '#e0e0e0',
//     transition: 'all 0.3s ease',
//   },

//   subProcessIcon: {
//     width: '16px',
//     height: '16px',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '0.7rem',
//     flexShrink: 0,
//     fontWeight: 'bold',
//   },

//   completedSubProcessIcon: {
//     color: '#4caf50',
//     background: 'rgba(76, 175, 80, 0.1)',
//   },

//   activeSubProcessIcon: {
//     color: '#2196f3',
//     background: 'rgba(33, 150, 243, 0.1)',
//   },

//   pendingSubProcessIcon: {
//     color: '#9ca3af',
//     background: 'rgba(156, 163, 175, 0.1)',
//   },

//   subProcessText: {
//     lineHeight: '1.4',
//   },

//   progressBar: {
//     width: '100%',
//     height: '8px',
//     background: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: '4px',
//     overflow: 'hidden',
//     marginTop: 'auto',
//   },

//   progressFill: {
//     height: '100%',
//     background: 'linear-gradient(90deg, #2196f3, #00bcd4)',
//     borderRadius: '4px',
//     transition: 'width 0.5s ease',
//   },

//   processingProgress: {
//     background: 'linear-gradient(90deg, #ff9800, #f57400)',
//   },

//   completedProgress: {
//     background: 'linear-gradient(90deg, #4caf50, #2e7d32)',
//   },

//   connector: {
//     width: '60px',
//     height: '3px',
//     background: 'rgba(255, 255, 255, 0.2)',
//     margin: '120px 0 0 0',
//     position: 'relative',
//     flexShrink: 0,
//     borderRadius: '2px',
//     transition: 'all 0.3s ease',
//   },

//   completedConnector: {
//     background: 'linear-gradient(90deg, #4caf50, #2e7d32)',
//   },

//   sampleDetails: {
//     background: 'rgba(42, 52, 65, 0.95)',
//     backdropFilter: 'blur(3px)',
//     borderRadius: '20px',
//     padding: '2.5rem',
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
//     border: '1px solid rgba(255, 255, 255, 0.15)',
//   },

//   detailsTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#ffffff',
//     margin: '0 0 2rem 0',
//     background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
//     backgroundClip: 'text',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//   },

//   detailsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//     gap: '1.5rem',
//   },

//   detailItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '1rem',
//     background: 'rgba(255, 255, 255, 0.08)',
//     borderRadius: '12px',
//     border: '1px solid rgba(255, 255, 255, 0.15)',
//     transition: 'all 0.3s ease',
//   },

//   detailLabel: {
//     color: '#9ca3af',
//     fontWeight: '600',
//     fontSize: '0.95rem',
//   },

//   detailValue: {
//     color: '#ffffff',
//     fontWeight: '700',
//     fontSize: '0.95rem',
//   },

//   statusOverlay: {
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     right: '0',
//     bottom: '0',
//     background: 'rgba(0, 0, 0, 0.85)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//     backdropFilter: 'blur(2px)',
//   },

//   statusCard: {
//     background: 'rgba(42, 52, 65, 0.98)',
//     backdropFilter: 'blur(5px)',
//     borderRadius: '20px',
//     padding: '3rem',
//     textAlign: 'center',
//     maxWidth: '400px',
//     width: '90%',
//     border: '1px solid rgba(255, 255, 255, 0.2)',
//     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
//   },

//   processingSpinner: {
//     fontSize: '3rem',
//     marginBottom: '1.5rem',
//   },

//   statusTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#ffffff',
//     margin: '0 0 1rem 0',
//   },

//   statusText: {
//     fontSize: '1rem',
//     color: '#e0e0e0',
//     margin: '0 0 2rem 0',
//     lineHeight: '1.5',
//   },

//   overallProgress: {
//     width: '100%',
//     height: '8px',
//     background: 'rgba(255, 255, 255, 0.15)',
//     borderRadius: '4px',
//     overflow: 'hidden',
//     marginBottom: '1rem',
//   },

//   overallProgressFill: {
//     height: '100%',
//     background: 'linear-gradient(90deg, #2196f3, #00bcd4)',
//     borderRadius: '4px',
//     transition: 'width 0.3s ease',
//   },

//   progressText: {
//     fontSize: '0.9rem',
//     color: '#9ca3af',
//     fontWeight: '600',
//   },

//   modal: {
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     right: '0',
//     bottom: '0',
//     background: 'rgba(0, 0, 0, 0.85)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//     backdropFilter: 'blur(2px)',
//   },

//   modalContent: {
//     background: 'rgba(42, 52, 65, 0.98)',
//     backdropFilter: 'blur(5px)',
//     borderRadius: '20px',
//     maxWidth: '600px',
//     width: '90%',
//     maxHeight: '80vh',
//     overflow: 'auto',
//     border: '1px solid rgba(255, 255, 255, 0.2)',
//     boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
//   },

//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '2rem 2rem 1rem 2rem',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
//   },

//   modalTitle: {
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#ffffff',
//     margin: '0',
//   },

//   modalClose: {
//     background: 'rgba(244, 67, 54, 0.2)',
//     border: '1px solid rgba(244, 67, 54, 0.5)',
//     color: '#ffffff',
//     fontSize: '1.5rem',
//     cursor: 'pointer',
//     padding: '0.5rem',
//     borderRadius: '50%',
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'all 0.3s ease',
//   },

//   modalBody: {
//     padding: '2rem',
//   },

//   resultsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '1.5rem',
//     marginBottom: '2rem',
//   },

//   resultCard: {
//     background: 'rgba(33, 150, 243, 0.15)',
//     borderRadius: '12px',
//     padding: '1.5rem',
//     textAlign: 'center',
//     border: '1px solid rgba(33, 150, 243, 0.3)',
//     transition: 'all 0.3s ease',
//   },

//   resultTitle: {
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     color: '#9ca3af',
//     margin: '0 0 0.5rem 0',
//     textTransform: 'uppercase',
//     letterSpacing: '1px',
//   },

//   resultValue: {
//     fontSize: '1.75rem',
//     fontWeight: '700',
//     color: '#2196f3',
//     margin: '0 0 0.25rem 0',
//   },

//   resultSubtext: {
//     fontSize: '0.8rem',
//     color: '#9ca3af',
//     margin: '0',
//   },

//   actionButtons: {
//     display: 'flex',
//     gap: '1rem',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//   },

//   downloadBtn: {
//     background: 'linear-gradient(135deg, #2196f3, #1976d2)',
//     color: 'white',
//     border: 'none',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '10px',
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
//   },

//   exportBtn: {
//     background: 'linear-gradient(135deg, #6c757d, #495057)',
//     color: 'white',
//     border: 'none',
//     padding: '0.75rem 1.5rem',
//     borderRadius: '10px',
//     fontSize: '0.9rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)',
//   },
// };

// export default PipelinePage;
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PipelinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get analysis data passed from Dashboard
  const analysisData = location.state?.analysisData;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [processingSubStep, setProcessingSubStep] = useState(0);

  // Updated pipeline stages for longer processing (10+ seconds)
  const pipelineStages = [
    {
      id: 'upload',
      name: 'File Processing',
      icon: '📁',
      status: 'pending',
      duration: 2000, // 2 seconds
      subProcesses: [
        'File validation',
        'Format verification', 
        'Quality check',
        'Metadata extraction',
        'Preprocessing complete'
      ]
    },
    {
      id: 'extraction',
      name: 'Sequence Extraction',
      icon: '🧬',
      status: 'pending',
      duration: 2000, // 2 seconds
      subProcesses: [
        'Reading FASTA/FASTQ',
        'Sequence parsing',
        'Quality filtering',
        'Duplicate removal',
        'Sequence preparation'
      ]
    },
    {
      id: 'sequencing',
      name: 'Data Analysis',
      icon: '📊',
      status: 'pending',
      duration: 2500, // 2.5 seconds
      subProcesses: [
        'Sequence alignment',
        'Database matching',
        'Pattern recognition',
        'Statistical analysis',
        'Data compilation'
      ]
    },
    {
      id: 'classification',
      name: 'AI Classification',
      icon: '🤖',
      status: 'pending',
      duration: 2000, // 2 seconds
      subProcesses: [
        'Model initialization',
        'Feature extraction',
        'Neural network analysis',
        'Confidence scoring',
        'Taxonomy assignment'
      ]
    },
    {
      id: 'results',
      name: 'Results Generation',
      icon: '📋',
      status: 'pending',
      duration: 1500, // 1.5 seconds
      subProcesses: [
        'Data validation',
        'Report generation',
        'Visualization creation',
        'Export preparation',
        'Analysis complete'
      ]
    }
  ];

  // Use actual project data if available, otherwise use defaults
  const sampleDetails = {
    projectName: analysisData?.projectName || 'Unknown Project',
    fileName: analysisData?.fileName || 'Unknown File',
    uploadDate: analysisData?.uploadDate ? new Date(analysisData.uploadDate).toLocaleDateString() : new Date().toLocaleDateString(),
    projectId: analysisData?.id || 'N/A',
    description: analysisData?.description || 'No description provided',
    status: analysisData?.status || 'Processing',
    fileSize: analysisData?.fileSize || 'Unknown',
    analysisType: 'eDNA Classification',
    estimatedTime: '10-12 seconds'
  };

  const [stages, setStages] = useState(pipelineStages);

  // Redirect back to dashboard if no analysis data
  useEffect(() => {
    if (!analysisData) {
      console.log('No analysis data found, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [analysisData, navigate]);

  // Auto-start processing when component mounts (if analysis data exists)
  useEffect(() => {
    if (analysisData && !isProcessing && !isCompleted) {
      // Auto-start after a brief delay
      const timer = setTimeout(() => {
        startProcessing();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [analysisData]);

  useEffect(() => {
    if (isProcessing && currentStep < stages.length) {
      const currentStageSubProcesses = stages[currentStep].subProcesses;
      const subStepInterval = stages[currentStep].duration / currentStageSubProcesses.length;

      const processSubSteps = () => {
        let subStep = 0;
        const subStepTimer = setInterval(() => {
          setProcessingSubStep(subStep);
          subStep++;
          
          if (subStep >= currentStageSubProcesses.length) {
            clearInterval(subStepTimer);
            
            // Update stage status to completed
            setStages(prev => 
              prev.map((stage, index) => 
                index === currentStep 
                  ? { ...stage, status: 'completed' }
                  : stage
              )
            );

            // Move to next step after a brief delay
            setTimeout(() => {
              if (currentStep < stages.length - 1) {
                setCurrentStep(prev => prev + 1);
                setProcessingSubStep(0);
              } else {
                // All stages completed
                setIsProcessing(false);
                setIsCompleted(true);
                setShowResults(true);
                setProcessingSubStep(0);
              }
            }, 200);
          }
        }, subStepInterval);
      };

      // Update current stage to processing
      setStages(prev => 
        prev.map((stage, index) => 
          index === currentStep 
            ? { ...stage, status: 'processing' }
            : stage
        )
      );

      processSubSteps();
    }
  }, [isProcessing, currentStep, stages.length]);

  const startProcessing = () => {
    setIsProcessing(true);
    setIsCompleted(false);
    setCurrentStep(0);
    setProcessingSubStep(0);
    setShowResults(false);
    setStages(pipelineStages.map(stage => ({ ...stage, status: 'pending' })));
  };

  const handleClose = () => {
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  const handleViewResults = () => {
    // Navigate to results page with project data
    navigate(`/results/${analysisData.id}`, {
      state: { 
        projectData: {
          id: analysisData.id,
          projectName: analysisData.projectName,
          fileName: analysisData.fileName,
          status: 'Completed',
          submissionDate: new Date(analysisData.uploadDate).toISOString().split('T')[0],
          sequenceCount: Math.floor(Math.random() * 10000) + 1000,
          speciesFound: Math.floor(Math.random() * 50) + 10,
          averageConfidence: (Math.random() * 20 + 80).toFixed(1),
        },
        analysisId: analysisData.id
      }
    });
  };

  const getStageStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep && isProcessing) return 'processing';
    if (index === currentStep && isCompleted && index === stages.length - 1) return 'completed';
    return 'pending';
  };

  const getProgress = (index) => {
    if (index < currentStep) return 100;
    if (index === currentStep && isProcessing) {
      const totalSubProcesses = stages[index].subProcesses.length;
      return ((processingSubStep + 1) / totalSubProcesses) * 100;
    }
    if (index === currentStep && isCompleted && index === stages.length - 1) return 100;
    return 0;
  };

  const getSubProcessStatus = (stageIndex, subProcessIndex) => {
    if (stageIndex < currentStep) return 'completed';
    if (stageIndex === currentStep) {
      if (isProcessing && subProcessIndex <= processingSubStep) return 'completed';
      if (isProcessing && subProcessIndex === processingSubStep + 1) return 'active';
      if (isCompleted && stageIndex === stages.length - 1) return 'completed';
    }
    return 'pending';
  };

  // Don't render if no analysis data
  if (!analysisData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorMessage}>
          <h2>No Analysis Data Found</h2>
          <p>Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes progressFill {
          from { width: 0%; }
          to { width: var(--progress-width); }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.3); }
          50% { box-shadow: 0 0 40px rgba(33, 150, 243, 0.6); }
          100% { box-shadow: 0 0 20px rgba(33, 150, 243, 0.3); }
        }

        @keyframes sparkle {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .processing {
          animation: pulse 2s infinite, glow 2s infinite;
        }

        .completed-animation {
          animation: slideIn 0.5s ease-out;
        }

        .progress-bar-fill {
          animation: progressFill 0.3s ease-out forwards;
        }

        .sparkle-effect {
          background: linear-gradient(
            90deg,
            rgba(33, 150, 243, 0.1) 0%,
            rgba(33, 150, 243, 0.3) 50%,
            rgba(33, 150, 243, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: sparkle 2s infinite;
        }

        .hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(33, 150, 243, 0.4);
          transition: all 0.3s ease;
        }

        .sub-process-item {
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .sub-process-active {
          opacity: 1;
          color: #2196f3;
          font-weight: 600;
          transform: translateX(5px);
        }

        .sub-process-completed {
          opacity: 1;
          color: #4caf50;
        }

        .sub-process-pending {
          opacity: 0.4;
          color: #9ca3af;
        }

        .processing-spinner {
          animation: spin 1s linear infinite;
        }

        .stage-card-processing {
          border: 2px solid #ff9800 !important;
          background: rgba(255, 152, 0, 0.15) !important;
        }

        .stage-card-completed {
          border: 2px solid #4caf50 !important;
          background: rgba(76, 175, 80, 0.15) !important;
        }
      `}</style>

      {/* Main Layout - Side by Side */}
      <div style={styles.mainLayout}>
        {/* Left Column - Pipeline Stages (60% width) */}
        <div style={styles.leftColumn}>
          {/* Header with Project Info */}
          <div style={styles.header}>
            <div style={styles.projectInfo}>
              <h1 style={styles.title}>Processing: {sampleDetails.projectName}</h1>
              <div style={styles.projectMeta}>
                <span style={styles.metaItem}>📁 {sampleDetails.fileName}</span>
                <span style={styles.metaItem}>📅 {sampleDetails.uploadDate}</span>
                <span style={styles.metaItem}>🔬 {sampleDetails.analysisType}</span>
              </div>
            </div>
            <div style={styles.headerButtons}>
              {isCompleted && (
                <>
                  <button
                    style={styles.viewResultsBtn}
                    className="hover-effect"
                    onClick={handleViewResults}
                  >
                    <span style={styles.buttonIcon}>📊</span>
                    View Results
                  </button>
                  <button
                    style={styles.closeBtn}
                    className="hover-effect"
                    onClick={handleClose}
                  >
                    <span style={styles.buttonIcon}>🏠</span>
                    Back to Dashboard
                  </button>
                </>
              )}
              {!isProcessing && !isCompleted && (
                <button
                  style={styles.startBtn}
                  className="hover-effect"
                  onClick={startProcessing}
                >
                  <span style={styles.buttonIcon}>▶️</span>
                  Start Processing
                </button>
              )}
              {isProcessing && (
                <button
                  style={styles.cancelBtn}
                  className="hover-effect"
                  onClick={handleClose}
                >
                  <span style={styles.buttonIcon}>✕</span>
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Pipeline Container */}
          <div style={styles.pipelineContainer} className="fade-in-up">
            <div style={styles.pipelineStages}>
              {stages.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  <div 
                    style={{
                      ...styles.stage,
                      ...(getStageStatus(index) === 'processing' && styles.processingStage),
                      ...(getStageStatus(index) === 'completed' && styles.completedStage)
                    }}
                    className={`
                      ${getStageStatus(index) === 'processing' ? 'processing' : ''}
                      ${getStageStatus(index) === 'completed' ? 'completed-animation' : ''}
                      hover-effect
                    `}
                  >
                    <div 
                      style={styles.stageCard}
                      className={`
                        ${getStageStatus(index) === 'processing' ? 'stage-card-processing' : ''}
                        ${getStageStatus(index) === 'completed' ? 'stage-card-completed' : ''}
                      `}
                    >
                      {/* Stage Icon */}
                      <div style={{
                        ...styles.stageIcon,
                        ...(getStageStatus(index) === 'processing' && styles.processingIcon),
                        ...(getStageStatus(index) === 'completed' && styles.completedIcon)
                      }}>
                        <span 
                          style={styles.iconText}
                          className={getStageStatus(index) === 'processing' ? 'processing-spinner' : ''}
                        >
                          {stage.icon}
                        </span>
                      </div>

                      {/* Stage Name */}
                      <h3 style={styles.stageName}>{stage.name}</h3>

                      {/* Status Badge */}
                      <div style={{
                        ...styles.statusBadge,
                        ...(getStageStatus(index) === 'processing' && styles.processingBadge),
                        ...(getStageStatus(index) === 'completed' && styles.completedBadge)
                      }}>
                        {getStageStatus(index) === 'processing' ? 'PROCESSING' : 
                         getStageStatus(index) === 'completed' ? 'COMPLETED' : 'PENDING'}
                      </div>

                      {/* Sub Processes */}
                      <div style={styles.subProcesses}>
                        {stage.subProcesses.map((process, subIndex) => {
                          const subStatus = getSubProcessStatus(index, subIndex);
                          return (
                            <div 
                              key={subIndex}
                              className={`
                                sub-process-item
                                ${subStatus === 'active' ? 'sub-process-active' : ''}
                                ${subStatus === 'completed' ? 'sub-process-completed' : ''}
                                ${subStatus === 'pending' ? 'sub-process-pending' : ''}
                              `}
                              style={styles.subProcess}
                            >
                              <span style={{
                                ...styles.subProcessIcon,
                                ...(subStatus === 'completed' && styles.completedSubProcessIcon),
                                ...(subStatus === 'active' && styles.activeSubProcessIcon),
                                ...(subStatus === 'pending' && styles.pendingSubProcessIcon)
                              }}>
                                {subStatus === 'completed' ? '✓' : 
                                 subStatus === 'active' ? '●' : '○'}
                              </span>
                              <span style={styles.subProcessText}>{process}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Progress Bar */}
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill,
                            width: `${getProgress(index)}%`,
                            ...(getStageStatus(index) === 'processing' && styles.processingProgress),
                            ...(getStageStatus(index) === 'completed' && styles.completedProgress)
                          }}
                          className={getStageStatus(index) === 'processing' ? 'sparkle-effect' : ''}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < stages.length - 1 && (
                    <div style={{
                      ...styles.connector,
                      ...(index < currentStep && styles.completedConnector)
                    }} className="connector-line"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Status & Info (40% width) */}
        <div style={styles.rightColumn}>
          {/* Current Processing Status */}
          {isProcessing && (
            <div style={styles.statusCard}>
              <div style={styles.processingSpinner} className="processing-spinner">⚡</div>
              <h3 style={styles.statusTitle}>Processing {sampleDetails.projectName}</h3>
              <p style={styles.statusText}>
                <strong>{stages[currentStep]?.name}</strong>
                <br />
                {stages[currentStep]?.subProcesses[processingSubStep]}
              </p>
              <div style={styles.overallProgress}>
                <div 
                  style={{
                    ...styles.overallProgressFill,
                    width: `${((currentStep + (processingSubStep + 1) / stages[currentStep]?.subProcesses.length) / stages.length) * 100}%`
                  }}
                  className="progress-bar-fill sparkle-effect">
                </div>
              </div>
              <div style={styles.progressText}>
                {Math.round(((currentStep + (processingSubStep + 1) / stages[currentStep]?.subProcesses.length) / stages.length) * 100)}% Complete
              </div>
            </div>
          )}

          {/* Sample Details */}
          <div style={styles.sampleDetails}>
            <h2 style={styles.detailsTitle}>Analysis Information</h2>
            <div style={styles.detailsGrid}>
              {Object.entries(sampleDetails).map(([key, value]) => (
                <div key={key} style={styles.detailItem} className="hover-effect">
                  <span style={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span style={styles.detailValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section - Visible when completed */}
          {showResults && (
            <div style={styles.resultsSection}>
              <div style={styles.resultsHeader}>
                <h2 style={styles.resultsTitle}>🎉 Analysis Complete!</h2>
              </div>
              <div style={styles.resultsGrid}>
                <div style={styles.resultCard} className="hover-effect">
                  <h3 style={styles.resultTitle}>Species Identified</h3>
                  <div style={styles.resultValue}>{Math.floor(Math.random() * 50) + 10}</div>
                  <div style={styles.resultSubtext}>Marine organisms detected</div>
                </div>
                <div style={styles.resultCard} className="hover-effect">
                  <h3 style={styles.resultTitle}>Confidence Score</h3>
                  <div style={styles.resultValue}>{(Math.random() * 20 + 80).toFixed(1)}%</div>
                  <div style={styles.resultSubtext}>Classification accuracy</div>
                </div>
                <div style={styles.resultCard} className="hover-effect">
                  <h3 style={styles.resultTitle}>Processing Time</h3>
                  <div style={styles.resultValue}>10.2s</div>
                  <div style={styles.resultSubtext}>Total analysis duration</div>
                </div>
                <div style={styles.resultCard} className="hover-effect">
                  <h3 style={styles.resultTitle}>Data Quality</h3>
                  <div style={styles.resultValue}>Excellent</div>
                  <div style={styles.resultSubtext}>Q30 score: 95.7%</div>
                </div>
              </div>
              
              <div style={styles.actionButtons}>
                <button style={styles.downloadBtn} className="hover-effect" onClick={handleViewResults}>
                  📊 View Full Results
                </button>
                <button style={styles.exportBtn} className="hover-effect" onClick={handleClose}>
                  🏠 Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Updated styles with side-by-side layout and no overlays
const styles = {
  container: {
    background: 'linear-gradient(135deg, #0d1421 0%, #1a2332 50%, #0d1421 100%)',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#ffffff',
    position: 'relative',
  },

  mainLayout: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    minHeight: '100vh',
  },

  leftColumn: {
    flex: '0 0 60%', // 60% width
    display: 'flex',
    flexDirection: 'column',
  },

  rightColumn: {
    flex: '0 0 38%', // 38% width (2% for gap)
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },

  errorMessage: {
    textAlign: 'center',
    padding: '4rem',
    background: 'rgba(244, 67, 54, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(244, 67, 54, 0.3)',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  projectInfo: {
    flex: 1,
  },

  title: {
    fontSize: '2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 1rem 0',
    letterSpacing: '-0.5px',
  },

  projectMeta: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },

  metaItem: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    padding: '0.4rem 0.8rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },

  headerButtons: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  startBtn: {
    background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
  },

  viewResultsBtn: {
    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
  },

  closeBtn: {
    background: 'linear-gradient(135deg, #6c757d, #495057)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)',
  },

  cancelBtn: {
    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
  },

  buttonIcon: {
    fontSize: '1rem',
  },

  pipelineContainer: {
    background: 'rgba(42, 52, 65, 0.95)',
    backdropFilter: 'blur(1px)',
    borderRadius: '16px',
    padding: '2rem',
    flex: 1,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },

  pipelineStages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  stage: {
    position: 'relative',
    transition: 'all 0.3s ease',
  },

  processingStage: {
    transform: 'scale(1.02)',
  },

  completedStage: {
    transform: 'scale(1.01)',
  },

  stageCard: {
    background: 'rgba(33, 150, 243, 0.12)',
    border: '2px solid rgba(33, 150, 243, 0.4)',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(1px)',
  },

  stageIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(33, 150, 243, 0.4)',
    flexShrink: 0,
  },

  processingIcon: {
    background: 'linear-gradient(135deg, #ff9800, #f57400)',
    boxShadow: '0 4px 20px rgba(255, 152, 0, 0.6)',
  },

  completedIcon: {
    background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.6)',
  },

  iconText: {
    fontSize: '1.5rem',
    color: 'white',
  },

  stageName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    minWidth: '140px',
    flexShrink: 0,
  },

  statusBadge: {
    display: 'inline-block',
    padding: '0.3rem 0.8rem',
    borderRadius: '15px',
    fontSize: '0.7rem',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    minWidth: '90px',
    textAlign: 'center',
    flexShrink: 0,
  },

  processingBadge: {
    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.25), rgba(245, 124, 0, 0.25))',
    color: '#ff9800',
    border: '1px solid #ff9800',
  },

  completedBadge: {
    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.25), rgba(46, 125, 50, 0.25))',
    color: '#4caf50',
    border: '1px solid #4caf50',
  },

  subProcesses: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },

  subProcess: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#e0e0e0',
    transition: 'all 0.3s ease',
  },

  subProcessIcon: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.6rem',
    flexShrink: 0,
    fontWeight: 'bold',
  },

  completedSubProcessIcon: {
    color: '#4caf50',
    background: 'rgba(76, 175, 80, 0.1)',
  },

  activeSubProcessIcon: {
    color: '#2196f3',
    background: 'rgba(33, 150, 243, 0.1)',
  },

  pendingSubProcessIcon: {
    color: '#9ca3af',
    background: 'rgba(156, 163, 175, 0.1)',
  },

  subProcessText: {
    lineHeight: '1.3',
  },

  progressBar: {
    width: '120px',
    height: '6px',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '3px',
    overflow: 'hidden',
    flexShrink: 0,
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2196f3, #00bcd4)',
    borderRadius: '3px',
    transition: 'width 0.5s ease',
  },

  processingProgress: {
    background: 'linear-gradient(90deg, #ff9800, #f57400)',
  },

  completedProgress: {
    background: 'linear-gradient(90deg, #4caf50, #2e7d32)',
  },

  connector: {
    width: '3px',
    height: '30px',
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '0 auto',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },

  completedConnector: {
    background: 'linear-gradient(180deg, #4caf50, #2e7d32)',
  },

  // Right Column Styles
  statusCard: {
    background: 'rgba(42, 52, 65, 0.95)',
    backdropFilter: 'blur(1px)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },

  processingSpinner: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },

  statusTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 0.5rem 0',
  },

  statusText: {
    fontSize: '0.9rem',
    color: '#e0e0e0',
    margin: '0 0 1.5rem 0',
    lineHeight: '1.4',
  },

  overallProgress: {
    width: '100%',
    height: '8px',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },

  overallProgressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2196f3, #00bcd4)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },

  progressText: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    fontWeight: '600',
  },

  sampleDetails: {
    background: 'rgba(42, 52, 65, 0.95)',
    backdropFilter: 'blur(1px)',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },

  detailsTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 1rem 0',
    background: 'linear-gradient(135deg, #2196f3, #00bcd4)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  detailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },

  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.7rem',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    transition: 'all 0.3s ease',
  },

  detailLabel: {
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: '0.8rem',
  },

  detailValue: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '0.8rem',
  },

  resultsSection: {
    background: 'rgba(42, 52, 65, 0.95)',
    backdropFilter: 'blur(1px)',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid rgba(76, 175, 80, 0.3)',
    boxShadow: '0 8px 32px rgba(76, 175, 80, 0.2)',
  },

  resultsHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
  },

  resultsTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0',
  },

  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
  },

  resultCard: {
    background: 'rgba(33, 150, 243, 0.15)',
    borderRadius: '10px',
    padding: '1rem',
    textAlign: 'center',
    border: '1px solid rgba(33, 150, 243, 0.3)',
    transition: 'all 0.3s ease',
  },

  resultTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#9ca3af',
    margin: '0 0 0.3rem 0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  resultValue: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#2196f3',
    margin: '0 0 0.2rem 0',
  },

  resultSubtext: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    margin: '0',
  },

  actionButtons: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  downloadBtn: {
    background: 'linear-gradient(135deg, #2196f3, #1976d2)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
  },

  exportBtn: {
    background: 'linear-gradient(135deg, #6c757d, #495057)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)',
  },
};

export default PipelinePage;
