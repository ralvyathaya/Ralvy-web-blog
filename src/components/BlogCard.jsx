import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import PropTypes from 'prop-types';

const BlogCard = ({ post }) => {
  const previewText = post.body.substring(0, 150) + '...';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Chip 
            label={post.category || 'Uncategorized'} 
            size="small"
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <Link to={`/post/${post._id}`}>
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {previewText}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            By {post.author || 'Anonymous'}
          </span>
          <Link 
            to={`/post/${post._id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard; 