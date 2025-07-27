import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, StickyNote, Lock, Zap } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--material-blue)] to-[var(--material-blue-dark)]">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center text-white mb-16">
          <div className="flex items-center justify-center mb-6">
            <StickyNote className="w-16 h-16 mr-4" />
            <h1 className="text-6xl font-light">NoteCode</h1>
          </div>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            A powerful note-taking application with code syntax highlighting. 
            Organize your thoughts, ideas, and code snippets in one beautiful place.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-white text-[var(--material-blue)] hover:bg-gray-100 px-8 py-3 text-lg font-medium material-shadow-2"
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Code className="w-12 h-12 mx-auto mb-4 text-[var(--material-green)]" />
              <h3 className="text-lg font-medium mb-2">Syntax Highlighting</h3>
              <p className="text-sm opacity-80">
                Support for JavaScript, Python, CSS, HTML and more with beautiful syntax highlighting
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-[var(--material-green)]" />
              <h3 className="text-lg font-medium mb-2">Secure Authentication</h3>
              <p className="text-sm opacity-80">
                JWT-based authentication with refresh tokens for secure and seamless access
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <StickyNote className="w-12 h-12 mx-auto mb-4 text-[var(--material-green)]" />
              <h3 className="text-lg font-medium mb-2">Rich Note Taking</h3>
              <p className="text-sm opacity-80">
                Create, edit, and organize notes with support for both text and code content
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-[var(--material-green)]" />
              <h3 className="text-lg font-medium mb-2">Auto-Save</h3>
              <p className="text-sm opacity-80">
                Never lose your work with automatic saving and real-time synchronization
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-light text-white mb-4">
            Ready to organize your ideas?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join thousands of developers and writers who trust NoteCode for their note-taking needs.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-[var(--material-pink)] hover:bg-[var(--material-pink-dark)] text-white px-8 py-3 text-lg font-medium material-shadow-2"
          >
            Start Taking StickyNote
          </Button>
        </div>
      </div>
    </div>
  );
}
