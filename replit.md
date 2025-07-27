# NoteCode - Full-Stack Note-Taking Application

## Overview

NoteCode is a modern full-stack web application for note-taking with code syntax highlighting capabilities. Built with a React frontend and Express.js backend, it provides a seamless experience for organizing thoughts, ideas, and code snippets with support for multiple programming languages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom Material Design-inspired theme
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: Replit OIDC with Passport.js strategy
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with consistent error handling

### Database Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migration**: Drizzle Kit for schema migrations
- **Connection**: Neon serverless with WebSocket support

## Key Components

### Authentication System
- **Provider**: Replit OIDC integration for secure authentication
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL
- **User Management**: Automatic user creation/updates on login
- **Security**: HTTP-only cookies with secure flags in production

### Note Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **Search**: Full-text search across note titles and content
- **Language Support**: Syntax highlighting for 10+ programming languages
- **Real-time Updates**: Optimistic updates with TanStack Query

### UI Components
- **Design System**: Comprehensive component library based on Radix UI
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA compliant components with keyboard navigation
- **Theming**: CSS variables for consistent color management

## Data Flow

### Authentication Flow
1. User visits application
2. Unauthenticated users see landing page
3. Login redirects to Replit OIDC provider
4. Successful authentication creates/updates user record
5. Session established with secure cookie

### Note Operations Flow
1. Authenticated requests include session cookie
2. Middleware validates session and extracts user ID
3. Database operations filtered by user ownership
4. Responses include optimistic UI updates
5. Error states trigger re-authentication if needed

### Search Flow
1. User types in search input (debounced)
2. Query triggers when input length > 0
3. PostgreSQL ILIKE search across title and content
4. Results displayed in real-time dropdown

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **passport**: Authentication middleware
- **express-session**: Session management

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **date-fns**: Date formatting utilities

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Assets**: Static files served from build output directory

### Environment Configuration
- **DATABASE_URL**: Required PostgreSQL connection string
- **SESSION_SECRET**: Required for session security
- **REPLIT_DOMAINS**: Required for OIDC configuration
- **NODE_ENV**: Controls development vs production behavior

### Production Considerations
- **Session Security**: Secure cookies with HTTPS enforcement
- **Database**: Neon serverless for automatic scaling
- **Static Assets**: Served through Express in production
- **Error Handling**: Comprehensive error boundaries and logging

### Development Features
- **Hot Reload**: Vite HMR for instant frontend updates
- **Type Safety**: Full TypeScript coverage across stack
- **Development Banner**: Replit-specific development indicators
- **Runtime Errors**: Modal overlay for development error display