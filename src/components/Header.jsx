import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed w-full top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Ralvy Blog
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </Link>
            <IconButton onClick={toggleTheme} color="inherit" className="text-gray-600 dark:text-gray-300">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 