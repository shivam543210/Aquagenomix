import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard.jsx';
import ResultsPage from './ResultsPage.jsx';
 import pipeline from './pipeline.jsx';
import './App.css';
import PipelinePage from './pipeline.jsx';

const RedirectComponent = () => {
  useEffect(() => {
    window.location.replace('https://sih-front-page-rcgodecuw-suryansh-tiwaris-projects-497d8c23.vercel.app');
  }, []);
  return <div style={{padding:20, textAlign:'center'}}>Redirecting to the new landing page…</div>;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RedirectComponent />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
         
        <Route path="/pipeline" element={<PipelinePage/>} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
