import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  ImagePlus,
  Palette,
  Minus,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface EditorToolbarProps {
  editor: Editor | null;
  onOpenThemePicker: () => void;
}

const HIGHLIGHT_COLORS = [
  { name: "Yellow", value: "#fef08a" },
  { name: "Green", value: "#bbf7d0" },
  { name: "Blue", value: "#bfdbfe" },
  { name: "Pink", value: "#fbcfe8" },
  { name: "Orange", value: "#fed7aa" },
  { name: "Purple", value: "#e9d5ff" },
];

const TEXT_COLORS = [
  { name: "Default", value: "" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
];

interface ToolbarButtonProps {
  editor: Editor;
  action: () => void;
  isActive?: boolean;
  tooltip: string;
  icon: React.ReactNode;
}

function ToolbarButton({
  action,
  isActive = false,
  tooltip,
  icon,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={isActive}
          onPressedChange={() => action()}
          className="h-8 w-8 p-0"
        >
          {icon}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function EditorToolbar({
  editor,
  onOpenThemePicker,
}: EditorToolbarProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const highlightMenuRef = useRef<HTMLDivElement>(null);
  const colorMenuRef = useRef<HTMLDivElement>(null);

  if (!editor) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      editor.chain().focus().setImage({ src: url }).run();
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-0.5 flex-wrap px-3 py-2 border-b border-border/50 bg-card/30 backdrop-blur-sm rounded-t-lg">
      {/* Text formatting */}
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        tooltip="Bold"
        icon={<Bold className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        tooltip="Italic"
        icon={<Italic className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        tooltip="Underline"
        icon={<Underline className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        tooltip="Strikethrough"
        icon={<Strikethrough className="h-4 w-4" />}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Headings */}
      <ToolbarButton
        editor={editor}
        action={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        isActive={editor.isActive("heading", { level: 1 })}
        tooltip="Heading 1"
        icon={<Heading1 className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        isActive={editor.isActive("heading", { level: 2 })}
        tooltip="Heading 2"
        icon={<Heading2 className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        isActive={editor.isActive("heading", { level: 3 })}
        tooltip="Heading 3"
        icon={<Heading3 className="h-4 w-4" />}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists */}
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        tooltip="Bullet List"
        icon={<List className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        tooltip="Ordered List"
        icon={<ListOrdered className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        tooltip="Blockquote"
        icon={<Quote className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        tooltip="Code Block"
        icon={<Code2 className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() => editor.chain().focus().setHorizontalRule().run()}
        isActive={false}
        tooltip="Divider"
        icon={<Minus className="h-4 w-4" />}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Alignment */}
      <ToolbarButton
        editor={editor}
        action={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        isActive={editor.isActive({ textAlign: "left" })}
        tooltip="Align Left"
        icon={<AlignLeft className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
        isActive={editor.isActive({ textAlign: "center" })}
        tooltip="Align Center"
        icon={<AlignCenter className="h-4 w-4" />}
      />
      <ToolbarButton
        editor={editor}
        action={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
        isActive={editor.isActive({ textAlign: "right" })}
        tooltip="Align Right"
        icon={<AlignRight className="h-4 w-4" />}
      />

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Highlight dropdown */}
      <div className="relative group" ref={highlightMenuRef}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("highlight")}
              onPressedChange={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: "#fef08a" })
                  .run()
              }
              className="h-8 w-8 p-0"
            >
              <Highlighter className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent side="bottom">Highlight</TooltipContent>
        </Tooltip>
        <div className="absolute top-full left-0 mt-1 hidden group-hover:flex gap-1 p-2 rounded-lg border bg-popover shadow-xl z-50">
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: color.value })
                  .run()
              }
              className="w-6 h-6 rounded-full border border-border/50 hover:scale-110 transition-transform"
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Text color dropdown */}
      <div className="relative group" ref={colorMenuRef}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "inline-flex items-center justify-center rounded-md h-8 w-8 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
              )}
            >
              <span className="font-bold text-sm">A</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Text Color</TooltipContent>
        </Tooltip>
        <div className="absolute top-full left-0 mt-1 hidden group-hover:flex gap-1 p-2 rounded-lg border bg-popover shadow-xl z-50">
          {TEXT_COLORS.map((color) => (
            <button
              key={color.value || "default"}
              onClick={() =>
                color.value
                  ? editor.chain().focus().setColor(color.value).run()
                  : editor.chain().focus().unsetColor().run()
              }
              className={cn(
                "w-6 h-6 rounded-full border border-border/50 hover:scale-110 transition-transform",
                !color.value && "bg-foreground"
              )}
              style={color.value ? { backgroundColor: color.value } : undefined}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Image upload */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => imageInputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
          >
            <ImagePlus className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Insert Image</TooltipContent>
      </Tooltip>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Theme picker */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onOpenThemePicker}
            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground"
          >
            <Palette className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Page Theme</TooltipContent>
      </Tooltip>
    </div>
  );
}
