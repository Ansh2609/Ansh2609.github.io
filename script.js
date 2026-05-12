const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const whoamiBtn = document.getElementById('whoamiBtn');
const whoamiModal = document.getElementById('whoamiModal');
const closeModal = document.getElementById('closeModal');
const skillsTerminal = document.getElementById('skillsTerminal');
const statsGrid = document.getElementById('statsGrid');
const projectsGrid = document.getElementById('projectsGrid');
const typingLine = document.getElementById('typingLine');
const typingLine2 = document.getElementById('typingLine2');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const currentYear = document.getElementById('currentYear');

const skillsEntries = [
  'languages: Python, Java, C/C++, SQL, HTML/CSS, JavaScript, Assembly, Bash',
  'frameworks: React, Node.js, Express.js, Pandas, NumPy, Matplotlib, scikit-learn, OpenGL',
  'tools: Git, GitHub, VS Code, Docker, Linux, Oracle SQL Developer, Vercel',
  'core cs: Data Structures, Algorithms, Object Oriented Programming, Databases, Computer Graphics, Discrete Math, Machine Learning, Software Project Development, Machine Organization & Assembly'
];

const stats = [
  { label: 'Years Building', value: '4+' },
  { label: 'Core Technologies', value: '10+' }
];

const infoSlides = [
  {
    title: 'My Approach',
    points: [
      'Write readable code, not just working code',
      'Morden development workflows',
      'User centered design principles',
      'Understand the problem before writing a line'
    ]
  },
  {
    title: 'Currently Exploring',
    points: [
      'Cybersecurity fundamentals & ethical hacking',
      'Machine learning & data pipelines',
      'Researching how AI can be further integrated into large organizations',
      'Turning side projects into real things'
    ]
  }
];

const projects = [
  {
    title: 'Rocket League Data Analytics',
    desc: 'K-Means & DBSCAN clustering on Rocket League skill shot telemetry, with elbow method tuning, silhouette evaluation, and full visualization pipeline.',
    tags: ['Python', 'Machine Learning', 'Clustering', 'Data Science'],
    githubLink: 'https://github.com/Ansh2609/Rocket-League-Data-Analysis'
  },
  {
    title: 'My-Audio Library Management',
    desc: 'Text-based Java music library app — download songs & audiobooks, manage playlists, and search by title, artist, or genre via CLI.',
    tags: ['Java', 'OOP', 'Data Structures', 'CLI'],
    githubLink: 'https://github.com/Ansh2609/MyAudio-Library-Management'
  },
  {
    title: 'Gridworld Reinforcement Learning – Value & Policy Iteration',
    desc: 'Comparing Value Iteration and Policy Iteration on a stochastic 4x4 Gridworld MDP across deterministic and noisy environments.',
    tags: ['Python', 'Reinforcement Learning', 'Dynamic Programming', 'MDP'],
    githubLink: 'https://github.com/Ansh2609/Gridworld-RL-Value-Policy-Iteration'
  }
];

function toggleMenu() {
  if (!siteNav || !menuToggle) return;
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu() {
  if (!siteNav || !menuToggle) return;
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

function renderSkillsTerminal() {
  if (!skillsTerminal) return;
  skillsTerminal.innerHTML = '';

  skillsEntries.forEach((line, index) => {
    const paragraph = document.createElement('p');
    paragraph.className = 'terminal-line';
    paragraph.style.animationDelay = `${index * 0.12}s`;
    paragraph.textContent = line;
    skillsTerminal.appendChild(paragraph);
  });
}

function toNumberPart(value) {
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function animateCountUp(el, targetValue) {
  const targetNumber = toNumberPart(targetValue);
  if (!targetNumber) {
    el.textContent = targetValue;
    return;
  }

  const suffix = String(targetValue).replace(String(targetNumber), '');
  const durationMs = 900;
  const startTime = performance.now();

  const tick = now => {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const current = Math.floor(progress * targetNumber);
    el.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = targetValue;
    }
  };

  requestAnimationFrame(tick);
}

function renderStatsGrid() {
  if (!statsGrid) return;
  statsGrid.innerHTML = '';

  stats.forEach(stat => {
    const box = document.createElement('article');
    box.className = 'stat-box reveal';

    const strong = document.createElement('strong');
    strong.textContent = '0';
    strong.dataset.target = stat.value;

    const label = document.createElement('span');
    label.textContent = stat.label;

    box.append(strong, label);
    statsGrid.appendChild(box);
  });
}

function renderInfoSlider() {
  const track = document.getElementById('sliderTrack');
  const dots = document.getElementById('sliderDots');
  if (!track || !dots) return;

  track.innerHTML = '';
  dots.innerHTML = '';

  infoSlides.forEach((slide, i) => {
    const el = document.createElement('div');
    el.className = 'slider-slide';
    el.innerHTML = `<h4>${slide.title}</h4><ul>${slide.points.map(p => `<li>${p}</li>`).join('')}</ul>`;
    track.appendChild(el);

    const dot = document.createElement('button');
    dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });

  let current = 0;

  function goToSlide(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  setInterval(() => goToSlide((current + 1) % infoSlides.length), 4000);
}

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.style.transitionDelay = `${index * 0.06}s`;

    const title = document.createElement('h3');
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.textContent = project.desc;

    const children = [title, desc];

    if (project.tags && project.tags.length) {
      const tags = document.createElement('div');
      tags.className = 'project-tags';
      project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        tags.appendChild(span);
      });
      children.push(tags);
    }

    const links = document.createElement('div');
    links.className = 'project-links';
    links.innerHTML = `<a href="${project.githubLink}" target="_blank" rel="noreferrer">GitHub</a>`;
    children.push(links);

    card.append(...children);
    projectsGrid.appendChild(card);
  });

  setupRevealAnimations();
}

function openWhoami() {
  if (!whoamiModal) return;
  whoamiModal.classList.add('open');
  whoamiModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeWhoami() {
  if (!whoamiModal) return;
  whoamiModal.classList.remove('open');
  whoamiModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function setupTypingEffect() {
  if (!typingLine || !typingLine2) return;

  function typeLine(el, text, speed, onDone) {
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i + 1);
      i++;
      if (i < text.length) setTimeout(tick, speed);
      else if (onDone) setTimeout(onDone, 300);
    };
    tick();
  }

  typeLine(typingLine, 'const building = "something new every week";', 38, () => {
    typeLine(typingLine2, 'const nextProject = "TBD — ideas welcome";', 38);
  });
}

function updateScrollUI() {
  const scrollTop = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (backToTop) {
    backToTop.classList.toggle('show', scrollTop > 480);
  }
}

function setupRevealAnimations() {
  const revealNodes = document.querySelectorAll('.reveal:not(.visible)');
  if (!revealNodes.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        const countNode = entry.target.querySelector('strong[data-target]');
        if (countNode && !countNode.dataset.animated) {
          countNode.dataset.animated = 'true';
          animateCountUp(countNode, countNode.dataset.target);
        }

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach(node => observer.observe(node));
}

function setupSectionSpy() {
  const navLinks = document.querySelectorAll('.site-nav a');
  const sections = document.querySelectorAll('main section[id]');

  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          const isMatch = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isMatch);
        });
      });
    },
    {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
}

function toggleFolder() {
  const fileList = document.getElementById('fileList');
  const folder = document.querySelector('.collapsible');
  const isExpanded = folder.getAttribute('aria-expanded') === 'true';
  folder.setAttribute('aria-expanded', !isExpanded);
  fileList.style.display = isExpanded ? 'none' : 'block';
}

function init() {
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  document.querySelectorAll('#siteNav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  if (whoamiBtn) {
    whoamiBtn.addEventListener('click', openWhoami);
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeWhoami);
  }

  window.addEventListener('click', event => {
    if (event.target === whoamiModal) {
      closeWhoami();
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeWhoami();
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', updateScrollUI, { passive: true });

  renderSkillsTerminal();
  renderStatsGrid();
  renderInfoSlider();

  renderProjects();
  setupTypingEffect();
  setupSectionSpy();
  setupRevealAnimations();
  updateScrollUI();
}

init();
