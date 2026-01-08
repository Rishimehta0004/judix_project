# Full-Stack Developer Intern Assignment

A modern, production-ready full-stack web application built with Next.js 14, Express.js, MongoDB, and featuring dual authentication (JWT + Google OAuth 2.0).

## 🚀 Features

### Authentication & Security
- **Email/Password Authentication** with JWT tokens
- **Google OAuth 2.0** direct login/signup integration
- Password hashing with bcrypt
- Protected routes (client & server-side)
- JWT token validation middleware
- Secure session management

### Task Management
- **Full CRUD Operations** - Create, Read, Update, Delete tasks
- **Advanced Filtering** - Filter by status, priority
- **Search Functionality** - Debounced search across title and description
- **Pagination** - Efficient data loading
- **Task Statistics** - Real-time dashboard stats
- **Due Dates** - Track task deadlines
- **Priority Levels** - Low, Medium, High

### User Experience
- Fully responsive design (mobile-first)
- Modern, clean UI with Tailwind CSS
- Toast notifications for user feedback
- Loading states and error handling
- Avatar support from Google profiles

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Zod** for validation
- **Axios** for API requests
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Google Auth Library** for OAuth 2.0
- **Zod** for server-side validation
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Morgan** for logging
- **CORS** for cross-origin requests

## 📁 Project Structure

```
rishi_judix/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   ├── userController.js    # User management
│   │   │   └── taskController.js    # Task CRUD
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js    # JWT verification
│   │   │   └── errorHandler.js      # Centralized error handling
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   └── Task.js              # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── userRoutes.js        # User endpoints
│   │   │   └── taskRoutes.js        # Task endpoints
│   │   ├── utils/
│   │   │   ├── jwt.js               # JWT utilities
│   │   │   └── googleAuth.js        # Google OAuth utilities
│   │   ├── validators/
│   │   │   ├── authValidator.js     # Auth validation
│   │   │   └── taskValidator.js     # Task validation
│   │   └── server.js                # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx         # Dashboard page
│   │   │   ├── login/
│   │   │   │   └── page.tsx         # Login page
│   │   │   ├── register/
│   │   │   │   └── page.tsx         # Register page
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Home (redirect)
│   │   │   └── globals.css          # Global styles
│   │   ├── components/
│   │   │   ├── TaskCard.tsx         # Task display card
│   │   │   ├── TaskModal.tsx        # Task create/edit modal
│   │   │   └── StatsCard.tsx        # Stats display card
│   │   ├── lib/
│   │   │   ├── api-client.ts        # Axios instance
│   │   │   ├── constants.ts         # App constants
│   │   │   └── validations.ts       # Zod schemas
│   │   ├── services/
│   │   │   ├── authService.ts       # Auth API calls
│   │   │   └── taskService.ts       # Task API calls
│   │   ├── store/
│   │   │   └── authStore.ts         # Zustand auth store
│   │   └── types/
│   │       ├── index.ts             # TypeScript types
│   │       └── google.d.ts          # Google types
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Google Cloud Project (for OAuth)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rishi_judix
```

### 2. Set Up Environment Variables

Create `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/fullstack-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Google OAuth 2.0
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Backend URL (for frontend API calls)
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Create OAuth 2.0 Client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000`
7. Copy **Client ID** and **Client Secret**
8. Add them to your `.env` file

### 4. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### 5. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas**
- Update `MONGODB_URI` in `.env` with your Atlas connection string

### 6. Run the Application

**Option A: Run both (recommended)**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google OAuth Login
```http
POST /auth/google
Content-Type: application/json

{
  "idToken": "google-id-token-from-client"
}
```

### User Endpoints

#### Get Profile
```http
GET /user/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Task Endpoints

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the full-stack application",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-01-15T00:00:00Z"
}
```

#### Get All Tasks (with filters)
```http
GET /tasks?page=1&limit=10&status=pending&priority=high&search=project
Authorization: Bearer <token>
```

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order (asc, desc)

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /tasks/stats
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 15,
      "pending": 5,
      "in-progress": 7,
      "completed": 3
    }
  }
}
```

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token generation and verification
- **Protected Routes**: Server-side authentication middleware
- **Input Validation**: Zod validation on both frontend and backend
- **CORS Configuration**: Controlled cross-origin access
- **Security Headers**: Helmet.js implementation
- **Error Handling**: Centralized error management
- **OAuth Token Verification**: Google token validation

## 🎨 UI Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light compatible**: Clean color scheme
- **Loading States**: User feedback during operations
- **Error Messages**: Clear validation and error feedback
- **Toast Notifications**: Success and error notifications
- **Empty States**: Helpful messages when no data
- **Modals**: Clean task creation/editing interface
- **Icons**: Lucide React icon library
- **Forms**: Accessible and validated forms

## 📦 Production Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set environment variables on your platform
2. Update `MONGODB_URI` to production database
3. Update `FRONTEND_URL` to production frontend URL
4. Deploy using:
   ```bash
   cd backend
   npm run start
   ```

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update environment variables:
   - `NEXT_PUBLIC_API_URL` → Production backend URL
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` → Your Google Client ID
2. Build and deploy:
   ```bash
   cd frontend
   npm run build
   npm run start
   ```

### Google OAuth Production Setup

1. Add production URLs to Google Cloud Console:
   - Authorized JavaScript origins: `https://your-domain.com`
   - Authorized redirect URIs: `https://your-domain.com`

## 🚀 Scaling Strategy

### Backend Scaling
- **Horizontal Scaling**: Deploy multiple instances behind load balancer
- **Database**: Use MongoDB Atlas with replica sets
- **Caching**: Implement Redis for session management
- **Rate Limiting**: Already configured, adjust limits as needed
- **API Versioning**: `/api/v1` structure allows easy versioning

### Frontend Scaling
- **CDN**: Deploy static assets to CDN
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Next.js automatic code splitting
- **Caching**: Implement service workers for offline support

### Database Optimization
- **Indexing**: Already implemented on Task model
- **Pagination**: Implemented to reduce query load
- **Connection Pooling**: Mongoose handles automatically

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Register with email/password
- [ ] Login with email/password
- [ ] Register with Google
- [ ] Login with Google
- [ ] Logout functionality
- [ ] Protected route access

**Task Management:**
- [ ] Create new task
- [ ] Edit existing task
- [ ] Delete task
- [ ] Search tasks
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Pagination
- [ ] View statistics

## 📝 Additional Notes

### Code Quality
- **TypeScript**: Full type safety on frontend
- **ESLint**: Code quality enforcement
- **Consistent Naming**: Clear, descriptive variable names
- **Comments**: Documented complex logic
- **Error Handling**: Comprehensive try-catch blocks

### Performance
- **Debounced Search**: Reduces API calls
- **Pagination**: Prevents large data loads
- **Indexed Queries**: Fast database lookups
- **Optimistic Updates**: Better UX (can be added)

### Extensibility
- **Role-based Access**: User model ready for role expansion
- **API Versioning**: Easy to add v2, v3 endpoints
- **Modular Structure**: Easy to add new features
- **Validation Schemas**: Reusable across app

## 👨‍💻 Development Notes

### Adding New Features

**Backend Route:**
1. Create controller in `controllers/`
2. Add validation in `validators/`
3. Create route in `routes/`
4. Import route in `server.js`

**Frontend Page:**
1. Create page in `app/[route]/page.tsx`
2. Add service functions in `services/`
3. Create components in `components/`
4. Add types in `types/`

## 📄 License

MIT License

## 🤝 Contributing

This is an assignment project, but feedback and suggestions are welcome!

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ for Full-Stack Developer Intern Assignment**
# judix_project
