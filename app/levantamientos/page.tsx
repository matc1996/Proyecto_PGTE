import Link from 'next/link';

export default function LevantamientoPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans pb-10 transition-colors duration-200">
      {/* Encabezado */}
      <header className="bg-blue-900 dark:bg-slate-950 text-white shadow-md p-4 flex justify-between items-center border-b dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-amber-400 hover:text-amber-300 font-bold text-xl">
            ← PGTE
          </Link>
          <h1 className="text-lg font-bold tracking-wide">| Nuevo Levantamiento Técnico</h1>
        </div>
        <span className="text-xs bg-blue-800 dark:bg-slate-800 px-3 py-1 rounded-full text-blue-100 dark:text-slate-300">
          En Terreno
        </span>
      </header>

      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        <form className="space-y-6">
          {/* Seccion 1: Datos del Cliente e Inmueble */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">
              1. Identificación del Cliente e Inmueble
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Teléfono de Contacto</label>
                <input
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Comuna / Región</label>
                <input
                  type="text"
                  placeholder="Ej: Maipú, R.M."
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Dirección Exacta</label>
                <input
                  type="text"
                  placeholder="Calle y número"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Campo Requerido: Materialidad del Inmueble */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Materialidad del Inmueble (Definición de Herramientas)
                </label>
                <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="hormigon">Hormigón / Albañilería (Requiere Roto-martillo)</option>
                  <option value="madera">Madera / Tabquería Vulcanita (Brocas estándar)</option>
                  <option value="mixto">Mixto (Hormigón + Madera)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seccion 2: Diagnóstico Eléctrico de Terreno */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">
              2. Diagnóstico Técnico y Evaluaciones
            </h2>

            <div className="space-y-4">
              {/* Puesta a Tierra */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Estado de la Puesta a Tierra
                </label>
                <select className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="bueno">Conforme / En Norma</option>
                  <option value="deficiente">Deficiente (Medición alta resistencia)</option>
                  <option value="inexistente">Inexistente (Requiere malla/mordaza)</option>
                </select>
              </div>

              {/* Consumos Críticos */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                  Consumos Críticos Detectados
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <label className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-slate-700 dark:text-slate-300">Ducha Eléctrica</span>
                  </label>
                  <label className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-slate-700 dark:text-slate-300">Secadora de Ropa</span>
                  </label>
                  <label className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-slate-700 dark:text-slate-300">Aire Acondicionado</span>
                  </label>
                </div>
              </div>

              {/* Evidencia Fotográfica */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Carga de Fotografías de la Instalación
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <span className="text-2xl block mb-1">📷</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Haz clic o arrastra fotos del tablero o medidor aquí
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones de Navegación */}
          <div className="flex justify-between items-center pt-2">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </Link>
            <Link
              href="/cotizaciones"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow transition-colors text-sm"
            >
              Guardar y Pasar a Cotizar →
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}