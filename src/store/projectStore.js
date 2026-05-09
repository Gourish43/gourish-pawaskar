// ── PROJECT STORE ──
// ALL projects live in localStorage (seeded on first load).
// No project is "hardcoded" anymore — all are editable via admin.

const STORAGE_KEY   = 'gourish_admin_projects';
const SEEDED_KEY    = 'gourish_store_seeded_v3'; // bump version to re-seed

// ── FULL SEED DATA — all 4 built-in projects with complete section content ──
const SEED_PROJECTS = [
  {
    id: 'trusting-news',
    slug: 'trusting-news',
    to: '/portfolio/trusting-news',
    visual: 'pv-1',
    thumbnail: null,
    tags: ['Mobile App', 'UX Research', 'Figma', 'Agile'],
    title: 'TrustIn News',
    desc: 'A customised regional news and job discovery platform for readers and job seekers. Full end-to-end UX shipped in under 4 months.',
    year: 'Dec 2023 – Mar 2024',
    accentBg: 'linear-gradient(150deg,#F0EEE9 0%,#F7F6F3 70%)',
    heroStats: [
      { val: '<4', label: 'Months to ship' },
      { val: 'Solo', label: 'UX Lead' },
      { val: 'Mobile', label: 'Platform' },
      { val: '2024', label: 'Year' },
    ],
    sections: [
      {
        id: 'tn-overview', type: 'overview', customLabel: '',
        title: 'What is TrustIn News?',
        content: 'TrustIn News is a personalised regional news and job discovery mobile app designed for readers who feel underserved by national-first news aggregators. The platform surfaces hyper-local news stories and district-level job openings in one unified feed — customised by the user\'s language preference, district, and interest topics.\n\nThis was a self-initiated project I led from concept to high-fidelity prototype, managing the full design process under an Agile framework.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'tn-problem', type: 'problem', customLabel: '',
        title: 'What problem were we solving?',
        content: 'Regional news consumers in smaller Indian cities and districts lacked a platform that surfaced genuinely local content alongside relevant job opportunities. Major news apps optimise for national audiences — leaving regional readers with irrelevant feeds and zero job discovery.',
        showHighlight: true, highlightText: 'Core tension: How do we give users control over their feed without overwhelming them with settings — keeping the experience fast and intuitive for on-the-go reading?',
        showBullets: true, bulletPoints: [
          'Existing aggregators are national-first; regional content is buried',
          'No platform combined news + local job openings in one experience',
          'Users in smaller districts felt the news was "not for them"',
          'Job discovery required switching between multiple apps and portals',
        ],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'tn-process', type: 'process', customLabel: '',
        title: 'How I designed it',
        content: 'The project followed a structured, iterative design process managed in Agile sprints.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: true, steps: [
          { num: '01', name: 'Research & Discovery', desc: 'Competitor analysis, empathy mapping, persona creation, and user journey mapping to define the problem space.' },
          { num: '02', name: 'Ideation & Sketching', desc: 'Rapid paper sketches exploring feed customisation models, onboarding flows, and navigation patterns.' },
          { num: '03', name: 'Wireframing', desc: 'Low-fidelity Figma wireframes covering 12 key screens — onboarding, home feed, topic selection, article view, and job discovery.' },
          { num: '04', name: 'High-Fidelity Prototype', desc: 'Full visual design with interaction flows, micro-animations, and responsive layout — optimised for one-handed mobile use.' },
          { num: '05', name: 'User Testing', desc: 'Tested with 6 participants across two personas. Iterated on feed setup flow and job card hierarchy based on feedback.' },
        ],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'tn-outcome', type: 'outcome', customLabel: '',
        title: 'Results & impact',
        content: 'The project generated public interest and demonstrated the viability of a hyperlocal-first news model. The prototype was shared with potential investors and received positive reception for its simplicity and focus on underserved regional audiences.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: true, metrics: [
          { num: '<4', label: 'Months shipped' },
          { num: '12+', label: 'Screens designed' },
          { num: '6', label: 'User tests run' },
          { num: '100%', label: 'Mobile responsive' },
        ],
        showImages: false, images: [],
      },
    ],
    hardcoded: false,
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
  },
  {
    id: 'esg-platform',
    slug: 'esg-platform',
    to: '/portfolio/esg-platform',
    visual: 'pv-2',
    thumbnail: null,
    tags: ['SaaS', 'Agentic AI', 'ESG', 'Figma'],
    title: 'ESG Management Platform',
    desc: 'Agentic AI and Supply Assessment modules for an enterprise ESG SaaS at Sustainext Digital. Concept to production.',
    year: 'Nov 2025 – Present',
    accentBg: 'linear-gradient(160deg,#EAF3DE 0%,#F7F6F3 60%)',
    heroStats: [
      { val: '2', label: 'Modules shipped' },
      { val: '↑', label: 'Client engagement' },
      { val: 'WCAG', label: '2.1 compliant' },
      { val: '2025', label: 'Current role' },
    ],
    sections: [
      {
        id: 'esg-overview', type: 'overview', customLabel: '',
        title: 'The platform',
        content: 'Sustainext Digital\'s ESG management platform helps enterprise clients manage Environmental, Social, and Governance (ESG) reporting obligations through a unified SaaS dashboard. The platform is powered by Agentic AI — a system that autonomously completes multi-step tasks on behalf of users, reducing manual effort in data collection, assessment, and reporting workflows.\n\nI joined as the UI/UX Designer in November 2025 and own end-to-end design across all product modules.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'esg-challenge', type: 'challenge', customLabel: '',
        title: 'The design challenge',
        content: 'ESG compliance is inherently complex — enterprise users deal with fragmented data sources, multi-stakeholder approval chains, and constantly evolving regulatory frameworks.',
        showHighlight: true, highlightText: 'How do you design an AI-driven enterprise platform that feels like it\'s working with users — not on their behalf without their understanding? Agentic AI needed to feel transparent, trustworthy, and controllable.',
        showBullets: true, bulletPoints: [
          'Fragmented workflows across multiple disconnected tools',
          'ESG data collection was largely manual and error-prone',
          'Agentic AI actions needed to be visible, auditable, and reversible',
          'Supply chain assessment required complex multi-party data flows',
          'Diverse enterprise users — from sustainability managers to C-suite executives',
        ],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'esg-role', type: 'role', customLabel: '',
        title: 'What I owned',
        content: '',
        showHighlight: false, highlightText: '',
        showBullets: true, bulletPoints: [
          'Led UX research, ideation, and experience planning for multiple product modules based on PRD requirements',
          'Designed and delivered the Agentic AI module — AI task initiation, progress visibility, action logs, and approval flows',
          'Designed the Supply Assessment system — supplier onboarding flows, questionnaires, scoring dashboards',
          'Created wireframes, user flows, high-fidelity UI designs, interactive prototypes, and responsive dashboards in Figma',
          'Collaborated with developers, PMs, and leadership to align design decisions with business objectives',
        ],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'esg-outcome', type: 'outcome', customLabel: '',
        title: 'Impact delivered',
        content: 'The Agentic AI and Supply Assessment modules were shipped from concept to production. Client engagement and platform adoption increased following launch.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: true, metrics: [
          { num: '2', label: 'Modules shipped' },
          { num: '↑', label: 'Client engagement' },
          { num: '↑', label: 'Platform adoption' },
          { num: 'Faster', label: 'Design delivery' },
        ],
        showImages: false, images: [],
      },
    ],
    hardcoded: false,
    createdAt: 1700000001000,
    updatedAt: 1700000001000,
  },
  {
    id: 'defence-ux',
    slug: 'defence-ux',
    to: '/portfolio/defence-ux',
    visual: 'pv-3',
    thumbnail: null,
    tags: ['Government', 'Defence', 'WCAG 2.1', 'Enterprise'],
    title: 'Defence Platform UX',
    desc: 'End-to-end UI/UX for confidential government and defence platforms at Bharat Electronics Limited. WCAG-compliant, security-first.',
    year: 'Jan – Nov 2025',
    accentBg: 'linear-gradient(150deg,#FAEEDA 0%,#F7F6F3 70%)',
    heroStats: [
      { val: '20%', label: 'Faster handoff' },
      { val: 'WCAG', label: '2.1 compliant' },
      { val: '11', label: 'Months' },
      { val: '2025', label: 'Year' },
    ],
    sections: [
      {
        id: 'bel-context', type: 'overview', customLabel: '',
        title: 'About the project',
        content: 'Bharat Electronics Limited (BEL) is India\'s premier defence electronics company. I joined as a UI/UX Designer on contract through Quantum Asia Pvt. Ltd. from January to November 2025, working on confidential government and defence platforms.\n\nGovernment and defence platforms require a delicate balance of strict security constraints, operational clarity, and accessibility compliance — with no room for ambiguity in the user interface.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'bel-challenge', type: 'challenge', customLabel: '',
        title: 'The design challenge',
        content: '',
        showHighlight: true, highlightText: 'Defence platform users operate under high-stakes, time-constrained conditions. The UI must communicate clearly, load fast, and never mislead — even when the underlying data is complex or incomplete.',
        showBullets: true, bulletPoints: [
          'Strict security and data classification constraints impacted what could be shown and how',
          'Users range from technical operators to administrative staff — very different mental models',
          'WCAG 2.1 accessibility compliance was a non-negotiable requirement across all interfaces',
          'Design-to-dev handoff was slow and causing delays — needed systematic improvement',
          'Legacy patterns existed that needed modernising without disrupting trained user behaviour',
        ],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'bel-outcome', type: 'outcome', customLabel: '',
        title: 'Impact delivered',
        content: 'All platform modules were delivered on time with full WCAG 2.1 compliance. The streamlined handoff process reduced turnaround time by 20%.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: true, metrics: [
          { num: '20%', label: 'Faster dev handoff' },
          { num: 'WCAG', label: '2.1 Compliant' },
          { num: '11', label: 'Months delivered' },
          { num: '↑', label: 'Interface clarity' },
        ],
        showImages: false, images: [],
      },
    ],
    hardcoded: false,
    createdAt: 1700000002000,
    updatedAt: 1700000002000,
  },
  {
    id: 'warehouse-dashboard',
    slug: 'warehouse-dashboard',
    to: '/portfolio/warehouse-dashboard',
    visual: 'pv-4',
    thumbnail: null,
    tags: ['ReactJS', 'Material UI', 'Front-end', 'Internship'],
    title: 'Smart Warehouse Dashboard',
    desc: 'Responsive warehouse management dashboard built during a front-end internship at RDL Technologies.',
    year: 'Jun – Sep 2023',
    accentBg: 'linear-gradient(150deg,#E6F1FB 0%,#F7F6F3 70%)',
    heroStats: [
      { val: '3', label: 'Modules built' },
      { val: 'ReactJS', label: 'Stack' },
      { val: 'Responsive', label: 'Design' },
      { val: '2023', label: 'Year' },
    ],
    sections: [
      {
        id: 'wh-overview', type: 'overview', customLabel: '',
        title: 'About the project',
        content: 'During my front-end development internship at RDL Technologies (June–September 2023), I contributed to the development of a Smart Warehouse Management System — a responsive web dashboard for managing inventory, products, and invoicing in a modern warehouse environment.\n\nThe project was built with ReactJS and Material UI, and required close collaboration between the design and development teams to deliver a consistent, usable interface across all modules.',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'wh-role', type: 'role', customLabel: '',
        title: 'Front-end Developer + Design Collaborator',
        content: '',
        showHighlight: false, highlightText: '',
        showBullets: true, bulletPoints: [
          'Developed responsive dashboard shell and layout architecture using ReactJS',
          'Implemented Material UI component library for consistent design across all views',
          'Collaborated with the design team to improve usability and interface consistency',
          'Contributed to module-level feature development for Inventory, Product Info, and Invoicing',
        ],
        showSteps: false, steps: [{ num: '01', name: '', desc: '' }],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
      {
        id: 'wh-process', type: 'process', customLabel: '',
        title: 'How I worked',
        content: '',
        showHighlight: false, highlightText: '',
        showBullets: false, bulletPoints: [''],
        showSteps: true, steps: [
          { num: '01', name: 'Design Handoff Review', desc: 'Reviewed Figma designs from the design team, flagging implementation concerns and suggesting feasibility improvements.' },
          { num: '02', name: 'Component Development', desc: 'Built reusable React components mapped to Material UI component system — ensuring consistency and maintainability.' },
          { num: '03', name: 'Responsive Implementation', desc: 'Used Material UI responsive grid system to deliver consistent experiences across desktop, tablet, and mobile viewports.' },
          { num: '04', name: 'Usability Collaboration', desc: 'Worked directly with the design team to identify and resolve usability issues discovered during development.' },
        ],
        showMetrics: false, metrics: [{ num: '', label: '' }],
        showImages: false, images: [],
      },
    ],
    hardcoded: false,
    createdAt: 1700000003000,
    updatedAt: 1700000003000,
  },
];

// ── SEED on first load ──
export function seedIfNeeded() {
  if (localStorage.getItem(SEEDED_KEY)) return;
  // Only seed if store is empty or has old hardcoded-flagged entries
  const existing = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  })();
  // Merge: keep any real admin-created projects (non-seed ids), add seeds that don't exist yet
  const seedIds = SEED_PROJECTS.map(p => p.id);
  const nonSeed = existing.filter(p => !seedIds.includes(p.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...SEED_PROJECTS, ...nonSeed]));
  localStorage.setItem(SEEDED_KEY, '1');
}

export function getAllProjects() {
  seedIfNeeded();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : SEED_PROJECTS;
  } catch { return SEED_PROJECTS; }
}

export function getProjectById(id) {
  return getAllProjects().find(p => p.id === id) || null;
}

export function getProjectBySlug(slug) {
  return getAllProjects().find(p => p.slug === slug) || null;
}

export function saveAllProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addProject(project) {
  const existing = getAllProjects();
  saveAllProjects([...existing, project]);
}

export function updateProject(id, updatedProject) {
  const existing = getAllProjects();
  saveAllProjects(existing.map(p => p.id === id ? { ...p, ...updatedProject } : p));
}

export function deleteProject(id) {
  saveAllProjects(getAllProjects().filter(p => p.id !== id));
}

// Legacy aliases used by old components
export const getAdminProjects  = getAllProjects;
export const addAdminProject   = addProject;
export const updateAdminProject = updateProject;
export const deleteAdminProject = deleteProject;
export const HARDCODED_PROJECTS = SEED_PROJECTS;

export function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const SECTION_TYPES = [
  { type: 'overview',      label: 'Overview',       icon: '', desc: 'General project introduction' },
  { type: 'problem',       label: 'Problem',         icon: '', desc: 'Problem statement & context' },
  { type: 'challenge',     label: 'Challenge',       icon: '', desc: 'Design challenges faced' },
  { type: 'research',      label: 'Research',        icon: '', desc: 'User research & findings' },
  { type: 'role',          label: 'My Role',         icon: '', desc: 'Your responsibilities' },
  { type: 'process',       label: 'Design Process',  icon: '', desc: 'Step-by-step process' },
  { type: 'decisions',     label: 'Key Decisions',   icon: '', desc: 'Important design choices' },
  { type: 'design-system', label: 'Design System',   icon: '', desc: 'Design system work' },
  { type: 'outcome',       label: 'Outcome',         icon: '', desc: 'Results & impact metrics' },
  { type: 'learnings',     label: 'Learnings',       icon: '', desc: 'Key takeaways' },
  { type: 'custom',        label: 'Custom Section',  icon: '', desc: 'Your own section name' },
];

export const VISUAL_OPTIONS = [
  { value: 'pv-1', label: 'Warm Beige',  preview: 'linear-gradient(135deg,#C8C4BB,#8C8880)' },
  { value: 'pv-2', label: 'Sage Green',  preview: 'linear-gradient(135deg,#A8C490,#6B9E52)' },
  { value: 'pv-3', label: 'Golden Warm', preview: 'linear-gradient(135deg,#D4B882,#A08848)' },
  { value: 'pv-4', label: 'Sky Blue',    preview: 'linear-gradient(135deg,#7EB0D8,#4880B0)' },
  { value: 'pv-5', label: 'Lavender',    preview: 'linear-gradient(135deg,#B4A8D8,#7860B8)' },
  { value: 'pv-6', label: 'Rose',        preview: 'linear-gradient(135deg,#D8A0A0,#B06868)' },
];
