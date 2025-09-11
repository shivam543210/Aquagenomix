import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard.jsx';
import ResultsPage from './ResultsPage.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
