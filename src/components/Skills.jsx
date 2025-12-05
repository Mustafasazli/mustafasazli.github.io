import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Database, Cloud, Smartphone, Server, Palette } from 'lucide-react';

const Skills = () => {
    const { t } = useTranslation();

    const skillCategories = [
        {
            title: 'Frontend Development',
            icon: <Code className="w-6 h-6" />,
            skills: [
                { name: 'React / Next.js', level: 95, color: 'from-neon-cyan to-neon-blue' },
                { name: 'JavaScript / TypeScript', level: 90, color: 'from-neon-blue to-neon-purple' },
                { name: 'HTML5 / CSS3', level: 92, color: 'from-neon-purple to-neon-magenta' },
                { name: 'Tailwind CSS', level: 88, color: 'from-neon-magenta to-neon-pink' },
            ]
        },
        {
            title: 'Backend Development',
            icon: <Server className="w-6 h-6" />,
            skills: [
                { name: '.NET / C#', level: 93, color: 'from-neon-cyan to-neon-green' },
                { name: 'Node.js / Express', level: 85, color: 'from-neon-green to-neon-blue' },
                { name: 'RESTful APIs', level: 90, color: 'from-neon-blue to-neon-cyan' },
                { name: 'GraphQL', level: 80, color: 'from-neon-cyan to-neon-purple' },
            ]
        },
        {
            title: 'Database',
            icon: <Database className="w-6 h-6" />,
            skills: [
                { name: 'MSSQL', level: 88, color: 'from-neon-magenta to-neon-pink' },
                { name: 'PostgreSQL', level: 82, color: 'from-neon-pink to-neon-cyan' },
                { name: 'MongoDB', level: 85, color: 'from-neon-cyan to-neon-blue' },
                { name: 'Redis', level: 78, color: 'from-neon-blue to-neon-purple' },
            ]
        },
        {
            title: 'Cloud & DevOps',
            icon: <Cloud className="w-6 h-6" />,
            skills: [
                { name: 'Azure', level: 87, color: 'from-neon-blue to-neon-cyan' },
                { name: 'Docker', level: 83, color: 'from-neon-cyan to-neon-green' },
                { name: 'CI/CD', level: 80, color: 'from-neon-green to-neon-purple' },
                { name: 'Git / GitHub', level: 92, color: 'from-neon-purple to-neon-magenta' },
            ]
        },
        {
            title: 'Mobile Development',
            icon: <Smartphone className="w-6 h-6" />,
            skills: [
                { name: 'React Native', level: 82, color: 'from-neon-cyan to-neon-blue' },
                { name: 'Flutter', level: 75, color: 'from-neon-blue to-neon-purple' },
                { name: 'Progressive Web Apps', level: 88, color: 'from-neon-purple to-neon-pink' },
            ]
        },
        {
            title: 'Design & Tools',
            icon: <Palette className="w-6 h-6" />,
            skills: [
                { name: 'UI/UX Design', level: 85, color: 'from-neon-pink to-neon-magenta' },
                { name: 'Figma / Adobe XD', level: 80, color: 'from-neon-magenta to-neon-cyan' },
                { name: 'Responsive Design', level: 93, color: 'from-neon-cyan to-neon-green' },
            ]
        },
    ];

    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 neon-text">
                        {t('skills.title')}
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        {t('skills.subtitle')}
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className="glass rounded-2xl p-6 hover:glass-strong hover:neon-border transition-smooth group"
                        >
                            {/* Category Header */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan group-hover:bg-neon-cyan/20 transition-colors">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skills List */}
                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skillIndex}>
                                        {/* Skill Name and Percentage */}
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-heading text-white/90">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs font-heading text-neon-cyan font-bold">
                                                {skill.level}%
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                                            {/* Background glow */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                                            {/* Progress fill */}
                                            <div
                                                className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden transition-all duration-1000 ease-out`}
                                                style={{ width: `${skill.level}%` }}
                                            >
                                                {/* Animated shine effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Summary */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="glass rounded-xl p-6 text-center hover:glass-strong hover:neon-border transition-smooth">
                        <div className="text-4xl font-display font-bold text-neon-cyan mb-2">15+</div>
                        <div className="text-sm font-heading text-white/70">Technologies</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center hover:glass-strong hover:neon-border transition-smooth">
                        <div className="text-4xl font-display font-bold text-neon-magenta mb-2">50+</div>
                        <div className="text-sm font-heading text-white/70">Projects Built</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center hover:glass-strong hover:neon-border transition-smooth">
                        <div className="text-4xl font-display font-bold text-neon-blue mb-2">5+</div>
                        <div className="text-sm font-heading text-white/70">Years Experience</div>
                    </div>
                    <div className="glass rounded-xl p-6 text-center hover:glass-strong hover:neon-border transition-smooth">
                        <div className="text-4xl font-display font-bold text-neon-green mb-2">30+</div>
                        <div className="text-sm font-heading text-white/70">Happy Clients</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </section>
    );
};

export default Skills;
