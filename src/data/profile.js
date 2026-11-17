// Single source of truth for the portfolio content.
// Everything here comes from the resume or the public GitHub repositories; edit this file to update the site.

const GH = 'https://github.com/manisha2001-20'
const shot = (repo, file) => `https://raw.githubusercontent.com/manisha2001-20/${repo}/main/docs/screenshots/${file}`

export const profile = {
  name: 'S Manisha Rani Patra',
  shortName: 'Manisha',
  role: 'Artificial Intelligence & Data Science Student',
  roles: ['AI & Data Science Engineer', 'Machine Learning Developer', 'NLP & LLM Enthusiast', 'Full-Stack AI Builder'],
  location: 'Bengaluru, India',
  email: 'manisharanipatra2@gmail.com',
  github: GH,
  linkedin: 'https://www.linkedin.com/in/s-manisha-rani-patra-332bba430/',
  resumeFile: 'resume.pdf', // put the PDF in public/resume.pdf — the button appears only if the file exists
  intro:
    'B.E. student in Artificial Intelligence and Data Science at BMS College of Engineering, Bengaluru. ' +
    'I build machine-learning, NLP and LLM-based systems end to end, from data pipelines and models to APIs and dashboards.',
  about: [
    'I am pursuing a Bachelor of Engineering in Artificial Intelligence and Data Science at BMS College of Engineering, Bengaluru (2023 – 2027).',
    'My work focuses on making AI systems useful and trustworthy: verifying LLM answers against evidence, measuring bias and fairness in language and vision-language models, and turning unstructured data (news feeds, video transcripts, transactions) into insight.',
    'I enjoy building complete projects: Python back ends with FastAPI, data and ML pipelines with pandas and scikit-learn, and interactive dashboards with Streamlit and React, backed by automated tests.',
  ],
}

export const stats = [
  { value: '7+', label: 'Projects on GitHub' },
  { value: '7.38', label: 'CGPA / 10' },
  { value: '3', label: 'Certifications' },
  { value: '2027', label: 'Graduating' },
]

export const skills = [
  { group: 'Programming Languages', icon: '⌨', items: ['Python', 'C'] },
  { group: 'AI & Data Science', icon: '🧠', items: ['Machine Learning', 'NLP', 'Generative AI', 'Data Analysis', 'Model Building'] },
  { group: 'Libraries & Frameworks', icon: '📚', items: ['Pandas', 'NumPy', 'Scikit-learn', 'Sentence Transformers', 'Matplotlib', 'Streamlit'] },
  { group: 'Backend & APIs', icon: '⚙', items: ['FastAPI', 'OpenAI API', 'REST APIs'] },
  { group: 'Databases', icon: '🗄', items: ['PostgreSQL', 'SQLAlchemy', 'DBMS'] },
  { group: 'Graph & NLP', icon: '🕸', items: ['NetworkX', 'Semantic Embeddings', 'Text Clustering'] },
  { group: 'AI Models', icon: '✨', items: ['Qwen', 'DeepSeek', 'Qwen2.5-VL', 'SmolVLM'] },
  { group: 'Web Development', icon: '🌐', items: ['HTML', 'React'] },
  { group: 'Cloud & Tools', icon: '☁', items: ['Docker', 'Docker Compose', 'Render', 'Git / GitHub'] },
]

export const categories = ['All', 'LLM & GenAI', 'Data Science & ML', 'Full-Stack', 'Testing']

export const projects = [
  {
    id: 'trustguard',
    initials: 'TG',
    title: 'TrustGuard: LLM Trust Guard',
    badge: 'Major project',
    categories: ['LLM & GenAI', 'Full-Stack'],
    summary: 'LLM-independent middleware that detects hallucinations and verifies legal facts in LLM answers against Indian statutes before they reach the user.',
    highlights: [
      'Breaks a draft answer into atomic claims and verifies each against authoritative legal evidence',
      'Hybrid retrieval (FAISS + BM25) with an NLI-based verifier; fails closed by withholding answers that do not verify',
      'Corpus of Indian statutes imported from official sources (BNS 2023, BNSS 2023, BSA 2023, Constitution, IT Act, RTI Act)',
    ],
    tech: ['Python', 'FastAPI', 'FAISS', 'BM25', 'NLI', 'Ollama', 'SQLite', 'Streamlit'],
    repo: `${GH}/TrustGuard`,
    image: null,
  },
  {
    id: 'news',
    title: 'Personalized AI News Digest Agent',
    badge: 'Resume project',
    categories: ['LLM & GenAI', 'Full-Stack'],
    summary: 'Multi-agent system that collects RSS and YouTube channel feeds, summarises articles with an LLM, ranks them by interest and builds personalised email digests.',
    highlights: [
      '4 agents: summarization, relevance ranking, personalization (learns from feedback) and email generation',
      '18 real sources including 5 YouTube channel feeds; OpenAI API or any OpenAI-compatible LLM, with an extractive fallback',
      'PostgreSQL via SQLAlchemy (integration-tested on a real PostgreSQL server); Docker Compose and Render blueprint',
    ],
    tech: ['Python', 'OpenAI API', 'PostgreSQL', 'SQLAlchemy', 'FastAPI', 'Docker', 'Render', 'RSS'],
    repo: `${GH}/ai-news-digest-agent`,
    image: shot('ai-news-digest-agent', 'dashboard.png'),
  },
  {
    id: 'bias',
    title: 'Bias Detection & Fairness Evaluation Framework',
    badge: 'Resume project',
    categories: ['LLM & GenAI', 'Data Science & ML'],
    summary: 'Framework and dashboard that measure gender and demographic bias in LLMs and vision-language models, and the fairness of any classifier’s predictions.',
    highlights: [
      'Winogender-style coreference, BOLD-style generation and FairFace vision evaluations with bootstrap CIs and permutation tests',
      'Runs Qwen2.5 and DeepSeek-R1 locally via Ollama; Qwen2.5-VL and SmolVLM adapters for vision',
      'Prompt-based bias mitigation with before/after comparison runs; fairness metrics (demographic parity, disparate impact, equalized odds)',
    ],
    tech: ['Python', 'Qwen', 'DeepSeek', 'Qwen2.5-VL', 'SmolVLM', 'Streamlit', 'Plotly'],
    repo: `${GH}/bias-fairness-evaluation`,
    image: shot('bias-fairness-evaluation', 'classification.png'),
  },
  {
    id: 'learnnet',
    title: 'LearnNet Analyzer: YouTube Educator Network Study',
    badge: 'Resume project',
    categories: ['Data Science & ML', 'Full-Stack'],
    summary: 'NLP system that turns YouTube educational transcripts into a concept network, generates beginner-to-advanced learning paths and scores educators’ pedagogical influence.',
    highlights: [
      'Transcript processing, concept extraction, Sentence-Transformer embeddings and K-means topic clustering',
      'NetworkX concept graph and prerequisite graph (reference-distance method) for cross-channel learning paths',
      'Pedagogical influence scoring and level prediction, served by FastAPI to an interactive React dashboard',
    ],
    tech: ['Python', 'NLP', 'Sentence Transformers', 'Scikit-learn', 'NetworkX', 'FastAPI', 'React'],
    repo: `${GH}/learnnet-analyzer`,
    image: shot('learnnet-analyzer', 'path.png'),
  },
  {
    id: 'fraud',
    title: 'Fraud Detection in Financial Transactions',
    badge: 'Resume project',
    categories: ['Data Science & ML'],
    summary: 'Three-stage fraud detection pipeline combining data analysis and machine learning to flag suspicious transactions, with an interactive dashboard.',
    highlights: [
      'Data profiling and leakage-free feature engineering (velocity, deviation from the customer’s own history)',
      'Rule-based screening, supervised classifiers (LR, Random Forest, Gradient Boosting) and Isolation Forest anomaly detection',
      'Time-based evaluation with PR-AUC, ROC, confusion matrices and an interactive threshold trade-off',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'Plotly'],
    repo: `${GH}/fraud-detection-transactions`,
    image: shot('fraud-detection-transactions', 'models.png'),
  },
  {
    id: 'canteen',
    initials: 'SC',
    title: 'Smart Canteen Management System',
    badge: 'Agentic AI',
    categories: ['LLM & GenAI', 'Full-Stack'],
    summary: 'Agentic AI-based canteen token system: students order from their phone or laptop, get a digital token with an estimated ready time and track preparation live.',
    highlights: [
      'Five cooperating software agents behind a single coordinator agent',
      'Digital tokens, live preparation status and ready notifications',
      'Runs fully offline, with an optional pluggable LLM',
    ],
    tech: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'Multi-agent'],
    repo: `${GH}/smart-canteen-agent`,
    image: null,
  },
  {
    id: 'electricity',
    initials: 'EB',
    title: 'Electricity Bill Calculator using PyTest',
    badge: 'Software testing',
    categories: ['Testing'],
    summary: 'Slab-based electricity bill calculator with a Streamlit dashboard, verified by an automated PyTest suite using positive, negative and boundary-value testing.',
    highlights: [
      'Automated PyTest suite of 210 test cases across ten testing techniques',
      'Code coverage reporting with a built-in testing dashboard',
      'Precise slab, surcharge and tax handling (illustrative academic tariff values)',
    ],
    tech: ['Python', 'PyTest', 'Coverage', 'Streamlit'],
    repo: `${GH}/Electricity_Bill_PyTest_Project`,
    image: null,
  },
]

export const education = [
  {
    degree: 'Bachelor of Engineering in Artificial Intelligence and Data Science',
    school: 'BMS College of Engineering',
    place: 'Bengaluru, India',
    period: '2023 – 2027',
    detail: 'CGPA: 7.38 / 10',
    coursework: ['Machine Learning', 'Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems',
      'Computer Networks', 'Data Analysis', 'Social Network Analytics'],
  },
]

export const certifications = [
  { title: 'Nutanix Hybrid Cloud Fundamentals (NHCF) Online', issuer: 'Nutanix University', date: 'March 2026' },
  { title: 'Deloitte Data Analytics Job Simulation', issuer: 'Forage', date: null },
  { title: 'EY Technology Risk Virtual Job Simulation', issuer: 'Forage', date: null },
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
