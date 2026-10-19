'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

interface ClienteInput {
  nombre: string;
  rut?: string;
  telefono: string;
  email?: string;
  observaciones?: string;
}


// Obtiene todos los clientes registrados ordenados por fecha de creación.
 
export async function obtenerClientes() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return clientes;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
}

function normalizarRut(rut?: string): string | null {
  if (!rut) return null;
  
  // Limpiamos puntos, espacios y pasamos a mayúsculas
  let limpio = rut.replace(/\./g, "").replace(/\s/g, "").toUpperCase();
  if (limpio === "") return null;

  //Si el usuario ingresó el RUT sin guion, 
  // se le agrega antes del último digito.
  if (!limpio.includes("-") && limpio.length > 1) {
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    limpio = `${cuerpo}-${dv}`;
  }

  return limpio;
}

export async function crearCliente(data: ClienteInput) {
  try {
    if (!data.nombre?.trim() || !data.telefono?.trim()) {
      return { success: false, error: "El nombre y el teléfono son obligatorios." };
    }

    
    const rutNormalizado = normalizarRut(data.rut);

    //control de duplicados
    if (rutNormalizado) {
      const clienteExistente = await prisma.cliente.findFirst({
        where: { rut: rutNormalizado },
      });

      if (clienteExistente) {
        // Retornamos success: FALSE porque la creación falló al ya existir
        return { 
          success: false, 
          error: `Ya existe un cliente registrado con el RUT ${data.rut}: ${clienteExistente.nombre}.` 
        };
      }
    }

    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre: data.nombre.trim(),
        rut: rutNormalizado, 
        telefono: data.telefono.trim(),
        email: data.email?.trim() || null,
        observaciones: data.observaciones?.trim() || null,
      },
    }); 
    
    revalidatePath("/clientes");

    return { success: true, data: nuevoCliente, mensaje: "Cliente creado exitosamente." };
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return { success: false, error: "No se pudo registrar el cliente en la base de datos." };
  }
}

export async function actualizarCliente(id: string, data: ClienteInput) {
  try {
    if (!data.nombre?.trim() || !data.telefono?.trim()) {
      return { success: false, error: "El nombre y el teléfono son obligatorios." };
    }

    const rutNormalizado = normalizarRut(data.rut);

    if (rutNormalizado) {
      const duplicado = await prisma.cliente.findFirst({
        where: { rut: rutNormalizado, NOT: { id } },
      });
      if (duplicado) {
        return {
          success: false,
          error: `Ya existe otro cliente con el RUT ${data.rut}: ${duplicado.nombre}.`,
        };
      }
    }

    const clienteActualizado = await prisma.cliente.update({
      where: { id },
      data: {
        nombre: data.nombre.trim(),
        rut: rutNormalizado,
        telefono: data.telefono.trim(),
        email: data.email?.trim() || null,
        observaciones: data.observaciones?.trim() || null,
      },
    });

    return { success: true, data: clienteActualizado, mensaje: "Cliente actualizado exitosamente." };
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    return { success: false, error: "No se pudo actualizar el cliente." };
  }
}

export async function eliminarCliente(id: string) {
  try {
    const cantidadProyectos = await prisma.proyecto.count({
      where: { clienteId: id },
    });

    if (cantidadProyectos > 0) {
      return {
        success: false,
        error: `No se puede eliminar: el cliente tiene ${cantidadProyectos} proyecto(s) asociado(s).`,
      };
    }

    await prisma.cliente.delete({ where: { id } });

    return { success: true, mensaje: "Cliente eliminado exitosamente." };
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return { success: false, error: "No se pudo eliminar el cliente." };
  }
}

export async function obtenerClientePorId(id: string) {
  try {
    return await prisma.cliente.findUnique({
      where: { id },
      include: { inmuebles: { orderBy: { createdAt: "desc" } } },
    });
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return null;
  }
}