const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Language configurations for Piston API
const languageMap = {
  'javascript': { language: 'javascript', version: '18.15.0' },
  'python': { language: 'python', version: '3.10.0' },
  'java': { language: 'java', version: '15.0.2' },
  'cpp': { language: 'cpp', version: '10.2.0' },
  'c': { language: 'c', version: '10.2.0' },
  'go': { language: 'go', version: '1.16.2' },
  'rust': { language: 'rust', version: '1.68.2' },
  'php': { language: 'php', version: '8.2.3' },
  'ruby': { language: 'ruby', version: '3.0.1' },
  'typescript': { language: 'typescript', version: '5.0.3' },
  'csharp': { language: 'csharp', version: '6.12.0' },
  'kotlin': { language: 'kotlin', version: '1.8.20' },
  'swift': { language: 'swift', version: '5.3.3' }
};

// Piston API endpoint
const PISTON_API = 'https://emkc.org/api/v2/piston';

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Online Compiler API is running!',
    endpoints: {
      compile: 'POST /compile',
      languages: 'GET /languages'
    }
  });
});

// Get supported languages
app.get('/languages', async (req, res) => {
  try {
    const response = await axios.get(`${PISTON_API}/runtimes`);
    res.json({
      success: true,
      languages: response.data
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

    // Prepare request for Piston API
    const pistonRequest = {
      language: langConfig.language,
      version: langConfig.version,
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: code
        }
      ],
      stdin: input || '',
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1
    };

    // Execute code via Piston API
    const response = await axios.post(`${PISTON_API}/execute`, pistonRequest);

    // Format response
    res.json({
      success: true,
      output: response.data.run.stdout || response.data.run.stderr || 'No output',
      error: response.data.run.stderr || null,
      exitCode: response.data.run.code,
      executionTime: response.data.run.time || 'N/A',
      memory: response.data.run.memory || 'N/A'
    });

  } catch (error) {
    console.error('Compilation error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Compilation failed',
      message: error.response?.data?.message || error.message
    });
  }
});

// Helper function to get file extension
function getFileExtension(language) {
  const extensions = {
    'javascript': 'js',
    'python': 'py',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'go': 'go',
    'rust': 'rs',
    'php': 'php',
    'ruby': 'rb',
    'typescript': 'ts',
    'csharp': 'cs',
    'kotlin': 'kt',
    'swift': 'swift'
  };
  return extensions[language.toLowerCase()] || 'txt';
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   - GET  / (health check)`);
  console.log(`   - GET  /languages`);
  console.log(`   - POST /compile`);
});

module.exports = app;
