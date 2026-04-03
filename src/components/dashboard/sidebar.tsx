"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Code2,
  Sparkles,
  Terminal,
  BookOpen,
  FileText,
  Image,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Star,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockItemTypes, mockCollections, mockUser } from "@/lib/mock-data";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Sparkles,
  Terminal,
  BookOpen,
  FileText,
  Image,
  Link: LinkIcon,
};

type SidebarContentProps = {
  onClose?: () => void;
  collapsed?: boolean;
};

function SidebarContent({ collapsed = false }: SidebarContentProps) {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const allCollections = mockCollections.filter((c) => !c.isFavorite);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Types Section */}
      <div className="px-3 py-2">
        <button
          onClick={() => setTypesOpen(!typesOpen)}
          className={cn(
            "flex items-center gap-1 w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors mb-1",
            collapsed && "justify-center"
          )}
        >
          {!collapsed && <span>Types</span>}
          {!collapsed && (
            <span className="ml-auto">
              {typesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </span>
          )}
        </button>

        {(typesOpen || collapsed) && (
          <ul className="space-y-0.5">
            {mockItemTypes.map((type) => {
              const Icon = iconMap[type.icon];
              return (
                <li key={type.id}>
                  <Link
                    href={`/items/${type.slug}`}
                    className={cn(
                      "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group",
                      collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? type.name : undefined}
                  >
                    {Icon && (
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: type.color }}
                      />
                    )}
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{type.name}</span>
                        <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground">
                          {type.count}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Divider */}
      {!collapsed && <div className="mx-3 border-t border-border my-1" />}

      {/* Collections Section */}
      {!collapsed && (
        <div className="px-3 py-2 flex-1 overflow-y-auto">
          <button
            onClick={() => setCollectionsOpen(!collectionsOpen)}
            className="flex items-center gap-1 w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors mb-1"
          >
            <span>Collections</span>
            <span className="ml-auto">
              {collectionsOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </span>
          </button>

          {collectionsOpen && (
            <>
              {/* Favorites */}
              <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest px-2 mt-2 mb-1">
                Favorites
              </p>
              <ul className="space-y-0.5">
                {favoriteCollections.map((col) => (
                  <li key={col.id}>
                    <Link
                      href={`/collections/${col.id}`}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group"
                    >
                      <Star className="h-3.5 w-3.5 shrink-0 text-yellow-400 fill-yellow-400" />
                      <span className="flex-1 truncate">{col.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* All Collections */}
              <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest px-2 mt-3 mb-1">
                All Collections
              </p>
              <ul className="space-y-0.5">
                {allCollections.map((col) => (
                  <li key={col.id}>
                    <Link
                      href={`/collections/${col.id}`}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group"
                    >
                      <span className="h-3.5 w-3.5 shrink-0 rounded-sm bg-muted-foreground/20 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-muted-foreground">
                          {col.name.charAt(0)}
                        </span>
                      </span>
                      <span className="flex-1 truncate">{col.name}</span>
                      <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground">
                        {col.itemCount}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* Spacer when collapsed */}
      {collapsed && <div className="flex-1" />}

      {/* User Area */}
      <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
        {collapsed ? (
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
            {mockUser.name.charAt(0)}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0">
              {mockUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type SidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border shrink-0 transition-all duration-200",
          collapsed ? "w-14" : "w-56"
        )}
      >
        {/* Sidebar header with toggle */}
        <div
          className={cn(
            "flex items-center h-14 border-b border-border px-3 shrink-0",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                S
              </div>
              <span className="font-semibold text-sm">DevStash</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile Drawer */}
      <Sheet open={mobileOpen} onOpenChange={(open) => !open && onMobileClose()}>
        <SheetContent side="left" className="w-56 p-0 flex flex-col">
          <div className="flex items-center gap-2 h-14 border-b border-border px-3 shrink-0">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              S
            </div>
            <span className="font-semibold text-sm">DevStash</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
