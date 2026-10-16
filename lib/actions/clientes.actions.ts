'use server';

import { prisma } from "@/lib/prisma";

interface CrearClienteInput {
  nombre: string;
  rut?: string;
  telefono: string;
  email?: string;
  observaciones?: string;
}

/**
 * Obtiene todos los clientes registrados ordenados por fecha de creación.
 */
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

export async function crearCliente(data: CrearClienteInput) {
  try {
    // Si viene un RUT, verificamos si ya existe en la base de datos para evitar duplicados
    if (data.rut && data.rut.trim() !== "") {
      const clienteExistente = await prisma.cliente.findFirst({
        where: { rut: data.rut },
      });

      if (clienteExistente) {
        // Opcional: Podrías actualizarlo o simplemente retornar que ya existe
        return { 
          success: true, 
          data: clienteExistente, 
          mensaje: "El cliente ya existía en la base de datos ." 
        };
      }
    }

    // Si no existe (o no vino RUT), lo creamos normalmente
    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre: data.nombre,
        rut: data.rut || "",
        telefono: data.telefono,
        email: data.email || "",
        observaciones: data.observaciones,
      },
    });

    return { success: true, data: nuevoCliente, mensaje: "Cliente creado exitosamente." };
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return { success: false, error: "No se pudo registrar el cliente en la base de datos." };
  }
}