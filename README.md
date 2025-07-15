# MERN Stack Bento Grid Application

A modern, full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a beautiful Bento Grid layout for organizing and displaying content cards.

## 🚀 Features

- **Modern Bento Grid Layout**: Beautiful, responsive card-based interface
- **Full Authentication System**: JWT-based user registration and login
- **CRUD Operations**: Create, read, update, and delete content cards
- **Real-time Updates**: Live updates for card modifications
- **Drag & Drop**: Reorder cards with intuitive drag-and-drop functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **TypeScript Support**: Full TypeScript implementation for better development experience
- **Docker Ready**: Complete containerization for easy deployment
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment

## 🏗️ Architecture

```
Frontend (React + TypeScript)
├── Authentication & Authorization
├── Bento Grid Layout
├── Card Management
└── User Profile Management

Backend (Node.js + Express)
├── RESTful API
├── JWT Authentication
├── MongoDB Integration
└── Security Middleware

Database (MongoDB)
├── Users Collection
├── Cards Collection
└── Sessions Management
```

## 📋 Prerequisites

- **Node.js** (version 18+)
- **MongoDB** (version 5.0+)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

## 🛠️ Installation

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/PLP-MERN-Stack-Development/Week-4-Mern-Integration-Assignment-Jahntel.git
cd Week-4-Mern-Integration-Assignment-Jahntel
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Start MongoDB**
```bash
# Using Docker
docker run -d --name mongodb -p 27017:27017 mongo:7

# Or start your local MongoDB service
sudo systemctl start mongod
```

5. **Run the Application**
```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm start
```

### Docker Deployment

```bash
# Quick start with Docker Compose
docker-compose up -d

# Build and run in production mode
docker-compose -f docker-compose.prod.yml up -d
```

## 🎯 Usage

### User Authentication

1. **Register**: Create a new account with username, email, and password
2. **Login**: Access your personalized dashboard
3. **Profile Management**: Update your profile information

### Card Management

1. **Create Cards**: Add new content cards with different types:
   - Text cards
   - Image cards
   - Mixed content cards
   - Interactive cards
   - Large featured cards

2. **Edit Cards**: Modify existing cards with real-time updates
3. **Reorder Cards**: Drag and drop to rearrange card positions
4. **Delete Cards**: Remove unwanted cards (soft delete)

### Card Types

- **Text Cards**: Pure text content with customizable styling
- **Image Cards**: Visual content with image support
- **Mixed Cards**: Combination of text and images
- **Interactive Cards**: Cards with buttons and actions
- **Large Featured Cards**: Prominent display cards for important content

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-bento-db
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

### Database Configuration

The application uses MongoDB with the following collections:

- **users**: User authentication and profile data
- **cards**: Content cards with metadata and relationships

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Testing
```bash
cd frontend
npm test
npm run test:coverage
```

### Integration Testing
```bash
# Run all tests
npm run test:all

# E2E testing
npm run test:e2e
```

## 🚀 Deployment

### Production Deployment

1. **Build the application**
```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build
```

2. **Deploy with Docker**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Deploy to Cloud**
   - AWS ECS
   - Google Cloud Run
   - Digital Ocean App Platform
   - Heroku

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Cards
- `GET /api/cards` - Get all user cards
- `POST /api/cards` - Create new card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card
- `PATCH /api/cards/reorder` - Reorder cards

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Comprehensive security headers via Helmet.js

## 🛡️ Security Best Practices

- Environment variables for sensitive data
- Non-root Docker containers
- SQL injection prevention
- XSS protection
- CSRF protection
- Regular security updates

## 📈 Performance Optimization

- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Redis for session management
- **CDN Integration**: Static asset optimization
- **Code Splitting**: React lazy loading
- **Image Optimization**: Compressed images
- **Gzip Compression**: Nginx compression

## 🔄 DevOps & CI/CD

### GitHub Actions Pipeline

- **Automated Testing**: Run on every push/PR
- **Security Scanning**: Vulnerability checks
- **Docker Build**: Automated image building
- **Deployment**: Automated deployment to staging/production
- **Monitoring**: Health checks and notifications

### Monitoring

- **Application Metrics**: Performance monitoring
- **Error Tracking**: Comprehensive error logging
- **Health Checks**: Automated health monitoring
- **Alerting**: Slack/Email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Use conventional commits
- Update documentation
- Follow security guidelines

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check the `/docs` folder
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Wiki**: Comprehensive guides and tutorials

### Common Issues

1. **Database Connection**: Ensure MongoDB is running
2. **Port Conflicts**: Check if ports 3000/5000 are available
3. **Environment Variables**: Verify all required variables are set
4. **Docker Issues**: Ensure Docker is running and up-to-date

## 🏆 Acknowledgments

- **React Team**: For the amazing React framework
- **MongoDB Team**: For the powerful database
- **Express.js Team**: For the robust web framework
- **Node.js Team**: For the runtime environment
- **Open Source Community**: For the incredible tools and libraries

---

## 📊 Project Statistics

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + TypeScript + Modern CSS
- **Testing**: Jest + React Testing Library
- **Deployment**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Security**: JWT + bcrypt + Helmet.js

---

*Built with ❤️ by [Jahntel](https://github.com/Jahntel)*

For more information, visit the [GitHub repository](https://github.com/PLP-MERN-Stack-Development/Week-4-Mern-Integration-Assignment-Jahntel).