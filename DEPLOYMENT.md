# MERN Stack Deployment & DevOps Guide

## 🚀 Overview

This guide covers the complete deployment and DevOps setup for the MERN Bento Grid application, including Docker containerization, CI/CD pipelines, monitoring, and production deployment strategies.

## 📋 Prerequisites

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **Node.js** (version 18+)
- **MongoDB** (version 5.0+)
- **Git**
- **Domain name** (for production)
- **SSL certificate** (for HTTPS)

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Nginx (Reverse Proxy)               │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)  │  Backend (Node.js)  │  Database (MongoDB) │
│  Port: 3000       │  Port: 5000         │  Port: 27017        │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd mern-bento-grid
cp .env.example .env
cp backend/.env.example backend/.env
```

### 2. Configure Environment Variables

Edit `.env` file with your configuration:

```env
# Essential Configuration
NODE_ENV=production
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your-secure-password
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
FRONTEND_URL=https://yourdomain.com
REACT_APP_API_URL=https://yourdomain.com/api
```

### 3. Start with Docker Compose

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Verify Deployment

```bash
# Check all services
docker-compose ps

# Check logs
docker-compose logs -f

# Test API
curl http://localhost/api/health
```

## 🐳 Docker Deployment

### Development Environment

```bash
# Build and start all services
docker-compose up --build

# Start specific service
docker-compose up backend

# Scale services
docker-compose up --scale backend=3
```

### Production Environment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Update specific service
docker-compose -f docker-compose.prod.yml up -d --no-deps backend
```

## 🔧 Manual Deployment

### Backend Deployment

```bash
cd backend
npm install --production
npm run build
PM2_START_FILE=ecosystem.config.js pm2 start
```

### Frontend Deployment

```bash
cd frontend
npm install
npm run build
# Copy build/ to your web server
```

## 🚀 CI/CD Pipeline

### GitHub Actions Setup

1. **Configure Secrets** in GitHub repository:
   ```
   DOCKER_USERNAME
   DOCKER_PASSWORD
   SLACK_WEBHOOK
   ```

2. **Automatic Deployment** on push to main:
   - Run tests
   - Build Docker images
   - Deploy to staging
   - Run health checks
   - Deploy to production

### Manual CI/CD Commands

```bash
# Run tests
npm run test:all

# Build for production
npm run build:prod

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

## 📊 Monitoring & Logging

### Health Checks

```bash
# Application health
curl http://localhost/health

# Database health
curl http://localhost/api/health

# Individual service health
docker-compose exec backend curl http://localhost:5000/health
```

### Logging

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# View last 100 lines
docker-compose logs --tail=100 backend
```

### Monitoring Stack

```bash
# Add monitoring services
docker-compose -f docker-compose.monitoring.yml up -d

# Access dashboards
# Grafana: http://localhost:3001
# Prometheus: http://localhost:9090
```

## 🔒 Security Configuration

### SSL/TLS Setup

```bash
# Generate SSL certificates
sudo certbot certonly --webroot -w /var/www/html -d yourdomain.com

# Configure nginx for HTTPS
cp nginx.ssl.conf nginx.conf
```

### Security Headers

Already configured in `nginx.conf`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Content-Security-Policy
- HSTS

### Environment Security

```bash
# Secure environment variables
chmod 600 .env

# Use Docker secrets in production
docker secret create jwt_secret jwt_secret.txt
```

## 📈 Performance Optimization

### Database Optimization

```javascript
// MongoDB indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.cards.createIndex({ createdBy: 1, order: 1 })
```

### Caching Strategy

```bash
# Redis configuration
redis-cli CONFIG SET maxmemory 256mb
redis-cli CONFIG SET maxmemory-policy allkeys-lru
```

### Load Balancing

```nginx
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}
```

## 🔄 Backup & Recovery

### Database Backup

```bash
# Create backup
docker-compose exec mongodb mongodump --out /backup

# Restore backup
docker-compose exec mongodb mongorestore /backup
```

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec mongodb mongodump --out /backup/backup_$DATE
aws s3 cp /backup/backup_$DATE s3://your-backup-bucket/
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   # Check MongoDB status
   docker-compose logs mongodb
   
   # Verify connection string
   docker-compose exec backend printenv MONGODB_URI
   ```

2. **Frontend Not Loading**
   ```bash
   # Check nginx configuration
   docker-compose exec nginx nginx -t
   
   # Verify build files
   docker-compose exec frontend ls -la /usr/share/nginx/html
   ```

3. **API Endpoints Not Working**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Test API directly
   curl http://localhost:5000/api/health
   ```

### Debug Commands

```bash
# Enter container shell
docker-compose exec backend sh

# Check container resources
docker stats

# View container details
docker inspect mern-bento-backend
```

## 🌐 Cloud Deployment

### AWS ECS Deployment

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

docker build -t mern-bento .
docker tag mern-bento:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/mern-bento:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/mern-bento:latest
```

### Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mern-bento
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mern-bento
  template:
    metadata:
      labels:
        app: mern-bento
    spec:
      containers:
      - name: backend
        image: mern-bento:latest
        ports:
        - containerPort: 5000
```

### Digital Ocean Deployment

```bash
# Deploy to Digital Ocean App Platform
doctl apps create --spec app.yaml

# Monitor deployment
doctl apps list
```

## 📚 Best Practices

### Development
- Use feature branches
- Write comprehensive tests
- Document API endpoints
- Follow security guidelines

### Production
- Use environment variables
- Implement proper logging
- Set up monitoring
- Regular security updates
- Database backups

### DevOps
- Automate deployments
- Use infrastructure as code
- Implement blue-green deployments
- Monitor application metrics

## 🆘 Support

### Health Check Endpoints

- **Application**: `GET /health`
- **Database**: `GET /api/health`
- **API**: `GET /api/auth/health`

### Contact & Resources

- **Documentation**: Check `/docs` endpoint
- **API Reference**: `GET /api/docs`
- **Logs**: `docker-compose logs -f`
- **Issues**: GitHub Issues tab

## 🔄 Updates & Maintenance

### Regular Updates

```bash
# Update dependencies
npm run update:deps

# Update Docker images
docker-compose pull

# Security updates
npm audit fix
```

### Maintenance Windows

```bash
# Graceful shutdown
docker-compose down

# Update and restart
docker-compose pull && docker-compose up -d
```

---

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database backup configured
- [ ] Monitoring setup
- [ ] Security headers configured
- [ ] Health checks working
- [ ] CI/CD pipeline tested
- [ ] Load balancer configured
- [ ] DNS records updated
- [ ] Firewall rules applied

---

*Last updated: $(date)*

For additional support, please refer to the project documentation or create an issue in the GitHub repository.