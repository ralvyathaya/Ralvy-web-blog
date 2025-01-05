import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Post from './pages/Post';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EditPost from './pages/EditPost';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Router>
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/posts/edit/:id" element={<EditPost />} />
            </Routes>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
