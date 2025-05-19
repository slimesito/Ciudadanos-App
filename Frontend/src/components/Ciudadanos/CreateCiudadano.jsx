import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/client';
import Footer from '../../components/Layout/Footer';

export default function CreateCiudadano() {
  useDocumentTitle('Registrar | Ciudadanos');
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    nacionalidad: 'V',
    genero: 'M',
    estado_civil: 'S',
    fecha_nacimiento: '',
    fecha_fallecimiento: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validación para campo de cédula (solo números)
    if (name === 'cedula') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.createCiudadano(formData);
      if (response.data.success) {
        navigate(`/ciudadanos/${response.data.data.id}`, { 
          state: { from: 'create' },
          replace: true  // Esto evita que el usuario pueda volver atrás al formulario
        });
      } else {
        setError(response.data.message || 'Error al crear el ciudadano');
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          
          <h1 className="text-2xl font-bold text-center flex-grow text-gray-900 dark:text-white">
            Registrar Nuevo Ciudadano
          </h1>
        </div>

        <div className="rounded-2xl backdrop-blur-lg border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="py-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Cédula */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Cédula *
                </label>
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                  maxLength="10"
                  placeholder="Ej: 12345678"
                  inputMode="numeric"
                  pattern="[0-9]*"
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
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="V">Venezolano</option>
                  <option value="E">Extranjero</option>
                </select>
              </div>

              {/* Campo Nombres */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Nombres *
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                  maxLength="100"
                />
              </div>

              {/* Campo Apellidos */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Apellidos *
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  required
                  maxLength="100"
                />
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
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
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
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
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
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
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
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white border-gray-300 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleBackToHome}
                className="px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-green-500 dark:bg-gray-700/50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600/50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed bg-green-500' : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                } text-white focus:ring-green-500`}
              >
                {loading ? 'Registrando...' : 'Registrar Ciudadano'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}