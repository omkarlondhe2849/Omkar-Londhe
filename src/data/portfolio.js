export const profile = {
  name: 'Omkar Londhe',
  title: 'Full-Stack & Game Developer',
  tagline: 'I am a Computer Engineering student at MIT Academy of Engineering, Alandi, specializing in scalable full-stack web applications, automated DevOps pipelines, and immersive game development. With hands-on experience using Godot and Unreal Engine, I enjoy bridging the gap between robust backend architecture and engaging digital experiences. I thrive in collaborative environments, leading multi-disciplinary teams to solve complex problems and craft high-quality, forward-thinking technology solutions.',
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
    id: 'exp-new',
    role: 'Full Stack Development Intern – Spring Application (Java)',
    company: 'Campus Credentials',
    duration: 'Jun 2025 – Jul 2025',
    description: 'Remote live project-based internship focused on full-stack development using Java and Spring Boot.',
    highlights: [
      'Gained hands-on experience through live projects in a real-world development environment',
      'Completed end-to-end full stack development tasks as per industry standards',
      'Collaborated effectively in a remote setting adhering to agile development guidelines',
    ],
    icon: '💼',
  },
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
  },
  {
    id: 'project-4',
    title: 'Vertex',
    subtitle: '2D Wave-Based Action Platformer',
    description: 'A wave-based arena survival game featuring custom finite state machines, dynamic difficulty scaling, and animation-driven combat to fight increasing numbers of enemies.',
    tech: ['Godot Engine 4', 'GDScript'],
    link: 'https://github.com/omkarlondhe2849',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    date: 'Academic Project',
    highlights: [
      'Engineered robust Finite State Machines for player and enemy entity behavior transitions',
      'Implemented responsive enemy AI logic with dynamic scaling for wave difficulty',
      'Synced melee combat hitboxes directly to specific Sprite Animation frames',
    ],
  },
  {
    id: 'project-5',
    title: 'MediBook AWS Cloud Infrastructure',
    subtitle: 'Scalable AWS Architecture & CI/CD',
    description: 'Architected a secure, highly available AWS network topology and automated CI/CD pipeline for the MediBook healthcare platform.',
    tech: ['AWS', 'CloudFormation', 'Terraform', 'Jenkins', 'Docker', 'EC2', 'S3'],
    link: 'https://github.com/omkarlondhe2849/MediBook',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    date: 'Oct 2025 – Jan 2026',
    highlights: [
      'Automated provisioning of MediBook\'s cloud infrastructure using AWS CloudFormation and Terraform',
      'Deployed Dockerized application containers via EC2 and S3, secured by strict IAM policies',
      'Accelerated global content delivery by integrating AWS CloudFront as a CDN',
    ],
  }
];

export const skillCategories = [
  {
    category: 'Languages',
    icon: '💻',
    color: '#0ea5e9',
    skills: [
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    ]
  },
  {
    category: 'Frameworks & Libraries',
    icon: '🧩',
    color: '#8b5cf6',
    skills: [
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'ReactJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
    ]
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    color: '#10b981',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
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
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    ]
  },
  {
    category: 'Game Engines',
    icon: '🎮',
    color: '#14b8a6',
    skills: [
      { name: 'Godot Engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg' },
      { name: 'Unreal Engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg' },
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

export const certifications = [
  {
    id: 'cert-1',
    title: 'Spring Application Development (Java)',
    issuer: 'Campus Credentials',
    date: 'Jul 2025',
    icon: '📜',
    link: '#',
    color: '#10b981',
  }
];

export const contact = {
  email: 'omkarlondhe2849@gmail.com',
  collegeEmail: '202301040027@mitaoe.ac.in',
  github: 'https://github.com/omkarlondhe2849',
  linkedin: 'https://linkedin.com/in/omkar-londhe-4619aa324',
  phone: '+91 8055 439 422'
};
