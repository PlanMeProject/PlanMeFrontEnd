# PlanMe - Assignment Management & Planning Application

**PlanMe** is a comprehensive task and assignment management platform designed to help students organize their coursework, manage deadlines, and improve productivity. The application integrates with Google Classroom to automatically fetch assignments and provides intelligent features like text summarization and text-to-speech capabilities.

## Architecture Overview

PlanMe follows a modern full-stack architecture consisting of:
- **Backend**: Django REST Framework API
- **Frontend**: React.js with Chakra UI
- **Integration**: Google Classroom API
- **AI Features**: NLP services for text processing

---

## PlanMeBackEnd

### Technology Stack
- **Framework**: Django REST Framework (Python 3.11)
- **Database**: PostgreSQL
- **Authentication**: Google OAuth
- **Containerization**: Docker & Docker Compose
- **Testing**: pytest
- **Code Quality**: Black, isort, pylint, mypy

### Core Features

#### 1. **Task Management System**
   - Create, read, update, and delete tasks
   - Task properties: title, description, due date, status, course
   - Soft delete functionality (deleted tasks can be recovered)
   - Hierarchical task structure with subtasks
   - User-specific task organization

#### 2. **Google Classroom Integration**
   - OAuth-based authentication with Google
   - Automatic course synchronization
   - Assignment fetching from Google Classroom
   - Course management

#### 3. **NLP Services**
   - **Summarization**: Condenses long assignment descriptions
   - **Text-to-Speech (TTS)**: Converts text to audio for accessibility

#### 4. **User Management**
   - User registration and authentication
   - User profile management
   - Personalized task views

### API Structure
```
/api/
  ├── users/
  │   ├── {user_id}/tasks/
  │   │   └── {task_id}/subtasks/
  │   └── {user_id}/deleted-tasks/
  ├── authorize/ (Google OAuth)
  ├── courses/
  ├── assignments/
  ├── tts/ (Text-to-Speech)
  └── summarize/ (Text Summarization)
```

### Key Models
- **User**: Custom user model with Google authentication
- **Task**: Main task entity with course association
- **Subtask**: Child tasks under main tasks
- **DeletedTask**: Soft-deleted tasks for recovery

### Development Setup
- Built with Cookiecutter Django template
- Docker-based development environment
- Separate configurations for local, production, and testing
- CI/CD pipeline with GitHub Actions
- Comprehensive test coverage with pytest

---

## PlanMeFrontEnd

### Technology Stack
- **Framework**: React 17.0.2
- **UI Library**: Chakra UI
- **Routing**: React Router DOM
- **Calendar**: React Big Calendar
- **Charts**: ApexCharts & React ApexCharts
- **Styling**: Emotion (CSS-in-JS)
- **Additional**: Moment.js, React Icons, React Quill

### Core Features

#### 1. **Task Board Dashboard**
   - Visual task management interface
   - Drag-and-drop functionality
   - Status tracking (pending, in-progress, completed)
   - Course-based task organization
   - Task filtering and sorting

#### 2. **Subtask Management**
   - Hierarchical task breakdown
   - Progress visualization with pie charts
   - Individual subtask status tracking

#### 3. **Calendar View**
   - Interactive calendar displaying all tasks and deadlines
   - Monthly, weekly, and daily views
   - Task creation directly from calendar
   - Visual deadline indicators

#### 4. **User Information & Profile**
   - User profile management
   - Account settings
   - Notification preferences
   - Storage management

#### 5. **Google Authentication**
   - Secure Google OAuth sign-in
   - Automatic Google Classroom integration
   - Token-based session management

### Application Structure
```
src/
  ├── components/         # Reusable UI components
  │   ├── calendar/      # Calendar widgets
  │   ├── card/          # Card components
  │   ├── charts/        # Chart visualizations
  │   ├── navbar/        # Navigation components
  │   └── sidebar/       # Sidebar navigation
  ├── views/
  │   ├── admin/
  │   │   ├── calendar/        # Calendar dashboard
  │   │   ├── todoDashboard/   # Main task board
  │   │   ├── subtaskDashboard/ # Subtask view
  │   │   ├── dataTables/      # Data tables view
  │   │   └── info/            # User info & settings
  │   └── auth/
  │       └── signIn/          # Authentication
  ├── layouts/           # Page layouts
  ├── contexts/          # React contexts (state management)
  ├── theme/             # Chakra UI theme customization
  └── routes.js          # Application routing
```

### User Interface
- **Modern Design**: Based on Horizon UI template
- **Responsive**: Mobile-friendly interface
- **Dark/Light Mode**: Theme switching capability
- **Data Visualization**: Charts and graphs for task analytics
- **Accessibility**: WCAG-compliant components

---

## Key Workflows

### 1. **User Onboarding**
   1. User signs in with Google account
   2. OAuth grants access to Google Classroom
   3. System fetches available courses
   4. Assignments automatically imported as tasks

### 2. **Task Management**
   1. View all tasks on Task Board
   2. Create new tasks or import from Google Classroom
   3. Break down tasks into subtasks
   4. Use summarization for long descriptions
   5. Track progress and update status
   6. View deadlines on calendar

### 3. **Assignment Processing**
   1. Assignment synced from Google Classroom
   2. Long descriptions automatically summarized
   3. TTS available for audio playback
   4. Tasks organized by course and due date

---

## Deployment

### Backend
- **Production**: Docker containerized with Traefik reverse proxy
- **Database**: PostgreSQL with automated backups
- **Web Server**: Nginx
- **Security**: HTTPS with SSL/TLS certificates

### Frontend
- **Hosting**: Vercel (https://plan-me-front-end.vercel.app/)
- **Build**: Optimized production build with React Scripts
- **Deployment**: Automated with GitHub Pages integration

---

## Development

### Prerequisites
- **Backend**: Python 3.11, Docker, PostgreSQL
- **Frontend**: Node.js, npm
- **API Keys**: Google OAuth credentials, Google Classroom API access

### Quick Start

#### Backend
```bash
cd PlanMeBackEnd
docker-compose -f local.yml build
docker-compose -f local.yml run --rm django python manage.py migrate
docker-compose -f local.yml up
```

#### Frontend
```bash
cd PlanMeFrontEnd
npm install
npm start
```

---

## Testing

### Backend
- **Framework**: pytest with Django plugin
- **Coverage**: Includes unit and integration tests
- **Command**: `docker-compose -f local.yml run --rm django pytest -vv`

### Frontend
- **Framework**: React Testing Library & Jest
- **Command**: `npm test`

---

## License
MIT License (both frontend and backend)

---

## Project Status
Active development - Feature complete with ongoing maintenance and improvements.

## Key Integrations
- ✅ Google OAuth 2.0
- ✅ Google Classroom API
- ✅ NLP Summarization Service
- ✅ Text-to-Speech Service
- ✅ RESTful API
- ✅ Real-time Calendar Sync

## Target Users
- Students managing multiple courses
- Learners with accessibility needs (TTS support)
- Anyone seeking organized assignment tracking
- Google Classroom users wanting enhanced task management

