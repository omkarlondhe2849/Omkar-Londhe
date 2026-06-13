import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { profile, projects, skillCategories, experience, education, achievements, contact } from '../../data/portfolio';
import './Overlay.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const leftCardVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } }
};

const rightCardVariants = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } }
};

const downVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } }
};

const popInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 15, stiffness: 150 } }
};

// Kinetic Typography Component
const AnimatedTitle = ({ text, className, style }) => {
  return (
    <motion.h2 className={className} variants={containerVariants} style={style}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '4px', marginRight: '8px' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { type: 'spring', damping: 20, stiffness: 100 } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};

// Interactive 3D Bento Card for Skills
const SkillBentoCard = ({ cat, i, setIsHovered }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [0, 1], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-8deg", "8deg"]);
  
  const background = useMotionTemplate`radial-gradient(circle at calc(${mouseXSpring} * 100%) calc(${mouseYSpring} * 100%), color-mix(in srgb, var(--cat-color) 25%, transparent) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={i % 2 === 0 ? leftCardVariants : rightCardVariants}
      style={{ perspective: 1200 }}
      className={`bento-wrapper bento-${i}`}
    >
      <motion.div
        className="skill-group glass-panel"
        style={{ 
          '--cat-color': cat.color,
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        <motion.div className="bento-spotlight" style={{ background }} />
        <div className="bento-content" style={{ transform: "translateZ(30px)", position: 'relative', zIndex: 2 }}>
          <div className="skill-group-header">
            <span className="sg-icon" style={{ transform: "translateZ(20px)" }}>{cat.icon}</span>
            <span className="sg-name" style={{ transform: "translateZ(10px)" }}>{cat.category}</span>
          </div>
          <motion.div className="skill-pills" variants={containerVariants}>
            {cat.skills.map((skill) => (
              <motion.div 
                key={skill.name} 
                className="skill-pill"
                variants={popInVariants}
                style={{ transform: "translateZ(15px)" }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)', borderColor: cat.color, backgroundColor: 'rgba(255,255,255,0.95)' }}
              >
                <span className="sp-icon">{skill.icon}</span>
                <span className="sp-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Overlay = () => {
  const [activeZone, setActiveZone] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Cursor Setup
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const zone = Math.min(Math.floor(progress * 6), 5);
      setActiveZone(zone);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      const dot = document.querySelector('.magnetic-cursor-dot');
      if (dot) {
        dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const scrollToZone = (idx) => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (idx / 5) * h, behavior: 'smooth' });
  };

  const zoneLabels = ['Home', 'Projects', 'Skills', 'Education', 'Milestones', 'Contact'];

  return (
    <>
      {/* ── Magnetic Cursor ── */}
      <motion.div 
        className="magnetic-cursor"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? 'rgba(14, 165, 233, 0.1)' : 'rgba(15, 23, 42, 0.1)',
          borderColor: isHovered ? 'rgba(14, 165, 233, 0.5)' : 'rgba(15, 23, 42, 0.2)'
        }}
      />
      <div className="magnetic-cursor-dot" /> {/* The small center dot handled via CSS pointer-events none */}

      {/* ── Expert Floating Navbar ── */}
      <nav className="expert-nav">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollToZone(0); }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {profile.name}
        </a>
        <div className="nav-pill" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {zoneLabels.map((label, i) => (
            <button key={label} onClick={() => scrollToZone(i)} className={`nav-item ${activeZone === i ? 'active' : ''}`}>
              {activeZone === i && (
                <motion.div layoutId="nav-pill-bg" className="nav-pill-bg" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
              )}
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
        <div className="nav-right" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      {/* ── iPhone Camera Zoom Dial (Right Side) ── */}
      <div className="camera-dial" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="dial-center-mark"></div>
        <motion.div 
          className="dial-track"
          animate={{ y: -(activeZone * 40) }} // 40px gap between items
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {zoneLabels.map((label, i) => {
            const distance = Math.abs(activeZone - i);
            const scale = distance === 0 ? 1.1 : distance === 1 ? 0.85 : 0.65;
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.25;
            return (
              <div key={i} className="dial-item" onClick={() => scrollToZone(i)}>
                <motion.span animate={{ scale, opacity }} className="dial-number">{(i + 1).toString().padStart(2, '0')}</motion.span>
                <motion.div animate={{ width: distance === 0 ? 28 : distance === 1 ? 16 : 8, opacity }} className="dial-tick" />
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* ═══════════ ZONE 0 — HERO ═══════════ */}
      <motion.div 
        id="hero-overlay" 
        className={activeZone === 0 ? '' : 'hide'}
        initial="hidden"
        animate={activeZone === 0 ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div variants={downVariants} className="hero-eyebrow">{profile.title}</motion.div>
        <motion.h1 variants={leftCardVariants} className="hero-name">
          {profile.name.split(' ')[0]}<br/>
          <span className="hero-gradient">{profile.name.split(' ')[1]}</span>
        </motion.h1>
        <motion.p variants={rightCardVariants} className="hero-tagline">{profile.tagline}</motion.p>
        <motion.div variants={downVariants} className="hero-cta" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <a href={contact.github} target="_blank" rel="noreferrer" className="btn-primary">View GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-outline">LinkedIn →</a>
        </motion.div>
        <motion.div variants={popInVariants} className="scroll-hint">
          <div className="scroll-line"></div>
          Scroll to explore
        </motion.div>
      </motion.div>

      {/* ═══════════ ZONE 1 — PROJECTS ═══════════ */}
      <motion.div 
        id="project-info" 
        className={activeZone === 1 ? 'show' : ''}
        initial="hidden"
        animate={activeZone === 1 ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="zone-header">
          <motion.span variants={downVariants} className="zone-label">Featured Work</motion.span>
          <AnimatedTitle text="Projects" className="zone-title" />
        </div>
        <div className="projects-grid">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="proj-card glass-panel"
              variants={i % 2 === 0 ? leftCardVariants : rightCardVariants}
              whileHover={{ y: -10, scale: 1.015, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255,255,255,0.95)' }}
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="proj-gradient-bar" style={{ background: proj.gradient }}></div>
              <div className="proj-meta">
                <span className="proj-date">{proj.date}</span>
                <a href={proj.link} target="_blank" rel="noreferrer" className="proj-github" style={{ '--proj-color': proj.color }}>↗ GitHub</a>
              </div>
              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-subtitle">{proj.subtitle}</p>
              <p className="proj-desc">{proj.description}</p>
              <ul className="proj-highlights">
                {proj.highlights.map((h, hi) => (
                  <li key={hi}><span className="hl-dot" style={{ background: proj.color }}></span><span>{h}</span></li>
                ))}
              </ul>
              <div className="proj-stack">
                {proj.tech.map((t) => (<span key={t} className="proj-chip" style={{ '--proj-color': proj.color }}>{t}</span>))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════ ZONE 2 — SKILLS ═══════════ */}
      <motion.div 
        id="skills-info" 
        className={activeZone === 2 ? 'show' : ''}
        initial="hidden"
        animate={activeZone === 2 ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="zone-header center">
          <motion.span variants={downVariants} className="zone-label">Technical Arsenal</motion.span>
          <AnimatedTitle text="Skills" className="zone-title" />
        </div>
        <div className="skills-mosaic">
          {skillCategories.map((cat, i) => (
            <SkillBentoCard key={cat.category} cat={cat} i={i} setIsHovered={setIsHovered} />
          ))}
        </div>
      </motion.div>

      {/* ═══════════ ZONE 3 — EDUCATION TIMELINE ═══════════ */}
      <motion.div 
        id="edu-info" 
        className={activeZone === 3 ? 'show' : ''}
        initial="hidden"
        animate={activeZone === 3 ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="zone-header center">
          <motion.span variants={downVariants} className="zone-label">Academic Journey</motion.span>
          <AnimatedTitle text="Education" className="zone-title" />
        </div>
        <div className="edu-timeline">
          <div className="timeline-line"></div>
          {education.map((edu, i) => (
            <div key={edu.id} className={`edu-timeline-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'}`}>
              <div className="tl-dot-wrap">
                <div className="tl-dot"></div>
              </div>
              <motion.div 
                className="tl-card glass-panel"
                variants={i % 2 === 0 ? leftCardVariants : rightCardVariants}
                whileHover={{ x: i % 2 === 0 ? -8 : 8, boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)' }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="tl-icon">{edu.icon}</div>
                <span className="tl-year">{edu.duration}</span>
                <h3 className="tl-degree">{edu.degree}</h3>
                <h4 className="tl-institution">{edu.institution}</h4>
                <p className="tl-location">{edu.location}</p>
                <div className="tl-score">{edu.score}</div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════ ZONE 4 — MILESTONES & LEADERSHIP ═══════════ */}
      <motion.div 
        id="achieve-info" 
        className={activeZone === 4 ? 'show' : ''}
        initial="hidden"
        animate={activeZone === 4 ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="achieve-layout">
          {/* Left: Achievements */}
          <motion.div className="achieve-left" variants={leftCardVariants}>
            <div className="zone-header">
              <span className="zone-label">Milestones</span>
              <AnimatedTitle text="Achievements" className="zone-title" />
            </div>
            <motion.div className="ach-stack" variants={containerVariants}>
              {achievements.map((ach) => (
                <motion.div 
                  key={ach.id} 
                  className="ach-card glass-panel" 
                  style={{ '--ach-color': ach.color }}
                  variants={leftCardVariants}
                  whileHover={{ x: 8, boxShadow: '0 16px 44px rgba(15, 23, 42, 0.1)' }}
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="ach-top">
                    <span className="ach-emoji">{ach.icon}</span>
                    <div className="ach-text">
                      <span className="ach-metric">{ach.metric}</span>
                      <span className="ach-label">{ach.label}</span>
                    </div>
                  </div>
                  <p className="ach-desc">{ach.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Training & Leadership */}
          <motion.div className="achieve-right" variants={rightCardVariants}>
            <div className="zone-header">
              <span className="zone-label">Growth</span>
              <AnimatedTitle text="Training & Leadership" className="zone-title" />
            </div>
            <motion.div className="leadership-cards" variants={containerVariants}>
              {experience.map((exp) => (
                <motion.div 
                  key={exp.id} 
                  className="lead-card glass-panel"
                  variants={rightCardVariants}
                  whileHover={{ x: 8, boxShadow: '0 16px 44px rgba(15, 23, 42, 0.08)' }}
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="lead-icon">{exp.icon}</div>
                  <span className="lead-date">{exp.duration}</span>
                  <h3 className="lead-role">{exp.role}</h3>
                  <h4 className="lead-org">{exp.company}</h4>
                  <ul className="lead-highlights">
                    {exp.highlights.map((h, hi) => (<li key={hi}>{h}</li>))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══════════ ZONE 5 — CONTACT ═══════════ */}
      <motion.div 
        id="contact-info" 
        className={activeZone === 5 ? 'show' : ''}
        initial="hidden"
        animate={activeZone === 5 ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="contact-card glass-panel" variants={downVariants}>
          <span className="zone-label" style={{ color: 'var(--color-accent)' }}>The Terminal</span>
          <AnimatedTitle text="Let's connect" className="zone-title" style={{ marginBottom: '12px' }} />
          <p className="contact-sub">Open to internships, full-time opportunities, and conversations about technology.</p>
          <motion.div className="contact-links" variants={containerVariants}>
            {[
              { href: `mailto:${contact.email}`, icon: '✉', main: contact.email, detail: 'Primary email' },
              { href: `mailto:${contact.collegeEmail}`, icon: '🏫', main: contact.collegeEmail, detail: 'College email' },
              { href: `tel:${contact.phone.replace(/\s+/g, '')}`, icon: '📞', main: contact.phone, detail: 'Phone' },
              { href: contact.linkedin, icon: '💼', main: 'LinkedIn Profile', detail: 'Connect professionally', ext: true },
              { href: contact.github, icon: '🐙', main: 'GitHub', detail: 'Projects & code', ext: true },
            ].map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target={c.ext ? '_blank' : undefined}
                rel={c.ext ? 'noreferrer' : undefined}
                className="c-link"
                variants={i % 2 === 0 ? leftCardVariants : rightCardVariants}
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'rgba(14, 165, 233, 0.35)', boxShadow: '0 8px 28px rgba(15, 23, 42, 0.06)' }}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="c-icon">{c.icon}</span>
                <div className="c-body"><span className="c-main">{c.main}</span><span className="c-detail">{c.detail}</span></div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="scroll-container"></div>
    </>
  );
};
