import Link from "next/link";
import { obtenerClientes } from "@/lib/actions/clientes.actions";
import ClienteForm from "@/components/clientes/ClienteForm";
import BotonEliminar from "@/components/clientes/BotonEliminar";

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
            <li key={cliente.id} className="flex items-center justify-between rounded border p-3">
              <div>
                <p className="font-medium">{cliente.nombre}</p>
                <p className="text-sm text-gray-500">
                  {cliente.rut ?? "Sin RUT"} · {cliente.telefono}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/clientes/${cliente.id}`} className="text-sm text-blue-600 hover:underline">
                  Editar
                </Link>
                <BotonEliminar id={cliente.id} nombre={cliente.nombre} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}