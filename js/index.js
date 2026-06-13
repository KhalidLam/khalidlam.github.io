const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const themeLabel = themeToggle?.querySelector(".theme-toggle__label");
const languageButtons = document.querySelectorAll("[data-lang]");
const contactForm = document.querySelector(".contact-form");
const formStatus = contactForm?.querySelector(".form-status");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Current-page controls still work when storage is unavailable.
    }
  },
};

const translations = {
  en: {
    "nav.work": "Work",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.articles": "Articles",
    "nav.contact": "Contact",
    "theme.dark": "Dark",
    "theme.light": "Light",
    "hero.eyebrow": "Software engineer",
    "hero.lead":
      "I help teams ship dependable software: APIs, automation, search, internal tools, and AI-assisted workflows that survive real traffic and real business constraints.",
    "hero.contact": "Contact me",
    "hero.resume": "View resume",
    "about.eyebrow": "About",
    "about.title": "About me.",
    "about.lead":
      "I like building useful software after the launch moment: backend services, product workflows, dashboards, search behavior, and small tools that remove friction from a team.",
    "about.note1": "I enjoy owning the path from the first API shape to the interface people actually use.",
    "about.note2": "Most of my work lives around product engineering, platform reliability, and practical automation.",
    "work.eyebrow": "Work",
    "work.title": "Things I work on.",
    "work.backendTitle": "Backend platforms",
    "work.backend": "APIs, services, queues, data models, caching, and integrations.",
    "work.aiTitle": "AI workflows",
    "work.ai": "Classification, moderation, provider fallback, review flows, and automation.",
    "work.dashboardsTitle": "Dashboards and internal tools",
    "work.dashboards": "Operational interfaces, admin flows, charts, tables, and team-facing tools.",
    "work.searchTitle": "Search and data flows",
    "work.search": "Search tuning, multilingual behavior, analytics, sync jobs, and pipelines.",
    "experience.eyebrow": "Experience",
    "experience.title": "5+ years building software across product teams.",
    "experience.avito": "Backend engineering on marketplace systems, moderation, search, and operational workflows.",
    "experience.startupsquare": "Full-stack product work across program management, booking, KPIs, analytics, and platform tools.",
    "experience.independentTitle": "Independent builds",
    "experience.independent": "Small products and experiments around scheduling, email, developer tools, and learning projects.",
    "skills.eyebrow": "Skills",
    "skills.title": "Tools I use often.",
    "skills.backend": "Backend",
    "skills.data": "Data",
    "skills.messaging": "Messaging",
    "skills.frontend": "Frontend",
    "skills.infra": "Infra",
    "skills.ai": "AI / LLM",
    "contact.eyebrow": "Contact",
    "contact.title": "Let us build something useful.",
    "contact.copy":
      "Send me a short note about what you are building, where it is stuck, or what kind of engineering help you need.",
    "form.name": "Name",
    "form.namePlaceholder": "Your name",
    "form.email": "Email",
    "form.emailPlaceholder": "you@example.com",
    "form.message": "Message",
    "form.messagePlaceholder": "Tell me what you are building",
    "form.send": "Send message",
    "form.note": "This sends the message directly to my inbox.",
    "form.sending": "Sending...",
    "form.success": "Message sent. Thank you.",
    "form.error": "Something went wrong. Please email me directly.",
  },
  fr: {
    "nav.work": "Travail",
    "nav.experience": "Experience",
    "nav.skills": "Competences",
    "nav.articles": "Articles",
    "nav.contact": "Contact",
    "theme.dark": "Sombre",
    "theme.light": "Clair",
    "hero.eyebrow": "Ingenieur logiciel",
    "hero.lead":
      "J'aide les equipes a livrer des logiciels fiables : APIs, automatisation, recherche, outils internes et workflows assistes par IA qui tiennent en production.",
    "hero.contact": "Me contacter",
    "hero.resume": "Voir le CV",
    "about.eyebrow": "A propos",
    "about.title": "A propos de moi.",
    "about.lead":
      "J'aime construire des logiciels utiles apres le lancement : services backend, workflows produit, dashboards, recherche et petits outils qui reduisent la friction.",
    "about.note1": "J'aime suivre le chemin complet, de la premiere forme d'API jusqu'a l'interface utilisee par l'equipe.",
    "about.note2": "Mon travail tourne souvent autour du produit, de la fiabilite plateforme et de l'automatisation pratique.",
    "work.eyebrow": "Travail",
    "work.title": "Ce sur quoi je travaille.",
    "work.backendTitle": "Plateformes backend",
    "work.backend": "APIs, services, files, modeles de donnees, cache et integrations.",
    "work.aiTitle": "Workflows IA",
    "work.ai": "Classification, moderation, fallback fournisseur, revues humaines et automatisation.",
    "work.dashboardsTitle": "Dashboards et outils internes",
    "work.dashboards": "Interfaces operationnelles, admin flows, charts, tables et outils pour les equipes.",
    "work.searchTitle": "Recherche et flux de donnees",
    "work.search": "Recherche, comportement multilingue, analytics, synchronisation et pipelines.",
    "experience.eyebrow": "Experience",
    "experience.title": "5+ ans a construire des logiciels avec des equipes produit.",
    "experience.avito": "Backend engineering sur des systemes marketplace, moderation, recherche et workflows operationnels.",
    "experience.startupsquare": "Produit full-stack autour de la gestion de programmes, booking, KPIs, analytics et outils plateforme.",
    "experience.independentTitle": "Projets independants",
    "experience.independent": "Petits produits et experimentations autour du scheduling, email, outils dev et projets d'apprentissage.",
    "skills.eyebrow": "Competences",
    "skills.title": "Outils que j'utilise souvent.",
    "skills.backend": "Backend",
    "skills.data": "Data",
    "skills.messaging": "Messaging",
    "skills.frontend": "Frontend",
    "skills.infra": "Infra",
    "skills.ai": "IA / LLM",
    "contact.eyebrow": "Contact",
    "contact.title": "Construisons quelque chose d'utile.",
    "contact.copy": "Envoyez-moi un court message sur ce que vous construisez, le blocage actuel ou l'aide technique dont vous avez besoin.",
    "form.name": "Nom",
    "form.namePlaceholder": "Votre nom",
    "form.email": "Email",
    "form.emailPlaceholder": "vous@example.com",
    "form.message": "Message",
    "form.messagePlaceholder": "Dites-moi ce que vous construisez",
    "form.send": "Envoyer",
    "form.note": "Ce formulaire envoie le message directement dans ma boite mail.",
    "form.sending": "Envoi...",
    "form.success": "Message envoye. Merci.",
    "form.error": "Une erreur est survenue. Envoyez-moi un email directement.",
  },
  ar: {
    "nav.work": "العمل",
    "nav.experience": "الخبرة",
    "nav.skills": "المهارات",
    "nav.articles": "المقالات",
    "nav.contact": "تواصل",
    "theme.dark": "داكن",
    "theme.light": "فاتح",
    "hero.eyebrow": "مهندس برمجيات",
    "hero.lead": "أساعد الفرق على إطلاق برمجيات موثوقة: واجهات API، أتمتة، بحث، أدوات داخلية، وتدفقات عمل مدعومة بالذكاء الاصطناعي تعمل بثبات في الاستخدام الفعلي.",
    "hero.contact": "تواصل معي",
    "hero.resume": "عرض السيرة الذاتية",
    "about.eyebrow": "نبذة",
    "about.title": "نبذة عني.",
    "about.lead": "أهتم ببناء حلول عملية تخدم الفريق على المدى الطويل: خدمات خلفية، تدفقات للمنتج، لوحات متابعة، بحث، وأدوات صغيرة تسهّل العمل اليومي.",
    "about.note1": "أحب أن أتابع الفكرة من تصميم الـ API إلى الواجهة التي يستخدمها الفريق يوميا.",
    "about.note2": "أغلب عملي يجمع بين هندسة المنتج، موثوقية الأنظمة، والأتمتة العملية.",
    "work.eyebrow": "العمل",
    "work.title": "مجالات أعمل عليها.",
    "work.backendTitle": "منصات خلفية",
    "work.backend": "واجهات API، خدمات، طوابير، نماذج بيانات، تخزين مؤقت، وتكاملات.",
    "work.aiTitle": "سير عمل الذكاء الاصطناعي",
    "work.ai": "تصنيف، مراجعة، تبديل بين المزودين عند الحاجة، تدخل بشري، وأتمتة.",
    "work.dashboardsTitle": "لوحات وأدوات داخلية",
    "work.dashboards": "واجهات تشغيلية، أدوات إدارة، رسوم بيانية، جداول، وأدوات يستخدمها الفريق يوميا.",
    "work.searchTitle": "البحث وتدفقات البيانات",
    "work.search": "تحسين البحث، دعم لغات متعددة، تحليلات، مزامنة، وتدفقات بيانات.",
    "experience.eyebrow": "الخبرة",
    "experience.title": "أكثر من 5 سنوات في بناء البرمجيات مع فرق المنتج.",
    "experience.avito": "هندسة خلفية لأنظمة marketplace، المراجعة، البحث، وسير العمل التشغيلي.",
    "experience.startupsquare": "تطوير full-stack لإدارة البرامج، الحجز، مؤشرات الأداء، التحليلات، وأدوات المنصة.",
    "experience.independentTitle": "مشاريع مستقلة",
    "experience.independent": "منتجات وتجارب صغيرة حول الجدولة، البريد، أدوات المطورين، ومشاريع التعلم.",
    "skills.eyebrow": "المهارات",
    "skills.title": "أدوات أستخدمها بشكل متكرر.",
    "skills.backend": "Backend",
    "skills.data": "Data",
    "skills.messaging": "Messaging",
    "skills.frontend": "Frontend",
    "skills.infra": "Infra",
    "skills.ai": "AI / LLM",
    "contact.eyebrow": "تواصل",
    "contact.title": "لنبن شيئًا مفيدًا.",
    "contact.copy": "أرسل لي رسالة قصيرة عن المشروع الذي تعمل عليه، أين يوجد العائق، أو نوع المساعدة التقنية التي تحتاجها.",
    "form.name": "الاسم",
    "form.namePlaceholder": "اسمك",
    "form.email": "البريد",
    "form.emailPlaceholder": "you@example.com",
    "form.message": "الرسالة",
    "form.messagePlaceholder": "اكتب لي عن المشروع أو المشكلة",
    "form.send": "إرسال الرسالة",
    "form.note": "يرسل هذا النموذج رسالتك مباشرة إلى بريدي.",
    "form.sending": "جار الإرسال...",
    "form.success": "تم إرسال الرسالة. شكرًا لك.",
    "form.error": "حدث خطأ أثناء الإرسال. يمكنك مراسلتي مباشرة عبر البريد.",
  },
};

let currentLanguage = storage.get("portfolio-language") || "en";

const getText = (key) => translations[currentLanguage]?.[key] || translations.en[key] || key;

const applyLanguage = (language) => {
  currentLanguage = translations[language] ? language : "en";
  root.lang = currentLanguage;
  root.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  storage.set("portfolio-language", currentLanguage);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = getText(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", getText(element.dataset.i18nPlaceholder));
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });

  updateThemeLabel();
};

const updateThemeLabel = () => {
  if (!themeToggle || !themeLabel) return;
  const isDark = root.dataset.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeLabel.textContent = getText(isDark ? "theme.light" : "theme.dark");
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  storage.set("portfolio-theme", theme);
  updateThemeLabel();
};

setTheme(storage.get("portfolio-theme") || "light");
applyLanguage(currentLanguage);

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

const setFormState = (state, messageKey) => {
  if (!formStatus) return;
  formStatus.dataset.state = state;
  formStatus.textContent = messageKey ? getText(messageKey) : "";
};

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (!name || !email || !message) {
    contactForm.reportValidity();
    return;
  }

  setFormState("pending", "form.sending");
  submitButton?.setAttribute("disabled", "true");

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Form submission failed");
    }

    contactForm.reset();
    setFormState("success", "form.success");
  } catch {
    setFormState("error", "form.error");
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});

if (prefersReducedMotion.matches) {
  document.body.classList.add("no-motion");
} else {
  root.classList.add("reveal-ready");
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
