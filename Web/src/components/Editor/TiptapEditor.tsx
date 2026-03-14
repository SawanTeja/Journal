import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExtension from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect, useState, useCallback } from "react";
import { useJournal, THEMES } from "@/context/JournalContext";
import EditorToolbar from "./EditorToolbar";
import ThemePicker from "@/components/ThemePicker/ThemePicker";
import { cn } from "@/lib/utils";
import { Clock, Hash, Heart, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function wordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TiptapEditor() {
  const {
    activeEntry,
    currentTheme,
    updateEntry,
    toggleFavorite,
    deleteEntry,
  } = useJournal();
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [titleValue, setTitleValue] = useState(activeEntry?.title ?? "");

  const theme = THEMES[currentTheme];

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Highlight.configure({ multicolor: true }),
      ImageExtension.configure({
        HTMLAttributes: { class: "rounded-lg" },
      }),
      Placeholder.configure({
        placeholder: "Start writing your thoughts...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      UnderlineExtension,
      TextStyle,
      Color,
    ],
    content: activeEntry?.content ?? "",
    editorProps: {
      attributes: {
        class: "tiptap focus:outline-none px-1",
      },
    },
    onUpdate: ({ editor: ed }) => {
      if (activeEntry) {
        updateEntry(activeEntry.id, { content: ed.getHTML() });
      }
    },
  });

  // Sync editor content when active entry changes
  useEffect(() => {
    if (editor && activeEntry) {
      const currentContent = editor.getHTML();
      if (currentContent !== activeEntry.content) {
        editor.commands.setContent(activeEntry.content || "");
      }
      setTitleValue(activeEntry.title);
    }
  }, [activeEntry?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleValue(e.target.value);
      if (activeEntry) {
        updateEntry(activeEntry.id, { title: e.target.value });
      }
    },
    [activeEntry, updateEntry]
  );

  if (!activeEntry) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="text-6xl">📝</div>
          <h2 className="text-2xl font-serif font-semibold text-muted-foreground">
            No Entry Selected
          </h2>
          <p className="text-muted-foreground/70 max-w-sm">
            Select an entry from the sidebar or create a new one to start
            writing.
          </p>
        </div>
      </div>
    );
  }

  const words = wordCount(activeEntry.content);
  const isParchment = currentTheme === "parchment";

  return (
    <div className={cn("flex-1 flex flex-col min-h-0 transition-colors duration-500", theme.bg)}>
      {/* Title bar */}
      <div
        className={cn(
          "px-6 pt-6 pb-2 flex items-start justify-between gap-4",
          isParchment ? "text-amber-950" : "text-white"
        )}
      >
        <div className="flex-1 space-y-1">
          <input
            value={titleValue}
            onChange={handleTitleChange}
            className={cn(
              "w-full bg-transparent text-3xl font-serif font-bold outline-none placeholder:text-muted-foreground/40",
              isParchment ? "text-amber-950" : "text-white"
            )}
            placeholder="Entry title..."
          />
          <div
            className={cn(
              "flex items-center gap-3 text-sm",
              isParchment ? "text-amber-800/70" : "text-white/50"
            )}
          >
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDate(activeEntry.createdAt)}
              {" · "}
              {formatTime(activeEntry.updatedAt)}
            </span>
            {activeEntry.tags.length > 0 && (
              <span className="flex items-center gap-1">
                <Hash className="h-3.5 w-3.5" />
                {activeEntry.tags.join(", ")}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => toggleFavorite(activeEntry.id)}
            className={cn(
              "rounded-full",
              isParchment
                ? "text-amber-800 hover:bg-amber-200/50"
                : "text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                activeEntry.isFavorite && "fill-red-500 text-red-500"
              )}
            />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowOptions(!showOptions)}
              className={cn(
                "rounded-full",
                isParchment
                  ? "text-amber-800 hover:bg-amber-200/50"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showOptions && (
              <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border bg-popover p-1 shadow-xl z-50 animate-fade-in">
                <button
                  onClick={() => {
                    deleteEntry(activeEntry.id);
                    setShowOptions(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Entry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 flex flex-col min-h-0 px-6 pb-6">
        <div
          className={cn(
            "flex-1 flex flex-col rounded-lg border overflow-hidden",
            isParchment
              ? "border-amber-300/50 bg-amber-100/60"
              : "border-white/10 " + theme.editor
          )}
        >
          <EditorToolbar
            editor={editor}
            onOpenThemePicker={() => setThemePickerOpen(true)}
          />
          <div className="flex-1 overflow-y-auto px-6 py-2">
            <EditorContent
              editor={editor}
              className={cn(
                isParchment ? "text-amber-950" : "text-slate-100"
              )}
            />
          </div>
        </div>

        {/* Status bar */}
        <div
          className={cn(
            "flex items-center justify-between px-2 py-2 text-xs",
            isParchment ? "text-amber-700/60" : "text-white/30"
          )}
        >
          <span>{activeEntry.mood} {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} theme</span>
          <span>{words} words</span>
        </div>
      </div>

      {/* Theme picker overlay */}
      {themePickerOpen && (
        <ThemePicker onClose={() => setThemePickerOpen(false)} />
      )}
    </div>
  );
}
