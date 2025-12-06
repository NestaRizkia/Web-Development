# Company Profile Website - Session-Based Authentication

A full-stack web application featuring a public company profile website with an admin CMS panel using **session-based authentication**.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express**
- **MongoDB** (Mongoose)
- **express-session** (Session-based authentication)
- **connect-mongo** (MongoDB session store)
- **CORS** enabled

### Frontend
- **React** + **Vite**
- **TailwindCSS**
- **React Router**
- **Axios**

## 📁 Project Structure

```
Session-Based-Company-Profile/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Login, verify, logout
│   │   ├── contentController.js # Content CRUD
│   │   └── portfolioController.js # Portfolio CRUD
│   ├── middleware/
│   │   └── auth.js              # Session authentication middleware
│   ├── models/
│   │   ├── Content.js           # Content schema
│   │   └── Portfolio.js         # Portfolio schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── contentRoutes.js     # Content endpoints
│   │   └── portfolioRoutes.js   # Portfolio endpoints
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── server.js                # Express server
│   ├── seed.js                  # Database seeder
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── admin/
    │   │   ├── AdminLayout.jsx      # Admin layout with auth check
    │   │   ├── Login.jsx            # Login page
    │   │   ├── Dashboard.jsx        # Admin dashboard
    │   │   ├── ContentEditor.jsx    # Content management
    │   │   └── PortfolioManager.jsx # Portfolio CRUD
    │   ├── components/
    │   │   ├── Navbar.jsx           # Public navbar
    │   │   ├── Footer.jsx           # Footer
    │   │   └── Loading.jsx          # Loading spinner
    │   ├── pages/
    │   │   ├── Home.jsx             # Home page
    │   │   ├── About.jsx            # About page
    │   │   ├── Services.jsx         # Services page
    │   │   ├── Portfolio.jsx        # Portfolio list
    │   │   ├── PortfolioDetail.jsx  # Portfolio detail
    │   │   └── Contact.jsx          # Contact page
    │   ├── utils/
    │   │   └── api.js               # Axios instance
    │   ├── main.jsx                 # App entry point
    │   └── index.css                # Tailwind styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔐 Authentication Flow

This application uses **SESSION-BASED** authentication (NOT JWT):

1. **Login**: User submits password → Backend checks against `ADMIN_PASSWORD` env variable
2. **Session Creation**: On successful login, server creates session: `req.session.user = { isAdmin: true }`
3. **Cookie**: Session ID stored in **HttpOnly** cookie (24-hour expiry)
4. **Protected Routes**: Middleware checks `req.session.user` before allowing access
5. **Logout**: Destroys session and clears cookie

### Key Features:
- ✅ HttpOnly cookies (prevents XSS attacks)
- ✅ Session stored in MongoDB
- ✅ 24-hour session expiry
- ✅ SameSite: "lax" for CSRF protection
- ✅ No JWT tokens used

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone & Navigate

```bash
cd "b:\Kuliah\Semester 5\Pengembangan Web\Projext W8-UAS\Session-Based-Company-Profile"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Configure Environment Variables:**

The `.env` file is already created with default values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/company-profile
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
ADMIN_PASSWORD=admin123
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Important:**
- Ensure MongoDB is running on `mongodb://localhost:27017`
- Or update `MONGODB_URI` to your MongoDB Atlas connection string
- Change `SESSION_SECRET` and `ADMIN_PASSWORD` in production!

**Seed the Database:**

```bash
node seed.js
```

This will populate the database with sample content and portfolio items.

**Start Backend Server:**

```bash
npm start
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Access the Application

### Public Website
```
http://localhost:5173
```

Pages:
- **Home**: `/`
- **About**: `/about`
- **Services**: `/services`
- **Portfolio**: `/portfolio`
- **Contact**: `/contact`

### Admin Panel
```
http://localhost:5173/admin/login
```

**Default Login:**
- Password: `admin123`

After login, you'll have access to:
- **Dashboard**: `/admin/dashboard`
- **Content Editor**: `/admin/content`
- **Portfolio Manager**: `/admin/portfolio`

## 📡 API Endpoints

### Public Endpoints (No Authentication)

```
GET  /api/content              # Get all content
GET  /api/portfolio            # Get all portfolio items
GET  /api/portfolio/:id        # Get single portfolio item
GET  /api/health               # Health check
```

### Authentication Endpoints

```
POST /api/auth/login           # Login (creates session)
GET  /api/auth/verify          # Verify session
POST /api/auth/logout          # Logout (destroys session)
```

### Protected Endpoints (Requires Session)

```
PUT    /api/content            # Update content
POST   /api/portfolio          # Create portfolio item
PUT    /api/portfolio/:id      # Update portfolio item
DELETE /api/portfolio/:id      # Delete portfolio item
```

## 🔒 Security Features

### Session-Based Authentication
- **HttpOnly Cookies**: Prevents JavaScript access to session cookie
- **SameSite: "lax"**: CSRF protection
- **Secure in Production**: Cookie only sent over HTTPS
- **Session Store**: MongoDB (persistent sessions)
- **Session Expiry**: 24 hours

### Backend Security
- CORS configured with credentials
- Password stored in environment variable
- Session validation middleware
- Error handling middleware

### Frontend Security
- No tokens in localStorage/sessionStorage
- Session cookie handled automatically by browser
- Protected routes check authentication on mount
- Automatic redirect to login if unauthorized

## 🧪 Testing the Application

### Test Public Pages
1. Visit `http://localhost:5173`
2. Navigate through Home, About, Services, Portfolio, Contact
3. View portfolio details by clicking on portfolio items

### Test Admin Authentication
1. Go to `http://localhost:5173/admin/login`
2. Enter password: `admin123`
3. Should redirect to `/admin/dashboard`

### Test Content Editor
1. Navigate to `/admin/content`
2. Modify home title, about description, services, etc.
3. Click "Save Changes"
4. Visit public pages to see changes

### Test Portfolio Manager
1. Navigate to `/admin/portfolio`
2. Click "Add Portfolio Item"
3. Fill in details and create
4. Edit existing items
5. Delete items
6. View changes on public portfolio page

### Test Session Persistence
1. Login to admin
2. Refresh the page → Should stay logged in
3. Close browser and reopen (within 24 hours) → Should stay logged in
4. Click Logout → Should redirect to login page

### Test Protected Routes
1. Without logging in, try to access:
   - `http://localhost:5173/admin/dashboard`
   - `http://localhost:5173/admin/content`
   - `http://localhost:5173/admin/portfolio`
2. Should automatically redirect to login page

## 📝 Database Schema

### Content Model (Single Document)
```javascript
{
  homeTitle: String,
  homeSubtitle: String,
  homeDescription: String,
  aboutTitle: String,
  aboutDescription: String,
  vision: String,
  mission: String,
  servicesTitle: String,
  services: [{ title, description, icon }],
  contactEmail: String,
  contactPhone: String,
  contactAddress: String,
  socialMedia: { facebook, twitter, linkedin, instagram }
}
```

### Portfolio Model
```javascript
{
  client: String (required),
  title: String (required),
  description: String (required),
  imageUrl: String,
  category: Enum (required),
  stats: [{ label, value }],
  completedDate: Date,
  timestamps: true
}
```

## 🎨 Customization

### Change Admin Password
Edit `backend/.env`:
```env
ADMIN_PASSWORD=your-new-password
```

### Change Session Secret
Edit `backend/.env`:
```env
SESSION_SECRET=your-new-secret-key-minimum-32-characters
```

### Change Session Duration
Edit `backend/server.js`:
```javascript
cookie: {
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days instead of 24 hours
}
```

### Change Theme Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Customize your color palette
  }
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Session Not Persisting
**Solution**: 
- Check MongoDB connection
- Verify `connect-mongo` is properly configured
- Check browser cookies are enabled

### CORS Issues
**Solution**: 
- Ensure `FRONTEND_URL` in `.env` matches your frontend URL
- Check `withCredentials: true` in frontend API calls

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change port in `backend/.env`:
```env
PORT=5001
```

## 📚 Additional Notes

### Production Deployment

For production, you need to:

1. **Set secure environment variables**:
   ```env
   NODE_ENV=production
   SESSION_SECRET=very-long-random-string-minimum-32-characters
   ADMIN_PASSWORD=strong-password-here
   ```

2. **Enable secure cookies** (backend/server.js already configured):
   ```javascript
   cookie: {
     secure: process.env.NODE_ENV === 'production' // HTTPS only
   }
   ```

3. **Build frontend**:
   ```bash
   cd frontend
   npm run build
   ```

4. **Deploy backend** with MongoDB Atlas or hosted MongoDB

5. **Update CORS origin** to your production domain

### Session vs JWT Comparison

This application uses **SESSION-based** authentication:

| Feature | Session (This App) | JWT |
|---------|-------------------|-----|
| Storage | Server-side (MongoDB) | Client-side (localStorage) |
| Cookie | HttpOnly cookie | Usually localStorage |
| Scalability | Requires shared session store | Stateless |
| Security | More secure (HttpOnly) | Vulnerable to XSS if in localStorage |
| Revocation | Easy (destroy session) | Difficult (needs blacklist) |

## ✅ Acceptance Criteria Checklist

- ✅ Full-stack app runs on localhost
- ✅ React + Vite + TailwindCSS frontend
- ✅ Node.js + Express backend
- ✅ MongoDB with Mongoose
- ✅ Session-based authentication (express-session)
- ✅ HttpOnly cookies with 24-hour expiry
- ✅ Public pages: Home, About, Services, Portfolio, Contact
- ✅ Admin CMS: Login, Dashboard, Content Editor, Portfolio Manager
- ✅ Protected API routes with session middleware
- ✅ Public API endpoints
- ✅ CRUD operations for portfolio
- ✅ Content editable via admin panel
- ✅ No JWT used anywhere
- ✅ Seed data included
- ✅ Ready to run with npm install & npm start

## 📧 Support

If you encounter any issues:
1. Check MongoDB is running
2. Verify all environment variables are set
3. Ensure both frontend and backend are running
4. Check browser console for errors
5. Check backend terminal for errors

---

**Developed with ❤️ using Session-Based Authentication**

No JWT tokens were used in the making of this application! 🎉
