import { de } from "./language/de";
import { en } from "./language/en";

const languages = { en, de};

let currentLanguage = 'de';

function t(key) {
    // Falls die Sprache oder der Key nicht existiert, Key als Fallback zurückgegeben
    return languages[currentLanguage]?.[key] || key;
}

function setLanguage(langCode) {
    if (languages[langCode]) {
        currentLanguage = langCode;
    }
}

console.log(t('menu'));
setLanguage('en');
console.log(t('menu'))
