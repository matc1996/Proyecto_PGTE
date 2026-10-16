
import { crearCliente, obtenerClientes } from "@/lib/actions/clientes.actions";

export default async function Home() {
  // Capturamos lo que retorna la Server Action
  const resultadoCreacion = await crearCliente({
    nombre: "Constructora del Sur SpA",
    rut: "76543210-K",
    telefono: "+56991122334",
    email: "contacto@constructoradelsur.cl",
    observaciones: "Prueba con control de duplicados",
  });

  // Obtenemos la lista actualizada
  const clientes = await obtenerClientes();

  return (
    <main className="p-8 font-sans max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Prueba de Backend con Supabase</h1>
      
      {/* Mostramos el mensaje que nos devolvió el backend */}
      <div className={`p-4 mb-6 rounded-md ${resultadoCreacion.success ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
        <strong>Respuesta del servidor:</strong> {resultadoCreacion.mensaje || resultadoCreacion.error}
      </div>

      <h2 className="text-lg font-semibold mb-2">Clientes en la Base de Datos ({clientes.length}):</h2>
      <ul className="bg-gray-100 p-4 rounded-md space-y-2">
        {clientes.map((c) => (
          <li key={c.id} className="border-b pb-2 flex justify-between items-center">
            <div>
              <strong>{c.nombre}</strong> - <span className="text-gray-600">{c.rut || "Sin RUT"}</span>
            </div>
            <span className="text-xs text-gray-400">Tel: {c.telefono}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}