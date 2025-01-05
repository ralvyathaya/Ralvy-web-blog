import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts?page=${currentPage}`);
        console.log('Posts response:', response.data); // Debug log
        setPosts(response.data.posts || []);
        setHasMore(response.data.hasNextPage || false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center text-red-600 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20">
      {/* Profile Section */}
      <section className="mb-12 flex flex-col md:flex-row items-center justify-center md:justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="md:w-1/4 mb-6 md:mb-0">
          <img
            src="/profile-image.jpg"
            alt="Ralvy"
            className="rounded-full w-32 h-32 object-cover mx-auto shadow-lg"
          />
        </div>
        <div className="md:w-3/4 md:pl-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome to Ralvy&apos;s Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Hi! I&apos;m Ralvy, a passionate developer sharing my journey through code, technology, and life.
            Here you&apos;ll find articles about web development, programming tips, and tech insights.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 dark:text-gray-300">
                No posts found.
              </div>
            )}
          </div>
          
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home; 