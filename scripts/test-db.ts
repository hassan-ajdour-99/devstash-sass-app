import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function section(title: string) {
  console.log(`\n${"─".repeat(50)}`);
  console.log(`  ${title}`);
  console.log("─".repeat(50));
}

async function main() {
  // ── Counts ────────────────────────────────────────────
  section("DB Counts");
  const [userCount, itemTypeCount, collectionCount, itemCount, tagCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.itemType.count(),
      prisma.collection.count(),
      prisma.item.count(),
      prisma.tag.count(),
    ]);
  console.log(`  Users:       ${userCount}`);
  console.log(`  Item Types:  ${itemTypeCount}`);
  console.log(`  Collections: ${collectionCount}`);
  console.log(`  Items:       ${itemCount}`);
  console.log(`  Tags:        ${tagCount}`);

  // ── Demo User ─────────────────────────────────────────
  section("Demo User");
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });
  if (!user) throw new Error("Demo user not found!");
  console.log(`  Email:  ${user.email}`);
  console.log(`  isPro:  ${user.isPro}`);
  console.log(`  ID:     ${user.id}`);

  // ── System Item Types ─────────────────────────────────
  section("System Item Types");
  const types = await prisma.itemType.findMany({ orderBy: { name: "asc" } });
  for (const t of types) {
    console.log(`  [${t.icon?.padEnd(12)}]  ${t.name.padEnd(10)}  ${t.color}`);
  }

  // ── Collections ───────────────────────────────────────
  section("Collections");
  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: { items: { include: { type: true, tags: { include: { tag: true } } } } },
    orderBy: { name: "asc" },
  });
  for (const col of collections) {
    console.log(
      `\n  ${col.name} ${col.isFavorite ? "★" : " "} (${col.items.length} items)`
    );
    for (const item of col.items) {
      const tagList = item.tags.map((t) => t.tag.name).join(", ");
      const pinned = item.isPinned ? " [pinned]" : "";
      const fav = item.isFavorite ? " [fav]" : "";
      console.log(
        `    • [${item.type.name.padEnd(8)}]  ${item.title}${pinned}${fav}`
      );
      if (tagList) console.log(`               tags: ${tagList}`);
      if (item.url) console.log(`               url:  ${item.url}`);
    }
  }

  // ── Tags ──────────────────────────────────────────────
  section("All Tags");
  const tags = await prisma.tag.findMany({
    where: { userId: user.id },
    orderBy: { name: "asc" },
  });
  console.log(`  ${tags.map((t) => t.name).join(", ")}`);

  console.log("\n✓ All checks passed.\n");
}

main()
  .catch((e) => {
    console.error("DB check failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
