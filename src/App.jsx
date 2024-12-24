import { Element, Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Projects from './components/Projects';
import RichText from './components/RichText';
import { getPage } from './lib/contentful';

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      const content = await getPage('about');
      if (content) {
        setAboutContent(content);
      }
    };

    fetchAboutContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again later.'
      });
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full min-h-screen bg-primary">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-secondary font-bold text-xl">IV</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="text-textSecondary hover:text-secondary cursor-pointer"
              >
                About
              </ScrollLink>
              <ScrollLink
                to="projects"
                smooth={true}
                duration={500}
                className="text-textSecondary hover:text-secondary cursor-pointer"
              >
                Projects
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="text-textSecondary hover:text-secondary cursor-pointer"
              >
                Contact
              </ScrollLink>
            </div>
          </div>
        </div>
      </nav>

      <Element name="about" className="min-h-screen flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          {aboutContent && (
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {aboutContent.title}
              </h1>
              <div className="text-textSecondary text-lg mb-8 max-w-4xl mx-auto">
                <RichText content={aboutContent.content} />
              </div>
              <div className="flex justify-center gap-4">
                <ScrollLink 
                  to="projects" 
                  smooth={true} 
                  duration={500}
                  className="group relative px-6 py-3 overflow-hidden rounded-lg bg-secondary/10 border-2 border-secondary"
                >
                  <span className="relative z-10 text-secondary group-hover:text-primary transition-colors duration-500">
                    View Projects
                  </span>
                  <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </ScrollLink>
                <ScrollLink 
                  to="contact" 
                  smooth={true} 
                  duration={500} 
                  className="px-6 py-3 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors cursor-pointer"
                >
                  Contact Me
                </ScrollLink>
              </div>
            </div>
          )}
        </motion.div>
      </Element>

      <Element name="projects" className="min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            My <span className="text-secondary">Projects</span>
          </h2>
          <Projects />
        </motion.div>
      </Element>

      <Element name="contact" className="min-h-screen flex items-center justify-center w-full bg-primary/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Get in <span className="text-secondary">Touch</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary/30 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-textPrimary"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-textSecondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-primary/30 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-textPrimary"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-textSecondary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 bg-primary/30 border border-textSecondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-textPrimary"
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            {submitStatus.message && (
              <div 
                className={`text-center p-3 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-secondary text-primary rounded-lg transition-colors font-medium ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary/90'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </motion.div>
      </Element>
    </div>
  );
}

export default App;
