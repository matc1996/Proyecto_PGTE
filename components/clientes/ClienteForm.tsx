"use client";

import { useState } from "react";
import { crearCliente, actualizarCliente } from "@/lib/actions/clientes.actions";

type ClienteEditable = {
  id: string;
  nombre: string;
  rut: string | null;
  telefono: string;
  email: string | null;
  observaciones: string | null;
};

export default function ClienteForm({ cliente }: { cliente?: ClienteEditable }) {
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setEnviando(true);
    setMensaje(null);

    const datos = {
      nombre: String(formData.get("nombre") ?? ""),
      rut: String(formData.get("rut") ?? ""),
      telefono: String(formData.get("telefono") ?? ""),
      email: String(formData.get("email") ?? ""),
      observaciones: String(formData.get("observaciones") ?? ""),
    };

    const resultado = cliente
      ? await actualizarCliente(cliente.id, datos)
      : await crearCliente(datos);

    setEnviando(false);

    if (resultado.success) {
      setMensaje({ tipo: "ok", texto: resultado.mensaje ?? "Guardado correctamente." });
      if (!cliente) form.reset();
    } else {
      setMensaje({ tipo: "error", texto: resultado.error ?? "Ocurrió un error." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3 rounded border p-4">
      <h2 className="font-semibold">{cliente ? "Editar cliente" : "Nuevo cliente"}</h2>

      <input name="nombre" defaultValue={cliente?.nombre} placeholder="Nombre *" required className="w-full rounded border p-2" />
      <input name="rut" defaultValue={cliente?.rut ?? ""} placeholder="RUT (opcional)" className="w-full rounded border p-2" />
      <input name="telefono" defaultValue={cliente?.telefono} placeholder="Teléfono *" required className="w-full rounded border p-2" />
      <input name="email" type="email" defaultValue={cliente?.email ?? ""} placeholder="Email (opcional)" className="w-full rounded border p-2" />
      <textarea name="observaciones" defaultValue={cliente?.observaciones ?? ""} placeholder="Observaciones (opcional)" className="w-full rounded border p-2" />

      <button
        type="submit"
        disabled={enviando}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {enviando ? "Guardando..." : cliente ? "Guardar cambios" : "Guardar cliente"}
      </button>

      {mensaje && (
        <p className={mensaje.tipo === "ok" ? "text-green-600" : "text-red-600"}>
          {mensaje.texto}
        </p>
      )}
    </form>
  );
}