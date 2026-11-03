/* ==========================================================================
   Nur Nasira Binti Naser
   Features: 10+ Modular Vanilla JavaScript Functions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initThemeToggle();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   Feature 2: Mobile Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const nav = document.getElementById('primaryNav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('open');
  });

  // Close nav when clicking links
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   Feature 3: Theme Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('portfolioTheme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeBtn.querySelector('.theme-icon').textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolioTheme', newTheme);
    themeBtn.querySelector('.theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    showToast(`Switched to ${newTheme} mode`);
  });
}

/* --------------------------------------------------------------------------
   Feature 4: Project Filters & Search
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('projectSearch');
  const projectCards = document.querySelectorAll('.project-card');

  function filterProjects() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    projectCards.forEach(card => {
      const category = card.dataset.category;
      const keywords = card.dataset.keywords.toLowerCase();
      const matchesCategory = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = keywords.includes(query) || card.textContent.toLowerCase().includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      e.currentTarget.classList.add('active');
      e.currentTarget.setAttribute('aria-selected', 'true');
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }
}

/* --------------------------------------------------------------------------
   Feature 5: Project Specs Modal Data & Logic
   -------------------------------------------------------------------------- */
const projectDetailsData = [
  {
    title: "AI-Enhanced Multi-Factor Authentication (MFA) System",
    category: "Security & Machine Learning",
    description: "Designed a multi-factor authentication framework integrated with anomaly detection algorithms. The system monitors IP location changes, device fingerprints, and authentication timing metrics to detect credential-stuffing attempts.",
    tech: ["Python", "Flask Framework", "Scikit-learn", "MySQL Database", "REST APIs"],
    highlights: [
      "Mitigates automated brute-force attacks by dynamically triggering OTP verification upon risk calculation.",
      "Achieved sub-200ms verification latency during stress tests.",
      "Integrated secure password hashing using bcrypt and salted entropy."
    ]
  },
  {
    title: "CampusGo Smart E-Scooter System Architecture",
    category: "System Design & Object-Oriented Analysis",
    description: "Formulated complete system architecture for campus micro-mobility. Designed UML diagrams for trip reservation, real-time telemetry updates, battery monitoring, and automated payment gateway processing.",
    tech: ["UML", "Object-Oriented Software Design (OOSD)", "Figma Prototyping", "Use Case Modeling"],
    highlights: [
      "Authored 15+ comprehensive sequence and activity diagrams for edge case handling.",
      "Designed role-based administrative dashboards for fleet management.",
      "Incorporated safety compliance rules for designated campus zones."
    ]
  },
  {
    title: "Volterra X1 Smart EV Dashboard Interface",
    category: "Web Systems & HCI Design",
    description: "Engineered a high-contrast automotive dashboard web interface optimized for highway safety. Includes live battery telemetry, speed indicators, climate controls, and route navigation.",
    tech: ["JavaScript (ES6)", "CSS Grid & Flexbox", "Figma UI/UX", "HCI Usability Guidelines"],
    highlights: [
      "Maintained minimum touch-target dimensions for safe driver interaction.",
      "Responsive across tablet, desktop, and embedded display hardware.",
      "Zero layout defects across screen resolutions."
    ]
  },
  {
    title: "Private 5G Network Infrastructure Deployment Model",
    category: "Network Engineering & Architecture",
    description: "Evaluated private 5G network architectures for industrial logistics container terminals in Miri, Sarawak. Compared standalone private slice deployments against hybrid cloud architectures.",
    tech: ["Private 5G", "TCP/IP Protocol Suite", "DNS/DHCP Administration", "Network Topology Design"],
    highlights: [
      "Analyzed latency requirements (<10ms) for autonomous crane operations.",
      "Mapped security policies for air-gapped network segments.",
      "Formulated failover redundancy protocols for sub-sea backhaul."
    ]
  },
  {
    title: "Student Coursework Planner",
    category: "Web Application Development",
    description: "A lightweight, aesthetic student planner engineered for UNIMAS computing students to track assignment deadlines, lab submissions, and exam dates.",
    tech: ["HTML5", "CSS Custom Properties", "Vanilla JS", "Browser LocalStorage"],
    highlights: [
      "Persistent state management with zero database backend overhead.",
      "Dynamic assignment filter and upcoming deadline countdown.",
      "Clean cream and maroon visual identity."
    ]
  }
];

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modal) return;

  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.project;
      const data = projectDetailsData[index];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <p><strong>Category:</strong> ${data.category}</p>
        <p style="margin-top:10px;">${data.description}</p>
        <h4 style="margin-top:15px; color:var(--maroon-primary);">Core Technologies:</h4>
        <ul style="margin-left:20px; margin-bottom:15px;">
          ${data.tech.map(t => `<li>${t}</li>`).join('')}
        </ul>
        <h4 style="color:var(--maroon-primary);">Key Architectural Highlights:</h4>
        <ul style="margin-left:20px;">
          ${data.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      `;
      modal.removeAttribute('hidden');
    });
  });

  const closeModal = () => modal.setAttribute('hidden', 'true');
  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

/* --------------------------------------------------------------------------
   Feature 8: Real-time Form Validation & Counter
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  const MAX_CHARS = 500;

  // Live character counter under the message box
  const counter = document.createElement('div');
  counter.className = 'char-count';
  counter.textContent = `0 / ${MAX_CHARS}`;
  messageInput.closest('.form-group').appendChild(counter);

  messageInput.addEventListener('input', () => {
    const len = messageInput.value.length;
    counter.textContent = `${len} / ${MAX_CHARS}`;
    counter.style.color = len > MAX_CHARS ? '#c62828' : '';
  });

  function setError(input, msg) {
    const group = input.closest('.form-group');
    let el = group.querySelector('.error-msg');
    if (!el) {
      el = document.createElement('div');
      el.className = 'error-msg';
      group.appendChild(el);
    }
    el.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const email = emailEl.value.trim();
    const message = messageInput.value.trim();

    setError(nameEl, nameEl.value.trim() ? '' : 'Please enter your name.');
    setError(emailEl, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email address.');
    setError(messageInput, message && message.length <= MAX_CHARS ? '' : `Message must be between 1 and ${MAX_CHARS} characters.`);
    if ([...form.querySelectorAll('.error-msg')].some(el => el.textContent)) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
      submitBtn.style.background = '#10b981';
      showToast('Thank you! Your message has been sent.');
      form.reset();
      counter.textContent = `0 / ${MAX_CHARS}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
        submitBtn.style.background = '';
      }, 3000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   Feature 9: Scroll Spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  function update() {
    let current = sections[0].id;
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    // At the very bottom of the page, highlight the last section
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('load', update);
  update();
}

/* --------------------------------------------------------------------------
   Feature 10: Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Utility: Toast Notifications */
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* Utility: click-to-copy cards (address) */
document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-copy]');
  if (!card) return;
  const done = () => showToast('Address copied to clipboard!');
  if (navigator.clipboard) navigator.clipboard.writeText(card.dataset.copy).then(done, done);
  else done();
});
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-copy]')) {
    e.preventDefault();
    e.target.click();
  }
});
