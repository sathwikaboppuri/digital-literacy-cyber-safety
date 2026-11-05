const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { seedDatabase } = require('./seed/seedData');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health / Status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Digital Literacy & Cyber Safety Awareness in Rural Communities (CSP)',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()) + ' seconds'
  });
});

// Mount modular API routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/surveys', require('./routes/surveyRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

// Initialize Database & Start Server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log('======================================================');
      console.log(`  DIGITAL LITERACY & CYBER SAFETY AWARENESS PLATFORM  `);
      console.log(`  Community Service Project (CSP) - Backend Server   `);
      console.log('======================================================');
      console.log(` Server active on port: ${PORT}`);
      console.log(` API Health Check: http://localhost:${PORT}/api/health`);
      console.log(` Default Admin: admin@community.org | Pass: admin123`);
      console.log('======================================================');
    });
  } catch (err) {
    console.error('Fatal Server Boot Error:', err);
    process.exit(1);
  }
};

startServer();
