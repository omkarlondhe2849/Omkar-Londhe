import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform, useInView } from 'framer-motion';
import { profile, projects, skillCategories, experience, education, achievements, certifications, contact } from '../../data/portfolio';
import './Overlay.css';

/* ═══════════ ANIMATION VARIANTS ═══════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const staggerFast = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
};

/* ═══════════ ANIMATED SECTION WRAPPER ═══════════ */
const AnimatedSection = ({ children, id, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`portfolio-section ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
};

/* ═══════════ SECTION HEADER ═══════════ */
const SectionHeader = ({ label, title }) => (
  <div className="section-header">
    <motion.span variants={fadeUp} className="section-label">{label}</motion.span>
    <motion.h2 variants={fadeUp} className="section-title">{title}</motion.h2>
  </div>
);

/* ═══════════ INTERACTIVE 3D BENTO CARD ═══════════ */
const SkillBentoCard = ({ cat, i }) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [0, 1], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [0, 1], ["-6deg", "6deg"]);
  const background = useMotionTemplate`radial-gradient(circle at calc(${mouseXSpring} * 100%) calc(${mouseYSpring} * 100%), color-mix(in srgb, var(--cat-color) 20%, transparent) 0%, transparent 60%)`;

  return (
    <motion.div
      variants={fadeUp}
      style={{ perspective: 1200 }}
      className={`bento-wrapper bento-${i}`}
    >
      <motion.div
        className="skill-group glass-panel"
        style={{ '--cat-color': cat.color, rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width);
          y.set((e.clientY - rect.top) / rect.height);
        }}
        onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      >
        <motion.div className="bento-spotlight" style={{ background }} />
        <div className="bento-content" style={{ transform: "translateZ(20px)", position: 'relative', zIndex: 2 }}>
          <div className="skill-group-header">
            <span className="sg-icon" style={{ transform: "translateZ(15px)" }}>{cat.icon}</span>
            <span className="sg-name" style={{ transform: "translateZ(10px)" }}>{cat.category}</span>
          </div>
          <motion.div className="skill-pills" variants={staggerFast}>
            {cat.skills.map((skill) => (
              <motion.div key={skill.name} className="skill-pill" variants={scaleIn} style={{ transform: "translateZ(10px)" }}>
                <span className="sp-icon" style={{ display: 'flex', alignItems: 'center' }}>
                  {skill.icon.startsWith('http') ? <img src={skill.icon} alt={skill.name} style={{ width: 22, height: 22, objectFit: 'contain' }} /> : <span style={{ fontSize: 18 }}>{skill.icon}</span>}
                </span>
                <span className="sp-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════ MAIN OVERLAY ═══════════ */
export const Overlay = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Magnetic Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [isHovered, setIsHovered] = useState(false);

  // Section observer for nav active state
  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'skills', 'education', 'experience', 'certifications', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // Cursor tracking
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      const dot = document.querySelector('.magnetic-cursor-dot');
      if (dot) dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="overlay-wrapper">
      {/* Custom Cursor */}
      <motion.div
        className="magnetic-cursor"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          backgroundColor: isHovered ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.06)',
          borderColor: isHovered ? 'rgba(14, 165, 233, 0.5)' : 'rgba(14, 165, 233, 0.3)'
        }}
      />
      <div className="magnetic-cursor-dot" />

      {/* ═══════════ NAVIGATION ═══════════ */}
      <nav className="expert-nav" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          {profile.name}
        </a>
        <div className="nav-pill">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              {activeSection === item.id && (
                <motion.div layoutId="nav-pill-bg" className="nav-pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="nav-right">
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <motion.section
        id="hero"
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeLeft} className="hero-eyebrow">{profile.title}</motion.div>
        <motion.h1 variants={fadeLeft} className="hero-name">
          {profile.name.split(' ')[0]}<br />
          <span className="hero-gradient">{profile.name.split(' ')[1]}</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="hero-tagline">{profile.tagline}</motion.p>
        <motion.div
          variants={fadeUp}
          className="hero-cta"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <a href={contact.github} target="_blank" rel="noreferrer" className="btn-primary">View GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-outline">LinkedIn →</a>
        </motion.div>
        <motion.div variants={fadeUp} className="scroll-indicator">
          <div className="scroll-indicator-line" />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <AnimatedSection id="projects">
        <SectionHeader label="Featured Work" title="Projects" />
        <motion.div className="projects-grid" variants={stagger}>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="project-card glass-panel"
              variants={fadeUp}
              style={{ '--proj-color': proj.color, '--proj-gradient': proj.gradient }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="proj-header">
                <div className="proj-dot" style={{ background: proj.color }} />
                <div>
                  <div className="proj-title">{proj.title}</div>
                  <div className="proj-subtitle">{proj.subtitle}</div>
                </div>
              </div>
              <div className="proj-meta">
                <span className="proj-date">{proj.date}</span>
                <a href={proj.link} target="_blank" rel="noreferrer" className="proj-github" style={{ '--proj-color': proj.color }}>↗ GitHub</a>
              </div>
              <p className="proj-desc">{proj.description}</p>
              <ul className="proj-highlights">
                {proj.highlights.map((h, hi) => (
                  <li key={hi}>
                    <span className="hl-dot" style={{ background: proj.color }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="proj-stack">
                {proj.tech.map((t) => (
                  <span key={t} className="proj-chip" style={{ '--proj-color': proj.color }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* ═══════════ SKILLS ═══════════ */}
      <AnimatedSection id="skills">
        <SectionHeader label="Technical Arsenal" title="Skills" />
        <div className="skills-mosaic">
          {skillCategories.map((cat, i) => (
            <SkillBentoCard key={cat.category} cat={cat} i={i} />
          ))}
        </div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* ═══════════ EDUCATION ═══════════ */}
      <AnimatedSection id="education">
        <SectionHeader label="Academic Journey" title="Education" />
        <motion.div className="timeline-grid" variants={stagger}>
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              className="timeline-card glass-panel"
              variants={fadeUp}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="tl-icon-wrap">{edu.icon}</div>
              <div className="tl-year">{edu.duration}</div>
              <h3 className="tl-degree">{edu.degree}</h3>
              <div className="tl-institution">{edu.institution}</div>
              <div className="tl-location">{edu.location}</div>
              {edu.score && <div className="tl-score">{edu.score}</div>}
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements sub-section */}
        <div style={{ marginTop: 'clamp(48px, 8vh, 80px)' }}>
          <SectionHeader label="Key Highlights" title="Milestones" />
          <motion.div className="achievements-grid" variants={stagger}>
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                className="ach-card glass-panel"
                variants={fadeUp}
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
        </div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <AnimatedSection id="experience">
        <SectionHeader label="Professional Journey" title="Experience" />
        <motion.div className="experience-grid" variants={stagger}>
          {experience.map((exp) => (
            <motion.div
              key={exp.id}
              className="exp-card glass-panel"
              variants={fadeUp}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="exp-icon-wrap">
                <span className="exp-emoji">{exp.icon}</span>
                <span className="lead-date">{exp.duration}</span>
              </div>
              <h3 className="lead-role">{exp.role}</h3>
              <div className="lead-org">{exp.company}</div>
              <p className="lead-desc">{exp.description}</p>
              <ul className="lead-highlights">
                {exp.highlights.map((h, hi) => (
                  <li key={hi}>{h}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* ═══════════ CERTIFICATIONS ═══════════ */}
      <AnimatedSection id="certifications">
        <SectionHeader label="Licenses & Credentials" title="Certifications" />
        <motion.div className="cert-grid" variants={stagger}>
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="cert-card glass-panel"
              variants={fadeUp}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="cert-icon">{cert.icon}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">{cert.issuer}</div>
              <div className="cert-date">{cert.date}</div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* ═══════════ CONTACT ═══════════ */}
      <AnimatedSection id="contact" className="contact-section">
        <motion.div
          className="contact-card glass-panel"
          variants={fadeUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.span variants={fadeUp} className="section-label" style={{ marginBottom: 12 }}>Get In Touch</motion.span>
          <motion.h2 variants={fadeUp} className="section-title" style={{ marginBottom: 16 }}>Let's Connect</motion.h2>
          <motion.p variants={fadeUp} className="contact-sub">
            Open to internships, full-time opportunities, and conversations about technology.
          </motion.p>
          <motion.div className="contact-links" variants={stagger}>
            {[
              { href: `mailto:${contact.email}`, icon: '✉️', main: contact.email, detail: 'Primary email' },
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
                variants={fadeUp}
              >
                <span className="c-icon">{c.icon}</span>
                <div className="c-body">
                  <span className="c-main">{c.main}</span>
                  <span className="c-detail">{c.detail}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React & Three.js.</p>
      </footer>
    </div>
  );
};
