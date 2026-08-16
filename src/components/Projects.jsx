import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../lib/contentful';
import RichText from './RichText';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getProjects();
      setProjects(projectsData);
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primaryLight rounded-lg overflow-hidden"
          >
            {project.screenshot && (
              <img
                src={`https:${project.screenshot}`}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-textPrimary">{project.title}</h3>
              <p className="text-textSecondary mb-4">{project.intro}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-secondary/10 text-secondary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  >
                    View Project
                  </a>
                )}
                <button
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="flex-1 text-center px-4 py-2 bg-transparent text-secondary rounded-lg border border-secondary hover:bg-secondary/10 transition-colors font-medium"
                >
                  {expandedProject === project.id ? 'Show Less' : 'Read More'}
                </button>
              </div>
              
              {expandedProject === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-secondary/20"
                >
                  <RichText content={project.description} />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
