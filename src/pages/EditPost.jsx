import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    body: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await axios.put(`/api/admin/posts/${id}`, post);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
      setError(error.response?.data?.message || 'Failed to update post');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Post</h1>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition duration-200"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Content
            </label>
            <textarea
              id="body"
              name="body"
              value={post.body}
              onChange={handleChange}
              rows="12"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 rounded-lg text-white font-semibold ${
                saving
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition duration-200`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost; 