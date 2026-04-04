import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // User
  const user = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      isPro: false,
    },
  });

  // Item Types
  const itemTypes = await Promise.all([
    prisma.itemType.upsert({
      where: { id: "it_snippets" },
      update: {},
      create: { id: "it_snippets", name: "Snippets", icon: "Code2", color: "#6366f1", isSystem: true, userId: user.id },
    }),
    prisma.itemType.upsert({
      where: { id: "it_prompts" },
      update: {},
      create: { id: "it_prompts", name: "Prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true, userId: user.id },
    }),
    prisma.itemType.upsert({
      where: { id: "it_commands" },
      update: {},
      create: { id: "it_commands", name: "Commands", icon: "Terminal", color: "#06b6d4", isSystem: true, userId: user.id },
    }),
    prisma.itemType.upsert({
      where: { id: "it_notes" },
      update: {},
      create: { id: "it_notes", name: "Notes", icon: "BookOpen", color: "#10b981", isSystem: true, userId: user.id },
    }),
    prisma.itemType.upsert({
      where: { id: "it_files" },
      update: {},
      create: { id: "it_files", name: "Files", icon: "FileText", color: "#f59e0b", isSystem: true, userId: user.id },
    }),
    prisma.itemType.upsert({
      where: { id: "it_images" },
      update: {},
      create: { id: "it_images", name: "Images", icon: "Image", color: "#ec4899", isSystem: true, userId: user.id },
    }),
    prisma.itemType.upsert({
      where: { id: "it_links" },
      update: {},
      create: { id: "it_links", name: "Links", icon: "Link", color: "#64748b", isSystem: true, userId: user.id },
    }),
  ]);

  const [snippets, prompts, commands, notes, files, , links] = itemTypes;

  // Collections
  const collections = await Promise.all([
    prisma.collection.upsert({
      where: { id: "col_react" },
      update: {},
      create: { id: "col_react", name: "React Patterns", description: "Common React patterns and hooks", isFavorite: true, userId: user.id },
    }),
    prisma.collection.upsert({
      where: { id: "col_context" },
      update: {},
      create: { id: "col_context", name: "Context Files", description: "AI context files for projects", isFavorite: true, userId: user.id },
    }),
    prisma.collection.upsert({
      where: { id: "col_git" },
      update: {},
      create: { id: "col_git", name: "Git Commands", description: "Frequently used git commands", isFavorite: true, userId: user.id },
    }),
    prisma.collection.upsert({
      where: { id: "col_python" },
      update: {},
      create: { id: "col_python", name: "Python Snippets", description: "Useful Python code snippets", isFavorite: false, userId: user.id },
    }),
    prisma.collection.upsert({
      where: { id: "col_interview" },
      update: {},
      create: { id: "col_interview", name: "Interview Prep", description: "Technical interview preparation", isFavorite: false, userId: user.id },
    }),
    prisma.collection.upsert({
      where: { id: "col_ai" },
      update: {},
      create: { id: "col_ai", name: "AI Prompts", description: "Curated AI prompts for coding", isFavorite: false, userId: user.id },
    }),
  ]);

  const [react, , git, python, interview, ai] = collections;

  // Tags (unique per user)
  const tagNames = ["react", "auth", "hooks", "api", "error-handling", "fetch", "docker", "devops", "git", "workflow", "code-review", "chatgpt", "prisma", "database", "migrations", "tailwind", "css", "frontend", "nextjs", "routing", "python", "snippets", "system-design", "interviews", "ai"];

  const tagMap: Record<string, string> = {};
  for (const name of tagNames) {
    const tag = await prisma.tag.upsert({
      where: { id: `tag_${name}` },
      update: {},
      create: { id: `tag_${name}`, name, userId: user.id },
    });
    tagMap[name] = tag.id;
  }

  // Items
  const itemsData = [
    {
      id: "item_1",
      title: "useAuth Hook",
      description: "Custom authentication hook for React applications",
      typeId: snippets.id,
      collectionId: react.id,
      isFavorite: true,
      isPinned: true,
      language: "typescript",
      contentType: "text",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      tags: ["react", "auth", "hooks"],
    },
    {
      id: "item_2",
      title: "API Error Handling Pattern",
      description: "Fetch wrapper with exponential backoff retry logic",
      typeId: snippets.id,
      collectionId: react.id,
      isFavorite: false,
      isPinned: false,
      language: "typescript",
      contentType: "text",
      createdAt: new Date("2024-01-14"),
      updatedAt: new Date("2024-01-14"),
      tags: ["api", "error-handling", "fetch"],
    },
    {
      id: "item_3",
      title: "Docker Compose Dev Setup",
      description: "Local development Docker Compose configuration",
      typeId: files.id,
      collectionId: git.id,
      isFavorite: true,
      isPinned: true,
      language: null,
      contentType: "text",
      createdAt: new Date("2024-01-13"),
      updatedAt: new Date("2024-01-13"),
      tags: ["docker", "devops"],
    },
    {
      id: "item_4",
      title: "Git Stash Workflow",
      description: "Save and restore work in progress",
      typeId: commands.id,
      collectionId: git.id,
      isFavorite: false,
      isPinned: false,
      language: "bash",
      contentType: "text",
      createdAt: new Date("2024-01-12"),
      updatedAt: new Date("2024-01-12"),
      tags: ["git", "workflow"],
    },
    {
      id: "item_5",
      title: "ChatGPT Code Review Prompt",
      description: "Prompt for detailed code reviews with suggestions",
      typeId: prompts.id,
      collectionId: ai.id,
      isFavorite: true,
      isPinned: false,
      language: null,
      contentType: "text",
      createdAt: new Date("2024-01-11"),
      updatedAt: new Date("2024-01-11"),
      tags: ["ai", "code-review", "chatgpt"],
    },
    {
      id: "item_6",
      title: "Prisma Migration Commands",
      description: "Common Prisma ORM migration commands",
      typeId: commands.id,
      collectionId: python.id,
      isFavorite: false,
      isPinned: false,
      language: "bash",
      contentType: "text",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      tags: ["prisma", "database", "migrations"],
    },
    {
      id: "item_7",
      title: "Tailwind CSS Cheatsheet",
      description: "Most used Tailwind utility classes",
      typeId: notes.id,
      collectionId: react.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      createdAt: new Date("2024-01-09"),
      updatedAt: new Date("2024-01-09"),
      tags: ["tailwind", "css", "frontend"],
    },
    {
      id: "item_8",
      title: "Next.js App Router Notes",
      description: "Key concepts for Next.js App Router",
      typeId: notes.id,
      collectionId: react.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      createdAt: new Date("2024-01-08"),
      updatedAt: new Date("2024-01-08"),
      tags: ["nextjs", "react", "routing"],
    },
    {
      id: "item_9",
      title: "Python List Comprehensions",
      description: "Advanced list comprehension patterns",
      typeId: snippets.id,
      collectionId: python.id,
      isFavorite: false,
      isPinned: false,
      language: "python",
      contentType: "text",
      createdAt: new Date("2024-01-07"),
      updatedAt: new Date("2024-01-07"),
      tags: ["python", "snippets"],
    },
    {
      id: "item_10",
      title: "System Design Interview Notes",
      description: "Key concepts for system design interviews",
      typeId: notes.id,
      collectionId: interview.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      createdAt: new Date("2024-01-06"),
      updatedAt: new Date("2024-01-06"),
      tags: ["system-design", "interviews"],
    },
  ];

  for (const { tags, ...itemData } of itemsData) {
    const item = await prisma.item.upsert({
      where: { id: itemData.id },
      update: {},
      create: { ...itemData, userId: user.id },
    });

    for (const tagName of tags) {
      await prisma.itemTag.upsert({
        where: { itemId_tagId: { itemId: item.id, tagId: tagMap[tagName] } },
        update: {},
        create: { itemId: item.id, tagId: tagMap[tagName] },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
