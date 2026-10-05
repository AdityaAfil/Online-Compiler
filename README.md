# 💻 CodeRunner - Online Code Compiler

A modern, minimalist online code compiler supporting multiple programming languages. Built with React and Node.js, featuring a clean LeetCode-inspired interface with old money aesthetics.

## ✨ Features

- **9 Programming Languages**: Python, JavaScript, Java, C++, C, Go, Rust, PHP, Ruby
- **Real-Time Code Execution**: Execute code instantly with JDoodle API
- **Split-Pane Layout**: Clean editor on the left, console on the right
- **Dark/Light Mode**: Toggle between themes with one click
- **Input/Output Tabs**: Organized interface for stdin and results
- **Execution Statistics**: View runtime, memory usage, and exit codes
- **Monaco Editor**: Professional VSCode-like editing experience
- **Minimalist Design**: Clean, distraction-free interface

## 🎨 Design

- **Old Money Color Palette**: Beige (#c9a961), off-white, dark browns
- **LeetCode-Inspired Layout**: Professional split-pane design
- **Responsive**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Polished user experience

## 🚀 Tech Stack

**Frontend:**
- React 18
- Monaco Editor (VSCode's editor)
- Axios for API calls
- CSS3 with custom properties

**Backend:**
- Node.js & Express
- JDoodle API for code execution
- CORS enabled
- RESTful API design

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- JDoodle API key (free tier available)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/online-compiler.git
   cd online-compiler
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure JDoodle API**
   
   Get your free API key from [JDoodle](https://www.jdoodle.com/compiler-api)
   
   Create `backend/.env`:
   ```env
   PORT=5000
   JDOODLE_CLIENT_ID=your_client_id_here
   JDOODLE_CLIENT_SECRET=your_client_secret_here
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🎯 Usage

1. Select your programming language from the dropdown
2. Write your code in the editor
3. (Optional) Add input in the Input tab
4. Click "Run" to execute
5. View output and statistics in the Output tab

## 📁 Project Structure

```
online-compiler/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styling
│   │   └── index.js         # Entry point
│   ├── public/
│   └── package.json
├── backend/
│   ├── server.js            # Express API server
│   ├── .env                 # Environment variables (not in git)
│   └── package.json
├── README.md
└── .gitignore
```

## 🌐 API Endpoints

### GET `/`
Health check endpoint

### GET `/languages`
Get list of supported languages

### POST `/compile`
Execute code
```json
{
  "language": "python",
  "code": "print('Hello World')",
  "input": ""
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello World\n",
  "error": null,
  "exitCode": 0,
  "executionTime": "156",
  "memory": "3456 KB"
}
```

## 🔧 Configuration

### JDoodle API (Free Tier)
- **Requests**: 200/day
- **No credit card required**
- **All major languages supported**
- Get your key at: https://www.jdoodle.com/compiler-api

### Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
JDOODLE_CLIENT_ID=your_client_id
JDOODLE_CLIENT_SECRET=your_client_secret
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Deploy!

### Backend (Railway/Render)
1. Push your code to GitHub
2. Import project on [Railway](https://railway.app) or [Render](https://render.com)
3. Set root directory to `backend`
4. Add environment variables
5. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - feel free to use it for learning and portfolio purposes.

## 🙏 Acknowledgments

- [JDoodle API](https://www.jdoodle.com) for code execution engine
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- Inspired by LeetCode's clean interface design

## 📧 Contact

**Aditya Afil**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

⭐ **Star this repo if you find it helpful!**

Built with ❤️ by Aditya Afil
