import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Note, InsertNote, UpdateNote } from "@shared/schema";
import { X, Save, CheckCircle } from "lucide-react";

interface NoteEditorProps {
  note?: Note | null;
  onClose: () => void;
}

const LANGUAGE_OPTIONS = [
  { value: "text", label: "Plain Text" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "json", label: "JSON" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
];

export default function NoteEditor({ note, onClose }: NoteEditorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [language, setLanguage] = useState(note?.language || "text");
  const [lastSaved, setLastSaved] = useState<string>("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setLanguage(note.language || "text");
    }
  }, [note]);

  const createMutation = useMutation({
    mutationFn: async (noteData: InsertNote) => {
      const response = await apiRequest("POST", "/api/notes", noteData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      setLastSaved("Saved");
      toast({
        title: "Success",
        description: "Note created successfully",
      });
      onClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UpdateNote }) => {
      const response = await apiRequest("PATCH", `/api/notes/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      setLastSaved("Saved");
      toast({
        title: "Success",
        description: "Note updated successfully",
      });
      onClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }

    if (note) {
      updateMutation.mutate({
        id: note.id,
        updates: { title, content, language },
      });
    } else {
      createMutation.mutate({ title, content, language });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg material-shadow-4 w-full max-w-4xl max-h-[90vh] flex flex-col">
        
        {/* Editor Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4 flex-1">
            <Input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-medium bg-transparent border-none outline-none flex-1 px-0 focus-visible:ring-0"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[var(--material-grey-light)]">Last saved: </span>
              <span className="text-sm text-[var(--material-grey)]">
                {lastSaved || (isPending ? "Saving..." : "Not saved")}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-[var(--material-blue)] hover:bg-[var(--material-blue-dark)] text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {note ? "Update" : "Save"}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-2 text-[var(--material-grey)] hover:text-[var(--material-dark)] hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Editor Content */}
        <div className="flex-1 overflow-hidden">
          <Textarea
            placeholder="Start writing your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-6 border-none outline-none resize-none code-editor focus-visible:ring-0"
            style={{ minHeight: "400px" }}
          />
        </div>
        
        {/* Editor Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-[var(--material-grey-light)]">
              {wordCount} words
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-[var(--material-grey-light)]">
            <CheckCircle className="w-4 h-4 text-[var(--material-green)]" />
            <span>{lastSaved ? "All changes saved" : "Unsaved changes"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
