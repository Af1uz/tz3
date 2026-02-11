import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import * as Lucide from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/** * 1. GLOBAL STATE & MASTER DATA */
const AppContext = createContext();

const MASTER_DATA = {
  uz: {
    nav: [
      { n: 'Loyihalar', h: '#works' }, { n: 'Xizmatlar', h: '#services' }, 
      { n: 'Texno', h: '#tech' }, { n: 'Jamoa', h: '#team' }, { n: 'Narxlar', h: '#pricing' }
    ],
    hero: {
      label: "Nexus Titan v4.0 — Kelajak Arxitektorlari",
      title: "Biz Biznesingizni Raqamli Kosmosga Olib Chiqamiz",
      sub: "Oddiy saytlar davri tugadi. Biz sun'iy intellekt va bulutli texnologiyalar bilan qurollangan ekotizimlar quramiz.",
      cta: "Loyiha Boshlash",
      secondary: "Portfolio"
    },
    tech: {
      title: "Texnologik Stack",
      items: [
        { n: "React 18+", d: "Interaktiv UI/UX", i: "Cpu", info: "Virtual DOM va High-performance render tizimi." },
        { n: "Node.js", d: "Scalable Backend", i: "Terminal", info: "V8 dvigatelida ishlovchi real-time serverlar." },
        { n: "AWS/Azure", d: "Cloud Infrastructure", i: "Cloud", info: "Global serverlar va 99.9% uptime kafolati." },
        { n: "TensorFlow", d: "AI & Machine Learning", i: "Activity", info: "Ma'lumotlar asosida qaror qabul qiluvchi neyron tarmoqlar." },
        { n: "PostgreSQL", d: "Big Data Systems", i: "Database", info: "Murakkab ma'lumotlar strukturasini xavfsiz saqlash." },
        { n: "Docker", d: "Microservices", i: "Layers", info: "Loyihani konteynerlar yordamida tezkor deploy qilish." }
      ]
    },
    portfolio: {
      title: "Tanlangan Ishlar",
      categories: ["Hammasi", "AI", "Web", "Design"],
      items: [
        { id: 1, t: "Neural Bank", c: "AI", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000", detail: "Bank tizimlari uchun firibgarlikni aniqlovchi AI." },
        { id: 2, t: "Crypto Orbit", c: "Web", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000", detail: "Kriptovalyuta birjasi va real-time tahlil paneli." },
        { id: 3, t: "Bio-Link App", c: "Design", img: "https://images.unsplash.com/photo-1614064641935-4475e832923f?q=80&w=1000", detail: "Inson biologik ritmlarini o'lchovchi mobil ilova." },
        { id: 4, t: "Eco-Grid System", c: "Web", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000", detail: "Energiyani aqlli taqsimlovchi Smart-City yechimi." }
      ]
    },
    services: {
      title: "Xizmatlar Matritsasi",
      items: [
        { t: "AI Integratsiya", d: "Biznesingizni avtomatlashtiruvchi aqlli tizimlar.", i: "Zap", full: "Biznes jarayonlarini tahlil qiluvchi va optimallashtiruvchi AI modellari." },
        { t: "Kiber Xavfsizlik", d: "Har qanday hujumga bardosh beruvchi mudofaa.", i: "Shield", full: "Pentesting, Firewall sozlash va ma'lumotlar shifrlanishi." },
        { t: "E-Commerce", d: "Millionlab yuklamalarga chidamli platformalar.", i: "ShoppingBag", full: "To'lov tizimlari, logistika va CRM integratsiyalari." },
        { t: "Mobile App", d: "iOS va Android uchun premium ilovalar.", i: "Smartphone", full: "Native va Hybrid ilovalar ishlab chiqish xizmati." }
      ]
    },
    pricing: {
      title: "Sarmoya Rejalari",
      plans: [
        { id: 'p1', n: "Startup", p: "1,500", f: ["MVP qurish", "UI/UX Design", "1 oy support"], res: "Startup rejasida 2 haftada tayyor bo'ladi." },
        { id: 'p2', n: "Business", p: "4,000", f: ["To'liq Web Tizim", "AI Integratsiya", "3 oy support"], a: true, res: "Eng mashhur tanlov! Barcha AI imkoniyatlar ichida." },
        { id: 'p3', n: "Enterprise", p: "Custom", f: ["Cloud Arxitektura", "24/7 VIP Support"], res: "Katta korporatsiyalar uchun shaxsiy yechimlar." }
      ]
    },
    team: {
      title: "Jamoa",
      members: [
        { n: "Aziz Muratov", r: "Founder & CEO", p: "Sobiq Google Senior Eng.", i: "User" },
        { n: "Shaxlo Karimova", r: "Lead Designer", p: "Apple Design Award Winner", i: "UserCheck" },
        { n: "Doniyor Xakimov", r: "CTO", p: "System Architect", i: "Cpu" }
      ]
    }
  }
};

/** * 2. RESPONSIVE CSS */
const GlobalStyles = () => (
  <style>{`
    @media (max-width: 1024px) {
      nav { padding: 10px 20px !important; }
      .desktop-nav { display: none !important; }
      section { padding: 60px 20px !important; }
    }
    @media (max-width: 768px) {
      /* Matnlarni kichraytirish */
      h1 { font-size: 2.2rem !important; letter-spacing: -1px !important; }
      h2 { font-size: 1.8rem !important; }
      p { font-size: 1rem !important; }
      .hero-label { font-size: 10px !important; letter-spacing: 2px !important; }
      
      /* Gridlarni tartiblash */
      div[style*="display: grid"] { 
        grid-template-columns: 1fr !important; 
        gap: 20px !important;
      }
      
      /* Elementlarni ixchamlashtirish */
      .hero-btns { flex-direction: column; width: 100%; gap: 15px !important; }
      .hero-btns button { width: 100% !important; padding: 18px !important; font-size: 14px !important; }
      
      #contact > div { 
        grid-template-columns: 1fr !important; 
        padding: 30px 15px !important; 
        border-radius: 20px !important;
      }
      #contact h2 { font-size: 2rem !important; }
      
      div[style*="height: 500px"] { height: 300px !important; }
      div[style*="padding: 70px 50px"] { padding: 30px 20px !important; border-radius: 20px !important; }
      div[style*="fontSize: 80px"] { font-size: 45px !important; } /* Stats raqamlari */
      
      .brand-span { font-size: 20px !important; margin: 0 30px !important; }
    }
  `}</style>
);

/** * 3. MAIN CORE */
export default function SupremeNexus() {
  const [lang, setLang] = useState('uz');
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const theme = {
    bg: isDark ? '#050505' : '#ffffff',
    fg: isDark ? '#ffffff' : '#050505',
    card: isDark ? '#0f0f0f' : '#f5f5f5',
    accent: '#FF3E00',
    border: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    muted: isDark ? '#888' : '#666'
  };

  return (
    <AppContext.Provider value={{ lang, setLang, isDark, setIsDark, theme }}>
      <GlobalStyles />
      <div style={{ background: theme.bg, color: theme.fg, minHeight: '100vh', transition: '0.4s', overflowX: 'hidden' }}>
        <motion.div style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: theme.accent, zIndex: 10001, transformOrigin: '0%' }} />
        
        <Navbar />
        
        <main>
          <Hero />
          <BrandMarquee />
          <StatsCounter />
          <Portfolio />
          <Technology />
          <Services />
          <Pricing />
          <Team />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

/** * 4. TYPOGRAPHY SYSTEM */
const Typography = ({ variant, children, style, ...props }) => {
  const { theme } = useContext(AppContext);
  const tags = {
    h1: { fontSize: 'clamp(2.5rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-3px' },
    h2: { fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1.5px' },
    h3: { fontSize: '1.5rem', fontWeight: 700 },
    p: { fontSize: '1.1rem', color: theme.muted, lineHeight: 1.5 },
    label: { fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: theme.accent }
  };
  const Tag = variant.startsWith('h') ? variant : (variant === 'label' ? 'span' : 'p');
  const className = variant === 'label' ? 'hero-label' : '';
  return <Tag className={className} style={{ ...tags[variant], ...style }} {...props}>{children}</Tag>;
};

/** * 5. NAVBAR COMPONENT */
const Navbar = () => {
  const { theme, isDark, setIsDark, lang } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 10000, 
      padding: scrolled ? '10px 20px' : '20px 20px',
      background: scrolled ? (isDark ? 'rgba(5,5,5,0.9)' : 'rgba(255,255,255,0.9)') : 'transparent',
      backdropFilter: 'blur(10px)', borderBottom: scrolled ? `1px solid ${theme.border}` : 'none', 
      transition: '0.3s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
        <Lucide.Zap fill={theme.accent} color={theme.accent} size={24} style={{marginRight: '8px'}} /> NEXUS
      </div>
      
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <div className="desktop-nav" style={{ display: 'flex', gap: '25px' }}>
          {MASTER_DATA[lang].nav.map(i => (
            <motion.a whileHover={{color: theme.accent}} key={i.n} href={i.h} style={{ textDecoration: 'none', color: theme.fg, fontSize: '13px', fontWeight: 700 }}>
              {i.n}
            </motion.a>
          ))}
        </div>
        <button onClick={() => setIsDark(!isDark)} style={{ background: 'none', border: 'none', color: theme.fg, cursor: 'pointer', display: 'flex' }}>
          {isDark ? <Lucide.Sun size={20} /> : <Lucide.Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

/** * 6. HERO SECTION */
const Hero = () => {
  const { lang, theme } = useContext(AppContext);
  const [heroAction, setHeroAction] = useState(false);
  const t = MASTER_DATA[lang].hero;

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 20px 40px' }}>
      <div className="hero-content" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <motion.div data-aos="fade-up">
          <Typography variant="label">{t.label}</Typography>
          <Typography variant="h1" style={{ marginTop: '20px', maxWidth: '900px' }}>{t.title}</Typography>
          <Typography variant="p" style={{ marginTop: '30px', maxWidth: '650px' }}>{t.sub}</Typography>
          
          <div className="hero-btns" style={{ display: 'flex', gap: '20px', marginTop: '50px', alignItems: 'center' }}>
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setHeroAction(true)}
              style={{ padding: '20px 40px', background: theme.accent, color: '#fff', border: 'none', fontWeight: 900, fontSize: '15px', cursor: 'pointer', borderRadius: '4px' }}>
              {t.cta}
            </motion.button>
            
            {heroAction && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontWeight: 700, color: theme.accent, fontSize: '14px' }}>
                Navbatga qo'shildi! <Lucide.Check size={16} style={{verticalAlign:'middle'}}/>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/** * 7. BRAND MARQUEE */
const BrandMarquee = () => {
  const brands = ["GOOGLE", "AMAZON", "NETFLIX", "META", "APPLE", "SAMSUNG", "NVIDIA", "OPENAI"];
  const { theme } = useContext(AppContext);
  return (
    <div style={{ padding: '50px 0', overflow: 'hidden', whiteSpace: 'nowrap', borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
      <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} style={{ display: 'inline-block' }}>
        {[...brands, ...brands].map((b, i) => (
          <span className="brand-span" key={i} style={{ fontSize: '35px', fontWeight: 900, margin: '0 60px', opacity: 0.1, letterSpacing: '4px' }}>{b}</span>
        ))}
      </motion.div>
    </div>
  );
};

/** * 8. STATS COUNTER */
const StatsCounter = () => {
  const { theme } = useContext(AppContext);
  const [clickedStat, setClickedStat] = useState(null);
  const stats = [{ v: "500+", l: "Loyihalar" }, { v: "12", l: "Yillik" }, { v: "99%", l: "Natija" }];
  
  return (
    <div style={{ padding: '80px 20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px' }}>
      {stats.map((s, i) => (
        <motion.div 
          key={i} onClick={() => setClickedStat(i)}
          style={{ textAlign: 'center', cursor: 'pointer', flex: '1 1 200px' }}>
          <div style={{ fontSize: '70px', fontWeight: 900, color: clickedStat === i ? '#00FF41' : theme.accent }}>{s.v}</div>
          <Typography variant="label">{s.l}</Typography>
        </motion.div>
      ))}
    </div>
  );
};

/** * 9. PORTFOLIO SECTION */
const Portfolio = () => {
  const { lang, theme } = useContext(AppContext);
  const [filter, setFilter] = useState("Hammasi");
  const [showDetail, setShowDetail] = useState(null);
  const t = MASTER_DATA[lang].portfolio;
  const filtered = t.items.filter(i => filter === "Hammasi" || i.c === filter);

  return (
    <section id="works" style={{ padding: '100px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Typography variant="h2" data-aos="fade-right">{t.title}</Typography>
        
        <div style={{ display: 'flex', gap: '10px', margin: '30px 0', flexWrap: 'wrap' }}>
          {t.categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: '10px 20px', borderRadius: '50px', border: `1px solid ${theme.border}`,
              background: filter === c ? theme.accent : 'transparent', color: filter === c ? '#fff' : theme.fg, 
              cursor: 'pointer', fontWeight: 700, fontSize: '13px'
            }}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div 
                layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                key={item.id} style={{ borderRadius: '20px', overflow: 'hidden', background: theme.card, position: 'relative' }}>
                <div style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
                  <img src={item.img} alt={item.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '25px' }}>
                    <Typography variant="label" style={{ color: '#fff', fontSize: '10px' }}>{item.c}</Typography>
                    <Typography variant="h3" style={{ color: '#fff', marginTop: '5px', fontSize: '1.4rem' }}>{item.t}</Typography>
                    
                    <button 
                      onClick={() => setShowDetail(showDetail === item.id ? null : item.id)}
                      style={{ marginTop: '15px', width: 'fit-content', padding: '10px 20px', background: '#fff', color: '#000', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>
                      {showDetail === item.id ? "YOPISH" : "BATAFSIL"}
                    </button>
                    
                    <AnimatePresence>
                      {showDetail === item.id && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          style={{ color: '#fff', marginTop: '15px', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px' }}>
                          {item.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/** * 10. TECHNOLOGY SECTION */
const Technology = () => {
  const { lang, theme } = useContext(AppContext);
  const [techId, setTechId] = useState(null);
  const t = MASTER_DATA[lang].tech;

  return (
    <section id="tech" style={{ padding: '100px 20px', background: theme.card }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Typography variant="h2" style={{ textAlign: 'center', marginBottom: '60px' }}>{t.title}</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {t.items.map((item, i) => {
            const Icon = Lucide[item.i];
            const isSelected = techId === i;
            return (
              <motion.div 
                key={i} onClick={() => setTechId(isSelected ? null : i)}
                style={{ 
                  padding: '40px 30px', background: isSelected ? theme.accent : theme.bg, 
                  borderRadius: '20px', cursor: 'pointer', border: `1px solid ${theme.border}` 
                }}>
                <Icon size={40} color={isSelected ? '#fff' : theme.accent} />
                <Typography variant="h3" style={{ marginTop: '20px', color: isSelected ? '#fff' : theme.fg, fontSize: '1.3rem' }}>{item.n}</Typography>
                <Typography variant="p" style={{ marginTop: '15px', color: isSelected ? '#fff' : theme.muted, fontSize: '0.95rem' }}>
                  {isSelected ? item.info : item.d}
                </Typography>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/** * 11. SERVICES SECTION */
const Services = () => {
  const { lang, theme } = useContext(AppContext);
  const [activeSer, setActiveSer] = useState(null);
  const s = MASTER_DATA[lang].services;

  return (
    <section id="services" style={{ padding: '100px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Typography variant="h2" style={{ marginBottom: '60px' }}>{s.title}</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2px', background: theme.border }}>
          {s.items.map((item, i) => {
            const Icon = Lucide[item.i];
            const isOpen = activeSer === i;
            return (
              <motion.div 
                key={i} onClick={() => setActiveSer(isOpen ? null : i)}
                style={{ padding: '50px 30px', background: theme.bg, cursor: 'pointer' }}>
                <Icon size={32} color={theme.accent} />
                <Typography variant="h3" style={{ margin: '20px 0', fontSize: '1.3rem' }}>{item.t}</Typography>
                <Typography variant="p" style={{ fontSize: '0.95rem' }}>{item.d}</Typography>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      style={{ marginTop: '20px', padding: '15px', background: theme.card, borderLeft: `3px solid ${theme.accent}`, fontSize: '13px' }}>
                      {item.full}
                    </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/** * 12. PRICING SECTION */
const Pricing = () => {
  const { lang, theme } = useContext(AppContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const t = MASTER_DATA[lang].pricing;

  return (
    <section id="pricing" style={{ padding: '100px 20px', background: theme.card }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {t.plans.map((p) => (
            <div key={p.id} style={{ 
              padding: '50px 30px', borderRadius: '30px', background: p.a ? theme.accent : theme.bg, 
              color: p.a ? '#fff' : theme.fg, border: `1px solid ${theme.border}`, position: 'relative' 
            }}>
              {p.a && <div style={{ position: 'absolute', top: '20px', right: '25px', background: '#fff', color: theme.accent, padding: '4px 12px', borderRadius: '15px', fontWeight: 900, fontSize: '10px' }}>TOP</div>}
              <Typography variant="h3" style={{ color: 'inherit', fontSize: '1.4rem' }}>{p.n}</Typography>
              <div style={{ fontSize: '50px', fontWeight: 900, margin: '30px 0' }}>${p.p}</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                {p.f.map(f => <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.8, fontSize: '14px' }}><Lucide.CheckCircle size={18}/> {f}</div>)}
              </div>

              <button 
                onClick={() => setSelectedPlan(p.id)}
                style={{ 
                  width: '100%', padding: '20px', borderRadius: '12px', border: 'none', 
                  background: p.a ? '#000' : theme.accent, color: '#fff', fontWeight: 900, fontSize: '16px', cursor: 'pointer' 
                }}>
                {selectedPlan === p.id ? "TANLANDI" : "TANLASH"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** * 13. TEAM SECTION */
const Team = () => {
  const { lang, theme } = useContext(AppContext);
  return (
    <section id="team" style={{ padding: '100px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Typography variant="h2" style={{ textAlign: 'center', marginBottom: '80px' }}>{MASTER_DATA[lang].team.title}</Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {MASTER_DATA[lang].team.members.map((m, i) => {
            const Icon = Lucide[m.i];
            return (
              <motion.div 
                key={i} whileHover={{ y: -10 }}
                style={{ padding: '40px 30px', background: theme.card, borderRadius: '30px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', background: theme.accent, borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Icon size={40} />
                </div>
                <Typography variant="h3" style={{fontSize:'1.3rem'}}>{m.n}</Typography>
                <Typography variant="label" style={{ display: 'block', margin: '10px 0', fontSize:'10px' }}>{m.r}</Typography>
                <Typography variant="p" style={{ fontSize: '14px' }}>{m.p}</Typography>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/** * 14. CONTACT SECTION */
const Contact = () => {
  const { theme } = useContext(AppContext);
  const [formState, setFormState] = useState("YUBORISH");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("...");
    setTimeout(() => setFormState("OK!"), 2000);
  };

  return (
    <section id="contact" style={{ padding: '100px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', background: theme.accent, borderRadius: '40px', padding: '60px 40px', color: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', margin: 0, lineHeight: 1 }}>Keling, Gaplashamiz!</h2>
          <p style={{ fontSize: '18px', marginTop: '20px', opacity: 0.9 }}>Vaqt keldi.</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input required placeholder="Ismingiz" style={{ padding: '20px', borderRadius: '12px', border: 'none', fontSize: '16px', width: '100%', boxSizing: 'border-box' }} />
          <input required type="email" placeholder="Email" style={{ padding: '20px', borderRadius: '12px', border: 'none', fontSize: '16px', width: '100%', boxSizing: 'border-box' }} />
          <textarea placeholder="Xabar..." rows="4" style={{ padding: '20px', borderRadius: '12px', border: 'none', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}></textarea>
          <button type="submit" style={{ padding: '20px', borderRadius: '12px', border: 'none', background: '#000', color: '#fff', fontWeight: 900, fontSize: '18px', cursor: 'pointer' }}>
            {formState}
          </button>
        </form>
      </div>
    </section>
  );
};

/** * 15. FOOTER */
const Footer = () => {
  const { theme } = useContext(AppContext);
  return (
    <footer style={{ padding: '80px 20px', borderTop: `1px solid ${theme.border}`, textAlign: 'center' }}>
      <Typography variant="h3" style={{ letterSpacing: '8px', fontSize: '1.2rem' }}>NEXUS TITAN</Typography>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '40px 0' }}>
        <Lucide.Github size={24} />
        <Lucide.Twitter size={24} />
        <Lucide.Linkedin size={24} />
      </div>
      <Typography variant="label" style={{ opacity: 0.3, fontSize: '10px' }}>© 2026 NEXUS TITAN. ALL RIGHTS RESERVED.</Typography>
    </footer>
  );
};