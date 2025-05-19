import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/client';
import Footer from '../../components/Layout/Footer';

export default function CiudadanoDetail() {
  useDocumentTitle('Detalle | Ciudadanos');
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [ciudadano, setCiudadano] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { darkMode } = useTheme(); // Usamos el hook del tema
  const [notification, setNotification] = useState(null);

  // Efecto para mostrar notificación inicial
  useEffect(() => {
    if (location.state?.from === 'create') {
      setNotification({ type: 'success', message: 'Ciudadano registrado exitosamente' });
    } else if (location.state?.from === 'update') {
      setNotification({ type: 'success', message: 'Ciudadano actualizado exitosamente' });
    }
  }, [location.state]);

  // Efecto para ocultar la notificación después de tiempo
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        window.history.replaceState({}, '');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const fetchCiudadano = async () => {
      try {
        const response = await api.getCiudadano(id);
        if (response.data.success) {
          setCiudadano(response.data.data);
        } else {
          setError('Ciudadano no encontrado');
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCiudadano();
  }, [id]);

  const handleEdit = () => {
    navigate(`/ciudadanos/${id}/edit`, { state: { from: 'detail' } });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  };

  const getGeneroCompleto = (genero) => {
    return genero === 'M' ? 'Masculino' : 'Femenino';
  };

  const getEstadoCivilCompleto = (estado) => {
    const estados = {
      'S': 'Soltero/a',
      'C': 'Casado/a',
      'V': 'Viudo/a'
    };
    return estados[estado] || estado;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      {/* Notificación */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 rounded-lg p-4 shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 dark:bg-green-800/90 dark:text-green-100'
            : 'bg-red-100 text-red-800 dark:bg-red-800/90 dark:text-red-100'
        }`}>
          <div className="flex items-center">
            <svg 
              className={`h-6 w-6 mr-2 ${
                notification.type === 'success' 
                  ? 'text-green-600 dark:text-green-300'
                  : 'text-red-600 dark:text-red-300'
              }`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {notification.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToHome}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver al Inicio
          </button>
          
          <h1 className="text-2xl font-bold text-center flex-grow text-gray-900 dark:text-white">
            Detalles del Ciudadano
          </h1>
        </div>

        <div className="rounded-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Información Personal
            </h3>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50 dark:bg-gray-700/30">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Cédula
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-900 dark:text-white">
                  {ciudadano.nacionalidad}-{ciudadano.cedula}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white dark:bg-gray-800/30">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Nombre Completo
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-900 dark:text-white">
                  {ciudadano.nombres} {ciudadano.apellidos}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50 dark:bg-gray-700/30">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Género
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-900 dark:text-white">
                  {getGeneroCompleto(ciudadano.genero)}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white dark:bg-gray-800/30">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Estado Civil
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-900 dark:text-white">
                  {getEstadoCivilCompleto(ciudadano.estado_civil)}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50 dark:bg-gray-700/30">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Fecha de Nacimiento
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-900 dark:text-white">
                  {formatDate(ciudadano.fecha_nacimiento)}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-white dark:bg-gray-800/30">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Fecha de Fallecimiento
                </dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-900 dark:text-white">
                  {ciudadano.fecha_fallecimiento ? formatDate(ciudadano.fecha_fallecimiento) : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editar Ciudadano
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}