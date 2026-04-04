import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const userCount = await prisma.user.count();
  const itemTypeCount = await prisma.itemType.count();
  const collectionCount = await prisma.collection.count();
  const itemCount = await prisma.item.count();
  const tagCount = await prisma.tag.count();

  console.log("DB connection successful!\n");
  console.log("--- Counts ---");
  console.log(`Users:       ${userCount}`);
  console.log(`Item Types:  ${itemTypeCount}`);
  console.log(`Collections: ${collectionCount}`);
  console.log(`Items:       ${itemCount}`);
  console.log(`Tags:        ${tagCount}`);

  const user = await prisma.user.findFirst({
    include: {
      collections: true,
      items: { include: { type: true } },
    },
  });

  console.log(`\n--- User ---`);
  console.log(`Email: ${user?.email}`);
  console.log(`Collections: ${user?.collections.map((c) => c.name).join(", ")}`);
  console.log(`Items: ${user?.items.map((i) => `${i.title} (${i.type.name})`).join(", ")}`);
}

main()
  .catch((e) => {
    console.error("DB connection failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
