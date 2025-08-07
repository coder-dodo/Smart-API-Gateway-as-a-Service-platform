const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic ping endpoint
app.get('/api/ping', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Backend is running!',
        timestamp: new Date().toISOString()
    });
});

// Proxy endpoint for testing
app.get('/api/proxy', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Proxy endpoint working!',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   - GET /api/ping`);
    console.log(`   - GET /api/proxy`);
    console.log(`   - GET /health`);
});
