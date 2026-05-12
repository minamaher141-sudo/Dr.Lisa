/* ============================================
   DR. LISA SAMIR - LANGUAGE SWITCHER
   English / Arabic with RTL Support
   ============================================ */

(function() {
    'use strict';

    const STORAGE_KEY = 'dr_lisa_lang';
    
    // Get saved language or default to English
    function getSavedLang() {
        return localStorage.getItem(STORAGE_KEY) || 'en';
    }

    // Save language preference
    function saveLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
    }

    // Apply language to the page
    function applyLanguage(lang) {
        const html = document.documentElement;
        
        // Set direction and lang attribute
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if the translation contains HTML
                if (translations[lang][key].includes('<')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Update language toggle active state
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        // Save preference
        saveLang(lang);
    }

    // Initialize language switcher
    function initLangSwitcher() {
        const toggleBtns = document.querySelectorAll('.lang-toggle');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const clickedOption = e.target.closest('.lang-option');
                if (clickedOption) {
                    const lang = clickedOption.getAttribute('data-lang');
                    applyLanguage(lang);
                } else {
                    // Toggle between languages if clicking the button itself
                    const currentLang = getSavedLang();
                    const newLang = currentLang === 'en' ? 'ar' : 'en';
                    applyLanguage(newLang);
                }
            });
        });

        // Apply saved language on page load
        const savedLang = getSavedLang();
        if (savedLang !== 'en') {
            applyLanguage(savedLang);
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLangSwitcher);
    } else {
        initLangSwitcher();
    }

    // Expose function globally for manual use
    window.switchLanguage = applyLanguage;
})();
