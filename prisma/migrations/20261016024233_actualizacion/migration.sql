/*
  Warnings:

  - Made the column `nombre` on table `circuitos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha_solicitud` on table `proyectos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "proyectos" DROP CONSTRAINT "proyectos_tecnico_id_fkey";

-- AlterTable
ALTER TABLE "avances" ALTER COLUMN "porcentaje" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "circuitos" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "rut" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cotizacion_items" ALTER COLUMN "unidad" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cotizaciones" ALTER COLUMN "utilidad_porcentaje" DROP NOT NULL,
ALTER COLUMN "utilidad_monto" DROP NOT NULL,
ALTER COLUMN "validez_dias" DROP NOT NULL,
ALTER COLUMN "fecha_vencimiento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "empresas" ALTER COLUMN "rut" DROP NOT NULL,
ALTER COLUMN "telefono" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "direccion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "hallazgos" ALTER COLUMN "severidad" DROP NOT NULL;

-- AlterTable
ALTER TABLE "inmuebles" ALTER COLUMN "material_construccion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "levantamientos" ALTER COLUMN "puesta_tierra" DROP NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "rut" DROP NOT NULL,
ALTER COLUMN "telefono" DROP NOT NULL;

-- AlterTable
ALTER TABLE "proyectos" ALTER COLUMN "tecnico_id" DROP NOT NULL,
ALTER COLUMN "descripcion" DROP NOT NULL,
ALTER COLUMN "prioridad" DROP NOT NULL,
ALTER COLUMN "fecha_solicitud" SET NOT NULL;

-- AlterTable
ALTER TABLE "soluciones" ALTER COLUMN "hallazgo_id" DROP NOT NULL,
ALTER COLUMN "prioridad" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tableros" ALTER COLUMN "estado" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
