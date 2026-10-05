-- CreateTable
CREATE TABLE "tecnico" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "tecnico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "tecnico_id" INTEGER NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vivienda" (
    "id" SERIAL NOT NULL,
    "direccion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "cliente_id" INTEGER NOT NULL,

    CONSTRAINT "vivienda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levantamiento" (
    "id" SERIAL NOT NULL,
    "fecha_visita" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT,
    "vivienda_id" INTEGER NOT NULL,

    CONSTRAINT "levantamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ficha_digital" (
    "id" SERIAL NOT NULL,
    "fecha_generacion" TIMESTAMP(3) NOT NULL,
    "resumen" TEXT,
    "recomendacion_ia" TEXT,
    "levantamiento_id" INTEGER NOT NULL,

    CONSTRAINT "ficha_digital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_electrico" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "levantamiento_id" INTEGER NOT NULL,

    CONSTRAINT "item_electrico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "levantamiento_id" INTEGER NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trabajo" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "prioridad" TEXT NOT NULL,
    "levantamiento_id" INTEGER NOT NULL,

    CONSTRAINT "trabajo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tecnico_correo_key" ON "tecnico"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "ficha_digital_levantamiento_id_key" ON "ficha_digital"("levantamiento_id");

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vivienda" ADD CONSTRAINT "vivienda_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levantamiento" ADD CONSTRAINT "levantamiento_vivienda_id_fkey" FOREIGN KEY ("vivienda_id") REFERENCES "vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_digital" ADD CONSTRAINT "ficha_digital_levantamiento_id_fkey" FOREIGN KEY ("levantamiento_id") REFERENCES "levantamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_electrico" ADD CONSTRAINT "item_electrico_levantamiento_id_fkey" FOREIGN KEY ("levantamiento_id") REFERENCES "levantamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_levantamiento_id_fkey" FOREIGN KEY ("levantamiento_id") REFERENCES "levantamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trabajo" ADD CONSTRAINT "trabajo_levantamiento_id_fkey" FOREIGN KEY ("levantamiento_id") REFERENCES "levantamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
