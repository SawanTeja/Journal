import { useJournal, THEMES, type ThemeKey } from "@/context/JournalContext";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemePickerProps {
  onClose: () => void;
}

export default function ThemePicker({ onClose }: ThemePickerProps) {
  const { currentTheme, setCurrentTheme } = useJournal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-border/50 bg-card shadow-2xl animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            <h3 className="text-lg font-semibold">Page Theme</h3>
            <p className="text-sm text-muted-foreground">
              Choose a background style for your entry
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Theme grid */}
        <div className="p-6 grid grid-cols-4 gap-3">
          {(Object.entries(THEMES) as [ThemeKey, (typeof THEMES)[ThemeKey]][]).map(
            ([key, theme]) => {
              const isActive = currentTheme === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentTheme(key);
                    onClose();
                  }}
                  className={cn(
                    "group relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105",
                    isActive
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-transparent hover:border-border"
                  )}
                >
                  {/* Preview swatch */}
                  <div
                    className="w-full aspect-square rounded-lg shadow-inner relative overflow-hidden"
                    style={{ background: theme.preview }}
                  >
                    {/* Fake text lines */}
                    <div className="absolute inset-0 flex flex-col gap-1 p-2 pt-3">
                      <div
                        className="h-1.5 rounded-full w-3/4"
                        style={{
                          backgroundColor:
                            key === "parchment"
                              ? "rgba(120,53,15,0.3)"
                              : "rgba(255,255,255,0.2)",
                        }}
                      />
                      <div
                        className="h-1 rounded-full w-full"
                        style={{
                          backgroundColor:
                            key === "parchment"
                              ? "rgba(120,53,15,0.15)"
                              : "rgba(255,255,255,0.1)",
                        }}
                      />
                      <div
                        className="h-1 rounded-full w-5/6"
                        style={{
                          backgroundColor:
                            key === "parchment"
                              ? "rgba(120,53,15,0.15)"
                              : "rgba(255,255,255,0.1)",
                        }}
                      />
                      <div
                        className="h-1 rounded-full w-2/3"
                        style={{
                          backgroundColor:
                            key === "parchment"
                              ? "rgba(120,53,15,0.15)"
                              : "rgba(255,255,255,0.1)",
                        }}
                      />
                    </div>

                    {/* Active checkmark */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {theme.name}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
