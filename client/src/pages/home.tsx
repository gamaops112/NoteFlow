import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import AppBar from "@/components/app-bar";
import NoteCard from "@/components/note-card";
import NoteEditor from "@/components/note-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Note } from "@shared/schema";
import { Plus, Code, FileText, Clock } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
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
  }, [isAuthenticated, authLoading, toast]);

  const { data: notes = [], isLoading, error } = useQuery<Note[]>({
    queryKey: ["/api/notes"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--material-light)]">
        <div className="h-16 bg-white material-shadow-1 animate-pulse" />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const codeNotes = notes.filter(note => note.language && note.language !== "text");
  const totalNotes = notes.length;

  return (
    <div className="min-h-screen bg-[var(--material-light)]">
      <AppBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-[var(--material-dark)] mb-2">
            Welcome back, {user?.firstName || "there"}!
          </h2>
          <p className="text-[var(--material-grey-light)]">
            You have {totalNotes} notes in your collection.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white material-shadow-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--material-grey-light)] text-sm">Total Notes</p>
                  <p className="text-2xl font-medium text-[var(--material-dark)]">{totalNotes}</p>
                </div>
                <FileText className="w-8 h-8 text-[var(--material-blue)]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white material-shadow-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--material-grey-light)] text-sm">Code Snippets</p>
                  <p className="text-2xl font-medium text-[var(--material-dark)]">{codeNotes.length}</p>
                </div>
                <Code className="w-8 h-8 text-[var(--material-green)]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white material-shadow-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--material-grey-light)] text-sm">Last Updated</p>
                  <p className="text-2xl font-medium text-[var(--material-dark)]">
                    {notes.length > 0 ? "Today" : "Never"}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-[var(--material-pink)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[var(--material-dark)]">Recent Notes</h3>
          </div>
        </div>

        {/* Notes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-[var(--material-grey-light)] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--material-dark)] mb-2">No notes yet</h3>
            <p className="text-[var(--material-grey-light)] mb-6">
              Create your first note to get started organizing your thoughts and code.
            </p>
            <Button onClick={handleCreateNote} className="bg-[var(--material-blue)] hover:bg-[var(--material-blue-dark)]">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Note
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <Button
        onClick={handleCreateNote}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--material-blue)] hover:bg-[var(--material-blue-dark)] material-shadow-2 hover:material-shadow-3 transition-all duration-300"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Note Editor Modal */}
      {isEditorOpen && (
        <NoteEditor
          note={selectedNote}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}
