export const profile = {
  name: 'Omkar Londhe',
  title: 'Full-Stack Developer & DevOps Engineer',
  tagline: 'Results-driven Computer Engineering student at MIT Academy of Engineering, Alandi, seeking to leverage core competencies in full-stack development, DevOps, and cloud technologies. Proven ability to architect scalable solutions and lead multi-disciplinary teams in high-pressure environments. Aiming to apply strong problem-solving skills and a focus on code quality to contribute to the success of a dynamic, forward-thinking technology organization.',
};

export const education = [
  {
    id: 'edu-1',
    degree: 'B.Tech. in Computer Engineering',
    institution: 'MIT Academy of Engineering',
    location: 'Pune, Maharashtra',
    duration: '2023 – 2027',
    score: 'CGPA: 8.08 / 10',
    icon: '🎓',
  },
  {
    id: 'edu-2',
    degree: '12th HSC',
    institution: 'Dnyantirth International School & Junior College',
    location: 'Ahmednagar',
    duration: '2023',
    score: '78.67%',
    icon: '📘',
  },
  {
    id: 'edu-3',
    degree: '10th SSC',
    institution: "Rayat Shikshan Sanstha's N.S.K.P. Vidyalay",
    location: 'Satral, Rahuri',
    duration: '2021',
    score: '86.60%',
    icon: '📗',
  }
];

export const experience = [
  {
    id: 'exp-1',
    role: 'Super 30 Program — Selected Student',
    company: 'MIT Academy of Engineering',
    duration: '2023 – Present',
    description: 'Selected for MITAOE\'s exclusive Super 30 program for high-performing students.',
    highlights: [
      'Mastered complex problem-solving techniques and full-stack development',
      'Mentored by senior industry veterans with 15+ years experience',
      'Strengthened core competencies in industry-relevant technical practices',
    ],
    icon: '🏆',
  },
  {
    id: 'exp-2',
    role: 'Senior Game Developer & Collaborator',
    company: 'Vertex GDNA Club, MITAOE',
    duration: '2023 – Present',
    description: 'Collaborated with a multidisciplinary team of engineers and technical artists.',
    highlights: [
      'Learned core mechanics and fundamentals of game development',
      'Integrated 3D assets (Blender) with game engines (Godot/Unreal)',
      'Focused on building interactive experiences and game mechanics',
    ],
    icon: '🎮',
  }
];

export const projects = [
  {
    id: 'project-1',
    title: 'MediBook',
    subtitle: 'Full-Stack Healthcare Management System',
    description: 'A highly scalable medical booking platform utilizing Spring Boot and ReactJS to streamline doctor-patient scheduling workflows.',
    tech: ['Java', 'Spring Boot', 'ReactJS', 'MySQL', 'REST APIs', 'Docker', 'Jenkins'],
    link: 'https://github.com/omkarlondhe2849/MediBook',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    date: 'Oct 2025 – Jan 2026',
    highlights: [
      'Containerized with Docker & automated CI/CD pipeline via Jenkins',
      'Ensured strict environment parity, reducing deployment overhead',
      'Administered secure database migrations & persistent storage volumes',
    ],
  },
  {
    id: 'project-2',
    title: 'Mitsuketa',
    subtitle: 'Dual-Mode Media Fingerprinting System',
    description: 'Full-stack media identification system replicating Shazam and YouTube Content ID with 90%+ accuracy on noisy clips.',
    tech: ['Python', 'FastAPI', 'React/Vite', 'PostgreSQL', 'FFmpeg', 'Librosa', 'BK-Trees'],
    link: 'https://github.com/omkarlondhe2849/Mitsuketa',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    date: 'Academic Project',
    highlights: [
      'Dual-mode matching: Constellation Maps (STFT) for audio, pHash for video',
      '53× query speedup via BK-Tree data structure with O(log N) search',
      'Implemented RBAC & achieved 90%+ accuracy on noisy 10-second clips',
    ],
  },
  {
    id: 'project-3',
    title: 'AI Crop Doctor',
    subtitle: 'Agricultural Diagnostic Platform',
    description: 'Mobile-friendly web application serving as an intelligent decision support tool for real-time crop disease detection.',
    tech: ['Python', 'TensorFlow/Keras', 'MobileNetV2', 'Flask', 'HTML/CSS/JS'],
    link: 'https://github.com/omkarlondhe2849',
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    date: 'Academic Project',
    highlights: [
      'Fine-tuned CNN using MobileNet V2 for complex leaf disease classification',
      'Real-time crop disease detection with high precision',
      'User-centric interface providing actionable diagnostic insights',
    ],
  }
];

export const skillCategories = [
  {
    category: 'Languages',
    icon: '💻',
    color: '#0ea5e9',
    skills: [
      { name: 'C++', icon: '⚡' },
      { name: 'Java', icon: '☕' },
      { name: 'Python', icon: '🐍' },
      { name: 'JavaScript', icon: '✨' },
      { name: 'HTML/CSS', icon: '🎨' },
      { name: 'SQL', icon: '🗃️' },
    ]
  },
  {
    category: 'Frameworks & Libraries',
    icon: '🧩',
    color: '#8b5cf6',
    skills: [
      { name: 'Spring Boot', icon: '🍃' },
      { name: 'ReactJS', icon: '⚛️' },
      { name: 'FastAPI', icon: '🚀' },
      { name: 'Flask', icon: '🧪' },
      { name: 'TensorFlow', icon: '🧠' },
    ]
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    color: '#10b981',
    skills: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '⎈' },
      { name: 'Jenkins CI/CD', icon: '⚙️' },
      { name: 'AWS', icon: '☁️' },
    ]
  },
  {
    category: 'Core Competencies',
    icon: '🎯',
    color: '#f43f5e',
    skills: [
      { name: 'DSA', icon: '📊' },
      { name: 'System Design', icon: '🏗️' },
    ]
  },
  {
    category: 'Tools & Version Control',
    icon: '🛠️',
    color: '#f59e0b',
    skills: [
      { name: 'Git', icon: '🔀' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Postman', icon: '📮' },
      { name: 'Linux', icon: '🐧' },
    ]
  }
];

export const skills = skillCategories.flatMap(cat => cat.skills);

export const achievements = [
  {
    id: 'ach-1',
    metric: 'Super 30',
    label: 'Program Selection',
    description: 'Selected for MITAOE\'s exclusive academic training initiative for top-performing students',
    icon: '🏆',
    color: '#f59e0b',
  },
  {
    id: 'ach-4',
    metric: '8.08',
    label: 'CGPA at MITAOE',
    description: 'B.Tech in Computer Engineering at MIT Academy of Engineering, Pune',
    icon: '🎓',
    color: '#0ea5e9',
  },
];

export const contact = {
  email: 'omkarlondhe2849@gmail.com',
  collegeEmail: '202301040027@mitaoe.ac.in',
  github: 'https://github.com/omkarlondhe2849',
  linkedin: 'https://linkedin.com/in/omkar-londhe-4619aa324',
  phone: '+91 8055 439 422'
};
