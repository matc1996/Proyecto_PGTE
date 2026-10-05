import Link from 'next/link';

export default function CotizacionPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans pb-10 transition-colors duration-200">
      {/* Encabezado */}
      <header className="bg-blue-900 dark:bg-slate-950 text-white shadow-md p-4 flex justify-between items-center border-b dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Link href="/levantamientos" className="text-amber-400 hover:text-amber-300 font-bold text-xl">
            ← PGTE
          </Link>
          <h1 className="text-lg font-bold tracking-wide">| Calculadora de Cotización y Margen</h1>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full font-medium border border-amber-500/30">
          Cliente: Juan Pérez (Maipú)
        </span>
      </header>

      <div className="max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Izquierda: Formulario de Partidas de Trabajo (2 Columnas) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mano de Obra y Servicios */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 flex justify-between items-center">
                <span>1. Costo Mano de Obra</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Costo Directo</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Días / Horas Estimadas
                  </label>
                  <input
                    type="number"
                    defaultValue={2}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Costo Total Mano de Obra ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={150000}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Insumos y Materiales */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Insumos y Materiales</h2>
                <button
                  type="button"
                  className="text-xs bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold px-3 py-1 rounded hover:bg-blue-100 transition-colors"
                >
                  + Agregar Insumo
                </button>
              </div>

              {/* Lista de Partidas */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input
                    type="text"
                    defaultValue="Cable EVA / THHN 2.5mm (100m)"
                    className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none"
                  />
                  <input
                    type="number"
                    defaultValue={45000}
                    className="w-28 p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs text-right outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input
                    type="text"
                    defaultValue="Automático Térmico 16A Schnabel"
                    className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none"
                  />
                  <input
                    type="number"
                    defaultValue={18000}
                    className="w-28 p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs text-right outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <input
                    type="text"
                    defaultValue="Caja Tablero Embutido 8 Polos"
                    className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none"
                  />
                  <input
                    type="number"
                    defaultValue={12000}
                    className="w-28 p-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs text-right outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta de Desglose Económico y Margen */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md space-y-5 sticky top-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">
                Resumen Económico
              </h2>

              {/* Subtotales */}
              <div className="space-y-2 text-sm border-b border-slate-100 dark:border-slate-700 pb-4">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Mano de Obra:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">$150.000</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Materiales:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">$75.000</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
                  <span>Costo Directo Total:</span>
                  <span>$225.000</span>
                </div>
              </div>

              {/* Control del Margen de Utilidad */}
              <div className="bg-blue-50 dark:bg-slate-900/80 p-4 rounded-xl border border-blue-100 dark:border-slate-700 space-y-2">
                <label className="block text-xs font-bold text-blue-900 dark:text-blue-300">
                  % Utilidad Deseada (Margen)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-20 p-2 text-center rounded-lg border border-blue-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-base outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">%</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">+ $67.500</span>
                </div>
              </div>

              {/* Precio Final Sugerido al Cliente */}
              <div className="space-y-1 bg-slate-900 dark:bg-slate-950 text-white p-4 rounded-xl shadow-inner">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  Total Final a Cobrar
                </span>
                <p className="text-3xl font-extrabold text-emerald-400">$292.500</p>
                <p className="text-[10px] text-slate-400">*Exento de IVA / Pago en 2 cuotas</p>
              </div>

              {/* Botón de Acción Principal hacia el Documento Final */}
              <Link
                href="/documento"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors text-center block text-sm"
              >
                Generar Documento Cliente →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}