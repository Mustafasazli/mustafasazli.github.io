import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg glass hover:glass-strong transition-smooth group"
        >
            <Globe className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm font-heading tracking-wider text-white/70 group-hover:text-white uppercase">
                {i18n.language}
            </span>
        </button>
    );
};

export default LanguageSwitcher;
