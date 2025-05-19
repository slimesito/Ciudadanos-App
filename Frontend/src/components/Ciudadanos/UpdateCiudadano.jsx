import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/client';
import Footer from '../../components/Layout/Footer';

export default function UpdateCiudadano() {
  useDocumentTitle('Actualizar | Ciudadanos');
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    nacionalidad: 'V',
    genero: 'M',
    estado_civil: 'S',
    fecha_nacimiento: '',
    fecha_fallecimiento: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const fetchCiudadano = async () => {
      try {
        const response = await api.getCiudadano(id);
        if (response.data.success) {
          setFormData({
            nombres: response.data.data.nombres || '',
            apellidos: response.data.data.apellidos || '',
            nacionalidad: response.data.data.nacionalidad || 'V',
            genero: response.data.data.genero || 'M',
            estado_civil: response.data.data.estado_civil || 'S',
            fecha_nacimiento: formatDateForInput(response.data.data.fecha_nacimiento),
            fecha_fallecimiento: formatDateForInput(response.data.data.fecha_fallecimiento)
          });
        } else {
          setError('No se pudo cargar el ciudadano');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.updateCiudadano(id, formData);
      if (response.data.success) {
        navigate(`/ciudadanos/${id}`, { 
          state: { from: 'update' },
          replace: true
        });
      } else {
        setError('Error al actualizar el ciudadano');
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
        <div className="px-4 py-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-xl overflow-hidden">
          <div className="py-4 px-6 bg-blue-600 dark:bg-blue-600/90">
            <h1 className="text-xl font-semibold text-white">
              Editar Ciudadano
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Nombres */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Nombres *
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Campo Apellidos */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Apellidos *
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                />
              </div>

              {/* Campo Nacionalidad */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Nacionalidad *
                </label>
                <select
                  name="nacionalidad"
                  value={formData.nacionalidad}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="V">Venezolano</option>
                  <option value="E">Extranjero</option>
                </select>
              </div>

              {/* Campo Género */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Género *
                </label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>

              {/* Campo Estado Civil */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Estado Civil *
                </label>
                <select
                  name="estado_civil"
                  value={formData.estado_civil}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="S">Soltero/a</option>
                  <option value="C">Casado/a</option>
                  <option value="V">Viudo/a</option>
                </select>
              </div>

              {/* Campo Fecha Nacimiento */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              {/* Campo Fecha Fallecimiento */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Fecha de Fallecimiento
                </label>
                <input
                  type="date"
                  name="fecha_fallecimiento"
                  value={formData.fecha_fallecimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Mensajes de error */}
            {error && (
              <div className="py-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate(`/ciudadanos/${id}`)}
                className="px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:bg-gray-700/50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600/50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                } text-white focus:ring-blue-500`}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}