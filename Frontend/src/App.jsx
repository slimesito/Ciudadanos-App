import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import { Navigate } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import CiudadanoList from './components/Ciudadanos/CiudadanoList';
import CreateCiudadano from './components/Ciudadanos/CreateCiudadano';
import UpdateCiudadano from './components/Ciudadanos/UpdateCiudadano';
import CiudadanoDetail from './components/Ciudadanos/CiudadanoDetail';

function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ciudadanos" element={<Navigate to="/" replace />} />
          <Route path="/ciudadanos/create" element={<CreateCiudadano />} />
          <Route path="/ciudadanos/:id" element={<CiudadanoDetail />} />
          <Route path="/ciudadanos/:id/edit" element={<UpdateCiudadano />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;