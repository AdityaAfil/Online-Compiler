import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import './App.css';

// Default code templates
const codeTemplates = {
  javascript: `// JavaScript
console.log("Hello, World!");`,

  python: `# Python
print("Hello, World!")`,

  java: `// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

  cpp: `// C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  c: `// C
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  go: `// Go
package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

  rust: `// Rust
fn main() {
    println!("Hello, World!");
}`,

  php: `<?php
// PHP
echo "Hello, World!\\n";
?>`,

  ruby: `# Ruby
puts "Hello, World!"`
};

const languages = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' }
];

function App() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(codeTemplates.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ executionTime: null, memory: null, exitCode: null });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('output');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', !isDarkMode ? 'light' : 'dark');
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage] || '// Start coding...');
    setOutput('');
    setStats({ executionTime: null, memory: null, exitCode: null });
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setStats({ executionTime: null, memory: null, exitCode: null });
    setActiveTab('output');

    try {
      const response = await axios.post(`${API_URL}/compile`, {
        language,
        code,
        input
      }, {
        timeout: 15000
      });

      if (response.data.success) {
        setOutput(response.data.output || 'No output');
        setStats({
          executionTime: response.data.executionTime,
          memory: response.data.memory,
          exitCode: response.data.exitCode
        });
      } else {
        setOutput(`Error: ${response.data.error}`);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setOutput('Error: Request timeout. Code execution took too long.');
      } else {
        setOutput(
          `Error: ${error.response?.data?.message || error.message}\n\n` +
          `Make sure the backend server is running on ${API_URL}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasError = output.toLowerCase().includes('error');

  return (
    <div className="App">
      <header className="header">
        <div className="header-left">
          <div className="logo">CodeRunner</div>
          <div className="language-selector">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              className="language-select"
              value={language}
              onChange={handleLanguageChange}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            className="run-button"
            onClick={handleRunCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Running...
              </>
            ) : (
              <>
                <span>▶</span>
                Run
              </>
            )}
          </button>
        </div>
      </header>

      <div className="main-layout">
        <div className="editor-panel">
          <div className="editor-wrapper">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={isDarkMode ? 'vs-dark' : 'light'}
              options={{
                fontSize: 14,
                fontFamily: 'SF Mono, Monaco, Consolas, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'off',
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                cursorBlinking: 'smooth',
                folding: true,
                bracketPairColorization: { enabled: true },
                smoothScrolling: true,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        <div className="console-panel">
          <div className="console-tabs">
            <button
              className={`console-tab ${activeTab === 'input' ? 'active' : ''}`}
              onClick={() => setActiveTab('input')}
            >
              Input
            </button>
            <button
              className={`console-tab ${activeTab === 'output' ? 'active' : ''}`}
              onClick={() => setActiveTab('output')}
            >
              Output
            </button>
          </div>

          <div className="console-content">
            {activeTab === 'input' ? (
              <div className="input-area">
                <div className="input-label">Standard Input (stdin)</div>
                <textarea
                  className="input-textarea"
                  placeholder="Enter input here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            ) : (
              <div className="output-area">
                <div className={`output-box ${hasError ? 'error' : output ? 'success' : ''}`}>
                  {isLoading ? (
                    <div className="loading-state">
                      <div className="spinner"></div>
                      Executing code...
                    </div>
                  ) : output ? (
                    <pre>{output}</pre>
                  ) : (
                    <div className="output-placeholder">
                      Click "Run" to see output here...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {stats.executionTime !== null && activeTab === 'output' && (
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-label">Time:</span>
                <span className="stat-value">{stats.executionTime}ms</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Memory:</span>
                <span className="stat-value">{stats.memory}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Status:</span>
                <span className="stat-value">{stats.exitCode === 0 ? 'Success' : 'Error'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
