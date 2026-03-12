import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, MapPin, Mail, Phone, Linkedin, Github, 
  Download, ChevronDown, Database, Server, Cloud, 
  BarChart, Activity, Crosshair, Network, Code2, 
  Cpu, Calendar, Award, Terminal, Globe
} from 'lucide-react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Terminal State
  const [history, setHistory] = useState([
    { type: 'system', text: 'Initializing secure connection...' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Scroll Spy for Navbar
      const sections = ['home', 'about', 'skills', 'experience', 'certs', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 300)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Terminal auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `root@contact:~$ ${input}` }];
      
      let response = [];
      switch (cmd) {
        case 'help':
          response = [
            { type: 'output', text: 'Available commands:' },
            { type: 'output', text: '  contact   - Show contact information' },
            { type: 'output', text: '  hire      - Display hiring status' },
            { type: 'output', text: '  clear     - Clear terminal' }
          ];
          break;
        case 'contact':
          response = [
            { type: 'output', text: 'Email: marco@example.com' },
            { type: 'output', text: 'LinkedIn: /in/marcomourad' },
            { type: 'output', text: 'GitHub: /marcomourad' }
          ];
          break;
        case 'hire':
          response = [{ type: 'output', text: 'Status: Available for Red Team & Pentesting engagements.' }];
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          response = [{ type: 'error', text: `bash: ${cmd}: command not found` }];
      }
      
      setHistory([...newHistory, ...response]);
      setInput('');
    }
  };

  return (
    <div id="home" className="min-h-screen bg-[#030712] text-zinc-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#030712] to-[#030712]"></div>
        <InteractiveBackground />
      </div>

      {/* --- Floating Right Monitor (from earlier images) --- */}
      <div className="fixed right-4 top-1/4 z-40 hidden xl:flex flex-col gap-4 w-48 font-mono text-[10px]">
        <MonitorWidget title="CPU" value="45.5%" trend="up" color="text-blue-400" />
        <MonitorWidget title="THROUGHPUT" value="2.3 GB/s" trend="down" color="text-purple-400" />
        <MonitorWidget title="LATENCY" value="16 MS" trend="stable" color="text-emerald-400" />
        <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SYSTEM_SECURE</span>
        </div>
      </div>

      {/* --- Navbar --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030712]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-blue-900/10' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Custom HackSphere Logo */}
          <a href="#home" className="flex items-center gap-2.5 cursor-pointer group">
            {/* Interactive Sphere Icon */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <Globe className="absolute text-blue-500/50 group-hover:text-blue-400 transition-colors animate-[spin_12s_linear_infinite]" size={28} />
              <div className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] animate-pulse"></div>
            </div>
            
            {/* Merged Name Typography */}
            <span className="font-mono text-2xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              HACKSPHERE
            </span>
          </a>
          
          <div className="flex items-center gap-4">
            {/* Pill Navigation */}
            <div className="hidden md:flex items-center p-1 rounded-full border border-white/10 bg-[#0a0f18]/80 text-sm text-zinc-400 font-medium backdrop-blur-md shadow-inner">
              <a href="#about" className={`px-5 py-1.5 rounded-full transition-all duration-300 ${activeSection === 'about' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border border-transparent hover:text-white hover:bg-white/5'}`}>About</a>
              <a href="#skills" className={`px-5 py-1.5 rounded-full transition-all duration-300 ${activeSection === 'skills' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border border-transparent hover:text-white hover:bg-white/5'}`}>Skills</a>
              <a href="#experience" className={`px-5 py-1.5 rounded-full transition-all duration-300 ${activeSection === 'experience' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'border border-transparent hover:text-white hover:bg-white/5'}`}>Exp</a>
              <a href="#certs" className={`px-5 py-1.5 rounded-full transition-all duration-300 ${activeSection === 'certs' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border border-transparent hover:text-white hover:bg-white/5'}`}>Certs</a>
              <a href="#contact" className={`px-5 py-1.5 rounded-full transition-all duration-300 ${activeSection === 'contact' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border border-transparent hover:text-white hover:bg-white/5'}`}>Contact</a>
            </div>
            
            {/* Interactive Radar Button */}
            <a href="#contact" className="relative flex items-center justify-center px-6 py-2 rounded-full bg-[#030712] border border-emerald-500/30 overflow-hidden group hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-105">
              
              {/* Radar Sweep Animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_75%,rgba(16,185,129,0.6)_100%)] opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/20 scale-[0.6]"></div>
              <div className="absolute inset-0 rounded-full border border-emerald-500/10 scale-90"></div>
              
              {/* Dark overlay to make text readable over the radar */}
              <div className="absolute inset-[1px] bg-[#0a0f18]/80 rounded-full backdrop-blur-[2px]"></div>
              
              {/* Target Blip (Ping) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981] animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></div>

              {/* Text & Icon */}
              <span className="relative z-10 font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 pr-2">
                <Crosshair size={14} className="opacity-80 group-hover:animate-[spin_3s_linear_infinite]" />
                Hire Me
              </span>
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pb-20">
        
        {/* 1. Hero Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 min-h-screen flex items-center justify-center pt-24 pb-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
            
            {/* Left Content */}
            <div className="order-2 md:order-1 flex flex-col justify-center">
              
              {/* Terminal Prompt */}
              <div className="inline-flex items-center self-start gap-2 px-4 py-2.5 rounded-lg bg-[#0a0f18]/90 border border-white/5 font-mono text-sm md:text-base mb-8 shadow-lg backdrop-blur-md">
                <span className="text-emerald-500 font-bold">{'>_'}</span> 
                <span className="text-blue-300/80">root@kali:~$</span> 
                <span className="text-emerald-400">whoami</span>
                <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-1"></span>
              </div>

              {/* Security/Cyber Name Styling */}
              <div className="mb-4 relative group cursor-default">
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono text-blue-400 mb-3 uppercase tracking-widest opacity-80">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
                  </span>
                  AUTH_GRANTED // SYSTEM_ROOT
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-white leading-tight">
                  <span className="inline-block whitespace-nowrap">
                    <span className="text-emerald-400 font-mono mr-1 md:mr-2">{'<'}</span>
                    Marco
                  </span>
                  <span className="inline-block whitespace-nowrap ml-2 md:ml-3">
                    Mourad
                    <span className="text-emerald-400 font-mono ml-1 md:ml-2">{'/>'}</span>
                  </span>
                </h1>
              </div>
              
              <div className="font-mono text-blue-400 text-xl md:text-2xl mb-6 flex items-center gap-2">
                Cybersecurity Professional
              </div>
              
              <p className="text-zinc-400 text-sm md:text-base mb-6 font-mono leading-relaxed max-w-lg">
                Architecting secure systems & executing offensive operations. Specializing in Red Teaming and advanced penetration testing.
              </p>

              <div className="flex items-center gap-2 text-zinc-500 text-sm mb-8">
                <MapPin size={16} className="text-purple-400" /> Giza, Egypt
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 mb-8">
                <SocialIcon icon={<Mail size={18} />} />
                <SocialIcon icon={<Phone size={18} />} />
                <SocialIcon icon={<Linkedin size={18} />} />
                <SocialIcon icon={<Github size={18} />} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center gap-2 hover:opacity-90 transition shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:scale-105">
                  Explore My Work <ChevronDown size={18} />
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition hover:text-blue-400 hover:border-blue-400/50">
                  <Download size={18} className="text-emerald-400" /> Download CV
                </button>
              </div>

              {/* Live Pipeline/Operation Status */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3 tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Operation Status
                </div>
                <div className="flex flex-wrap gap-3">
                  <StatusPill icon={<Crosshair size={14} />} title="Recon" desc="OSINT & Enum" />
                  <StatusPill icon={<Server size={14} />} title="Exploit" desc="Payload Delivery" />
                  <StatusPill icon={<Cloud size={14} />} title="PrivEsc" desc="Root Access" />
                  <StatusPill icon={<BarChart size={14} />} title="Reporting" desc="Vuln Mapping" />
                </div>
              </div>
            </div>

            {/* Right Avatar - User Photo Placeholder */}
            <div className="order-1 md:order-2 flex justify-center relative group">
              <div className="relative w-72 h-72 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem]">
                {/* Outer concentric rings */}
                <div className="absolute inset-[-15%] border border-blue-500/20 rounded-full group-hover:border-blue-500/40 transition-colors duration-500"></div>
                <div className="absolute inset-[-7%] border border-purple-500/30 rounded-full border-dashed animate-[spin_60s_linear_infinite] group-hover:border-purple-500/50 transition-colors duration-500"></div>
                
                {/* Main Image Container for User Photo */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/50 p-1 overflow-hidden bg-[#0a0f18] shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-500">
                  {/* 👇👇👇 حط رابط صورتك هنا مكان الرابط ده 👇👇👇 */}
                  <img 
                    src="https://placehold.co/600x600/0a0f18/3b82f6?text=YOUR+PHOTO+HERE" 
                    alt="Marco Mourad" 
                    className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Badges */}
                <div className="absolute top-8 left-0 px-4 py-2 rounded-full bg-[#0a0f18]/90 border border-emerald-500/30 text-emerald-400 text-sm font-mono flex items-center gap-2 backdrop-blur-md shadow-lg">
                  <Activity size={14} /> Active
                </div>
                <div className="absolute bottom-8 right-0 px-5 py-2.5 rounded-full bg-[#0a0f18]/90 border border-purple-500/30 text-purple-400 text-sm font-mono backdrop-blur-md shadow-lg">
                  Red Team Operator
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. System Overview (About) */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader 
            number="01" 
            title="About" 
            main="System" 
            highlight="Overview" 
            func="architect.profile.load()" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
            
            {/* Left Terminal & Edu */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-[#0a0f18] border border-white/5 rounded-2xl p-8 relative shadow-xl">
                {/* Mac OS Dots */}
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                
                <p className="text-zinc-300 leading-relaxed mb-6">
                  I'm a <span className="font-bold text-white">Cybersecurity Professional</span> with hands-on experience designing and executing offensive security operations, vulnerability assessments, and security workflows using <span className="text-blue-400 font-mono">Modern Exploitation Tools</span> and <span className="text-purple-400 font-mono">C/C++</span>.
                </p>
                
                <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                  Trained through rigorous hands-on labs on TryHackMe (Top 5%), completing the <span className="text-white">Junior Penetration Tester</span> path, and continuously tackling advanced real-world scenarios.
                </p>
                
                <p className="text-zinc-400 leading-relaxed text-sm">
                  I focus on building secure architectures, understanding underlying system vulnerabilities, and delivering actionable mitigation strategies that make a real impact.
                </p>
              </div>

              {/* Education Box */}
              <div className="bg-[#0a0f18] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                  <Cpu size={24} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-mono mb-1">Currently pursuing</p>
                  <h4 className="text-white font-bold">B.Sc. in Computer Science</h4>
                  <p className="text-sm text-zinc-400">EELU · Expected 2026</p>
                </div>
              </div>
            </div>

            {/* Right Skills Stack */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <SkillCard 
                icon={<Code2 size={20} className="text-blue-400" />}
                title="Programming Languages"
                desc="Java, Python, C++, SQL"
                badge="DEV_CORE"
                badgeColor="text-blue-400 border-blue-400/30"
              />
              <SkillCard 
                icon={<Shield size={20} className="text-emerald-400" />}
                title="Python Crypto Suite"
                desc="Developed end-to-end encryption tools using AES & RSA algorithms."
                badge="PROJECT"
                badgeColor="text-emerald-400 border-emerald-400/30"
              />
              <SkillCard 
                icon={<Network size={20} className="text-purple-400" />}
                title="Secure Net-Sockets"
                desc="Multi-threaded network communication with encrypted payloads in C++."
                badge="PROJECT"
                badgeColor="text-purple-400 border-purple-400/30"
              />
            </div>

          </div>
        </section>

        {/* 2.5 System Architecture / Skills */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-24 relative">
          
          {/* Subtle Diagonal Line Background Effect */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent transform -translate-x-1/2 -rotate-12 pointer-events-none"></div>

          <SectionHeader 
            number="02" 
            title="Skills" 
            main="System" 
            highlight="Architecture" 
            func="stack.list_modules()" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 relative z-10">
            <ArchitectureCard
              icon={<Code2 size={18} />}
              title="PROGRAMMING"
              colorClass="text-emerald-400"
              skills={['Python', 'Java', 'C++', 'JavaScript', 'Dart', 'SQL', 'Bash']}
            />
            <ArchitectureCard
              icon={<Shield size={18} />}
              title="OFFENSIVE SKILLS"
              colorClass="text-purple-400"
              skills={['Bug Hunting', 'Recon', 'Information Gathering', 'Privilege Escalation', 'Web Exploitation', 'Active Directory']}
            />
            <ArchitectureCard
              icon={<Crosshair size={18} />}
              title="SECURITY TOOLS"
              colorClass="text-blue-400"
              skills={['Nmap', 'Nessus', 'Metasploit', 'Burp Suite', 'Wireshark', 'Hashcat', 'Gobuster']}
            />
            <ArchitectureCard
              icon={<Network size={18} />}
              title="NETWORKING"
              colorClass="text-emerald-400"
              skills={['TCP/IP', 'Cisco Routing & Switching', 'DNS & HTTP/S', 'Firewalls', 'Packet Analysis']}
            />
            <ArchitectureCard
              icon={<Terminal size={18} />}
              title="OPERATING SYSTEMS"
              colorClass="text-purple-400"
              skills={['Kali Linux', 'Ubuntu', 'Windows Server', 'Windows 10/11', 'Android Internals']}
            />
            <ArchitectureCard
              icon={<Cloud size={18} />}
              title="TOOLS & DEVSEC"
              colorClass="text-blue-400"
              skills={['Git / GitHub', 'Docker', 'Sockets API', 'Cryptography', 'Regex']}
            />
          </div>
        </section>

        {/* 3. Experience / Attack Stages */}
        <section id="experience" className="max-w-5xl mx-auto px-6 py-24">
          <SectionHeader 
            number="03" 
            title="Experience" 
            main="Attack" 
            highlight="Stages" 
            func="workflow.execution_history()" 
          />

          <div className="relative mt-16 pl-8 md:pl-12">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50"></div>

            <div className="space-y-12">
              <TimelineNode 
                stage="RECON"
                stageNum="STAGE 1/2"
                title="Junior Penetration Tester"
                org="TryHackMe Platform"
                date="Dec 2024 — Present"
                location="Online (Top 5% Rank)"
                color="blue"
                items={[
                  "Mastered web application security principles aligned with OWASP Top 10.",
                  "Conducted vulnerability assessments and privilege escalation on intentionally vulnerable machines.",
                  "Successfully rooted complex rooms including REloaded and Snowy ARMageddon.",
                  "Applied best practices in vulnerability mapping and exploitation."
                ]}
              />

              <TimelineNode 
                stage="EXPLOITATION"
                stageNum="STAGE 2/2"
                title="Multi-Client Server Architecture"
                org="Software Engineering Project (C++)"
                date="Aug 2024 — Oct 2024"
                location="Cairo, Egypt"
                color="purple"
                items={[
                  "Designed and maintained a multi-threaded server capable of handling multiple client connections.",
                  "Implemented raw TCP/IP Sockets in C++ for secure data transmission.",
                  "Optimized memory management and prevented race conditions using Mutexes.",
                  "Collaborated with peers to deliver a scalable, crash-resistant network application."
                ]}
              />
            </div>
          </div>
        </section>

        {/* 4. Certifications */}
        <section id="certs" className="max-w-4xl mx-auto px-6 py-24">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-emerald-400 font-mono">~/</span>certifications
            </h2>
          </div>

          <div className="space-y-4">
            <CertCard title="Junior Penetration Tester (JPT)" issuer="Offensive Security" status="Certified" />
            <CertCard title="Certified Ethical Hacker (CEH)" issuer="EC-Council" status="Certified" />
            <CertCard title="OWASP Top 10 Specialist" issuer="OWASP Foundation" status="Certified" />
            {/* TryHackMe Status Changed to 'Active' */}
            <CertCard title="TryHackMe - Top 5%" issuer="TryHackMe Platform" status="Active" />
            <CertCard title="CompTIA Security+" issuer="CompTIA" status="Certified" />
          </div>
        </section>

        {/* 5. Contact Terminal */}
        <section id="contact" className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <span className="text-emerald-400 font-mono">~/</span>contact
            </h2>
          </div>

          <div className="w-full bg-[#0a0f18]/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] mb-8">
            {/* Terminal Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                contact.sh
              </div>
              <div className="text-[10px] font-mono text-blue-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                INTERACTIVE
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              className="p-6 md:p-8 font-mono text-sm border-b border-white/5 h-[350px] overflow-y-auto cursor-text bg-transparent"
              onClick={() => document.getElementById('cmd-input').focus()}
            >
              {history.map((line, i) => (
                <div key={i} className={`mb-2 leading-relaxed ${line.type === 'system' ? 'text-emerald-400/80' : line.type === 'user' ? 'text-white' : line.type === 'error' ? 'text-red-400' : 'text-blue-300'}`}>
                  {line.text}
                </div>
              ))}
              
              <div className="flex items-center mt-2">
                <span className="text-emerald-400 mr-2">root@contact:~$</span>
                <input 
                  id="cmd-input"
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none text-blue-300 border-none caret-emerald-500"
                  autoComplete="off"
                  spellCheck="false"
                  autoFocus
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded font-medium flex items-center gap-2 hover:bg-emerald-500/20 transition">
              <Mail size={18} /> Email Me
            </button>
            <button className="px-6 py-3 bg-white/5 text-white border border-white/10 rounded font-medium flex items-center gap-2 hover:bg-white/10 transition hover:text-blue-400 hover:border-blue-400/30">
              <Github size={18} /> GitHub
            </button>
            <button className="px-6 py-3 bg-white/5 text-white border border-white/10 rounded font-medium flex items-center gap-2 hover:bg-white/10 transition hover:text-purple-400 hover:border-purple-400/30">
              <Linkedin size={18} /> LinkedIn
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 font-mono text-xs border-t border-white/5 relative z-10">
        <p>© 2026 · Built with precision · <span className="text-emerald-500">Hack the planet</span></p>
      </footer>

    </div>
  );
}

// --- Sub-components ---

function ArchitectureCard({ icon, title, colorClass, skills }) {
  return (
    <div className="bg-[#0a0f18]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-lg">
      <div className={`flex items-center gap-3 mb-6 font-mono text-sm tracking-widest uppercase ${colorClass}`}>
        {icon}
        {title}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, i) => (
          <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-colors cursor-default">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <a href="#" className="w-10 h-10 rounded-xl border border-white/10 bg-[#0a0f18] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all">
      {icon}
    </a>
  );
}

function StatusPill({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-[#0a0f18]/80 border border-white/5 rounded-xl hover:border-blue-500/30 transition-colors">
      <div className="text-blue-400 p-1.5 bg-blue-500/10 rounded-lg">
        {icon}
      </div>
      <div>
        <div className="text-white text-xs font-bold">{title}</div>
        <div className="text-zinc-500 text-[10px]">{desc}</div>
      </div>
    </div>
  );
}

function SectionHeader({ number, title, main, highlight, func }) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="text-purple-400 font-mono text-sm mb-2">
        // 0{number}. {title}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
        {main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{highlight}</span>
      </h2>
      <div className="text-zinc-500 font-mono text-xs">
        // {func}
      </div>
    </div>
  );
}

function SkillCard({ icon, title, desc, badge, badgeColor }) {
  return (
    <div className="bg-[#0a0f18]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          {icon}
        </div>
        <div>
          <h4 className="text-white font-bold">{title}</h4>
          <p className="text-zinc-500 text-xs mt-1">{desc}</p>
        </div>
      </div>
      <div className={`self-start sm:self-auto px-3 py-1 border rounded-full text-[10px] font-mono tracking-wider ${badgeColor} bg-white/5`}>
        {badge}
      </div>
    </div>
  );
}

function TimelineNode({ stage, stageNum, title, org, date, location, color, items }) {
  const isBlue = color === 'blue' || color === 'cyan';
  const dotColor = isBlue ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]';
  const textColor = isBlue ? 'text-blue-400' : 'text-purple-400';
  const badgeBorder = isBlue ? 'border-blue-500/30 bg-blue-500/10' : 'border-purple-500/30 bg-purple-500/10';

  return (
    <div className="relative w-full">
      {/* Node Dot */}
      <div className={`absolute left-[-32px] md:left-[-48px] top-6 w-3 h-3 rounded-full ${dotColor} transform -translate-x-1/2 z-10`}></div>
      
      {/* Content Box */}
      <div className="w-full bg-[#0a0f18] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all">
        
        {/* Stage Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`px-3 py-1 border rounded-full text-[10px] font-mono tracking-wider ${badgeBorder} ${textColor}`}>
            {stage}
          </div>
          <span className="text-zinc-600 text-xs font-mono">→ {stageNum}</span>
        </div>
        
        {/* Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 mb-2">
              <span className="flex items-center gap-1"><Calendar size={14} className="text-zinc-500" /> {date}</span>
              <span className="flex items-center gap-1"><MapPin size={14} className="text-zinc-500" /> {location}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{title}</h3>
            <div className={textColor}>{org}</div>
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
              <Crosshair size={14} className={`mt-1 shrink-0 ${textColor} opacity-80`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CertCard({ title, issuer, status }) {
  // Adjusted logic for badge colors to include 'Active'
  const isCertified = status === 'Certified';
  const isActive = status === 'Active';
  
  let badgeColor = 'text-zinc-400 border-zinc-400/30 bg-zinc-800/50';
  if (isCertified) {
    badgeColor = 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  } else if (isActive) {
    // Active status gets a blue/cyan color theme
    badgeColor = 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10 animate-pulse';
  }

  return (
    <div className="bg-[#0a0f18]/60 backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-all group">
      <div className="flex items-center gap-4">
        <Award size={24} className="text-amber-500 group-hover:scale-110 transition-transform" />
        <div>
          <h4 className="text-white font-bold text-sm md:text-base">{title}</h4>
          <p className="text-zinc-500 text-xs mt-1">{issuer}</p>
        </div>
      </div>
      <div className={`self-start sm:self-auto px-4 py-1.5 border rounded-md text-xs font-mono ${badgeColor}`}>
        {status}
      </div>
    </div>
  );
}

function MonitorWidget({ title, value, trend, color }) {
  return (
    <div className="bg-[#0a0f18]/80 border border-white/5 rounded-lg p-3 flex justify-between items-center backdrop-blur-sm">
      <div>
        <div className="text-zinc-500 mb-1">{title}</div>
        <div className={`font-bold ${color}`}>{value}</div>
      </div>
      <div className="flex items-end h-6 gap-[2px] opacity-70">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-1 ${color.replace('text-', 'bg-')} ${trend === 'up' ? `h-[${(i+1)*20}%]` : trend === 'down' ? `h-[${100 - (i*15)}%]` : 'h-1/2'}`} style={{ height: `${Math.random() * 100}%` }}></div>
        ))}
      </div>
    </div>
  );
}

function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // كبرنا نطاق استشعار الماوس عشان تأثير الكشاف
    let mouse = { x: null, y: null, radius: 300 }; 
    let scrollY = window.scrollY;
    
    // درجات ألوان السيبر سيكيورتي (أزرق، بنفسجي، زمردي)
    const colors = ['#3b82f6', '#a855f7', '#10b981']; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resize);

    const mouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.size = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.weight = Math.random() * 0.6 + 0.1; // لعمل تأثير العمق مع السكرول
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // خروج النقط من الشاشة ودخولها من الناحية التانية
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        // حساب المكان الفعلي بناءً على الـ Scroll (Parallax)
        let drawY = this.y - (scrollY * this.weight);
        drawY = ((drawY % canvas.height) + canvas.height) % canvas.height;

        let distanceToMouse = 9999;
        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - drawY;
          distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        }

        // تأثير الكشاف: النقط مخفية لحد ما الماوس يقرب
        let opacity = 0.15; // الشفافية الأساسية
        let currentSize = this.size;

        if (distanceToMouse < mouse.radius) {
          const force = 1 - (distanceToMouse / mouse.radius);
          opacity = 0.15 + (force * 0.85); // بتنور لحد 100%
          currentSize = this.size + (force * 1.5); // حجمها بيكبر شوية
        }

        ctx.save();
        ctx.translate(this.x, drawY);

        ctx.globalAlpha = opacity;
        ctx.fillStyle = this.color;
        
        // رسم النقطة (Node)
        ctx.beginPath();
        ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // لو النقطة من النوع الكبير والماوس قريب منها، ارسم حواليها حلقة حماية
        if (this.baseSize > 1.2 && distanceToMouse < mouse.radius * 0.7) {
            ctx.beginPath();
            ctx.arc(0, 0, currentSize * 3.5, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = opacity * 0.4;
            ctx.stroke();
        }

        ctx.restore();
        
        // حفظ الإحداثيات عشان رسم الخطوط
        this.drawY = drawY;
        this.opacity = opacity;
      }
    }

    const initParticles = () => {
      particles = [];
      // زيادة كثافة النقط عشان تدي شكل أعقد
      const numParticles = Math.floor((canvas.width * canvas.height) / 8000); 
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let pA = particles[a];
          let pB = particles[b];
          
          let dx = pA.x - pB.x;
          let dy = pA.drawY - pB.drawY;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 140) {
            // الخطوط بتنور أكتر لو النقط قريبة من الماوس
            let avgOpacity = (pA.opacity + pB.opacity) / 2;
            let lineOpacity = (1 - distance / 140) * avgOpacity * 0.8;

            ctx.beginPath();
            // تدرج لوني للخطوط (Gradient) بين لونين النقطتين
            let grad = ctx.createLinearGradient(pA.x, pA.drawY, pB.x, pB.drawY);
            grad.addColorStop(0, pA.color);
            grad.addColorStop(1, pB.color);
            
            ctx.strokeStyle = grad;
            ctx.globalAlpha = lineOpacity;
            ctx.lineWidth = Math.max(0.2, avgOpacity * 1.5);
            ctx.moveTo(pA.x, pA.drawY);
            ctx.lineTo(pB.x, pB.drawY);
            ctx.stroke();
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(); 
      }
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none">
      {/* Subtle Tech Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{ 
          backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }}>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen" />
    </div>
  );
}