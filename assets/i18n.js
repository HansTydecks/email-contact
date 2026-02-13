(function () {
  const translations = {
    de: {
      title: 'Kontakt',
      subtitle: 'Schreib mir gerne Feedback zu meinen Webseiten.',
      formTitle: 'Kontaktformular',
      nameLabel: 'Name',
      optional: '(optional)',
      namePlaceholder: 'Dein Name',
      nameHint: 'Du kannst deinen Namen angeben, musst aber nicht.',
      emailLabel: 'E‑Mail',
      emailPlaceholder: 'deine@email.de',
      emailHint: 'Bitte gib eine gültige E‑Mail ein.',
      subjectLabel: 'Betreff',
      subjectPlaceholder: 'Worum geht es?',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Deine Nachricht…',
      messageHint: 'Bitte schreib eine kurze Nachricht.',
      send: 'Senden',
      sending: 'Senden…',
      errorFields: 'Bitte prüfe die rot markierten Felder.',
      errorSend: 'Fehler beim Senden',
      errorNetwork: 'Netzwerkfehler. Bitte später erneut versuchen.',
      toastError: 'Fehler beim Senden',
      toastNetwork: 'Netzwerkfehler.',
      footerDev: 'Entwickelt für Lernende und Lehrende',
      footerMore: 'More apps and tools',
      footerContact: 'Kontakt',
      // success page
      successTitle: 'Nachricht gesendet',
      successMsg: 'Vielen Dank! Deine E‑Mail wurde erfolgreich versendet.',
      successSub: 'Ich melde mich so schnell wie möglich bei dir.',
      successBack: 'Zurück zur Kontaktseite',
    },
    en: {
      title: 'Contact',
      subtitle: 'Feel free to send me feedback about my websites.',
      formTitle: 'Contact Form',
      nameLabel: 'Name',
      optional: '(optional)',
      namePlaceholder: 'Your name',
      nameHint: 'You can provide your name, but you don\'t have to.',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      emailHint: 'Please enter a valid email address.',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'What is it about?',
      messageLabel: 'Message',
      messagePlaceholder: 'Your message…',
      messageHint: 'Please write a short message.',
      send: 'Send',
      sending: 'Sending…',
      errorFields: 'Please check the highlighted fields.',
      errorSend: 'Error sending message',
      errorNetwork: 'Network error. Please try again later.',
      toastError: 'Error sending',
      toastNetwork: 'Network error.',
      footerDev: 'Developed for learners and teachers',
      footerMore: 'More apps and tools',
      footerContact: 'Contact',
      successTitle: 'Message Sent',
      successMsg: 'Thank you! Your email has been sent successfully.',
      successSub: 'I will get back to you as soon as possible.',
      successBack: 'Back to contact page',
    },
    es: {
      title: 'Contacto',
      subtitle: 'No dudes en enviarme comentarios sobre mis páginas web.',
      formTitle: 'Formulario de Contacto',
      nameLabel: 'Nombre',
      optional: '(opcional)',
      namePlaceholder: 'Tu nombre',
      nameHint: 'Puedes indicar tu nombre, pero no es obligatorio.',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.com',
      emailHint: 'Por favor, introduce un correo electrónico válido.',
      subjectLabel: 'Asunto',
      subjectPlaceholder: '¿De qué se trata?',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Tu mensaje…',
      messageHint: 'Por favor, escribe un mensaje breve.',
      send: 'Enviar',
      sending: 'Enviando…',
      errorFields: 'Por favor, revisa los campos marcados en rojo.',
      errorSend: 'Error al enviar el mensaje',
      errorNetwork: 'Error de red. Inténtalo de nuevo más tarde.',
      toastError: 'Error al enviar',
      toastNetwork: 'Error de red.',
      footerDev: 'Desarrollado para estudiantes y profesores',
      footerMore: 'Más apps y herramientas',
      footerContact: 'Contacto',
      successTitle: 'Mensaje Enviado',
      successMsg: '¡Gracias! Tu correo electrónico se ha enviado correctamente.',
      successSub: 'Me pondré en contacto contigo lo antes posible.',
      successBack: 'Volver a la página de contacto',
    },
    fr: {
      title: 'Contact',
      subtitle: 'N\'hésitez pas à m\'envoyer vos commentaires sur mes sites web.',
      formTitle: 'Formulaire de Contact',
      nameLabel: 'Nom',
      optional: '(facultatif)',
      namePlaceholder: 'Votre nom',
      nameHint: 'Vous pouvez indiquer votre nom, mais ce n\'est pas obligatoire.',
      emailLabel: 'E‑mail',
      emailPlaceholder: 'votre@email.fr',
      emailHint: 'Veuillez entrer une adresse e‑mail valide.',
      subjectLabel: 'Objet',
      subjectPlaceholder: 'De quoi s\'agit-il ?',
      messageLabel: 'Message',
      messagePlaceholder: 'Votre message…',
      messageHint: 'Veuillez écrire un court message.',
      send: 'Envoyer',
      sending: 'Envoi en cours…',
      errorFields: 'Veuillez vérifier les champs en rouge.',
      errorSend: 'Erreur lors de l\'envoi',
      errorNetwork: 'Erreur réseau. Veuillez réessayer plus tard.',
      toastError: 'Erreur d\'envoi',
      toastNetwork: 'Erreur réseau.',
      footerDev: 'Développé pour les apprenants et les enseignants',
      footerMore: 'Plus d\'apps et d\'outils',
      footerContact: 'Contact',
      successTitle: 'Message Envoyé',
      successMsg: 'Merci ! Votre e‑mail a été envoyé avec succès.',
      successSub: 'Je vous répondrai dès que possible.',
      successBack: 'Retour à la page de contact',
    },
    uk: {
      title: 'Контакт',
      subtitle: 'Надсилайте мені відгуки про мої вебсайти.',
      formTitle: 'Контактна форма',
      nameLabel: 'Ім\'я',
      optional: '(необов\'язково)',
      namePlaceholder: 'Ваше ім\'я',
      nameHint: 'Ви можете вказати своє ім\'я, але це не обов\'язково.',
      emailLabel: 'Електронна пошта',
      emailPlaceholder: 'ваша@пошта.ua',
      emailHint: 'Будь ласка, введіть дійсну адресу електронної пошти.',
      subjectLabel: 'Тема',
      subjectPlaceholder: 'Про що йдеться?',
      messageLabel: 'Повідомлення',
      messagePlaceholder: 'Ваше повідомлення…',
      messageHint: 'Будь ласка, напишіть коротке повідомлення.',
      send: 'Надіслати',
      sending: 'Надсилання…',
      errorFields: 'Будь ласка, перевірте виділені поля.',
      errorSend: 'Помилка надсилання повідомлення',
      errorNetwork: 'Помилка мережі. Спробуйте пізніше.',
      toastError: 'Помилка надсилання',
      toastNetwork: 'Помилка мережі.',
      footerDev: 'Розроблено для учнів та вчителів',
      footerMore: 'Більше додатків та інструментів',
      footerContact: 'Контакт',
      successTitle: 'Повідомлення надіслано',
      successMsg: 'Дякуємо! Ваш лист успішно надіслано.',
      successSub: 'Я відповім вам якнайшвидше.',
      successBack: 'Повернутися на сторінку контактів',
    },
  };

  const langMap = { de: 'de', en: 'en', es: 'es', fr: 'fr', uk: 'uk' };

  function setLang(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update html lang
    document.documentElement.lang = lang === 'uk' ? 'uk' : lang;

    // Toggle active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Save preference
    try { localStorage.setItem('contact-lang', lang); } catch {}

    // Expose for main.js
    window._currentLang = lang;
    window._t = t;
  }

  // Init: read preference or browser language
  function detectLang() {
    try {
      const saved = localStorage.getItem('contact-lang');
      if (saved && translations[saved]) return saved;
    } catch {}
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('uk')) return 'uk';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('en')) return 'en';
    return 'de';
  }

  // Bind buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Set initial language
  setLang(detectLang());

  // Expose for success page
  window._i18n = translations;
  window._setLang = setLang;
})();
