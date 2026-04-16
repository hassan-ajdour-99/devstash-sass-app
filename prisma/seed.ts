import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Hash password for demo user
  const hashedPassword = await bcrypt.hash("12345678", 12);

  // USER Demo
  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      password: hashedPassword,
      isPro: false,
    },
  });

  // System Item Types
  const [snippet, prompt, command, , , , link] = await Promise.all([
    prisma.itemType.upsert({
      where: { id: "it_snippet" },
      update: {},
      create: {
        id: "it_snippet",
        name: "snippet",
        icon: "Code",
        color: "#3b82f6",
        isSystem: true,
      },
    }),
    prisma.itemType.upsert({
      where: { id: "it_prompt" },
      update: {},
      create: {
        id: "it_prompt",
        name: "prompt",
        icon: "Sparkles",
        color: "#8b5cf6",
        isSystem: true,
      },
    }),
    prisma.itemType.upsert({
      where: { id: "it_command" },
      update: {},
      create: {
        id: "it_command",
        name: "command",
        icon: "Terminal",
        color: "#f97316",
        isSystem: true,
      },
    }),
    prisma.itemType.upsert({
      where: { id: "it_note" },
      update: {},
      create: {
        id: "it_note",
        name: "note",
        icon: "StickyNote",
        color: "#fde047",
        isSystem: true,
      },
    }),
    prisma.itemType.upsert({
      where: { id: "it_file" },
      update: {},
      create: {
        id: "it_file",
        name: "file",
        icon: "File",
        color: "#6b7280",
        isSystem: true,
      },
    }),
    prisma.itemType.upsert({
      where: { id: "it_image" },
      update: {},
      create: {
        id: "it_image",
        name: "image",
        icon: "Image",
        color: "#ec4899",
        isSystem: true,
      },
    }),
    prisma.itemType.upsert({
      where: { id: "it_link" },
      update: {},
      create: {
        id: "it_link",
        name: "link",
        icon: "Link",
        color: "#10b981",
        isSystem: true,
      },
    }),
  ]);

  // Collections
  const [reactCol, aiCol, devopsCol, terminalCol, designCol] =
    await Promise.all([
      prisma.collection.upsert({
        where: { id: "col_react" },
        update: {},
        create: {
          id: "col_react",
          name: "React Patterns",
          description: "Reusable React patterns and hooks",
          isFavorite: true,
          userId: user.id,
        },
      }),
      prisma.collection.upsert({
        where: { id: "col_ai" },
        update: {},
        create: {
          id: "col_ai",
          name: "AI Workflows",
          description: "AI prompts and workflow automations",
          isFavorite: true,
          userId: user.id,
        },
      }),
      prisma.collection.upsert({
        where: { id: "col_devops" },
        update: {},
        create: {
          id: "col_devops",
          name: "DevOps",
          description: "Infrastructure and deployment resources",
          isFavorite: false,
          userId: user.id,
        },
      }),
      prisma.collection.upsert({
        where: { id: "col_terminal" },
        update: {},
        create: {
          id: "col_terminal",
          name: "Terminal Commands",
          description: "Useful shell commands for everyday development",
          isFavorite: false,
          userId: user.id,
        },
      }),
      prisma.collection.upsert({
        where: { id: "col_design" },
        update: {},
        create: {
          id: "col_design",
          name: "Design Resources",
          description: "UI/UX resources and references",
          isFavorite: false,
          userId: user.id,
        },
      }),
    ]);

  // Tags
  const tagNames = [
    "react",
    "hooks",
    "typescript",
    "patterns",
    "ai",
    "prompts",
    "code-review",
    "docs",
    "refactoring",
    "docker",
    "ci-cd",
    "devops",
    "deployment",
    "git",
    "shell",
    "process",
    "npm",
    "css",
    "tailwind",
    "components",
    "design-system",
    "icons",
  ];
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
    // React Patterns — 3 snippets
    {
      id: "item_react_1",
      title: "useDebounce & useLocalStorage Hooks",
      description:
        "Custom hooks for debouncing values and persisting state to localStorage",
      typeId: snippet.id,
      collectionId: reactCol.id,
      isFavorite: true,
      isPinned: true,
      language: "typescript",
      contentType: "text",
      content: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}`,
      tags: ["react", "hooks", "typescript"],
    },
    {
      id: "item_react_2",
      title: "Context Provider Pattern",
      description:
        "Compound component and context provider pattern for shared state",
      typeId: snippet.id,
      collectionId: reactCol.id,
      isFavorite: false,
      isPinned: false,
      language: "typescript",
      contentType: "text",
      content: `import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}`,
      tags: ["react", "patterns", "typescript"],
    },
    {
      id: "item_react_3",
      title: "Utility Functions",
      description:
        "Common TypeScript utility functions: cn(), formatDate(), truncate()",
      typeId: snippet.id,
      collectionId: reactCol.id,
      isFavorite: false,
      isPinned: false,
      language: "typescript",
      contentType: "text",
      content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "…" : str;
}`,
      tags: ["typescript", "hooks"],
    },

    // AI Workflows — 3 prompts
    {
      id: "item_ai_1",
      title: "Code Review Prompt",
      description: "Detailed code review prompt with actionable feedback",
      typeId: prompt.id,
      collectionId: aiCol.id,
      isFavorite: true,
      isPinned: true,
      language: null,
      contentType: "text",
      content: `Review the following code and provide feedback on:
1. **Correctness** — Are there any bugs or logic errors?
2. **Performance** — Any unnecessary re-renders, N+1 queries, or inefficiencies?
3. **Security** — Input validation, auth checks, injection risks?
4. **Readability** — Is the code clear and well-structured?
5. **Patterns** — Does it follow best practices for this language/framework?

Be specific: reference line numbers and suggest concrete improvements.`,
      tags: ["ai", "prompts", "code-review"],
    },
    {
      id: "item_ai_2",
      title: "Documentation Generator Prompt",
      description: "Generate comprehensive docs from code",
      typeId: prompt.id,
      collectionId: aiCol.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      content: `Generate documentation for the following code. Include:
- **Overview**: What this module/function does in 1–2 sentences
- **Parameters**: Name, type, and description for each
- **Returns**: Type and description of the return value
- **Example**: A short, realistic usage example
- **Notes**: Any edge cases, gotchas, or important caveats

Output in Markdown format.`,
      tags: ["ai", "prompts", "docs"],
    },
    {
      id: "item_ai_3",
      title: "Refactoring Assistant Prompt",
      description: "Prompt to get structured refactoring suggestions",
      typeId: prompt.id,
      collectionId: aiCol.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      content: `Refactor the following code with these goals:
1. Improve readability without changing behavior
2. Remove duplication (DRY)
3. Break down large functions into smaller, focused ones
4. Apply relevant design patterns where appropriate
5. Add or improve TypeScript types if applicable

Show the refactored version and briefly explain each change.`,
      tags: ["ai", "prompts", "refactoring"],
    },

    // DevOps — 1 snippet, 1 command, 2 links
    {
      id: "item_devops_1",
      title: "Docker Compose — Dev Stack",
      description:
        "Docker Compose config for a Next.js + Postgres + Redis dev environment",
      typeId: snippet.id,
      collectionId: devopsCol.id,
      isFavorite: false,
      isPinned: false,
      language: "yaml",
      contentType: "text",
      content: `version: "3.9"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/devstash
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: devstash
    volumes:
      - pg_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine

volumes:
  pg_data:`,
      tags: ["docker", "devops"],
    },
    {
      id: "item_devops_2",
      title: "Deploy to Production",
      description: "Build, migrate, and deploy script for production releases",
      typeId: command.id,
      collectionId: devopsCol.id,
      isFavorite: false,
      isPinned: false,
      language: "bash",
      contentType: "text",
      content: `#!/bin/bash
set -e

echo "Building..."
npm run build

echo "Running migrations..."
npx prisma migrate deploy

echo "Restarting server..."
pm2 restart devstash

echo "Deploy complete."`,
      tags: ["deployment", "devops", "ci-cd"],
    },
    {
      id: "item_devops_3",
      title: "GitHub Actions Docs",
      description: "Official GitHub Actions documentation",
      typeId: link.id,
      collectionId: devopsCol.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      url: "https://docs.github.com/en/actions",
      tags: ["ci-cd", "devops"],
    },
    {
      id: "item_devops_4",
      title: "Docker Documentation",
      description: "Official Docker docs — references, guides, and CLI",
      typeId: link.id,
      collectionId: devopsCol.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      url: "https://docs.docker.com",
      tags: ["docker", "devops"],
    },

    // Terminal Commands — 4 commands
    {
      id: "item_term_1",
      title: "Git Essentials",
      description: "Most-used Git operations for daily workflow",
      typeId: command.id,
      collectionId: terminalCol.id,
      isFavorite: true,
      isPinned: true,
      language: "bash",
      contentType: "text",
      content: `# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Interactive rebase — rewrite last 5 commits
git rebase -i HEAD~5

# Stash with a message
git stash push -m "WIP: feature name"

# List branches sorted by last commit
git branch --sort=-committerdate

# Clean untracked files (dry run first)
git clean -nd
git clean -fd`,
      tags: ["git", "shell"],
    },
    {
      id: "item_term_2",
      title: "Docker Commands",
      description: "Handy Docker CLI commands for containers and images",
      typeId: command.id,
      collectionId: terminalCol.id,
      isFavorite: false,
      isPinned: false,
      language: "bash",
      contentType: "text",
      content: `# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Live resource usage
docker stats

# Shell into a running container
docker exec -it <container> sh

# View logs (follow)
docker logs -f <container>`,
      tags: ["docker", "shell"],
    },
    {
      id: "item_term_3",
      title: "Process Management",
      description: "Find and kill processes by port or name",
      typeId: command.id,
      collectionId: terminalCol.id,
      isFavorite: false,
      isPinned: false,
      language: "bash",
      contentType: "text",
      content: `# Find process on a port
lsof -i :3000

# Kill process on port 3000
kill -9 $(lsof -ti :3000)

# List all node processes
ps aux | grep node

# Kill by name
pkill -f "node server.js"`,
      tags: ["process", "shell"],
    },
    {
      id: "item_term_4",
      title: "Package Manager Utilities",
      description: "Useful npm/pnpm commands for managing dependencies",
      typeId: command.id,
      collectionId: terminalCol.id,
      isFavorite: false,
      isPinned: false,
      language: "bash",
      contentType: "text",
      content: `# Check outdated packages
npm outdated

# Update all packages interactively
npx npm-check-updates -i

# Audit and fix vulnerabilities
npm audit fix

# List globally installed packages
npm list -g --depth=0

# Clear npm cache
npm cache clean --force`,
      tags: ["npm", "shell"],
    },

    // Design Resources — 4 links
    {
      id: "item_design_1",
      title: "Tailwind CSS Docs",
      description:
        "Official Tailwind CSS v4 documentation and utility reference",
      typeId: link.id,
      collectionId: designCol.id,
      isFavorite: true,
      isPinned: false,
      language: null,
      contentType: "text",
      url: "https://tailwindcss.com/docs",
      tags: ["css", "tailwind"],
    },
    {
      id: "item_design_2",
      title: "shadcn/ui",
      description:
        "Beautifully designed, accessible component library built on Radix UI",
      typeId: link.id,
      collectionId: designCol.id,
      isFavorite: true,
      isPinned: false,
      language: null,
      contentType: "text",
      url: "https://ui.shadcn.com",
      tags: ["components", "css"],
    },
    {
      id: "item_design_3",
      title: "Radix UI Primitives",
      description:
        "Unstyled, accessible component primitives for design systems",
      typeId: link.id,
      collectionId: designCol.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      url: "https://www.radix-ui.com",
      tags: ["design-system", "components"],
    },
    {
      id: "item_design_4",
      title: "Lucide Icons",
      description: "Open-source icon library used throughout DevStash",
      typeId: link.id,
      collectionId: designCol.id,
      isFavorite: false,
      isPinned: false,
      language: null,
      contentType: "text",
      url: "https://lucide.dev/icons",
      tags: ["icons", "design-system"],
    },
  ];

  for (const { tags, ...itemData } of itemsData) {
    const item = await prisma.item.upsert({
      where: { id: itemData.id },
      update: {},
      create: { ...itemData, userId: user.id },
    });

    for (const tagName of tags) {
      if (!tagMap[tagName]) continue;
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
