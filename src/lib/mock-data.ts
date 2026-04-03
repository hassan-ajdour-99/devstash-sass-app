export type ItemType = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  count: number;
  isSystem: boolean;
};

export type Collection = {
  id: string;
  name: string;
  description?: string;
  isFavorite: boolean;
  itemCount: number;
  itemTypes: string[]; // icon names for preview
};

export type Item = {
  id: string;
  title: string;
  description?: string;
  typeId: string;
  collectionId?: string;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  language?: string;
  createdAt: string;
  updatedAt: string;
};

export const mockItemTypes: ItemType[] = [
  { id: "1", name: "Snippets", slug: "snippets", icon: "Code2", color: "#6366f1", count: 24, isSystem: true },
  { id: "2", name: "Prompts", slug: "prompts", icon: "Sparkles", color: "#8b5cf6", count: 18, isSystem: true },
  { id: "3", name: "Commands", slug: "commands", icon: "Terminal", color: "#06b6d4", count: 15, isSystem: true },
  { id: "4", name: "Notes", slug: "notes", icon: "BookOpen", color: "#10b981", count: 12, isSystem: true },
  { id: "5", name: "Files", slug: "files", icon: "FileText", color: "#f59e0b", count: 5, isSystem: true },
  { id: "6", name: "Images", slug: "images", icon: "Image", color: "#ec4899", count: 3, isSystem: true },
  { id: "7", name: "Links", slug: "links", icon: "Link", color: "#64748b", count: 8, isSystem: true },
];

export const mockCollections: Collection[] = [
  { id: "1", name: "React Patterns", description: "Common React patterns and hooks", isFavorite: true, itemCount: 12, itemTypes: ["Code2", "BookOpen", "Link"] },
  { id: "2", name: "Context Files", description: "AI context files for projects", isFavorite: true, itemCount: 5, itemTypes: ["FileText", "BookOpen"] },
  { id: "3", name: "Git Commands", description: "Frequently used git commands", isFavorite: true, itemCount: 8, itemTypes: ["Terminal", "BookOpen"] },
  { id: "4", name: "Python Snippets", description: "Useful Python code snippets", isFavorite: false, itemCount: 8, itemTypes: ["Code2", "Terminal"] },
  { id: "5", name: "Interview Prep", description: "Technical interview preparation", isFavorite: false, itemCount: 24, itemTypes: ["Code2", "Link", "BookOpen"] },
  { id: "6", name: "AI Prompts", description: "Curated AI prompts for coding", isFavorite: false, itemCount: 16, itemTypes: ["Sparkles", "Code2"] },
];

export const mockItems: Item[] = [
  {
    id: "1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    typeId: "1",
    collectionId: "1",
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    language: "typescript",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    typeId: "1",
    collectionId: "1",
    tags: ["api", "error-handling", "fetch"],
    isFavorite: false,
    isPinned: false,
    language: "typescript",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Docker Compose Dev Setup",
    description: "Local development Docker Compose configuration",
    typeId: "5",
    collectionId: "3",
    tags: ["docker", "devops"],
    isFavorite: true,
    isPinned: true,
    language: undefined,
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Git Stash Workflow",
    description: "Save and restore work in progress",
    typeId: "3",
    collectionId: "3",
    tags: ["git", "workflow"],
    isFavorite: false,
    isPinned: false,
    language: "bash",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "5",
    title: "ChatGPT Code Review Prompt",
    description: "Prompt for detailed code reviews with suggestions",
    typeId: "2",
    collectionId: "6",
    tags: ["ai", "code-review", "chatgpt"],
    isFavorite: true,
    isPinned: false,
    language: undefined,
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
  {
    id: "6",
    title: "Prisma Migration Commands",
    description: "Common Prisma ORM migration commands",
    typeId: "3",
    collectionId: "4",
    tags: ["prisma", "database", "migrations"],
    isFavorite: false,
    isPinned: false,
    language: "bash",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "7",
    title: "Tailwind CSS Cheatsheet",
    description: "Most used Tailwind utility classes",
    typeId: "4",
    collectionId: "1",
    tags: ["tailwind", "css", "frontend"],
    isFavorite: false,
    isPinned: false,
    language: undefined,
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
  },
  {
    id: "8",
    title: "Next.js App Router Notes",
    description: "Key concepts for Next.js App Router",
    typeId: "4",
    collectionId: "1",
    tags: ["nextjs", "react", "routing"],
    isFavorite: false,
    isPinned: false,
    language: undefined,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
  {
    id: "9",
    title: "Python List Comprehensions",
    description: "Advanced list comprehension patterns",
    typeId: "1",
    collectionId: "4",
    tags: ["python", "snippets"],
    isFavorite: false,
    isPinned: false,
    language: "python",
    createdAt: "2024-01-07",
    updatedAt: "2024-01-07",
  },
  {
    id: "10",
    title: "System Design Interview Notes",
    description: "Key concepts for system design interviews",
    typeId: "4",
    collectionId: "5",
    tags: ["system-design", "interviews"],
    isFavorite: false,
    isPinned: false,
    language: undefined,
    createdAt: "2024-01-06",
    updatedAt: "2024-01-06",
  },
];

export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: null,
  isPro: false,
};
