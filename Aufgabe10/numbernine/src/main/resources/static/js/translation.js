import { de } from "./language/de.js";
import { en } from "./language/en.js";

const languages = { de, en };
const fallbackLanguage = "de";

function detectBrowserLanguage() {
    const browserLanguages = navigator.languages || [];
    const preferred = browserLanguages[0] || navigator.language || "";
    const normalized = preferred.toLowerCase();

    if (normalized.startsWith("de")) {
        return "de";
    }

    if (normalized.startsWith("en")) {
        return "en";
    }

    return fallbackLanguage;
}

let currentLanguage = detectBrowserLanguage();

function t(key) {
    return languages[currentLanguage]?.[key] || languages[fallbackLanguage]?.[key] || key;
}

function setLanguage(langCode) {
    if (languages[langCode]) {
        currentLanguage = langCode;
    }
}

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const translation = t(key);

        if (!translation) {
            return;
        }

        if (element.tagName === "INPUT" || element.tagName === "BUTTON") {
            element.value = translation;
        } else {
            element.textContent = translation;
        }
    });

    const languageSwitcher = document.getElementById("language-switcher");
    if (languageSwitcher) {
        languageSwitcher.value = currentLanguage;
    }
}

function initLanguageSwitcher() {
    const languageSwitcher = document.getElementById("language-switcher");
    if (!languageSwitcher) {
        return;
    }

    languageSwitcher.addEventListener("change", (event) => {
        setLanguage(event.target.value);
        applyTranslations();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        applyTranslations();
        initLanguageSwitcher();
    });
} else {
    applyTranslations();
    initLanguageSwitcher();
}

export { t, setLanguage, applyTranslations, detectBrowserLanguage };
