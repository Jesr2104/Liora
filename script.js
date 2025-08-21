// Links de ventanas internas.
//----------------------------------------
const URL_INICIO = "/";
const URL_SERVICIOS = "/servicios.html";
const URL_SOBRE_NOSOTROS = "/sobre-nosotros.html";
const URL_PREGUNTAS_FRECUENTAS = "/preguntas-frecuentes.html";
const URL_CONTACTANOS = "/contactanos.html";

// Año actual en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle menú móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Newsletter (demo): simula envío y muestra mensajes
const nlForm = document.getElementById('newsletterForm');
nlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('nl-email').value.trim();
    const consent = true;
    const success = document.getElementById('nl-success');
    const error = document.getElementById('nl-error');

    success.style.display = 'none';
    error.style.display = 'none';

    // Validación mínima
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!emailOK){
    error.textContent = 'Revisa el correo y el consentimiento.';
    error.style.display = 'block';
    return;
    }

    // Aquí conecta tu endpoint real (Mailchimp, Sendinblue, etc.)
    // fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) })

    // Simulación
    setTimeout(() => {
    success.style.display = 'block';
    nlForm.reset();
    }, 400);
});

// === Language switcher (simple i18n) ===
const i18n = {
    es:{
    'nav.home':'Inicio', 'nav.service':'Servicios','nav.about':'Sobre nosotros','nav.faq':'Preguntas frecuentes','nav.contact':'Contáctanos','nav.cta':'Agendar evaluación',
    'nl.title':'Suscríbete al boletín','nl.desc':'Recibe consejos creativos, novedades y oportunidades exclusivas directamente en tu correo.','nl.button':'Suscribirme','nl.placeholder':'Tu correo electrónico',
    'footer.links':'Enlaces','footer.contact':'Contáctanos'
    },
    de:{
    'nav.home':'Startseite','nav.about':'Über uns','nav.faq':'Häufige Fragen','nav.contact':'Kontakt','nav.cta':'Termin buchen',
    'nl.title':'Newsletter abonnieren','nl.desc':'Erhalte kreative Tipps, Neuigkeiten und exklusive Angebote direkt in dein Postfach.','nl.button':'Abonnieren','nl.placeholder':'Deine E-Mail-Adresse',
    'footer.links':'Links','footer.contact':'Kontakt'
    },
    en:{
    'nav.home':'Home','nav.about':'About us','nav.faq':'FAQ','nav.contact':'Contact','nav.cta':'Book a call',
    'nl.title':'Subscribe to the newsletter','nl.desc':'Get creative tips, updates and exclusive opportunities right in your inbox.','nl.button':'Subscribe','nl.placeholder':'Your email address',
    'footer.links':'Links','footer.contact':'Contact'
    },
    fr:{
    'nav.home':'Accueil','nav.about':'À propos','nav.faq':'FAQ','nav.contact':'Contact','nav.cta':'Réserver un appel',
    'nl.title':'Abonnez‑vous à la newsletter','nl.desc':'Recevez des conseils, des nouveautés et des opportunités exclusives directement dans votre boîte mail.','nl.button':'M’abonner','nl.placeholder':'Votre e‑mail',
    'footer.links':'Liens','footer.contact':'Contact'
    }
};

function applyLanguage(lang){
    const dict = i18n[lang] || i18n.es;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
    });
    const nlInput = document.getElementById('nl-email');
    if(nlInput && dict['nl.placeholder']) nlInput.placeholder = dict['nl.placeholder'];
    localStorage.setItem('lang', lang);
}

const langSelect = document.getElementById('lang-select');
if(langSelect){
    const saved = localStorage.getItem('lang') || 'es';
    langSelect.value = saved;
    applyLanguage(saved);
    langSelect.addEventListener('change', (e)=> applyLanguage(e.target.value));
} else {
    const saved = localStorage.getItem('lang');
    if(saved) applyLanguage(saved);
}