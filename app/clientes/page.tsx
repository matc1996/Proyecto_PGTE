import { obtenerClientes } from "@/lib/actions/clientes.actions";
import ClienteForm from "@/components/clientes/ClienteForm";

export default async function ClientesPage() {
  const clientes = await obtenerClientes();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      <ClienteForm />

      {clientes.length === 0 ? (
        <p className="text-gray-500">Aún no hay clientes registrados.</p>
      ) : (
        <ul className="space-y-2">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="rounded border p-3">
              <p className="font-medium">{cliente.nombre}</p>
              <p className="text-sm text-gray-500">
                {cliente.rut ?? "Sin RUT"} · {cliente.telefono}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}