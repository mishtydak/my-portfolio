"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  ExternalLink,
  FileText,
  Leaf,
  Mail,
  MailCheck,
  MapPin,
  Menu,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  tone: "green" | "orange" | "violet" | "blue" | "pink" | "purple";
  github: string;
  visual:
    | "email"
    | "legal"
    | "shield"
    | "retina"
    | "map"
    | "leaf"
    | "fashion"
    | "pill"
    | "security"
    | "database"
    | "travel";
  label?: string;
}

const projects: Project[] = [
  {
    number: "01",
    category: "Agentic AI",
    title: "Email Organizer",
    description:
      "An agentic AI system that organizes emails, identifies priorities, and streamlines inbox management through intelligent automation.",
    tech: ["Agentic AI", "LLMs", "Automation", "Email Management"],
    tone: "green",
    github: "https://github.com/mishtydak/email-organizer-agent",
    visual: "email",
  },
  {
    number: "02",
    category: "GENERATIVE AI · LEGAL TECH",
    title: "Legal RAG",
    description:
      "A document question-answering system that retrieves relevant legal information to support grounded, evidence-based responses.",
    tech: ["Python", "RAG", "Embeddings", "LLMs"],
    tone: "orange",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/ipc-rag-question-answering",
    visual: "legal",
    label: "RETRIEVE · REASON · RESPOND",
  },
  {
    number: "03",
    category: "AI SECURITY · LLM SAFETY",
    title: "LLM Shield",
    description:
      "A multi-layer defense system designed to protect LLM applications against prompt injection and adversarial attacks.",
    tech: ["Python", "LLMs", "RAG", "AI Security"],
    tone: "violet",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/LLM-Shield",
    visual: "shield",
    label: "FIVE-LAYER DEFENSE",
  },
  {
    number: "04",
    category: "HEALTHCARE AI · COMPUTER VISION",
    title: "OCT AMD Diagnostic Pipeline",
    description:
      "An AI-assisted retinal imaging pipeline for AMD classification, wet/dry subtyping, biomarker analysis, and explainability.",
    tech: ["PyTorch", "EfficientNet", "U-Net++", "Grad-CAM"],
    tone: "blue",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/oct-amd-diagnostic-pipeline",
    visual: "retina",
    label: "MEDICAL IMAGING AI",
  },
  {
    number: "05",
    category: "FULL STACK · TRAVEL TECH",
    title: "Explore Local",
    description:
      "A destination discovery platform bringing together maps, recommendations, media uploads, authentication, and administration.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    tone: "green",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/explore-local-hidden-gems",
    visual: "map",
    label: "DISCOVER YOUR WORLD",
  },
  {
    number: "06",
    category: "MACHINE LEARNING · COMPUTER VISION",
    title: "Plant Disease Classification",
    description:
      "A computer vision project exploring plant disease recognition, model evaluation, augmentation strategies, and error analysis.",
    tech: ["Python", "CNN", "Deep Learning", "Evaluation"],
    tone: "green",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/deep-learning-plant-disease-classification",
    visual: "leaf",
    label: "INTELLIGENT AGRICULTURE",
  },
  {
    number: "07",
    category: "RESEARCH · IMAGE CLASSIFICATION",
    title: "Fashion Classification",
    description:
      "A research project exploring fashion image classification, with its publication acceptance confirmed for ICCCT.",
    tech: ["Python", "Machine Learning", "Classification", "Research"],
    tone: "pink",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/multimodal-fashion-classification",
    visual: "fashion",
    label: "PUBLISHED RESEARCH",
  },
  {
    number: "08",
    title: "Smart Pill Dispenser",
    category: "IoT & Embedded Systems",
    description:
      "An embedded systems project exploring automated medication dispensing through hardware and software integration.",
    tech: ["IoT", "Embedded Systems", "Automation"],
    tone: "blue",
    visual: "pill",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/smart-pill-dispenser-iot",
  },
  {
    number: "09",
    title: "Android Steganalysis",
    category: "Mobile AI & Security",
    description:
      "A project focused on analyzing potential steganographic content, bringing digital image analysis and security concepts to the Android platform.",
    tech: ["Android", "Steganalysis", "Image Processing"],
    tone: "purple",
    visual: "security",
    github:
      "https://github.com/mishtydak/projects/tree/main/third_year/android-image-steganalysis",
  },
  {
    number: "10",
    title: "DBMS Project",
    category: "Database Engineering",
    description:
      "A database-driven application demonstrating data modeling, structured queries, and the fundamentals of reliable data management.",
    tech: ["DBMS", "SQL", "Database Design"],
    tone: "pink",
    visual: "database",
    github:
      "https://github.com/mishtydak/projects/tree/main/second_year/art-gallery-management-dbms",
  },
  {
    number: "11",
    title: "Travel DAA Project",
    category: "Algorithms & Optimization",
    description:
      "A travel-focused project applying algorithm design and analysis to explore computational approaches to travel planning.",
    tech: ["DAA", "Algorithms", "Optimization"],
    tone: "blue",
    visual: "travel",
    github:
      "https://github.com/mishtydak/projects/tree/main/second_year/smart-travel-daa",
  },
];


const skillGroups = [
  {
    title: "Programming Languages",
    skills: [
      "C++",
      "Python",
      "Java",
      "JavaScript",
      "SQL",
    ],
  },
  {
    title: "Frontend Development",
    skills: [
      "React",
      "HTML",
      "CSS",
      "Flutter",
    ],
  },
  {
    title: "Backend Development",
    skills: [
      "Node.js",
      "REST APIs",
      "Express.js",
    ],
  },
  {
    title: "Databases",
    skills: [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    title: "AI / ML",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "LLMs",
      "RAG",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "Android Studio",
      "VS Code",
    ],
  },
];


const achievements = [
  {
    type: "RECOGNITION",
    title: "Best Student Chapter Award",
    organization: "IUCEE · IASF 2025",
    description:
      "Recognized as part of the IUCEE chapter team at the Annual Student Forum in Hyderabad.",
    icon: "trophy",
  },
  {
    type: "HACKATHON",
    title: "CivicLens",
    organization: "Smart India Hackathon 2025",
    description:
      "Developed a civic issue reporting and tracking application featuring geo-tagged complaints, automatic department routing, and real-time tracking.",
    icon: "map-pin",
  },
  {
    type: "LEADERSHIP",
    title: "UI/UX Lead",
    organization: "IUCEE · KLE Technological University Chapter",
    description:
      "Led UI/UX design and branding for technical events; contributed to the chapter receiving the Best Student Chapter Award at IUCEE–IASF 2025.",
    icon: "palette",
  },
];

const researchWorks = [
  {
    title:
      "Automated Detection of Age-Related Macular Degeneration in 3D OCT Scans using Deep Learning",
    status: "AI/ML RESEARCH",
    description:
      "Developed a deep learning pipeline for retinal scan analysis, with an 88% Dice score for segmentation and 96.9% mAP@50 for biomarker detection.",
    tags: ["Deep Learning", "Medical Imaging", "Computer Vision"],
  },
  {
    title: "Multimodal Fashion Classification",
    status: "ICCCT 2026",
    description:
      "Research on multimodal fashion classification, selected for publication at ICCCT 2026.",
    tags: ["Multimodal AI", "Classification", "Research"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["About", "#about"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Milestones", "#achievements"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <Link href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">MD.</span>
          <span>
            PORTFOLIO<span className="brand-dot">/</span>
          </span>
        </Link>

        <div className="nav-links">
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </div>

        <Link href="#contact" className="nav-cta">
          Let&apos;s talk <ArrowUpRight size={15} />
        </Link>

        <button
          className="mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="mobile-menu">
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label} <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const titleText = "Hi, I'm Mishty Dak.";
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayText(titleText.slice(0, index));
      if (index >= titleText.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, 90);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero container">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          AVAILABLE FOR OPPORTUNITIES
        </div>

        <h1 className={`hero-title ${isTyping ? "is-typing" : "is-done"}`}>
          {displayText}
          <span className="type-cursor" aria-hidden="true" />
        </h1>
        <h2>
          <span className="gradient-text">A Growth-Focused Software Engineer</span>
        </h2>
        <p className="hero-description">
          I build AI that goes beyond predictions, systems that reason, adapt,
          and turn complex problems into meaningful solutions. From deep
          learning for medical imaging to agentic AI workflows, I&apos;m driven
          by one core question:{" "}<br></br>
          <strong>How can we make intelligence genuinely useful?</strong>
        </p>

        <div className="hero-actions">
          <Link href="#projects" className="button button-primary">
            Explore my work <ArrowDownRight size={17} />
          </Link>
        </div>

        <div className="hero-meta">
          <span>
            <Code2 size={24} /> AI + Software Engineering
          </span>
          <span className="meta-separator">/</span>
          <span>Curiosity-driven builder</span>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const interests = [
    "Software Engineering",
    "Backend Systems",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Agentic AI",
  ];

  return (
    <section id="about" className="section container">
      <div className="section-heading">
        <span className="section-kicker">01 / ABOUT ME</span>
        <h2>
          Curious by nature.
          <br />
          <span className="muted">Driven to build.</span>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            I&apos;m a Computer Science Engineering student passionate about
            building intelligent, reliable systems that solve real-world problems.
            My interests span AI/ML, backend development, and scalable software design.
          </p>

          <p>
            From exploring computer vision for medical diagnostics to engineering
            autonomous agentic workflows, I thrive on turning research concepts
            into production-ready software.
          </p>

          <div className="about-interests">
            <span className="mini-label">AREAS OF FOCUS</span>
            <div className="interest-list">
              {interests.map((interest) => (
                <span key={interest} className="interest-item">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <Link href="#contact" className="text-link">
            Let&apos;s build something meaningful
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="about-note">
          <span className="note-symbol">✳</span>
          <span className="mini-label">PHILOSOPHY</span>

          <h3>
            Think deeply.
            <br />
            Build intelligently.
            <br />
            <span>Keep evolving.</span>
          </h3>

          <p>Turning curiosity into code, and ideas into tangible impact.</p>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section container">
      <div className="section-heading section-heading-row">
        <div>
          <span className="section-kicker">02 / SELECTED WORK</span>
          <h2>
            Ideas made <span className="gradient-text">real.</span>
          </h2>
        </div>
        <span className="section-side-note">
          AI, research, and software built to address real-world challenges.
        </span>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article
            className={`project-card ${project.tone}`}
            key={project.number}
            onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                window.open(project.github, "_blank", "noopener,noreferrer");
              }
            }}
            role="link"
            tabIndex={0}
          >
            <div className="project-topline">
              <span>{project.number} — PROJECT</span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open repository for ${project.title}`}
                onClick={(event) => event.stopPropagation()}
              >
                <ArrowUpRight size={18} />
              </a>
            </div>

            <div className={`project-art art-${project.visual}`}>
              {project.visual === "shield" && (
                <div className="visual-shield">
                  <div className="shield-core">
                    <BrainCircuit size={42} strokeWidth={1.2} />
                  </div>
                  <div className="shield-layer layer-one" />
                  <div className="shield-layer layer-two" />
                  <div className="shield-layer layer-three" />
                  <span className="visual-caption">INPUT → DEFENSE → OUTPUT</span>
                </div>
              )}

              {project.visual === "pill" && (
                <div className="pill-visual">
                  <div className="pill-box">
                    <span className="pill-cap" />
                    <span className="pill-body">PILL</span>
                  </div>
                  <span className="visual-caption">SMART HEALTH</span>
                </div>
              )}

              {project.visual === "security" && (
                <div className="security-visual">
                  <div className="security-lock">
                    <span className="lock-shine" />
                    <span className="lock-bolt" />
                  </div>
                  <div className="signal-bars">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="visual-caption">SECURE INTELLIGENCE</span>
                </div>
              )}

              {project.visual === "database" && (
                <div className="database-visual">
                  <div className="db-stack">
                    <span className="db-layer db-layer-top" />
                    <span className="db-layer db-layer-mid" />
                    <span className="db-layer db-layer-low" />
                  </div>
                  <div className="db-query">SELECT *</div>
                  <span className="visual-caption">DATA SYSTEMS</span>
                </div>
              )}

              {project.visual === "travel" && (
                <div className="travel-visual">
                  <svg viewBox="0 0 220 130" className="travel-route" aria-hidden="true">
                    <path d="M14 76 C55 40, 78 46, 108 67 S170 110, 206 40" />
                    <path d="M28 108 L84 58 L130 90 L180 34" />
                  </svg>
                  <span className="travel-pin pin-one" />
                  <span className="travel-pin pin-two" />
                  <span className="travel-badge">ROUTE</span>
                  <span className="visual-caption">TRAVEL OPTIMIZATION</span>
                </div>
              )}

              {project.visual === "retina" && (
                <div className="retina-visual">
                  <div className="retina-scan">
                    <div className="retina-layer retina-layer-one" />
                    <div className="retina-layer retina-layer-two" />
                    <div className="retina-layer retina-layer-three" />
                    <span className="scan-crosshair">+</span>
                  </div>
                  <span className="visual-caption">OCT / AI ANALYSIS</span>
                </div>
              )}

              {project.visual === "map" && (
                <div className="map-visual">
                  <svg viewBox="0 0 300 190" className="map-lines" aria-hidden="true">
                    <path d="M-10 45 L90 80 L145 20 L215 65 L310 35" />
                    <path d="M20 200 L65 125 L130 145 L180 90 L270 115 L310 170" />
                    <path d="M80 -10 L105 65 L65 125 L100 205" />
                    <path d="M215 -10 L195 60 L230 130 L205 200" />
                    <path d="M-10 100 L80 95 L155 110 L220 95 L310 100" />
                  </svg>
                  <span className="map-pin pin-one"><span /></span>
                  <span className="map-pin pin-two"><span /></span>
                  <span className="map-pin pin-three"><span /></span>
                  <div className="map-location-card">
                    <MapPin size={14} />
                    <span>Find your next place</span>
                  </div>
                </div>
              )}

              {project.visual === "leaf" && (
                <div className="leaf-visual">
                  <div className="leaf-orbit">
                    <Leaf size={65} strokeWidth={1} />
                  </div>
                  <div className="prediction-chip">
                    <span className="prediction-dot" />
                    IMAGE CLASSIFICATION
                  </div>
                  <span className="visual-caption">PLANT HEALTH AI</span>
                </div>
              )}

              {project.visual === "legal" && (
                <div className="legal-visual">
                  <div className="document-sheet">
                    <FileText size={25} strokeWidth={1.2} />
                    <span className="doc-line doc-line-long" />
                    <span className="doc-line" />
                    <span className="doc-line doc-line-short" />
                    <span className="doc-line doc-line-long" />
                  </div>
                  <ArrowRight className="legal-arrow" size={22} />
                  <div className="answer-sheet">
                    <Sparkles size={23} strokeWidth={1.2} />
                    <span className="answer-line" />
                    <span className="answer-line answer-line-short" />
                    <span className="source-tag">SOURCES FOUND</span>
                  </div>
                  <span className="visual-caption">DOCUMENT → ANSWER</span>
                </div>
              )}

              {project.visual === "fashion" && (
                <div className="fashion-visual">
                  <div className="fashion-tile fashion-tile-one">
                    <Shirt size={35} strokeWidth={1.1} />
                  </div>
                  <div className="fashion-tile fashion-tile-two">
                    <Shirt size={43} strokeWidth={1.1} />
                  </div>
                  <div className="fashion-tile fashion-tile-three">
                    <Shirt size={30} strokeWidth={1.1} />
                  </div>
                  <span className="fashion-label">CLASSIFY / LEARN</span>
                  <span className="visual-caption">RESEARCH PROJECT</span>
                </div>
              )}

              {project.visual === "email" && (
                <div className="fashion-visual">
                  <div className="fashion-tile fashion-tile-one">
                    <MailCheck size={45} strokeWidth={1.1} />
                  </div>
                  <span className="email-label">ORGANIZER /</span>
                  <span className="visual-caption">AGENTIC AI</span>
                </div>
              )}
            </div>

            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="tag-list">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <a
                className="project-link"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="project-footnote">
        {projects.length} featured works spanning Agentic AI, healthcare
        diagnostics, security, research, and full-stack architecture.
      </p>
    </section>
  );
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section container" ref={sectionRef}>
      <div className={`skills-section ${isVisible ? "is-visible" : ""}`}>
        <div className="section-heading">
          <span className="section-kicker">03 / My Skillset</span>
          <h2>
            Core Competencies
            <br />
            <span className="muted">Tools and technologies I use to build.</span>
          </h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <div className="skill-card" key={group.title}>
              <span className="skill-index">0{index + 1}</span>
              <h3>{group.title}</h3>
              <div className="skill-tags">
                {group.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="skill-badge"
                    style={{ animationDelay: `${(index + 1) * 220 + skillIndex * 150}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="skills-note">
          Continually expanding toolkit driven by project demands and technical curiosity.
        </p>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="section container">
      <div className="section-heading">
        <span className="section-kicker">04 / MILESTONES & RESEARCH</span>
        <h2>
          Work worth
          <br />
          <span className="muted">sharing.</span>
        </h2>
      </div>

      <div className="achievement-grid">
        <div className="achievement-column">
          <span className="mini-label">RECOGNITION & LEADERSHIP</span>

          {achievements.map((item) => (
            <article className="achievement-card" key={item.title}>
              <div className="achievement-card-top">
                <span className="achievement-icon">
                  {item.icon === "trophy" && "✳"}
                  {item.icon === "map-pin" && "⌖"}
                  {item.icon === "palette" && "✦"}
                </span>
                <span className="mini-label">{item.type}</span>
              </div>

              <h3>{item.title}</h3>
              <p className="achievement-org">{item.organization}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <div className="research-column">
          <span className="mini-label">RESEARCH & PUBLICATIONS</span>

          {researchWorks.map((item) => (
            <article className="research-card" key={item.title}>
              <span className="research-status">{item.status}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="tag-list">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section container">
      <div className="contact-panel">
        <span className="section-kicker">05 / GET IN TOUCH</span>
        <h2>
          Ready to collaborate? <span className="gradient-text">Let&apos;s talk.</span>
        </h2>
        <p>
          Open to engineering internships, AI research initiatives, and
          collaborations on high-impact software systems.
        </p>

        <a
          className="button button-primary"
          href="mailto:mishtydak2005@gmail.com?subject=Portfolio%20Inquiry"
          aria-label="Send an email to Mishty Dak"
        >
          <Mail size={17} /> Say hello <ArrowUpRight size={16} />
        </a>

        <div className="social-links">
          <a
            href="https://github.com/mishtydak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-letter">GH</span>
            GitHub <ArrowUpRight size={13} />
          </a>

          <a
            href="https://www.linkedin.com/in/mishtydak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-letter">in</span>
            LinkedIn <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer container">
      <Link href="#home" className="brand">
        <span className="brand-mark">MD</span>
        <span>
          BUILT WITH CURIOSITY<span className="brand-dot">.</span>
        </span>
      </Link>
      <Link href="#home" className="back-top">
        Back to top ↑
      </Link>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                               DEFAULT PAGE                                 */
/* -------------------------------------------------------------------------- */

export default function PortfolioPage() {
  return (
    <div className="portfolio-wrapper">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}