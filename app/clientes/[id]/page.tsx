export {};import Link from "next/link";
import { notFound } from "next/navigation";
import { obtenerClientePorId } from "@/lib/actions/clientes.actions";
import ClienteForm from "@/components/clientes/ClienteForm";

export default async function ClienteDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cliente = await obtenerClientePorId(id);

  if (!cliente) notFound();

  return (
    <main className="p-6">
      <Link href="/clientes" className="text-sm text-blue-600 hover:underline">
        ← Volver a clientes
      </Link>
      <h1 className="text-2xl font-bold my-4">{cliente.nombre}</h1>

      <ClienteForm
        cliente={{
          id: cliente.id,
          nombre: cliente.nombre,
          rut: cliente.rut,
          telefono: cliente.telefono,
          email: cliente.email,
          observaciones: cliente.observaciones,
        }}
      />
    </main>
  );
}