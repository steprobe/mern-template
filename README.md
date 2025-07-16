# MERN Template

A MERN (MongoDB, Express, React, Node.js) stack template with TypeScript, featuring a clean architecture and modern development practices.

## 🏗️ Architecture

This template follows a layered architecture pattern:

```
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   ├── models/          # MongoDB schemas & DTOs
│   │   ├── routes/          # API route definitions
│   │   └── middleware/      # Custom middleware
├── frontend/                # React + TypeScript UI
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── api/             # API client
│   │   └── types/           # TypeScript interfaces
└── Dockerfile              # Container deployment
```

## 🚀 Features

- **Backend:**
  - TypeScript + Express.js
  - MongoDB with Mongoose
  - Layered architecture (Controller → Service → Repository)
  - Input validation with Zod
  - Error handling middleware
  - Request logging
  - Health check endpoint

- **Frontend:**
  - React 18 + TypeScript
  - Vite for fast development
  - Tailwind CSS for styling
  - Axios for API calls
  - Component-based architecture

- **DevOps:**
  - Docker containerization
  - Development & production configurations
  - Linting (ESLint + Prettier)
  - Testing setup

## 📋 Prerequisites

- Node.js 20+
- MongoDB (local or cloud)
- Docker (optional)

## 🛠️ Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mern-template
```

### 2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment
Create `backend/.env` from `backend/sample.env`:

```env
# Database
MONGO_URI=mongodb://localhost:27017/your-database-name

# Application
NODE_ENV=development
PORT=3000

# Monitoring (optional)
NEW_RELIC_ENABLED=false
NEW_RELIC_APP_NAME=mern-template
```

#### Frontend Environment
Create `frontend/.env` from `frontend/sample.env`:

```env
# API URL for development
VITE_API_URL=http://localhost:3000
```

### 4. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## 🐳 Docker Deployment

### Local Docker Build

```bash
# Build image (uses localhost backend by default)
docker build -t mern-template .

# Run container
docker run -p 3001:3000 \
  -e MONGO_URI="mongodb://your-mongo-connection" \
  -e NEW_RELIC_ENABLED=false \
  mern-template
```

Access the application at `http://localhost:3001`

### Production Docker Build

For deployments where frontend and backend are separate:

```bash
docker build \
  --build-arg VITE_API_URL=https://your-backend-url \
  -t mern-template .
```

## 🧪 Testing & Quality

```bash
# Backend tests
cd backend
npm test
npm run lint

# Frontend linting
cd frontend
npm run lint
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### Endpoints

#### Health Check
```
GET /api/healthcheck
```
Response:
```json
{
  "uptime": 322.723,
  "message": "OK", 
  "timestamp": 1752660758704
}
```

#### Items
```
GET    /api/items           # Get all items
POST   /api/items           # Create new item
GET    /api/items/:id       # Get item by ID
```

## 📁 Project Structure Details

```
mern-template/
├── backend/
│   ├── src/
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── services/           # Business logic (no DB direct access)
│   │   ├── repositories/       # Data access layer
│   │   ├── models/            
│   │   │   ├── ItemSchema.ts   # Mongoose schemas
│   │   │   └── ItemDTO.ts      # Data transfer objects
│   │   ├── routes/             # Express route definitions
│   │   ├── middleware/         # Custom middleware
│   │   ├── config/             # Database configuration
│   │   ├── errors/             # Custom error classes
│   │   ├── utils/              # Utility functions
│   │   └── validation/         # Zod schemas
│   ├── test/                   # Test files
│   └── logs/                   # Application logs
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Reusable components
│   │   │   ├── items/          # Feature-specific components
│   │   │   └── healthcheck/    # Health check components
│   │   ├── api/                # API client setup
│   │   ├── types/              # TypeScript interfaces
│   │   └── assets/             # Static assets
│   └── public/                 # Public files
└── Dockerfile                  # Container configuration
```

## 📄 License

This project is licensed under the MIT License.
