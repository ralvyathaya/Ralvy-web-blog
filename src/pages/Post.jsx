import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Chip } from '@mui/material';

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-20">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center text-gray-600 dark:text-gray-300">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20">
      <article className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Chip
              label={post.category || 'Uncategorized'}
              size="small"
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
            />
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </time>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {post.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            By {post.author || 'Anonymous'}
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
            {post.body}
          </p>
        </div>

        {post.updatedAt !== post.createdAt && (
          <footer className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date(post.updatedAt).toLocaleDateString()}
            </p>
          </footer>
        )}
      </article>
    </div>
  );
};

export default Post;
