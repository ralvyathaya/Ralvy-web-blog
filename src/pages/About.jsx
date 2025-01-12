const About = () => {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          About Me
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">
            Hi! I&apos;m Ralvy, a passionate full-stack developer with a love for creating
            beautiful and functional web applications. I specialize in the MERN stack
            (MongoDB, Express.js, React, and Node.js) and enjoy sharing my knowledge
            and experiences through this blog.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">My Journey</h2>
          <p className="mb-4">
            I started my programming journey several years ago and have been
            constantly learning and growing since then. Through this blog, I share
            tutorials, tips, and insights about web development, programming best
            practices, and my experiences in the tech industry.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Technical Skills</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS</li>
            <li>Backend: Node.js, Express.js, MongoDB</li>
            <li>Tools: Git, VS Code</li>
            <li>Other: RESTful APIs, TypeScript</li>
          </ul>
          
          <p className="mt-6">
            Feel free to reach out if you want to collaborate on a project or just
            want to connect!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
