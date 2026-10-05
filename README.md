# 🚀 Online Code Compiler

A modern, full-featured online code compiler supporting multiple programming languages. Built with React and Node.js, featuring a sleek Monaco Editor interface and real-time code execution.

## ✨ Features

- **Multi-Language Support**: Python, JavaScript, Java, C++, C, Go, Rust, PHP, and more
- **Monaco Editor**: VSCode-like editing experience with syntax highlighting
- **Real-Time Execution**: Fast code compilation and execution
- **Input/Output Handling**: Support for stdin input
- **Execution Statistics**: View runtime and memory usage
- **Code Sharing**: Save and share code snippets
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Themes**: Multiple editor themes

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Monaco Editor (VSCode editor)
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js & Express.js
- Piston API for code execution
- CORS enabled
- Error handling & validation

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/online-compiler.git
cd online-compiler
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Start the backend server**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

5. **Start the frontend**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 🚀 Usage

1. Select your programming language from the dropdown
2. Write your code in the editor
3. (Optional) Provide input in the input panel
4. Click "Run Code" to execute
5. View output, errors, and execution stats

## 📁 Project Structure

```
online-compiler/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── OutputPanel.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── compile.js
│   └── package.json
└── README.md
```

## 🌐 Supported Languages

- Python (3.x)
- JavaScript (Node.js)
- Java
- C++
- C
- Go
- Rust
- PHP
- Ruby
- TypeScript
- And many more...

## 🔒 Security

- Code execution happens in isolated Docker containers via Piston API
- Request rate limiting
- Input validation and sanitization
- Timeout protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Piston API](https://github.com/engineer-man/piston) for code execution engine
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- Inspired by online compilers like Replit and CodePen

---

⭐ Star this repo if you find it helpful!
