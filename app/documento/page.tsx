'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DocumentoPage() {
  const [vista, setVista] = useState<'cliente' | 'interna'>('cliente');

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans pb-10 transition-colors duration-200">
      {/* Encabezado con selector de vista */}
      <header className="bg-blue-900 dark:bg-slate-950 text-white shadow-md p-4 sticky top-0 z-10 border-b dark:border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <Link href="/cotizaciones" className="text-amber-400 hover:text-amber-300 font-bold text-xl">
              ← PGTE
            </Link>
            <h1 className="text-lg font-bold tracking-wide">| Documento de Cotización</h1>
          </div>

          {/* Selector de Pestañas */}
          <div className="flex bg-blue-950 dark:bg-slate-900 p-1 rounded-xl border border-blue-800 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setVista('cliente')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'cliente'
                  ? 'bg-amber-400 text-blue-950 shadow'
                  : 'text-blue-200 dark:text-slate-400 hover:text-white'
              }`}
            >
              👁️ Vista Cliente (Para enviar)
            </button>
            <button
              type="button"
              onClick={() => setVista('interna')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'interna'
                  ? 'bg-amber-400 text-blue-950 shadow'
                  : 'text-blue-200 dark:text-slate-400 hover:text-white'
              }`}
            >
              🔒 Vista Interna (Técnico)
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Barra de estado y botón de impresión */}
        <div className="flex justify-between items-center text-xs bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-slate-600 dark:text-slate-300">
            Modo actual: <strong className="text-slate-900 dark:text-white uppercase">{vista}</strong>
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-3 py-1 rounded font-medium transition-colors"
          >
            🖨️ Imprimir / Guardar PDF
          </button>
        </div>

        {/* VISTA CLIENTE (Documento Comercial Limpio) */}
        {vista === 'cliente' && (
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-8 transition-colors duration-200">
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-6">
              <div>
                <h2 className="text-2xl font-black text-blue-900 dark:text-blue-400 tracking-wider">
                  PGTE ELECTRÓNICA
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Servicios y Proyectos Eléctricos Certificados SEC</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Contacto: contacto@pgte.cl | +56 9 9999 8888</p>
              </div>
              <div className="text-right">
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-bold text-xs px-3 py-1 rounded-full border dark:border-blue-800">
                  COTIZACIÓN N° 0024
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Fecha: 24/10/2026</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-lg border border-slate-100 dark:border-slate-700 text-xs grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 dark:text-slate-500 font-medium block">CLIENTE:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Juan Pérez</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 font-medium block">DIRECCIÓN:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">Av. Pajaritos 123, Maipú</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Resumen de Propuesta de Servicio</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                    <th className="py-2">Descripción de Partidas</th>
                    <th className="py-2 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3">
                      <span className="font-semibold block text-slate-900 dark:text-slate-100">Normalización de Tablero Eléctrico Residencial</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Suministro e instalación de protecciones térmicas, embutido de caja y canalizaciones.
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium text-slate-900 dark:text-slate-100">$292.500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">* Precios válidos por 15 días corridos.</span>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">TOTAL A PAGAR</span>
                <span className="text-2xl font-black text-blue-900 dark:text-blue-400">$292.500</span>
              </div>
            </div>
          </div>
        )}

        {/* VISTA INTERNA TÉCNICA (Diseño Pro de Hoja Operativa) */}
        {vista === 'interna' && (
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-8 transition-colors duration-200">
            {/* Encabezado Técnico de Hoja de Trabajo */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-5">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border border-amber-300 dark:border-amber-700">
                    EXPEDIENTE TÉCNICO N° 0024
                  </span>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border border-blue-300 dark:border-blue-700">
                    Sello SEC Tipo A/B
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Informe de Terreno y Estructura de Costos
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400">
                <p><strong className="text-slate-700 dark:text-slate-200">Técnico Asignado:</strong> Eduardo G.</p>
                <p><strong className="text-slate-700 dark:text-slate-200">Fecha Inspección:</strong> 24 Oct, 2026</p>
              </div>
            </div>

            {/* Badges de Evaluación y Alertas Técnicas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300">Puesta a Tierra</span>
                  <span className="text-xs">⚠️ Requiere Malla</span>
                </div>
                <p className="text-[11px] text-amber-900 dark:text-amber-200/80">
                  Resistencia fuera de norma. Incluir electrodo de puesta a tierra o pica 1.5m.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300">Materialidad Muros</span>
                  <span className="text-xs">🔨 Hormigón Armado</span>
                </div>
                <p className="text-[11px] text-blue-900 dark:text-blue-200/80">
                  Trabajo pesado de calado. Requiere Roto-martillo y brocas de copa para concreto.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Cargas Críticas</span>
                  <span className="text-xs">⚡ High Load</span>
                </div>
                <p className="text-[11px] text-emerald-900 dark:text-emerald-200/80">
                  Ducha eléctrica (35A) y Secadora detectadas. Circuito independiente requerido.
                </p>
              </div>
            </div>

            {/* Cómputo Técnico de Insumos y Mano de Obra */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Desglose Detallado de Costos Directos</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Precios Neto Compra</span>
              </h3>
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 uppercase font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-3">Categoría / Ítem</th>
                      <th className="p-3 text-center">Cant / Tiempo</th>
                      <th className="p-3 text-right">Costo Unitario</th>
                      <th className="p-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-800 dark:text-slate-200">
                    <tr>
                      <td className="p-3 font-semibold">Jornada Mano de Obra Especializada (Técnico + Ayudante)</td>
                      <td className="p-3 text-center">2 Días</td>
                      <td className="p-3 text-right font-mono">$75.000</td>
                      <td className="p-3 text-right font-mono font-bold">$150.000</td>
                    </tr>
                    <tr>
                      <td className="p-3">Rollo Cable EVA 2.5mm Libre de Halógeno (100m)</td>
                      <td className="p-3 text-center">1 Unid</td>
                      <td className="p-3 text-right font-mono">$45.000</td>
                      <td className="p-3 text-right font-mono">$45.000</td>
                    </tr>
                    <tr>
                      <td className="p-3">Automático Térmico Schneider 16A / 25A</td>
                      <td className="p-3 text-center">3 Unid</td>
                      <td className="p-3 text-right font-mono">$6.000</td>
                      <td className="p-3 text-right font-mono">$18.000</td>
                    </tr>
                    <tr>
                      <td className="p-3">Caja Tablero Embutido 8 Polos PVC Ignífugo</td>
                      <td className="p-3 text-center">1 Unid</td>
                      <td className="p-3 text-right font-mono">$12.000</td>
                      <td className="p-3 text-right font-mono">$12.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dashboard Analítico de Rentabilidad del Servicio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-inner">
              <div className="border-b sm:border-b-0 sm:border-r border-slate-800 pb-3 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-[11px] text-slate-400 font-medium uppercase block">Costo Directo Total</span>
                <p className="text-2xl font-black text-slate-200 font-mono">$225.000</p>
                <span className="text-[10px] text-slate-400">Gasto Insumos + Salarios</span>
              </div>

              <div className="border-b sm:border-b-0 sm:border-r border-slate-800 pb-3 sm:pb-0 pr-0 sm:pr-4">
                <span className="text-[11px] text-amber-400 font-medium uppercase block">% Margen de Ganancia</span>
                <p className="text-2xl font-black text-amber-400 font-mono">30.0%</p>
                <span className="text-[10px] text-slate-400">Utilidad libre sobre costo</span>
              </div>

              <div>
                <span className="text-[11px] text-emerald-400 font-medium uppercase block">Utilidad Neta Estimada</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">+$67.500</p>
                <span className="text-[10px] text-slate-400">Ganancia neta para PGTE</span>
              </div>
            </div>

            {/* Registro de Fotos e Inspección en Terreno */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Evidencia Fotografica y Checklist de Terreno
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-2xl">
                    📷
                  </div>
                  <div className="text-[11px]">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Tablero Antiguo</span>
                    <span className="text-slate-500 dark:text-slate-400">Sin interruptor diferencial</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-2xl">
                    📷
                  </div>
                  <div className="text-[11px]">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Medidor Monofásico</span>
                    <span className="text-slate-500 dark:text-slate-400">Acometida conforme</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-2xl">
                    📷
                  </div>
                  <div className="text-[11px]">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Malla / Tierra</span>
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">Resistencia alta (&gt; 20Ω)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}