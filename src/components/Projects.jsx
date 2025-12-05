import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState('All');

    const projects = [
        {
            id: 1,
            title: 'Portfolio Website',
            description: 'Personal portfolio built with React and Tailwind CSS. Features a clean tech design with particle animations.',
            tags: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
            demo: '#',
            github: '#',
            category: 'Frontend'
        },
        {
            id: 2,
            title: 'E-Commerce Dashboard',
            description: 'A comprehensive dashboard for managing products, orders, and customers with real-time analytics.',
            tags: ['React', 'Redux', 'Chart.js', 'Material UI'],
            demo: '#',
            github: '#',
            category: 'Frontend'
        },
        {
            id: 3,
            title: 'Task Management API',
            description: 'RESTful API for a task management application with authentication and authorization.',
            tags: ['C#', '.NET Core', 'MSSQL', 'JWT'],
            demo: '#',
            github: '#',
            category: 'Backend'
        },
        {
            id: 4,
            title: 'Cloud File Storage',
            description: 'Secure file storage solution using Azure Blob Storage with file sharing capabilities.',
            tags: ['Azure', '.NET', 'React', 'TypeScript'],
            demo: '#',
            github: '#',
            category: 'Cloud'
        },
        {
            id: 5,
            title: 'Social Media Analytics',
            description: 'Analytics tool for tracking social media engagement and growth metrics.',
            tags: ['Python', 'Django', 'PostgreSQL', 'React'],
            demo: '#',
            github: '#',
            category: 'Full Stack'
        },
        {
            id: 6,
            title: 'Real-time Chat App',
            description: 'Instant messaging application with real-time delivery and read receipts.',
            tags: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
            demo: '#',
            github: '#',
            category: 'Full Stack'
        }
    ];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.tags.includes(filter) || p.category === filter);

    const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Cloud'];

    return (
        <section id="projects" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-center neon-text">
                        {t('projects.title')}
                    </h2>
                    <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                        Showcase of my recent work and projects
                    </p>

                    {/* Digital Toggle Filters */}
                    <div className="flex justify-center flex-wrap gap-3 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-6 py-2 rounded-lg font-heading text-sm tracking-wider transition-all duration-300 ${filter === category
                                        ? 'bg-neon-cyan text-space-900 shadow-neon-cyan font-bold'
                                        : 'glass text-white/70 hover:glass-strong hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -10 }}
                                    className="glass rounded-xl overflow-hidden hover:glass-strong hover:neon-border transition-smooth group"
                                >
                                    {/* Project Image Placeholder */}
                                    <div className="h-48 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-6xl font-display text-white/10 group-hover:text-white/20 transition-colors">
                                                {project.title[0]}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-space-900 to-transparent opacity-60"></div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-white/70 mb-4 h-20 overflow-hidden leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 glass text-neon-cyan text-xs rounded-md font-heading"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex space-x-4 pt-4 border-t border-white/10">
                                            <a
                                                href={project.demo}
                                                className="flex items-center text-sm font-heading text-white/70 hover:text-neon-cyan transition-colors"
                                            >
                                                <ExternalLink size={16} className="mr-1" /> Demo
                                            </a>
                                            <a
                                                href={project.github}
                                                className="flex items-center text-sm font-heading text-white/70 hover:text-neon-cyan transition-colors"
                                            >
                                                <Github size={16} className="mr-1" /> GitHub
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
