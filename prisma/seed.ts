// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mismo UUID fijo que ya usas en proyectos.actions.ts como TECNICO_PRUEBA_ID.
// Tiene que ser EXACTAMENTE el mismo string, o Prisma va a buscar un
// Profile que no existe cuando intentes crear un Proyecto.
const TECNICO_PRUEBA_ID = "00000000-0000-0000-0000-000000000001";
const EMPRESA_PRUEBA_ID = "00000000-0000-0000-0000-000000000099";

async function main() {
  // 1. Empresa primero, porque Profile depende de ella.
  const empresa = await prisma.empresa.upsert({
    where: { id: EMPRESA_PRUEBA_ID },
    update: {},
    create: {
      id: EMPRESA_PRUEBA_ID,
      nombre: "Empresa de Prueba PGTE",
      rut: "76123456-7",
      telefono: "+56912345678",
      email: "contacto@pgte-prueba.cl",
      direccion: "Calle Falsa 123, Santiago",
    },
  });

  // 2. Profile (el técnico), conectado a esa empresa.
  const tecnico = await prisma.profile.upsert({
    where: { id: TECNICO_PRUEBA_ID },
    update: {},
    create: {
      id: TECNICO_PRUEBA_ID,
      empresaId: empresa.id,
      nombre: "Marcelo",
      apellido: "Tapia",
      rut: "11222333-4",
      telefono: "+56987654321",
      email: "tecnico.prueba@pgte.cl",
      rol: "tecnico",
    },
  });

  console.log("Seed listo:");
  console.log("  Empresa:", empresa.id, "-", empresa.nombre);
  console.log("  Profile:", tecnico.id, "-", tecnico.nombre, tecnico.apellido);
}

main()
  .catch((e) => {
    console.error("Error al hacer seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });