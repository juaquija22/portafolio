/* ============================================================
   LANGUAGE TOGGLE (ES ↔ EN) — i18n system
   ============================================================ */
const i18n = {
    en: {
        intro_btn: '[ START SYSTEM ]',
        nav_about: 'About me', nav_skills: 'Skills', nav_projects: 'Projects',
        nav_game: 'Game', nav_contact: 'Contact',
        hero_tag: 'Available for projects',
        hero_greeting: "Hi, I'm",
        hero_desc: 'Passionate developer building digital experiences that make a difference. I turn ideas into elegant, functional code.',
        hero_cta: 'View projects', hero_talk: "Let's talk",
        stat_years: 'Years', stat_projects: 'Projects', stat_tech: 'Technologies',
        about_label: 'About me',
        about_title: 'Passionate about <em>code</em>',
        about_lead: 'Software Development Technician graduated from <strong>Campuslands Floridablanca</strong>, passionate about building solutions that solve real problems.',
        about_desc: 'I have worked with Python, JavaScript, HTML5, CSS3 and MySQL on projects ranging from tournament management systems to web applications and relational databases. I am characterized by teamwork, effective communication and fast learning.',
        card_english: 'English B2',
        soft_1: '💡 Problem solving', soft_2: '🤝 Teamwork', soft_3: '⚡ Fast learning',
        soft_4: '🗣️ Effective communication', soft_5: '🔄 Adaptability',
        skill_db: 'Databases', about_cta: 'Contact me',
        edu_label: 'Education', edu_title: 'My <em>journey</em>',
        edu_graduated: 'Graduated', edu_highschool: 'High School', edu_tag_secondary: 'Secondary',
        edu_level_b2: 'B2 Level', edu_english: 'English',
        edu_english_desc: 'Professional and technical communication',
        edu_tag_language: 'Language', edu_period_campus: '2025 — Present',
        edu_tech_degree: 'Software Development Technician', edu_tag_tech: 'Technical Training',
        skills_title: 'My <em>technologies</em>',
        projects_label: 'Portfolio', projects_title: 'My <em>projects</em>',
        filter_all: 'All',
        proj1_title: '⚽ Football Tournament Manager',
        proj1_desc: 'System for managing international football tournaments. Data persistence with JSON files and modular structure oriented towards scalability.',
        proj2_title: '🏨 Hotel Management Web App',
        proj2_desc: 'Hotel booking application with MVC architecture, LocalStorage authentication and admin panel with metrics dashboard and CRUD operations.',
        proj3_title: '🏠 Real Estate Database',
        proj3_desc: 'Database design and development for a real estate management system. Audit triggers to track property status changes and new contracts.',
        game_label: 'Secure System', game_title: '<em>Developer</em> Mode',
        game_desc: 'Restricted access. Type the secret word to unlock the central system simulation.',
        game_hint_q: 'Need a hint?', game_hint_a: 'Type the word <strong>hack</strong> to play.',
        game_unlock: 'Unlock',
        contact_label: 'Contact', contact_title: "Let's talk about your <em>project</em>",
        contact_heading: 'Have a project in mind?',
        contact_info: "I'm available for freelance projects, collaborations and new opportunities. Don't hesitate to reach out!",
        form_name: 'Your name', form_email: 'Your email', form_msg: 'Your message',
        form_send: 'Send message',
        footer_by: 'Designed and built by <strong>Juan Pablo Quijano Martinez</strong>',
        footer_copy: '© 2025 — Made with ❤️ and lots of ☕'
    },
    es: {
        intro_btn: '[ INICIAR SISTEMA ]',
        nav_about: 'Sobre mí', nav_skills: 'Habilidades', nav_projects: 'Proyectos',
        nav_game: 'Juego', nav_contact: 'Contacto',
        hero_tag: 'Disponible para proyectos',
        hero_greeting: 'Hola, soy',
        hero_desc: 'Desarrollador apasionado por construir experiencias digitales que marcan la diferencia. Transformo ideas en código elegante y funcional.',
        hero_cta: 'Ver proyectos', hero_talk: 'Hablemos',
        stat_years: 'Años', stat_projects: 'Proyectos', stat_tech: 'Tecnologías',
        about_label: 'Sobre mí',
        about_title: 'Apasionado por el <em>código</em>',
        about_lead: 'Técnico en Desarrollo de Software egresado de <strong>Campuslands Floridablanca</strong>, apasionado por construir soluciones que resuelven problemas reales.',
        about_desc: 'He trabajado con Python, JavaScript, HTML5, CSS3 y MySQL en proyectos que van desde sistemas de gestión de torneos hasta aplicaciones web y bases de datos relacionales. Me caracterizo por el trabajo en equipo, la comunicación efectiva y el aprendizaje rápido.',
        card_english: 'Inglés B2',
        soft_1: '💡 Resolución de problemas', soft_2: '🤝 Trabajo en equipo', soft_3: '⚡ Aprendizaje rápido',
        soft_4: '🗣️ Comunicación efectiva', soft_5: '🔄 Adaptabilidad',
        skill_db: 'Bases de datos', about_cta: 'Contáctame',
        edu_label: 'Formación', edu_title: 'Mi <em>trayectoria</em>',
        edu_graduated: 'Graduado', edu_highschool: 'Bachillerato', edu_tag_secondary: 'Secundaria',
        edu_level_b2: 'Nivel B2', edu_english: 'Inglés',
        edu_english_desc: 'Comunicación profesional y técnica',
        edu_tag_language: 'Idioma', edu_period_campus: '2025 — Presente',
        edu_tech_degree: 'Técnico en Desarrollo de Software', edu_tag_tech: 'Formación Técnica',
        skills_title: 'Mis <em>tecnologías</em>',
        projects_label: 'Portafolio', projects_title: 'Mis <em>proyectos</em>',
        filter_all: 'Todos',
        proj1_title: '⚽ Gestión de Torneos de Fútbol',
        proj1_desc: 'Sistema para gestionar torneos internacionales de fútbol. Persistencia de datos con archivos JSON y estructura modular orientada a escalabilidad.',
        proj2_title: '🏨 App Web de Gestión de Hotel',
        proj2_desc: 'Aplicación para reservas hoteleras con arquitectura MVC, autenticación via LocalStorage y panel administrativo con dashboard de métricas y operaciones CRUD.',
        proj3_title: '🏠 Base de Datos Inmobiliaria',
        proj3_desc: 'Diseño y desarrollo de base de datos para sistema de gestión inmobiliaria. Triggers de auditoría para rastrear cambios de estado en propiedades y nuevos contratos.',
        game_label: 'Sistema Seguro', game_title: 'Modo <em>Desarrollador</em>',
        game_desc: 'Acceso restringido. Escribe la palabra secreta para desbloquear la simulación del sistema central.',
        game_hint_q: '¿Necesitas una pista?', game_hint_a: 'Escribe la palabra <strong>hack</strong> para jugar.',
        game_unlock: 'Desbloquear',
        contact_label: 'Contacto', contact_title: 'Hablemos de tu <em>proyecto</em>',
        contact_heading: '¿Tienes un proyecto en mente?',
        contact_info: 'Estoy disponible para proyectos freelance, colaboraciones y nuevas oportunidades. ¡No dudes en escribirme!',
        form_name: 'Tu nombre', form_email: 'Tu email', form_msg: 'Tu mensaje',
        form_send: 'Enviar mensaje',
        footer_by: 'Diseñado y construido por <strong>Juan Pablo Quijano Martinez</strong>',
        footer_copy: '© 2025 — Hecho con ❤️ y mucho ☕'
    }
};

let currentLang = localStorage.getItem('lang') || 'es';

function applyTranslations(lang) {
    const dict = i18n[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            if (el.getAttribute('data-i18n-html') === '1') {
                el.innerHTML = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
}

(function () {
    const btn = document.getElementById('langToggle');
    const flag = document.getElementById('langFlag');
    const label = document.getElementById('langLabel');
    if (!btn) return;

    function updateUI(lang) {
        if (lang === 'en') {
            flag.textContent = '🇪🇸';
            label.textContent = 'ES';
            btn.title = 'Cambiar a Español';
        } else {
            flag.textContent = '🇬🇧';
            label.textContent = 'EN';
            btn.title = 'Switch to English';
        }
    }

    // Apply saved language on load
    if (currentLang === 'en') {
        applyTranslations('en');
    }
    updateUI(currentLang);

    btn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('lang', currentLang);
        applyTranslations(currentLang);
        updateUI(currentLang);
    });
})();
