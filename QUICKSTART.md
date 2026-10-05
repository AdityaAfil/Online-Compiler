# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/online-compiler.git
cd online-compiler
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend server will start on `http://localhost:5000`

### 3. Frontend Setup (Open a new terminal)
```bash
cd frontend
npm install
npm start
```
The frontend will start on `http://localhost:3000`

### 4. Start Coding!
- Open your browser and navigate to `http://localhost:3000`
- Select a programming language from the dropdown
- Write your code in the Monaco editor
- Click "Run Code" to execute
- View output and execution statistics

## Features Implemented

✅ **Multi-language support**: Python, JavaScript, Java, C++, C, Go, Rust, PHP, Ruby, TypeScript
✅ **Monaco Editor**: Professional VSCode-like code editor
✅ **Real-time execution**: Fast code compilation via Piston API
✅ **Input handling**: Support for stdin input
✅ **Execution statistics**: Time, memory usage, exit codes
✅ **Error handling**: Clear error messages
✅ **Responsive design**: Works on desktop and mobile
✅ **Modern UI**: Gradient design with smooth animations

## Project Structure
```
online-compiler/
├── frontend/           # React application
│   ├── src/
│   │   ├── App.jsx    # Main application component
│   │   ├── App.css    # Styling
│   │   ├── index.js   # Entry point
│   │   └── index.css  # Global styles
│   ├── public/
│   │   └── index.html
│   └── package.json
├── backend/           # Express API server
│   ├── server.js     # Main server file
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

### GET /
Health check endpoint

### GET /languages
Get list of all supported languages and versions

### POST /compile
Execute code
```json
{
  "language": "python",
  "code": "print('Hello World')",
  "input": ""
}
```

## Technologies Used

**Frontend:**
- React 18
- Monaco Editor (VSCode's editor)
- Axios
- CSS3 with gradients and animations

**Backend:**
- Node.js & Express
- Piston API (code execution engine)
- CORS middleware

## Deployment Tips

### Deploy Backend (Heroku/Railway/Render)
1. Push your backend code
2. Set environment variables
3. Note the deployed URL

### Deploy Frontend (Vercel/Netlify)
1. Update API_URL in App.jsx to your backend URL
2. Build: `npm run build`
3. Deploy the build folder

## Common Issues

**Backend not starting?**
- Check if port 5000 is available
- Run `npm install` in backend folder

**Frontend errors?**
- Clear node_modules and run `npm install` again
- Check if backend is running

**CORS errors?**
- Ensure backend CORS is configured
- Check API_URL in frontend code

## Future Enhancements Ideas
- 🔐 User authentication and saved code snippets
- 📊 Code sharing with unique URLs
- 🎨 Multiple editor themes
- 📁 Multi-file support
- 🔍 Code search and history
- 💾 Local storage for code persistence
- 🌙 Dark/light mode toggle
- 📱 Mobile app version

## Contributing
Feel free to fork this project and submit pull requests!

## License
MIT License - Free to use for learning and portfolio

---

**Built by [Your Name]** | [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)

⭐ Star this repo if you found it helpful!
