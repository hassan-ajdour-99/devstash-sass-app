"use client";

import Link from "next/link";
import {
  Code2,
  Sparkles,
  Terminal,
  BookOpen,
  FileText,
  Image,
  Link as LinkIcon,
  Star,
  Pin,
  Package,
  FolderOpen,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import { mockCollections, mockItems, mockItemTypes, type Item } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Sparkles,
  Terminal,
  BookOpen,
  FileText,
  Image,
  Link: LinkIcon,
};

function ItemRow({ item }: { item: Item }) {
  const type = mockItemTypes.find((t) => t.id === item.typeId);
  const Icon = type ? iconMap[type.icon] : null;
  const date = new Date(item.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: (type?.color ?? "#888") + "20" }}
      >
        {Icon && <Icon className="h-4 w-4" style={{ color: type?.color }} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-medium text-sm truncate">{item.title}</span>
          {item.isFavorite && (
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
          )}
          {item.isPinned && (
            <Pin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          )}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground truncate mb-1.5">
            {item.description}
          </p>
        )}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{date}</span>
    </div>
  );
}

export function MainContent() {
  const stats = [
    { label: "Total Items", value: mockItems.length, icon: Package },
    { label: "Collections", value: mockCollections.length, icon: FolderOpen },
    {
      label: "Favorite Items",
      value: mockItems.filter((i) => i.isFavorite).length,
      icon: Star,
    },
    {
      label: "Favorite Collections",
      value: mockCollections.filter((c) => c.isFavorite).length,
      icon: Heart,
    },
  ];

  const pinnedItems = mockItems.filter((i) => i.isPinned);

  const recentItems = [...mockItems]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  return (
    <div className="p-6 space-y-8 overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your developer knowledge hub
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Icon className="h-4 w-4" />
                <span className="text-xs">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Collections */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Collections</h2>
          <Link
            href="/collections"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockCollections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors group block"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-medium text-sm truncate">{col.name}</span>
                  {col.isFavorite && (
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                  )}
                </div>
                <button
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {col.itemCount} items
              </p>
              {col.description && (
                <p className="text-xs text-muted-foreground/70 line-clamp-1 mb-3">
                  {col.description}
                </p>
              )}
              <div className="flex items-center gap-1.5">
                {col.itemTypes.slice(0, 4).map((iconName, i) => {
                  const Icon = iconMap[iconName];
                  return Icon ? (
                    <Icon key={i} className="h-3.5 w-3.5 text-muted-foreground/50" />
                  ) : null;
                })}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pinned Items */}
      {pinnedItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Pin className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-base font-semibold">Pinned</h2>
          </div>
          <div className="space-y-2">
            {pinnedItems.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Items */}
      <section>
        <h2 className="text-base font-semibold mb-4">Recent Items</h2>
        <div className="space-y-2">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
