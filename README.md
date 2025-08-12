# NoteCode

A modern Material Design note-taking application with code syntax highlighting and secure user authentication. Built with React, Express.js, and PostgreSQL.

![Material Design Interface](https://img.shields.io/badge/Design-Material%20Design-blue)
![Authentication](https://img.shields.io/badge/Auth-Replit%20OIDC-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)

## Features

- 🔐 **Secure Authentication** - Replit OIDC with session management
- 📝 **Rich Note Editor** - Create and edit notes with syntax highlighting
- 💻 **Code Support** - Syntax highlighting for 10+ programming languages
- 🎨 **Material Design** - Clean, responsive UI following Material Design principles
- 🔍 **Search** - Full-text search across all your notes
- 📱 **Responsive** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates** - Automatic saving and synchronization

## Supported Languages

- JavaScript/TypeScript
- Python
- Java
- CSS/HTML
- JSON
- SQL
- Bash
- Plain Text

## Getting Started

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database
- Replit account (for authentication)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd notecode
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret_key
   REPLIT_DOMAINS=your_replit_domain
   REPL_ID=your_repl_id
   NODE_ENV=development
   ```

4. **Set up the database:**
   ```bash
   npm run db:push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Usage Guide

### Authentication

1. **Sign In:**
   - Click "Get Started" on the landing page
   - You'll be redirected to Replit's secure authentication
   - Grant permissions and you'll be redirected back to the app

2. **Sign Out:**
   - Click your profile picture in the top-right corner
   - Select "Sign Out" from the dropdown menu

### Managing Notes

#### Creating a Note

1. **From the Dashboard:**
   - Click the blue floating action button (➕) in the bottom-right corner
   - Or click "Create Your First Note" if you have no notes

2. **In the Editor:**
   - Enter a descriptive title for your note
   - Choose the appropriate language from the dropdown (bottom-left)
   - Write your content in the editor area
   - Click "Save" to create the note

#### Editing a Note

1. **Open a Note:**
   - Click on any note card from the dashboard
   - Or click the edit icon (✏️) on a note card

2. **Make Changes:**
   - Update the title, content, or language as needed
   - Changes are automatically tracked
   - Click "Update" to save your changes

#### Deleting a Note

1. Click the trash icon (🗑️) on any note card
2. Confirm the deletion in the dialog box
3. The note will be permanently removed

### Search Functionality

1. **Quick Search:**
   - Use the search bar in the top navigation
   - Type any keywords to find matching notes
   - Results appear as you type

2. **Search Tips:**
   - Search works across note titles and content
   - Use specific keywords for better results
   - Search is case-insensitive

### Code Syntax Highlighting

1. **Setting Language:**
   - Select the appropriate language from the dropdown in the note editor
   - The editor will apply syntax highlighting automatically

2. **Supported Features:**
   - Automatic language detection for common file extensions
   - Monospace font for code readability
   - Syntax highlighting in both editor and preview

## Interface Overview

### Dashboard

- **Header Bar:** Logo, search, and user menu
- **Stats Cards:** Quick overview of your notes and code snippets
- **Notes Grid:** All your notes displayed as cards
- **Floating Action Button:** Quick access to create new notes

### Note Editor

- **Title Bar:** Note title input and save controls
- **Editor Area:** Main content editing area with syntax highlighting
- **Footer Bar:** Language selector and word count
- **Status Indicator:** Shows save status and change tracking

## Technical Architecture

### Frontend

- **React** with TypeScript for type safety
- **Tailwind CSS** with Material Design color palette
- **Radix UI** components for accessibility
- **TanStack Query** for efficient data fetching
- **Wouter** for client-side routing

### Backend

- **Express.js** with TypeScript
- **Passport.js** for Replit OIDC authentication
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** for data persistence

### Security

- **HTTPS-only cookies** in production
- **Session-based authentication** with PostgreSQL storage
- **CSRF protection** through secure session management
- **User data isolation** - users can only access their own notes

## API Endpoints

### Authentication
- `GET /api/login` - Start authentication flow
- `GET /api/logout` - End user session
- `GET /api/auth/user` - Get current user information

### Notes
- `GET /api/notes` - Get all user notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PATCH /api/notes/:id` - Update existing note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/notes/search?q=query` - Search notes

## Development Commands

```bash
# Start development server
npm run dev

# Push database schema changes
npm run db:push

# Generate database migrations
npm run db:generate

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Environment Variables

Ensure these environment variables are set in production:

```env
DATABASE_URL=your_production_postgresql_url
SESSION_SECRET=secure_random_string_for_sessions
REPLIT_DOMAINS=your_production_domain
REPL_ID=your_repl_id
NODE_ENV=production
```

### Database Setup

1. Provision a PostgreSQL database
2. Run `npm run db:push` to create tables
3. Ensure the database URL is accessible from your deployment environment

### Replit Deployment

This application is optimized for Replit deployment:

1. Connect your repository to Replit
2. Configure environment variables in the Secrets tab
3. The application will automatically build and deploy

## Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   - Verify `DATABASE_URL` is correctly set
   - Ensure PostgreSQL is running and accessible
   - Check firewall settings for database connections

2. **Authentication Issues:**
   - Verify `REPLIT_DOMAINS` matches your deployment domain
   - Check `SESSION_SECRET` is set and secure
   - Ensure cookies are enabled in your browser

3. **Build Errors:**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version (requires 20+)
   - Clear `node_modules` and reinstall if needed

### Getting Help

- Check the browser console for client-side errors
- Review server logs for backend issues
- Ensure all environment variables are properly configured

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Replit](https://replit.com) for hosting and authentication
- Uses [Material Design](https://material.io) principles for UI/UX
- Powered by [PostgreSQL](https://postgresql.org) for reliable data storage