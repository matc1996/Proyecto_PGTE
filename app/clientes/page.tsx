'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  getClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  crearVivienda,
  actualizarVivienda,
  eliminarVivienda,
} from './actions';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Estados Modales y Selección
  const [modalClienteOpen, setModalClienteOpen] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<any | null>(null);
  const [clienteExpandido, setClienteExpandido] = useState<number | null>(null);

  // Estados Viviendas
  const [modalViviendaOpen, setModalViviendaOpen] = useState(false);
  const [viviendaEditando, setViviendaEditando] = useState<any | null>(null);
  const [clienteIdParaVivienda, setClienteIdParaVivienda] = useState<number | null>(null);

  const cargarDatos = async (query: string = '') => {
    setCargando(true);
    const res = await getClientes(query);
    if (res.success && res.data) {
      setClientes(res.data);
    }
    setCargando(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => cargarDatos(busqueda), 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

  // Handlers Cliente
  const handleSaveCliente = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuardando(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      nombre: formData.get('nombre') as string,
      rut: formData.get('rut') as string,
      telefono: formData.get('telefono') as string,
      email: formData.get('email') as string,
    };

    let res;
    if (clienteEditando) {
      res = await actualizarCliente(clienteEditando.id, payload);
    } else {
      res = await crearCliente(payload);
    }

    if (res.success) {
      setModalClienteOpen(false);
      setClienteEditando(null);
      cargarDatos(busqueda);
    } else {
      alert(`Error: ${res.error}`);
    }
    setGuardando(false);
  };

  const handleDeleteCliente = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este cliente y todas sus viviendas asociadas?')) {
      const res = await eliminarCliente(id);
      if (res.success) cargarDatos(busqueda);
      else alert(`Error: ${res.error}`);
    }
  };

  // Handlers Vivienda
  const handleSaveVivienda = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGuardando(true);
    const formData = new FormData(e.currentTarget);
    const direccion = formData.get('direccion') as string;
    const tipo = formData.get('tipo') as string;

    let res;
    if (viviendaEditando) {
      res = await actualizarVivienda(viviendaEditando.id, direccion, tipo);
    } else if (clienteIdParaVivienda) {
      res = await crearVivienda({ direccion, tipo, clienteId: clienteIdParaVivienda });
    }

    if (res?.success) {
      setModalViviendaOpen(false);
      setViviendaEditando(null);
      cargarDatos(busqueda);
    } else {
      alert(`Error: ${res?.error}`);
    }
    setGuardando(false);
  };

  const handleDeleteVivienda = async (id: number) => {
    if (confirm('¿Eliminar esta vivienda?')) {
      const res = await eliminarVivienda(id);
      if (res.success) cargarDatos(busqueda);
      else alert(`Error: ${res.error}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar PGTE con Rutas Nativas */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800/60 p-4 space-y-6 flex flex-col justify-between bg-white dark:bg-[#0B1120]">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-8 px-2 group">
            <span className="text-amber-500 dark:text-amber-400 text-xl font-black group-hover:scale-105 transition-transform">
              ⚡ PGTE
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-1 font-normal">
              Gestión Técnica Eléctrica
            </span>
          </Link>

          <p className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-2 mb-2">
            OPERACIÓN
          </p>
          <nav className="space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-xs transition-colors"
            >
              📊 Panel principal
            </Link>
            <Link
              href="/clientes"
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-semibold text-xs border border-blue-200 dark:border-blue-500/30"
            >
              👤 Clientes y viviendas
            </Link>
            <Link
              href="/levantamientos"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-xs transition-colors"
            >
              📋 Levantamientos
            </Link>
            <Link
              href="/cotizaciones"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-xs transition-colors"
            >
              💲 Cotizaciones
            </Link>
          </nav>
        </div>

        <div className="px-2">
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
            N
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-slate-50/50 dark:bg-[#0B1120]">
        <header className="h-14 border-b border-slate-200 dark:border-slate-800/60 px-8 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0B1120]">
          <div>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-200">
              Panel principal
            </Link>{' '}
            / <span className="text-slate-900 dark:text-slate-100 font-semibold">Gestión de Clientes</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
            <span>César Moreno</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          </div>
        </header>

        <section className="p-8 max-w-5xl space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Búsqueda y Registro en Base de Datos
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Consulta directamente los registros de tu base de datos mediante RUT, nombre o dirección.
              </p>
            </div>
            <button
              onClick={() => {
                setClienteEditando(null);
                setModalClienteOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md dark:shadow-blue-600/20 flex items-center gap-2 transition-all"
            >
              <span className="text-base font-normal">+</span> Registrar Nuevo Cliente
            </button>
          </div>

          {/* Buscador */}
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Escribe para buscar cliente en la BD (RUT, Nombre, Dirección)..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200 text-xs rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm dark:shadow-none"
            />
          </div>

          {/* Lista de Clientes */}
          <div className="bg-white dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl min-h-[220px] overflow-hidden shadow-sm dark:shadow-none">
            {cargando ? (
              <p className="text-center text-xs text-slate-400 py-8">Consultando Supabase...</p>
            ) : clientes.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <span className="text-3xl block">🔍</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Escribe en el buscador para consultar tus clientes existentes en la BD
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {clientes.map((cliente) => {
                  const isExpanded = clienteExpandido === cliente.id;
                  return (
                    <div key={cliente.id} className="transition-colors">
                      <div
                        onClick={() => setClienteExpandido(isExpanded ? null : cliente.id)}
                        className="p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{cliente.nombre}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {cliente.rut ? `RUT: ${cliente.rut}` : 'Sin RUT'} | Tel: {cliente.telefono}{' '}
                            {cliente.email ? `| Email: ${cliente.email}` : ''}
                          </p>
                          {cliente.tecnico && (
                            <p className="text-[10px] text-blue-600 dark:text-blue-400">
                              Técnico: {cliente.tecnico.nombre}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setClienteEditando(cliente);
                              setModalClienteOpen(true);
                            }}
                            className="text-xs text-amber-500 hover:text-amber-400 font-medium px-2 py-1"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCliente(cliente.id);
                            }}
                            className="text-xs text-rose-500 hover:text-rose-400 font-medium px-2 py-1"
                          >
                            🗑️
                          </button>
                          <span className="text-xs bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-medium px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700/50">
                            Viviendas: {cliente.viviendas?.length || 0}
                          </span>
                        </div>
                      </div>

                      {/* Acordeón Viviendas */}
                      {isExpanded && (
                        <div className="bg-slate-50/80 dark:bg-[#0B1120]/60 p-4 border-t border-slate-100 dark:border-slate-800/50 space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                              Viviendas asociadas a {cliente.nombre}
                            </h4>
                            <button
                              onClick={() => {
                                setClienteIdParaVivienda(cliente.id);
                                setViviendaEditando(null);
                                setModalViviendaOpen(true);
                              }}
                              className="text-xs bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-600/20 font-medium transition-colors"
                            >
                              + Registrar Vivienda
                            </button>
                          </div>

                          {cliente.viviendas?.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">No hay viviendas registradas para este cliente.</p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {cliente.viviendas.map((v: any) => (
                                <div
                                  key={v.id}
                                  className="bg-white dark:bg-[#131B2E] p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center"
                                >
                                  <div>
                                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{v.direccion}</p>
                                    <span className="inline-block mt-1 text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                      {v.tipo}
                                    </span>
                                  </div>
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => {
                                        setViviendaEditando(v);
                                        setModalViviendaOpen(true);
                                      }}
                                      className="text-xs p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleDeleteVivienda(v.id)}
                                      className="text-xs p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modal Cliente */}
      {modalClienteOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {clienteEditando ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
              </h3>
              <button onClick={() => setModalClienteOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCliente} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Nombre completo *</label>
                <input
                  required
                  name="nombre"
                  defaultValue={clienteEditando?.nombre || ''}
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">RUT</label>
                <input
                  name="rut"
                  defaultValue={clienteEditando?.rut || ''}
                  placeholder="Ej: 12.345.678-9"
                  className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Teléfono *</label>
                <input
                  required
                  name="telefono"
                  defaultValue={clienteEditando?.telefono || ''}
                  placeholder="Ej: +56 9 1234 5678"
                  className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={clienteEditando?.email || ''}
                  placeholder="Ej: cliente@correo.com"
                  className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalClienteOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-blue-400 rounded-xl text-white font-semibold shadow-md"
                >
                  {guardando ? 'Guardando...' : clienteEditando ? 'Actualizar Cliente' : 'Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Vivienda con Tipo Libre e Información Inicial */}
      {modalViviendaOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {viviendaEditando ? 'Editar Datos de Vivienda' : 'Registrar Datos Iniciales de Vivienda'}
              </h3>
              <button onClick={() => setModalViviendaOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVivienda} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Dirección exacta *</label>
                <input
                  required
                  name="direccion"
                  defaultValue={viviendaEditando?.direccion || ''}
                  placeholder="Ej: Av. Providencia 1234, Depto 502, Providencia"
                  className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Tipo de vivienda / propiedad *</label>
                <input
                  required
                  name="tipo"
                  defaultValue={viviendaEditando?.tipo || ''}
                  placeholder="Ej: Casa de 2 pisos, Departamento, Local Comercial, Galpón..."
                  className="w-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalViviendaOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardando}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-blue-400 rounded-xl text-white font-semibold shadow-md"
                >
                  {guardando ? 'Guardando...' : viviendaEditando ? 'Actualizar Vivienda' : 'Guardar Vivienda'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}