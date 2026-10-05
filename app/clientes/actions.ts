'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export interface ClienteInput {
  nombre: string;
  rut?: string;
  telefono: string;
  email?: string;
  tecnicoId?: number;
}

export interface ViviendaInput {
  direccion: string;
  tipo: string;
  comuna?: string;
  observaciones?: string;
  clienteId: number;
}

// ---------------- CLIENTES ----------------

export async function getClientes(busqueda: string = '') {
  try {
    const clientes = await prisma.cliente.findMany({
      where: busqueda.trim()
        ? {
            OR: [
              { nombre: { contains: busqueda, mode: 'insensitive' } },
              { rut: { contains: busqueda, mode: 'insensitive' } },
              {
                viviendas: {
                  some: {
                    direccion: { contains: busqueda, mode: 'insensitive' },
                  },
                },
              },
            ],
          }
        : {},
      include: {
        viviendas: true,
        tecnico: true,
      },
      orderBy: { id: 'desc' },
    });

    return { success: true, data: clientes };
  } catch (error) {
    console.error('[BACKEND ERROR - getClientes]:', error);
    return { success: false, error: 'Error al consultar la base de datos.', data: [] };
  }
}

export async function crearCliente(input: ClienteInput) {
  try {
    if (!input.nombre.trim() || !input.telefono.trim()) {
      return { success: false, error: 'Nombre y teléfono son obligatorios.' };
    }

    if (input.rut?.trim()) {
      const existente = await prisma.cliente.findFirst({
        where: { rut: input.rut.trim() },
      });
      if (existente) return { success: false, error: 'Ya existe un cliente con ese RUT.' };
    }

    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre: input.nombre.trim(),
        rut: input.rut?.trim() || undefined,
        telefono: input.telefono.trim(),
        email: input.email?.trim().toLowerCase() || undefined,
        tecnicoId: input.tecnicoId || 1,
      },
    });

    revalidatePath('/clientes');
    return { success: true, data: nuevoCliente };
  } catch (error) {
    console.error('[BACKEND ERROR - crearCliente]:', error);
    return { success: false, error: 'No se pudo guardar el cliente.' };
  }
}

export async function actualizarCliente(id: number, input: ClienteInput) {
  try {
    const actualizado = await prisma.cliente.update({
      where: { id },
      data: {
        nombre: input.nombre.trim(),
        rut: input.rut?.trim() || undefined,
        telefono: input.telefono.trim(),
        email: input.email?.trim().toLowerCase() || undefined,
      },
    });

    revalidatePath('/clientes');
    return { success: true, data: actualizado };
  } catch (error) {
    console.error('[BACKEND ERROR - actualizarCliente]:', error);
    return { success: false, error: 'No se pudo actualizar el cliente.' };
  }
}

export async function eliminarCliente(id: number) {
  try {
    await prisma.vivienda.deleteMany({ where: { clienteId: id } });
    await prisma.cliente.delete({ where: { id } });

    revalidatePath('/clientes');
    return { success: true };
  } catch (error) {
    console.error('[BACKEND ERROR - eliminarCliente]:', error);
    return { success: false, error: 'No se pudo eliminar el cliente.' };
  }
}

// ---------------- VIVIENDAS ----------------

export async function crearVivienda(input: ViviendaInput) {
  try {
    if (!input.direccion.trim() || !input.tipo.trim()) {
      return { success: false, error: 'Dirección y tipo de vivienda son obligatorios.' };
    }

    const nuevaVivienda = await prisma.vivienda.create({
      data: {
        direccion: input.direccion.trim(),
        tipo: input.tipo.trim(),
        clienteId: input.clienteId,
      },
    });

    revalidatePath('/clientes');
    return { success: true, data: nuevaVivienda };
  } catch (error) {
    console.error('[BACKEND ERROR - crearVivienda]:', error);
    return { success: false, error: 'No se pudo agregar la vivienda.' };
  }
}

export async function actualizarVivienda(id: number, direccion: string, tipo: string) {
  try {
    const actualizada = await prisma.vivienda.update({
      where: { id },
      data: {
        direccion: direccion.trim(),
        tipo: tipo.trim(),
      },
    });

    revalidatePath('/clientes');
    return { success: true, data: actualizada };
  } catch (error) {
    console.error('[BACKEND ERROR - actualizarVivienda]:', error);
    return { success: false, error: 'No se pudo actualizar la vivienda.' };
  }
}

export async function eliminarVivienda(id: number) {
  try {
    await prisma.vivienda.delete({ where: { id } });
    revalidatePath('/clientes');
    return { success: true };
  } catch (error) {
    console.error('[BACKEND ERROR - eliminarVivienda]:', error);
    return { success: false, error: 'No se pudo eliminar la vivienda.' };
  }
}