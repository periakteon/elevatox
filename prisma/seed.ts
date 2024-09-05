import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "Elevatox",
      email: "admin@elevatox.com",
      isActive: true,
      phone: "1234567890",
      role: "ADMIN",
      userId: "user_2leXHkVqUW9WkFIaFcGmdDf5gZ3",
      avatar:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJUUWMyZUh2U240cXQwY0w0N3lSV2lpd3F3SC5qcGVnIn0",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
