"use client"
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ExternalLink, 
  Code, 
  Terminal, 
  Cpu, 
  Globe,
  ArrowRight,
  Layout,
  BookOpen,
  GraduationCap
} from 'lucide-react';

/* =============================================================================
   TYPES & INTERFACES
   ============================================================================= */

interface NavLink {
  name: string;
  href: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  icon: ReactNode;
}

interface ThemeColors {
  bg: string;
  text: string;
  textMuted: string;
  primary: string;
  accent: string;
  border: string;
  cardBg: string;
}

interface ThemeStyles {
  nav: string;
  heroTitle: string;
  card: string;
  button: string;
  badge: string;
  sectionTitle: string;
}

interface Theme {
  colors: ThemeColors;
  styles: ThemeStyles;
}

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface NavbarProps {
  activeSection: string;
}

interface ProjectGridProps {
  projects: Project[];
}

/* =============================================================================
   DATA LAYER
   ============================================================================= */

const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const FEATURED_PROJECTS: Project[] = [
  {
    title: "",
    description: "",
    tags: ["React", "Tailwind", "Node.js"],
    link: "#",
    icon: <Globe />
  },
  {
    title: "",
    description: "",
    tags: ["React", "Tailwind", "Node.js"],
    link: "#",
    icon: <Globe />
  },
  {
    title: "",
    description: "",
    tags: ["React", "Tailwind", "Node.js"],
    link: "#",
    icon: <Globe />
  },
];

const SCHOOL_PROJECTS: Project[] = [
  {
    title: "CPU Scheduling FCFS",
    description: "First-Come, First-Served (FCFS) is the simplest and most intuitive CPU scheduling algorithm used in operating systems. As the name suggests, the process that requests the CPU first is allocated the CPU first.",
    tags: ["Nextjs", "Tailwind", "TypeScript"],
    link: "https://cpu-scheduling-fcfs-dusky.vercel.app/",
    icon: <BookOpen />
  },
  
];

const SKILLS: string[] = [
  "JavaScript (ES6+)", "React.js", "TypeScript", "Tailwind CSS", 
  "Node.js", "PostgreSQL", "Git", "UI/UX Design"
];


/* =============================================================================
   MONOCHROME THEME CONSTANTS
   ============================================================================= */

const THEME: Theme = {
  colors: {
    bg: 'bg-black',
    text: 'text-white',
    textMuted: 'text-neutral-500',
    primary: 'text-white',
    accent: 'bg-white text-black',
    border: 'border-neutral-800',
    cardBg: 'bg-neutral-950',
  },
  styles: {
    nav: 'fixed top-0 w-full border-b border-neutral-800 bg-black/90 backdrop-blur-md',
    heroTitle: 'font-mono tracking-tighter',
    card: 'border border-neutral-800 hover:border-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-2',
    button: 'bg-white hover:bg-neutral-200 text-black font-mono rounded-none',
    badge: 'font-mono text-neutral-300 bg-neutral-900 border border-neutral-700',
    sectionTitle: 'font-mono text-white',
  }
};

/* =============================================================================
   UTILITIES & HOOKS
   ============================================================================= */

// Component to handle scroll-triggered animations
const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =============================================================================
   COMPONENTS
   ============================================================================= */

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className={`${THEME.styles.nav} z-50 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className={`flex-shrink-0 font-bold text-lg sm:text-xl ${THEME.colors.primary} tracking-widest uppercase hover:text-neutral-400 transition-colors cursor-pointer`}>
            Johnlee<span className="text-neutral-600">.Jumao-as</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-mono transition-all duration-300 uppercase tracking-wider relative group
                    ${activeSection === link.name.toLowerCase() ? 'text-white' : 'text-neutral-500'}
                    hover:text-white
                  `}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300 ${activeSection === link.name.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${THEME.colors.text} focus:outline-none hover:bg-neutral-900 rounded-sm transition-colors`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-16 left-0 w-full bg-black border-b border-neutral-800 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 text-base font-mono uppercase ${THEME.colors.text} hover:bg-neutral-900 border-l-2 border-transparent hover:border-white transition-all`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className={`min-h-screen flex items-center justify-center pt-16 relative overflow-hidden ${THEME.colors.bg}`}>
      {/* Monochrome Background FX */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/5 rounded-full blur-[100px] md:blur-[150px] animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        <div className="animate-fade-in-up">
          <div className={`inline-block mb-6 mt-8 px-4 py-1 border border-neutral-700 bg-neutral-950/50 backdrop-blur-sm font-mono text-[10px] sm:text-xs tracking-[0.2em] text-neutral-400 uppercase`}>
            System Ready
          </div>
          
          <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 ${THEME.colors.text} ${THEME.styles.heroTitle} leading-none`}>
            JOHNLEE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">JUMAO-AS</span>
          </h1>
          
          <p className={`mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl ${THEME.colors.textMuted} mb-10 leading-relaxed font-light px-4`}>
            Aspiring Full Stack Engineer passionate about building modern web applications. <br className="hidden sm:block"/>
            Fresh perspective. Eager to learn. Ready to build.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
            <a href="#projects" className={`px-8 py-4 ${THEME.styles.button} flex items-center justify-center gap-2 group transition-all hover:scale-105 active:scale-95`}>
              View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </a>
            <a 
              href="#contact" 
              className={`px-8 py-4 flex items-center justify-center gap-2 transition-all border border-neutral-700 text-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-white font-mono rounded-none hover:scale-105 active:scale-95`}
            >
              Contact_Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills: React.FC = () => {
  return (
    <div className="mt-12">
      <h3 className={`text-lg font-semibold mb-6 ${THEME.colors.text} font-mono uppercase tracking-widest text-sm`}>// Tech_Stack</h3>
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill, index) => (
          <RevealOnScroll key={skill} delay={index * 50} className="inline-block">
            <span className={`inline-block px-4 py-2 text-sm ${THEME.styles.badge} hover:bg-white hover:text-black transition-all cursor-default hover:scale-105`}>
              {skill}
            </span>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className={`py-24 ${THEME.colors.bg} border-t border-neutral-900`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className={`text-3xl md:text-5xl mb-8 ${THEME.colors.text} ${THEME.styles.sectionTitle}`}>
                &lt;About /&gt;
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${THEME.colors.textMuted}`}>
                I am a recent graduate passionate about building efficient and scalable web applications. Eager to kickstart my career, I focus on writing clean, maintainable code and constantly expanding my technical skillset.
              </p>
              <p className={`text-lg leading-relaxed mb-8 ${THEME.colors.textMuted}`}>
                As a fresh addition to the tech world, I combine strong academic foundations with hands-on project experience to create functional, user-centric digital solutions.
              </p>
              <Skills />
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square flex items-center justify-center bg-neutral-950 rounded-none border border-neutral-800 group hover:border-white transition-colors duration-500 overflow-hidden">
                <img 
                  src="crop.jpg" 
                  alt="Johnlee Jumao-as" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Decorative corner accents - Added z-10 to stay above image */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white transition-all duration-300 group-hover:w-8 group-hover:h-8 z-10"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white transition-all duration-300 group-hover:w-8 group-hover:h-8 z-10"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white transition-all duration-300 group-hover:w-8 group-hover:h-8 z-10"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white transition-all duration-300 group-hover:w-8 group-hover:h-8 z-10"></div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      <RevealOnScroll key={index} delay={index * 100}>
        <div 
          className={`group flex flex-col p-8 ${THEME.colors.cardBg} ${THEME.styles.card} h-full`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-none bg-black border border-neutral-700 group-hover:bg-white group-hover:text-black transition-colors duration-300`}>
              {/* Note: React.cloneElement is used here to pass generic props, but in TS strict mode we might need type assertions if the icon wasn't ReactNode. Since it is, it's generally fine, but creating a wrapper component is safer in larger apps. */}
              {React.isValidElement(project.icon) ? React.cloneElement(project.icon as React.ReactElement<any>, { 
                className: `w-8 h-8` 
              }) : null}
            </div>
            <a href={project.link} className={`${THEME.colors.textMuted} hover:text-white transition-colors hover:scale-110`} target='_blank'>
              <ExternalLink size={24} />
            </a>
          </div>
          
          <h3 className={`text-2xl font-bold mb-3 ${THEME.colors.text} font-mono group-hover:text-white transition-colors`}>
            {project.title}
          </h3>
          
          <p className={`mb-6 flex-grow ${THEME.colors.textMuted} text-sm leading-relaxed`}>
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 font-mono text-neutral-400 border border-neutral-800 bg-black group-hover:border-neutral-600 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    ))}
  </div>
);

const Projects: React.FC = () => {
  return (
    <section id="projects" className={`py-24 ${THEME.colors.bg} border-t border-neutral-900`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <RevealOnScroll>
          <div className="mb-20">
            <h2 className={`text-3xl md:text-5xl ${THEME.colors.text} ${THEME.styles.sectionTitle}`}>Projects</h2>
            <div className="w-24 h-1 bg-white mt-6"></div>
          </div>
        </RevealOnScroll>

        {/* Featured Projects Section */}
        <div className="mb-20">
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white font-mono text-lg sm:text-xl tracking-wider uppercase border-l-4 border-white pl-4">01. Featured Projects</span>
              <div className="h-[1px] bg-neutral-800 flex-grow"></div>
            </div>
          </RevealOnScroll>
          <ProjectGrid projects={FEATURED_PROJECTS} />
        </div>

        {/* School Projects Section */}
        <div>
          <RevealOnScroll>
            <div className="flex items-center gap-4 mb-8">
               <span className="text-neutral-300 font-mono text-lg sm:text-xl tracking-wider uppercase border-l-4 border-neutral-600 pl-4">02. School Projects</span>
              <div className="h-[1px] bg-neutral-800 flex-grow"></div>
            </div>
          </RevealOnScroll>
          <ProjectGrid projects={SCHOOL_PROJECTS} />
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className={`py-24 ${THEME.colors.bg} border-t border-neutral-900`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <RevealOnScroll>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-white font-mono tracking-tighter">
            INITIATE_CONTACT
          </h2>
          <p className="text-lg sm:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-light">
            Open for new opportunities. Questions or collaborations? Transmit below.
          </p>
          
          <a 
            href="mailto:johnlyyjazzman@gmail.com"
            className={`inline-flex items-center gap-3 px-10 py-5 text-lg font-bold transition-all bg-white hover:bg-neutral-200 text-black font-mono rounded-none hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`}
          >
            <Mail /> Send Transmission
          </a>

          <div className="flex justify-center gap-8 mt-16">
            {[Github, Linkedin, Terminal].map((Icon, i) => (
              <a 
                key={i} 
                href="https://github.com/johnleexd" 
                className="text-neutral-600 hover:text-white hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              >
                <Icon size={32} />
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

/* =============================================================================
   MAIN APP CONTAINER
   ============================================================================= */

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(l => l.name.toLowerCase());
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-black font-sans selection:bg-white selection:text-black`}>
      {/* Global Animations & Styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
      `}</style>

      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-sm bg-black text-neutral-600 border-t border-neutral-900 font-mono">
        <p className="hover:text-white transition-colors cursor-default">
          &copy; 2024 JOHNLEE JUMAO-AS. <span className="hidden sm:inline">All rights reserved.</span>
        </p>
      </footer>
    </div>
  );
};

export default App;