import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Note } from "@shared/schema";
import { Edit, Trash2, Code, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      toast({
        title: "Success",
        description: "Note deleted successfully",
      });
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
        description: "Failed to delete note",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(note.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(note);
  };

  const getLanguageIcon = () => {
    return note.language && note.language !== "text" ? Code : FileText;
  };

  const getPreview = () => {
    const lines = note.content.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim());
    return nonEmptyLines.slice(0, 3).join('\n');
  };

  const isCodeNote = note.language && note.language !== "text";
  const Icon = getLanguageIcon();

  return (
    <Card 
      className="bg-white material-shadow-1 hover:material-shadow-2 cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onClick={() => onEdit(note)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-medium text-[var(--material-dark)] line-clamp-2 flex-1">
            {note.title}
          </h4>
          <div className="flex space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="p-1 text-[var(--material-grey)] hover:text-[var(--material-dark)] h-auto"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="p-1 text-[var(--material-grey)] hover:text-red-500 h-auto"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {isCodeNote ? (
          <div className="bg-gray-50 rounded p-3 mb-3 code-editor text-xs">
            <pre className="text-[var(--material-grey-light)] whitespace-pre-wrap overflow-hidden">
              {getPreview()}
            </pre>
          </div>
        ) : (
          <p className="text-[var(--material-grey)] text-sm mb-3 line-clamp-3">
            {getPreview()}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-[var(--material-grey-light)]">
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-1" />
            <Badge variant="secondary" className="text-xs">
              {note.language === "text" ? "Text" : note.language || "Text"}
            </Badge>
          </div>
          <span>
            {note.updatedAt ? formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true }) : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
