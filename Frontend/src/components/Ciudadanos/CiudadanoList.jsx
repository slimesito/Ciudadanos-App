import { useState, useEffect } from 'react';
import api from '../../api/client';

export default function CiudadanoList() {
  const [ciudadanos, setCiudadanos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getCiudadanos();
        setCiudadanos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ciudadanos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Listado de Ciudadanos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Cédula</th>
              <th className="py-2 px-4 border-b">Nombre Completo</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ciudadanos.map(ciudadano => (
              <tr key={ciudadano.id}>
                <td className="py-2 px-4 border-b text-center">{ciudadano.cedula}</td>
                <td className="py-2 px-4 border-b">
                  {ciudadano.nombres} {ciudadano.apellidos}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <a 
                    href={`/ciudadanos/${ciudadano.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Editar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}