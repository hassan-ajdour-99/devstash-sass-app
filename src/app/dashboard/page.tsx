import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 h-9 bg-muted border-0"
          />
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Item
        </Button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Placeholder */}
        <aside className="w-60 border-r border-border shrink-0 p-4">
          <h2 className="font-semibold">Sidebar</h2>
        </aside>

        {/* Main Placeholder */}
        <main className="flex-1 p-4">
          <h2 className="font-semibold">Main</h2>
        </main>
      </div>
    </div>
  );
}
