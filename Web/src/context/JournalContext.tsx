import React, { createContext, useContext, useState, useCallback } from "react";
import { mockEntries, type JournalEntry } from "@/data/mockEntries";

export const THEMES = {
  midnight: {
    name: "Midnight",
    bg: "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900",
    editor: "bg-slate-900/40",
    accent: "#6366f1",
    preview: "linear-gradient(135deg, #0f172a, #1e1b4b, #0f172a)",
  },
  ocean: {
    name: "Ocean",
    bg: "bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-900",
    editor: "bg-blue-950/40",
    accent: "#06b6d4",
    preview: "linear-gradient(135deg, #083344, #172554, #0f172a)",
  },
  forest: {
    name: "Forest",
    bg: "bg-gradient-to-br from-emerald-950 via-green-950 to-slate-900",
    editor: "bg-green-950/40",
    accent: "#10b981",
    preview: "linear-gradient(135deg, #022c22, #052e16, #0f172a)",
  },
  sunset: {
    name: "Sunset",
    bg: "bg-gradient-to-br from-orange-950 via-rose-950 to-slate-900",
    editor: "bg-orange-950/40",
    accent: "#f97316",
    preview: "linear-gradient(135deg, #431407, #4c0519, #0f172a)",
  },
  lavender: {
    name: "Lavender",
    bg: "bg-gradient-to-br from-violet-950 via-purple-950 to-slate-900",
    editor: "bg-purple-950/40",
    accent: "#8b5cf6",
    preview: "linear-gradient(135deg, #2e1065, #3b0764, #0f172a)",
  },
  rose: {
    name: "Rosé",
    bg: "bg-gradient-to-br from-pink-950 via-rose-950 to-slate-900",
    editor: "bg-rose-950/40",
    accent: "#ec4899",
    preview: "linear-gradient(135deg, #500724, #4c0519, #0f172a)",
  },
  minimal: {
    name: "Minimal",
    bg: "bg-slate-950",
    editor: "bg-slate-900/60",
    accent: "#94a3b8",
    preview: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
  },
  parchment: {
    name: "Parchment",
    bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
    editor: "bg-amber-100/60",
    accent: "#d97706",
    preview: "linear-gradient(135deg, #fffbeb, #fff7ed, #fefce8)",
  },
  dawn: {
    name: "Dawn",
    bg: "theme-bg-dawn",
    editor: "bg-white/40",
    accent: "#f43f5e",
    preview: "linear-gradient(135deg, #ffe4e6, #fce7f3, #fef3c7)",
  },
  matcha: {
    name: "Matcha",
    bg: "theme-bg-matcha",
    editor: "bg-white/50",
    accent: "#65a30d",
    preview: "linear-gradient(135deg, #f7fee7, #f0fdf4, #dcfce7)",
  },
  cottoncandy: {
    name: "Cotton Candy",
    bg: "theme-bg-cotton",
    editor: "bg-white/40",
    accent: "#0ea5e9",
    preview: "linear-gradient(135deg, #f0f9ff, #fdf4ff, #e0f2fe)",
  },
  sand: {
    name: "Sand",
    bg: "theme-bg-sand",
    editor: "bg-white/50",
    accent: "#d97706",
    preview: "linear-gradient(135deg, #fefce8, #ffedd5, #fef08a)",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;

interface JournalContextType {
  entries: JournalEntry[];
  activeEntryId: string | null;
  activeEntry: JournalEntry | null;
  currentTheme: ThemeKey;
  sidebarOpen: boolean;
  searchQuery: string;
  setActiveEntryId: (id: string | null) => void;
  setCurrentTheme: (theme: ThemeKey) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  createEntry: () => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const JournalContext = createContext<JournalContextType | null>(null);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [activeEntryId, setActiveEntryId] = useState<string | null>(
    mockEntries[0]?.id ?? null
  );
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>("midnight");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const activeEntry =
    entries.find((e) => e.id === activeEntryId) ?? null;

  const currentTheme = activeEntry ? (activeEntry.theme as ThemeKey) : selectedTheme;

  const createEntry = useCallback(() => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: "Untitled Entry",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mood: "✨",
      theme: selectedTheme,
      tags: [],
      isFavorite: false,
    };
    setEntries((prev) => [newEntry, ...prev]);
    setActiveEntryId(newEntry.id);
  }, [selectedTheme]);

  const updateEntry = useCallback(
    (id: string, updates: Partial<JournalEntry>) => {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, ...updates, updatedAt: new Date().toISOString() }
            : e
        )
      );
    },
    []
  );

  const setCurrentTheme = useCallback((theme: ThemeKey) => {
    setSelectedTheme(theme);
    if (activeEntryId) {
      updateEntry(activeEntryId, { theme });
    }
  }, [activeEntryId, updateEntry]);

  const deleteEntry = useCallback(
    (id: string) => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (activeEntryId === id) {
        setActiveEntryId(entries[0]?.id ?? null);
      }
    },
    [activeEntryId, entries]
  );

  const toggleFavorite = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, isFavorite: !e.isFavorite } : e
      )
    );
  }, []);

  return (
    <JournalContext.Provider
      value={{
        entries,
        activeEntryId,
        activeEntry,
        currentTheme,
        sidebarOpen,
        searchQuery,
        setActiveEntryId,
        setCurrentTheme,
        setSidebarOpen,
        setSearchQuery,
        createEntry,
        updateEntry,
        deleteEntry,
        toggleFavorite,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
