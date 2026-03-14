import { useJournal, THEMES, type ThemeKey } from "@/context/JournalContext";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  LogOut,
} from "lucide-react";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function relativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Sidebar() {
  const {
    entries,
    activeEntryId,
    setActiveEntryId,
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    createEntry,
  } = useJournal();

  const filteredEntries = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stripHtml(e.content).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!sidebarOpen) {
    return (
      <div className="w-14 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col items-center py-4 gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setSidebarOpen(true)}
          className="rounded-full"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </Button>
        <Separator className="w-6" />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={createEntry}
          className="rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-72 border-r border-border/50 bg-card/50 backdrop-blur-xl flex flex-col animate-slide-in-left">
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Journl</span>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarOpen(false)}
            className="rounded-full"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entries..."
            className="pl-9 bg-muted/30 border-border/30 focus-visible:ring-primary/50"
          />
        </div>

        {/* New entry */}
        <Button
          variant="gradient"
          className="w-full gap-2"
          onClick={createEntry}
        >
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </div>

      <Separator className="opacity-50" />

      {/* Entry list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {searchQuery ? "No matching entries" : "No entries yet"}
            </div>
          )}
          {filteredEntries.map((entry) => {
            const isActive = entry.id === activeEntryId;
            const preview = stripHtml(entry.content).slice(0, 80);
            const themeData = THEMES[entry.theme as ThemeKey];

            return (
              <button
                key={entry.id}
                onClick={() => setActiveEntryId(entry.id)}
                className={cn(
                  "w-full text-left px-3 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-accent border border-border/50"
                    : "hover:bg-muted/30"
                )}
              >
                <div className="flex items-start gap-2">
                  {/* Theme dot */}
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ring-2 ring-offset-1 ring-offset-card"
                    style={{ backgroundColor: themeData?.accent ?? "#94a3b8", ringColor: themeData?.accent ?? "#94a3b8" }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm truncate">
                        {entry.mood}
                      </span>
                      <h4
                        className={cn(
                          "text-sm font-medium truncate",
                          isActive
                            ? "text-foreground"
                            : "text-foreground/80"
                        )}
                      >
                        {entry.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {preview || "Empty entry"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-muted-foreground/60">
                        {relativeDate(entry.createdAt)}
                      </span>
                      {entry.isFavorite && (
                        <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <Separator className="opacity-50" />
      <div className="p-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Journal User</p>
            <p className="text-xs text-muted-foreground truncate">
              user@example.com
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" className="rounded-full shrink-0">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
