import { TooltipProvider } from "@/components/ui/tooltip";
import { JournalProvider } from "@/context/JournalContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import TiptapEditor from "@/components/Editor/TiptapEditor";

export default function JournalPage() {
  return (
    <JournalProvider>
      <TooltipProvider delayDuration={300}>
        <div className="h-screen flex overflow-hidden">
          <Sidebar />
          <TiptapEditor />
        </div>
      </TooltipProvider>
    </JournalProvider>
  );
}
