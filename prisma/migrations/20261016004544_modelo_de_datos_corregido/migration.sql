/*
  Warnings:

  - You are about to drop the `cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ficha_digital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item_electrico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `levantamiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tecnico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trabajo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vivienda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cliente" DROP CONSTRAINT "cliente_tecnico_id_fkey";

-- DropForeignKey
ALTER TABLE "ficha_digital" DROP CONSTRAINT "ficha_digital_levantamiento_id_fkey";

-- DropForeignKey
ALTER TABLE "item_electrico" DROP CONSTRAINT "item_electrico_levantamiento_id_fkey";

-- DropForeignKey
ALTER TABLE "levantamiento" DROP CONSTRAINT "levantamiento_vivienda_id_fkey";

-- DropForeignKey
ALTER TABLE "material" DROP CONSTRAINT "material_levantamiento_id_fkey";

-- DropForeignKey
ALTER TABLE "trabajo" DROP CONSTRAINT "trabajo_levantamiento_id_fkey";

-- DropForeignKey
ALTER TABLE "vivienda" DROP CONSTRAINT "vivienda_cliente_id_fkey";

-- DropTable
DROP TABLE "cliente";

-- DropTable
DROP TABLE "ficha_digital";

-- DropTable
DROP TABLE "item_electrico";

-- DropTable
DROP TABLE "levantamiento";

-- DropTable
DROP TABLE "material";

-- DropTable
DROP TABLE "tecnico";

-- DropTable
DROP TABLE "trabajo";

-- DropTable
DROP TABLE "vivienda";

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "rut" VARCHAR(12) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "direccion" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "rut" VARCHAR(12) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "rol" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "rut" VARCHAR(12) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "observaciones" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inmuebles" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "direccion" VARCHAR(250) NOT NULL,
    "comuna" VARCHAR(100) NOT NULL,
    "tipo_uso" VARCHAR(50) NOT NULL,
    "material_construccion" VARCHAR(100) NOT NULL,
    "superficie_m2" DECIMAL(10,2),
    "antiguedad_anios" INTEGER,
    "observaciones" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inmuebles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "inmueble_id" TEXT NOT NULL,
    "tecnico_id" TEXT NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo_trabajo" VARCHAR(50) NOT NULL,
    "estado" VARCHAR(30) NOT NULL DEFAULT 'solicitado',
    "prioridad" VARCHAR(20) NOT NULL DEFAULT 'media',
    "fecha_solicitud" TIMESTAMP(3),
    "fecha_visita" TIMESTAMP(3),
    "fecha_inicio" TIMESTAMP(3),
    "fecha_termino" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitas_tecnicas" (
    "id" TEXT NOT NULL,
    "proyecto_id" TEXT NOT NULL,
    "tecnico_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "motivo" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(30) NOT NULL DEFAULT 'programada',
    "observaciones" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitas_tecnicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levantamientos" (
    "id" TEXT NOT NULL,
    "visita_id" TEXT NOT NULL,
    "tipo_instalacion" VARCHAR(50),
    "tension" VARCHAR(20),
    "empalme" VARCHAR(50),
    "potencia_contratada" VARCHAR(50),
    "puesta_tierra" BOOLEAN NOT NULL DEFAULT false,
    "resistencia_tierra" DECIMAL(10,2),
    "estado_tierra" VARCHAR(30),
    "observaciones" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "levantamientos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tableros" (
    "id" TEXT NOT NULL,
    "levantamiento_id" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "ubicacion" VARCHAR(150),
    "tipo" VARCHAR(50),
    "marca" VARCHAR(80),
    "modelo" VARCHAR(80),
    "amperaje_general" VARCHAR(20),
    "estado" VARCHAR(30) NOT NULL DEFAULT 'por_revisar',
    "observaciones" TEXT,

    CONSTRAINT "tableros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "circuitos" (
    "id" TEXT NOT NULL,
    "tablero_id" TEXT NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "nombre" VARCHAR(100),
    "tipo" VARCHAR(50),
    "proteccion" VARCHAR(50),
    "amperaje" VARCHAR(20),
    "seccion_conductor" VARCHAR(20),
    "estado" VARCHAR(30) NOT NULL DEFAULT 'por_revisar',
    "observaciones" TEXT,

    CONSTRAINT "circuitos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hallazgos" (
    "id" TEXT NOT NULL,
    "levantamiento_id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" VARCHAR(50),
    "severidad" VARCHAR(20) NOT NULL DEFAULT 'media',
    "ubicacion" VARCHAR(150),
    "requiere_intervencion" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hallazgos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soluciones" (
    "id" TEXT NOT NULL,
    "proyecto_id" TEXT NOT NULL,
    "hallazgo_id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" VARCHAR(50),
    "prioridad" VARCHAR(20) NOT NULL DEFAULT 'media',
    "estado" VARCHAR(30) NOT NULL DEFAULT 'propuesta',
    "observaciones" TEXT,

    CONSTRAINT "soluciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cotizaciones" (
    "id" TEXT NOT NULL,
    "proyecto_id" TEXT NOT NULL,
    "numero" VARCHAR(30) NOT NULL,
    "estado" VARCHAR(30) NOT NULL DEFAULT 'borrador',
    "subtotal_materiales" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "subtotal_mano_obra" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "utilidad_porcentaje" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "utilidad_monto" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "validez_dias" INTEGER NOT NULL DEFAULT 15,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT,

    CONSTRAINT "cotizaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cotizacion_items" (
    "id" TEXT NOT NULL,
    "cotizacion_id" TEXT NOT NULL,
    "tipo" VARCHAR(30) NOT NULL,
    "descripcion" VARCHAR(200) NOT NULL,
    "cantidad" DECIMAL(10,2) NOT NULL,
    "unidad" VARCHAR(20) NOT NULL,
    "precio_unitario" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "cotizacion_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avances" (
    "id" TEXT NOT NULL,
    "proyecto_id" TEXT NOT NULL,
    "tecnico_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT NOT NULL,
    "porcentaje" INTEGER NOT NULL DEFAULT 0,
    "estado" VARCHAR(30) NOT NULL DEFAULT 'en_progreso',

    CONSTRAINT "avances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "levantamientos_visita_id_key" ON "levantamientos"("visita_id");

-- CreateIndex
CREATE UNIQUE INDEX "soluciones_hallazgo_id_key" ON "soluciones"("hallazgo_id");

-- CreateIndex
CREATE UNIQUE INDEX "cotizaciones_numero_key" ON "cotizaciones"("numero");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inmuebles" ADD CONSTRAINT "inmuebles_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_inmueble_id_fkey" FOREIGN KEY ("inmueble_id") REFERENCES "inmuebles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitas_tecnicas" ADD CONSTRAINT "visitas_tecnicas_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitas_tecnicas" ADD CONSTRAINT "visitas_tecnicas_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levantamientos" ADD CONSTRAINT "levantamientos_visita_id_fkey" FOREIGN KEY ("visita_id") REFERENCES "visitas_tecnicas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tableros" ADD CONSTRAINT "tableros_levantamiento_id_fkey" FOREIGN KEY ("levantamiento_id") REFERENCES "levantamientos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "circuitos" ADD CONSTRAINT "circuitos_tablero_id_fkey" FOREIGN KEY ("tablero_id") REFERENCES "tableros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hallazgos" ADD CONSTRAINT "hallazgos_levantamiento_id_fkey" FOREIGN KEY ("levantamiento_id") REFERENCES "levantamientos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soluciones" ADD CONSTRAINT "soluciones_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soluciones" ADD CONSTRAINT "soluciones_hallazgo_id_fkey" FOREIGN KEY ("hallazgo_id") REFERENCES "hallazgos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizaciones" ADD CONSTRAINT "cotizaciones_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cotizacion_items" ADD CONSTRAINT "cotizacion_items_cotizacion_id_fkey" FOREIGN KEY ("cotizacion_id") REFERENCES "cotizaciones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avances" ADD CONSTRAINT "avances_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avances" ADD CONSTRAINT "avances_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
