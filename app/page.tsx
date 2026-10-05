'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 hidden md:flex border-r border-slate-800">
        <div>
          {/* Logo PGTE */}
          <div className="p-6 border-b border-slate-800">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-amber-400 text-2xl font-black group-hover:scale-110 transition-transform">⚡</span>
              <div>
                <h1 className="text-xl font-black tracking-wider text-white">PGTE</h1>
                <p className="text-[10px] text-slate-400 font-medium leading-none">Gestión Técnica Eléctrica</p>
              </div>
            </Link>
          </div>

          {/* Menú de Navegación Operativa */}
          <nav className="p-4 space-y-6 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-3">OPERACIÓN</span>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/" className="flex items-center space-x-3 bg-blue-900/50 text-white font-semibold px-3 py-2.5 rounded-lg border-l-4 border-blue-500">
                    <span>🖥️</span>
                    <span>Panel principal</span>
                  </Link>
                </li>
                <li>
                  <Link href="/clientes" className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors">
                    <span>👤</span>
                    <span>Clientes y viviendas</span>
                  </Link>
                </li>
                <li>
                  <Link href="/levantamiento" className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors">
                    <span>📋</span>
                    <span>Levantamientos</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cotizaciones" className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors">
                    <span>💲</span>
                    <span>Cotizaciones</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold px-3">GESTIÓN</span>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/documento" className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors">
                    <span>📊</span>
                    <span>Reportes y Documentos</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cotizaciones" className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors">
                    <span>🕒</span>
                    <span>Historial</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors">
                    <span>⚙️</span>
                    <span>Configuración</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Superior */}
        <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Panel principal</span>
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span>César Moreno</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          {/* Banner Principal */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Gestión Técnica Eléctrica Residencial
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Realiza levantamientos eléctricos en terreno, centraliza la información técnica de cada vivienda y facilita la elaboración de soluciones y cotizaciones.
              </p>
            </div>
            <Link
              href="/documento"
              className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition-colors shrink-0 flex items-center space-x-1.5"
            >
              <span>📄</span>
              <span>Exportar reporte</span>
            </Link>
          </div>

          {/* Tarjetas de Accesos Rápidos (Rutas conectadas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Nuevo Levantamiento */}
            <Link 
              href="/levantamiento" 
              className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm border-t-4 border-t-teal-400 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-1">
                LEVANTAMIENTO TÉCNICO
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Nuevo levantamiento →
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Registra tablero, circuitos, protecciones, cargas y observaciones.
              </p>
            </Link>

            {/* Card 2: Viviendas Registradas */}
            <Link 
              href="/levantamiento" 
              className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm border-t-4 border-t-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                FICHA DIGITAL
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Viviendas registradas →
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Centraliza los antecedentes técnicos y el historial de cada vivienda.
              </p>
            </Link>

            {/* Card 3: Soluciones y Cotizaciones */}
            <Link 
              href="/cotizaciones" 
              className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm border-t-4 border-t-amber-500 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                SOLUCIONES Y COTIZACIONES
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Cotizaciones →
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Genera propuestas de trabajo a partir del levantamiento realizado.
              </p>
            </Link>

            {/* Card 4: Documentos y Actividad Reciente */}
            <Link 
              href="/documento" 
              className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm border-t-4 border-t-purple-500 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
                ACTIVIDAD RECIENTE
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Últimos trabajos →
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Consulta levantamientos y cotizaciones realizadas recientemente.
              </p>
            </Link>
          </div>

          {/* Tarjetas de Métricas (KPIs) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-xl">📋</div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">128</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Levantamientos realizados</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-xl">🏠</div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">84</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Viviendas registradas</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-xl text-emerald-600 font-bold">$</div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">47</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cotizaciones emitidas</p>
              </div>
            </div>
          </div>

          {/* Tabla de Actividad Reciente (Filas con Links) */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Actividad reciente</h3>
              <Link href="/cotizaciones" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Ver todo →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-700/60 pb-2">
                    <th className="pb-3 font-medium">Cliente</th>
                    <th className="pb-3 font-medium">Dirección</th>
                    <th className="pb-3 font-medium">Tipo</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Fecha</th>
                    <th className="pb-3 font-medium text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 font-medium text-slate-900 dark:text-slate-200">María González</td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">Av. Los Aromos 1245, Maipú</td>
                    <td className="py-3.5">Levantamiento</td>
                    <td className="py-3.5"><span className="text-emerald-500 font-semibold">Completado</span></td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">30/08/2026</td>
                    <td className="py-3.5 text-right">
                      <Link href="/levantamiento" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                        Ver Ficha
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 font-medium text-slate-900 dark:text-slate-200">Juan Pérez</td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">Calle Lautaro 890, Puente Alto</td>
                    <td className="py-3.5">Cotización</td>
                    <td className="py-3.5"><span className="text-amber-500 font-semibold">Pendiente</span></td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">29/08/2026</td>
                    <td className="py-3.5 text-right">
                      <Link href="/documento" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                        Ver Cotización
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 font-medium text-slate-900 dark:text-slate-200">Empresa SolTec Ltda.</td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">Pasaje El Sol 32, La Florida</td>
                    <td className="py-3.5">Levantamiento</td>
                    <td className="py-3.5"><span className="text-blue-500 font-semibold">En curso</span></td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400">28/08/2026</td>
                    <td className="py-3.5 text-right">
                      <Link href="/levantamiento" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                        Continuar
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}