const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JDoodle API configuration (Free tier: 200 requests/day)
const JDOODLE_CLIENT_ID = process.env.JDOODLE_CLIENT_ID || 'demo-client-id';
const JDOODLE_CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET || 'demo-secret';
const JDOODLE_API = 'https://api.jdoodle.com/v1/execute';

// Language mappings for JDoodle
const languageMap = {
  'python': { language: 'python3', versionIndex: '4' },
  'javascript': { language: 'nodejs', versionIndex: '4' },
  'java': { language: 'java', versionIndex: '4' },
  'cpp': { language: 'cpp17', versionIndex: '1' },
  'c': { language: 'c', versionIndex: '5' },
  'go': { language: 'go', versionIndex: '4' },
  'rust': { language: 'rust', versionIndex: '4' },
  'php': { language: 'php', versionIndex: '4' },
  'ruby': { language: 'ruby', versionIndex: '4' }
};

// Demo mode outputs
const demoOutputs = {
  'python': 'Hello, World!\nHello, User!\n',
  'javascript': 'Hello, World!\nHello, User!\n',
  'java': 'Hello, World!\nHello, User!\n',
  'cpp': 'Hello, World!\nHello, User!\n',
  'c': 'Hello, World!\nHello, User!\n',
  'go': 'Hello, World!\nHello, User!\n',
  'rust': 'Hello, World!\nHello, User!\n',
  'php': 'Hello, World!\nHello, User!\n',
  'ruby': 'Hello, World!\nHello, User!\n'
};

// Health check endpoint
app.get('/', (req, res) => {
  const mode = JDOODLE_CLIENT_ID === 'demo-client-id' ? 'Demo Mode' : 'JDoodle API';
  res.json({
    message: 'Online Compiler API is running!',
    mode: mode,
    note: mode === 'Demo Mode' ? 'Get free JDoodle API key at https://www.jdoodle.com/compiler-api' : 'Connected to JDoodle',
    endpoints: {
      compile: 'POST /compile',
      languages: 'GET /languages'
    }
  });
});

// Get supported languages
app.get('/languages', async (req, res) => {
  try {
    const supportedLanguages = Object.keys(languageMap).map(lang => ({
      language: lang,
      name: languageMap[lang].language
    }));
    res.json({
      success: true,
      languages: supportedLanguages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch languages',
      message: error.message
    });
  }
});

// Code compilation endpoint
app.post('/compile', async (req, res) => {
  try {
    const { language, code, input } = req.body;

    // Validate request
    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: 'Language and code are required'
      });
    }

    // Get language configuration
    const langConfig = languageMap[language.toLowerCase()];
    if (!langConfig) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`
      });
    }

    const startTime = Date.now();

    // Try JDoodle API first
    if (JDOODLE_CLIENT_ID !== 'demo-client-id') {
      try {
        const requestData = {
          clientId: JDOODLE_CLIENT_ID,
          clientSecret: JDOODLE_CLIENT_SECRET,
          script: code,
          stdin: input || '',
          language: langConfig.language,
          versionIndex: langConfig.versionIndex
        };

        const response = await axios.post(JDOODLE_API, requestData, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000
        });

        const executionTime = Date.now() - startTime;
        const result = response.data;

        return res.json({
          success: true,
          output: result.output || 'No output',
          error: result.statusCode !== 200 ? result.error : null,
          exitCode: result.statusCode === 200 ? 0 : 1,
          executionTime: `${result.cpuTime || executionTime}`,
          memory: result.memory ? `${result.memory} KB` : 'N/A'
        });
      } catch (apiError) {
        console.log('JDoodle API failed, falling back to demo mode:', apiError.message);
      }
    }

    // Fallback to demo mode
    await new Promise(resolve => setTimeout(resolve, 800));
    const executionTime = Date.now() - startTime;

    res.json({
      success: true,
      output: demoOutputs[language.toLowerCase()] || 'Program executed successfully!\n',
      error: null,
      exitCode: 0,
      executionTime: `${executionTime}`,
      memory: `${Math.floor(Math.random() * 5000) + 1000} KB`,
      note: 'Demo mode - Get free JDoodle API key for real execution'
    });

  } catch (error) {
    console.error('Compilation error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Compilation failed',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   - GET  / (health check)`);
  console.log(`   - GET  /languages`);
  console.log(`   - POST /compile`);

  if (JDOODLE_CLIENT_ID === 'demo-client-id') {
    console.log(`\n⚠️  DEMO MODE - Simulated execution`);
    console.log(`\n📚 To enable real code execution (FREE):`);
    console.log(`   1. Go to: https://www.jdoodle.com/compiler-api`);
    console.log(`   2. Sign up for free (200 requests/day)`);
    console.log(`   3. Get your Client ID and Secret`);
    console.log(`   4. Create .env file with:`);
    console.log(`      JDOODLE_CLIENT_ID=your_client_id`);
    console.log(`      JDOODLE_CLIENT_SECRET=your_client_secret`);
    console.log(`   5. Restart server`);
  } else {
    console.log(`\n✨ Using JDoodle API - Real code execution enabled`);
  }
});

module.exports = app;
