import React, { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import './App.css';

// Default code templates for different languages
const codeTemplates = {
  javascript: `// JavaScript Example
console.log("Hello, World!");

// Try with input
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (name) => {
  console.log(\`Hello, \${name}!\`);
  rl.close();
});`,

  python: `# Python Example
print("Hello, World!")

# Try with input
name = input()
print(f"Hello, {name}!")`,

  java: `// Java Example
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Try with input
        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        scanner.close();
    }
}`,

  cpp: `// C++ Example
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;

    // Try with input
    string name;
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;

    return 0;
}`,

  c: `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");

    // Try with input
    char name[100];
    fgets(name, sizeof(name), stdin);
    printf("Hello, %s", name);

    return 0;
}`,

  go: `// Go Example
package main

import (
    "fmt"
    "bufio"
    "os"
)

func main() {
    fmt.Println("Hello, World!")

    // Try with input
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Scan()
    name := scanner.Text()
    fmt.Printf("Hello, %s!\\n", name)
}`,

  rust: `// Rust Example
use std::io;

fn main() {
    println!("Hello, World!");

    // Try with input
    let mut name = String::new();
    io::stdin().read_line(&mut name).unwrap();
    println!("Hello, {}!", name.trim());
}`,

  php: `<?php
// PHP Example
echo "Hello, World!\\n";

// Try with input
$name = trim(fgets(STDIN));
echo "Hello, $name!\\n";
?>`,

  ruby: `# Ruby Example
puts "Hello, World!"

# Try with input
name = gets.chomp
puts "Hello, #{name}!"`,

  typescript: `// TypeScript Example
console.log("Hello, World!");

// Try with input
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (name: string) => {
  console.log(\`Hello, \${name}!\`);
  rl.close();
});`
};

const languages = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚙️' },
  { value: 'c', label: 'C', icon: '🔧' },
  { value: 'go', label: 'Go', icon: '🐹' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'php', label: 'PHP', icon: '🐘' },
  { value: 'ruby', label: 'Ruby', icon: '💎' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷' }
];

function App() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(codeTemplates.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ executionTime: null, memory: null, exitCode: null });

  const API_URL = 'http://localhost:5000';

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

    try {
      const response = await axios.post(`${API_URL}/compile`, {
        language,
        code,
        input
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
      setOutput(
        `Error: ${error.response?.data?.message || error.message}\n\n` +
        `Make sure the backend server is running on ${API_URL}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageIcon = () => {
    return languages.find(lang => lang.value === language)?.icon || '📝';
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🚀 Online Code Compiler</h1>
          <div className="header-info">
            Multi-language code execution platform
          </div>
        </header>

        <div className="main-content">
          <div className="controls">
            <div className="control-group">
              <label htmlFor="language">Language:</label>
              <select
                id="language"
                className="language-select"
                value={language}
                onChange={handleLanguageChange}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
            </div>

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
                  ▶️ Run Code
                </>
              )}
            </button>
          </div>

          <div className="editor-section">
            <Editor
              height="500px"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth',
                folding: true,
                bracketPairColorization: { enabled: true }
              }}
            />
          </div>

          <div className="input-output-section">
            <div className="input-panel">
              <div className="panel-header">
                📥 Input (stdin)
              </div>
              <textarea
                className="input-textarea"
                placeholder="Enter input here (if your program needs it)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="output-panel">
              <div className="panel-header">
                📤 Output
              </div>
              <div className="output-content">
                {isLoading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    Executing code...
                  </div>
                ) : output ? (
                  <pre className={output.toLowerCase().includes('error') ? 'error-output' : 'success-output'}>
                    {output}
                  </pre>
                ) : (
                  <pre style={{ color: '#858585' }}>
                    Click "Run Code" to see output here...
                  </pre>
                )}
              </div>

              {stats.executionTime !== null && (
                <div className="stats">
                  <div className="stat-item">
                    <span className="stat-label">⏱️ Execution Time:</span>
                    <span className="stat-value">{stats.executionTime}ms</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">💾 Memory:</span>
                    <span className="stat-value">{stats.memory}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">🔢 Exit Code:</span>
                    <span className="stat-value">{stats.exitCode}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
