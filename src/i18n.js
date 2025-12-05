import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './locales/en.json';
import trJSON from './locales/tr.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { ...enJSON },
            tr: { ...trJSON },
        },
        lng: 'tr', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
