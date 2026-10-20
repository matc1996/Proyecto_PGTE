"use client";

import { useState } from "react";
import { eliminarCliente } from "@/lib/actions/clientes.actions";

export default function BotonEliminar({ id, nombre }: { id: string; nombre: string }) {
  const [eliminando, setEliminando] = useState(false);

  async function handleClick() {
    const confirmado = window.confirm(
      `¿Eliminar a ${nombre}? Esto también eliminará sus inmuebles. Esta acción no se puede deshacer.`
    );
    if (!confirmado) return;

    setEliminando(true);
    const resultado = await eliminarCliente(id);
    setEliminando(false);

    if (!resultado.success) {
      window.alert(resultado.error ?? "No se pudo eliminar el cliente.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={eliminando}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
    >
      {eliminando ? "Eliminando..." : "Eliminar"}
    </button>
  );
}