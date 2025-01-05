import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Contact Me
        </h1>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have a question or want to work together? Feel free to reach out!
          </p>
          
          <div className="flex flex-col space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:ralvy@example.com" className="text-blue-600 dark:text-blue-400">
                ralvy@example.com
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{' '}
              <a
                href="https://github.com/ralvy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400"
              >
                github.com/ralvy
              </a>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            className="bg-white dark:bg-gray-700"
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            className="bg-white dark:bg-gray-700"
          />
          
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
            variant="outlined"
            className="bg-white dark:bg-gray-700"
          />
          
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
