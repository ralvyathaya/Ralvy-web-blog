import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts?page=${currentPage}`);
        console.log('Posts response:', response.data);
        setPosts(response.data.posts || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Maximum number of buttons to show
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition duration-200`}
      >
        Previous
      </button>
    );

    // First page
    if (start > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
        >
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <span key="dots1" className="px-2">
            ...
          </span>
        );
      }
    }

    // Page buttons
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-lg ${
            currentPage === i
              ? 'bg-blue-800 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition duration-200`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(
          <span key="dots2" className="px-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition duration-200`}
      >
        Next
      </button>
    );

    return buttons;
  };

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
            src="/images/ai-profile.jpg"
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
          
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home; 