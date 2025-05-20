import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useTheme } from '../context/ThemeContext';
import api from '../api/client';
import Footer from '../components/Layout/Footer';

export default function Home() {
  useDocumentTitle('Inicio | Ciudadanos');
  const [searchData, setSearchData] = useState({
    nacionalidad: 'V',
    cedula: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: '', isRateLimit: false });
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cedula') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setSearchData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setSearchData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ message: '', isRateLimit: false });
    
    try {
      const response = await api.searchCiudadanos({
        nacionalidad: searchData.nacionalidad,
        cedula: searchData.cedula
      });
      
      if (response.data.success && response.data.data) {
        navigate(`/ciudadanos/${response.data.data.id}`);
      } else {
        setError({ 
          message: 'No se encontró ningún ciudadano con esos datos',
          isRateLimit: false
        });
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError({
          message: err.response.data?.message || 'Demasiadas solicitudes. Por favor espere un minuto.',
          isRateLimit: true
        });
      } else {
        setError({
          message: 'No se encontró el ciudadano',
          isRateLimit: false
        });
      }
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/ciudadanos/create');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            Bienvenido
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Busca un ciudadano en el sistema.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-6 rounded-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nacionalidad" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Nacionalidad
              </label>
              <select
                id="nacionalidad"
                name="nacionalidad"
                value={searchData.nacionalidad}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              >
                <option value="V">Venezolano</option>
                <option value="E">Extranjero</option>
              </select>
            </div>

            <div>
              <label htmlFor="cedula" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Número de Cédula
              </label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                value={searchData.cedula}
                onChange={handleChange}
                placeholder="Ej: 12345678"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>

            {error.message && (
              <div className={`py-2 px-4 rounded-lg ${
                error.isRateLimit 
                  ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800'
                  : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-start">
                  {error.isRateLimit ? (
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{error.message}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !searchData.cedula}
              className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all flex items-center justify-center ${
                loading || !searchData.cedula 
                  ? 'opacity-50 cursor-not-allowed bg-blue-400' 
                  : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              } text-white focus:ring-blue-500`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              {loading ? 'Buscando...' : 'Buscar Ciudadano'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center border-gray-300 dark:border-gray-700">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400">
                  O
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleRegister}
                className="w-full flex justify-center items-center py-2 px-4 rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600/50 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Registrar Nuevo Ciudadano
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            ¿Necesitas ayuda?{' '}
            <a href="https://github.com/slimesito" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Contáctanos
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}