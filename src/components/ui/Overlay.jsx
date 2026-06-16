import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { profile, projects, skillCategories, experience, education, achievements, certifications, contact } from '../../data/portfolio';
import './Overlay.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const leftCardVariants = {
  hidden: { x: -80, opacity: 0 },
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

// Typewriter Component
const TypewriterText = ({ text, className, style, delay = 0 }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: delay } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };
  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }
  };
  return (
    <motion.h2 className={className} variants={container} initial="hidden" animate="visible" exit="exit" style={style}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </motion.span>
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

  return (
    <motion.div
      variants={leftCardVariants}
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
        onMouseLeave={() => { x.set(0.5); y.set(0.5); setIsHovered(false); }}
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
              <motion.div key={skill.name} className="skill-pill" variants={popInVariants} style={{ transform: "translateZ(15px)" }}>
                <span className="sp-icon" style={{ display: 'flex', alignItems: 'center' }}>
                  {skill.icon.startsWith('http') ? <img src={skill.icon} alt={skill.name} style={{ width: 24, height: 24, objectFit: 'contain' }} /> : <span style={{ fontSize: 20 }}>{skill.icon}</span>}
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

// Dynamic Stacked Deck Component
const StackedDeck = ({ items, renderCollapsed, renderExpanded, setIsHovered }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '100%', margin: '0 auto', paddingBottom: '100px' }}>
      {items.map((item, i) => {
        const isHovered = hoveredIndex === i;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <motion.div
            key={i}
            className="glass-panel"
            initial={false}
            animate={{
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.02 : 1,
              zIndex: isHovered ? 50 : i,
              opacity: (isAnyHovered && !isHovered) ? 0.6 : 1,
              marginTop: i === 0 ? 0 : (isHovered ? 10 : (hoveredIndex === i - 1 ? 20 : -15)),
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            style={{ position: 'relative', padding: '16px 24px', cursor: 'none' }}
            onMouseEnter={() => { setHoveredIndex(i); setIsHovered(true); }}
            onMouseLeave={() => { setHoveredIndex(null); setIsHovered(false); }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {renderCollapsed(item, i, isHovered)}
            </div>
            
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(15, 23, 42, 0.1)', overflow: 'hidden' }}
                >
                  {renderExpanded(item, i)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export const Overlay = () => {
  const [activeZone, setActiveZone] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const handleResize = () => maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    const handleScroll = () => {
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const zone = Math.min(Math.floor(progress * 7), 6);
      setActiveZone(prev => prev !== zone ? zone : prev);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      const dot = document.querySelector('.magnetic-cursor-dot');
      if (dot) dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const scrollToZone = (idx) => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (idx / 6) * h, behavior: 'smooth' });
  };

  const zoneLabels = ['Home', 'Projects', 'Skills', 'Education', 'Experience', 'Certifications', 'Contact'];

  return (
    <>
      <motion.div 
        className="magnetic-cursor"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.1)',
          borderColor: isHovered ? 'rgba(14, 165, 233, 0.6)' : 'rgba(14, 165, 233, 0.4)'
        }}
      />
      <div className="magnetic-cursor-dot" />

      {/* Navigation */}
      <nav className="expert-nav">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollToZone(0); }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {profile.name}
        </a>
        <div className="nav-pill" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {zoneLabels.map((label, i) => (
            <button key={label} onClick={() => scrollToZone(i)} className={`nav-item ${activeZone === i ? 'active' : ''}`}>
              {activeZone === i && <motion.div layoutId="nav-pill-bg" className="nav-pill-bg" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
        <div className="nav-right" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </nav>

      <div className="camera-dial" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="dial-center-mark"></div>
        <motion.div className="dial-track" animate={{ y: -(activeZone * 40) }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
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

      <AnimatePresence mode="wait">
        
        {/* ZONE 0: HERO */}
        {activeZone === 0 && (
          <motion.div key="zone0" id="hero-overlay" initial="hidden" animate="visible" exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }} variants={containerVariants}>
            <motion.div variants={downVariants} className="hero-eyebrow">{profile.title}</motion.div>
            <motion.h1 variants={leftCardVariants} className="hero-name">
              {profile.name.split(' ')[0]}<br/><span className="hero-gradient">{profile.name.split(' ')[1]}</span>
            </motion.h1>
            <motion.p variants={leftCardVariants} className="hero-tagline">{profile.tagline}</motion.p>
            <motion.div variants={downVariants} className="hero-cta" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <a href={contact.github} target="_blank" rel="noreferrer" className="btn-primary">View GitHub</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-outline">LinkedIn →</a>
            </motion.div>
          </motion.div>
        )}

        {/* ZONE 1: PROJECTS */}
        {activeZone === 1 && (
          <motion.div key="zone1" id="project-info" className="show" initial="hidden" animate="visible" exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }} variants={containerVariants}>
            <div className="zone-header center">
              <motion.span variants={downVariants} className="zone-label">Featured Work</motion.span>
              <TypewriterText text="Projects" className="zone-title" />
            </div>
            <StackedDeck 
              items={projects}
              setIsHovered={setIsHovered}
              renderCollapsed={(proj) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: proj.color, boxShadow: `0 0 8px ${proj.color}` }} />
                    <h3 className="proj-title" style={{ margin: 0, fontSize: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
                      {proj.title}
                      <span style={{ fontSize: 14, color: proj.color, fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: 'normal' }}>— {proj.subtitle}</span>
                    </h3>
                  </div>
                </>
              )}
              renderExpanded={(proj) => (
                <>
                  <div className="proj-meta" style={{ marginTop: 0 }}>
                    <span className="proj-date">{proj.date}</span>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="proj-github" style={{ '--proj-color': proj.color }}>↗ GitHub</a>
                  </div>
                  <p className="proj-desc">{proj.description}</p>
                  <ul className="proj-highlights" style={{ marginTop: 12 }}>
                    {proj.highlights.map((h, hi) => (
                      <li key={hi}><span className="hl-dot" style={{ background: proj.color }}></span><span>{h}</span></li>
                    ))}
                  </ul>
                  <div className="proj-stack" style={{ marginTop: 16 }}>
                    {proj.tech.map((t) => (<span key={t} className="proj-chip" style={{ '--proj-color': proj.color }}>{t}</span>))}
                  </div>
                </>
              )}
            />
          </motion.div>
        )}

        {/* ZONE 2: SKILLS */}
        {activeZone === 2 && (
          <motion.div key="zone2" id="skills-info" className="show" initial="hidden" animate="visible" exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }} variants={containerVariants}>
            <div className="zone-header center">
              <motion.span variants={downVariants} className="zone-label">Technical Arsenal</motion.span>
              <TypewriterText text="Skills" className="zone-title" />
            </div>
            <div className="skills-mosaic">
              {skillCategories.map((cat, i) => (
                <SkillBentoCard key={cat.category} cat={cat} i={i} setIsHovered={setIsHovered} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ZONE 3: EDUCATION + ACHIEVEMENTS */}
        {activeZone === 3 && (
          <motion.div key="zone3" id="edu-achieve-info" className="show" initial="hidden" animate="visible" exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }} variants={containerVariants}>
            <div className="zone-header center">
              <motion.span variants={downVariants} className="zone-label">Academic Journey</motion.span>
              <TypewriterText text="Education" className="zone-title" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
              <div style={{ width: '100%' }}>
                <StackedDeck 
                  items={education}
                  setIsHovered={setIsHovered}
                  renderCollapsed={(item) => (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 24 }}>🎓</span>
                        <h3 className="tl-degree" style={{ margin: 0, fontSize: 18 }}>{item.degree}</h3>
                      </div>
                      <span className="tl-institution" style={{ margin: 0 }}>{item.institution}</span>
                    </>
                  )}
                  renderExpanded={(item) => (
                    <>
                      <span className="tl-year">{item.duration}</span>
                      <p className="tl-location" style={{ marginTop: 8 }}>{item.location}</p>
                      {item.score && <div className="tl-score" style={{ marginTop: 8 }}>{item.score}</div>}
                    </>
                  )}
                />
              </div>

              <div className="zone-header center">
                <motion.span variants={downVariants} className="zone-label">Key Highlights</motion.span>
                <TypewriterText text="Milestones" className="zone-title" />
              </div>

              <div style={{ width: '100%' }}>
                <StackedDeck 
                  items={achievements}
                  setIsHovered={setIsHovered}
                  renderCollapsed={(item) => (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: 24 }}>{item.icon}</span>
                        <h3 className="tl-degree" style={{ margin: 0, fontSize: 18 }}>{item.metric}</h3>
                      </div>
                      <span className="tl-institution" style={{ margin: 0 }}>{item.label}</span>
                    </>
                  )}
                  renderExpanded={(item) => (
                    <>
                      <p className="tl-location" style={{ marginTop: 8 }}>{item.description}</p>
                    </>
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ZONE 4: EXPERIENCE */}
        {activeZone === 4 && (
          <motion.div key="zone4" id="exp-info" className="show" initial="hidden" animate="visible" exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }} variants={containerVariants}>
            <div className="zone-header center">
              <motion.span variants={downVariants} className="zone-label">Professional Journey</motion.span>
              <TypewriterText text="Experience" className="zone-title" />
            </div>
            <StackedDeck 
              items={experience}
              setIsHovered={setIsHovered}
              renderCollapsed={(exp) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 24 }}>{exp.icon}</span>
                    <h3 className="lead-role" style={{ margin: 0, fontSize: 18 }}>{exp.role}</h3>
                  </div>
                  <span className="lead-org" style={{ margin: 0 }}>{exp.company}</span>
                </>
              )}
              renderExpanded={(exp) => (
                <>
                  <span className="lead-date">{exp.duration}</span>
                  <ul className="lead-highlights" style={{ marginTop: 12 }}>
                    {exp.highlights.map((h, hi) => (<li key={hi}>{h}</li>))}
                  </ul>
                </>
              )}
            />
          </motion.div>
        )}

        {/* ZONE 5: CERTIFICATIONS */}
        {activeZone === 5 && (
          <motion.div key="zone5" id="cert-info" className="show" initial="hidden" animate="visible" exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }} variants={containerVariants}>
            <div className="zone-header center">
              <motion.span variants={downVariants} className="zone-label">Licenses & Credentials</motion.span>
              <TypewriterText text="Certifications" className="zone-title" />
            </div>
            <StackedDeck 
              items={certifications}
              setIsHovered={setIsHovered}
              renderCollapsed={(cert) => (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 24 }}>{cert.icon}</span>
                    <h3 className="proj-title" style={{ margin: 0, fontSize: 18 }}>{cert.title}</h3>
                  </div>
                  <span className="proj-subtitle" style={{ margin: 0 }}>{cert.issuer}</span>
                </>
              )}
              renderExpanded={(cert) => (
                <>
                  <span className="proj-date">{cert.date}</span>
                </>
              )}
            />
          </motion.div>
        )}

        {/* ZONE 6: CONTACT */}
        {activeZone === 6 && (
          <motion.div key="zone6" id="contact-info" className="show" initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }} variants={containerVariants}>
            <motion.div className="contact-card glass-panel" variants={downVariants} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <span className="zone-label" style={{ color: 'var(--color-primary)' }}>The Terminal</span>
              <TypewriterText text="Let's connect" className="zone-title" style={{ marginBottom: '16px' }} />
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
                    key={i} href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noreferrer' : undefined}
                    className="c-link" variants={leftCardVariants}
                  >
                    <span className="c-icon">{c.icon}</span>
                    <div className="c-body"><span className="c-main">{c.main}</span><span className="c-detail">{c.detail}</span></div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scroll-container"></div>
    </>
  );
};
