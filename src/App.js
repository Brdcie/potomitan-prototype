// POTOMITAN – © 2025
// Ce fichier est sous licence MPL-2.0.
// Voir le fichier LICENSE pour plus d’informations.import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmergencyProvider } from './context/EmergencyContext';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import PhrasesPage from './pages/PhrasesPage';
import ContributePage from './pages/ContributePage';

function App() {
  return (
    <EmergencyProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phrases" element={<PhrasesPage />} />
              <Route path="/phrases/:category" element={<PhrasesPage />} />
              <Route path="/contribuer" element={<ContributePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </EmergencyProvider>
  );
}

export default App;