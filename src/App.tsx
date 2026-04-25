/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  MessageCircle, 
  Phone, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Droplets,
  Instagram,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';
import { 
  BUSINESS_NAME,
  HERO_SLIDES, 
  SERVICES, 
  PORTFOLIO, 
  TESTIMONIALS, 
  FLOW, 
  CONTACT_WA, 
  WA_LINK 
} from './constants';

// --- Shared Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedCounter = ({ value, title }: { value: number; title: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-3xl md:text-5xl font-bold text-primary-600 font-display">{count}+</span>
      <span className="text-xs md:text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">{title}</span>
    </div>
  );
};

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string; title: string; light?: boolean }) => (
  <div className="mb-12 text-center px-4">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-sm font-bold uppercase tracking-widest ${light ? 'text-white/80' : 'text-primary-600'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-bold mt-3 ${light ? 'text-white' : 'text-gray-900'}`}
    >
      {title}
    </motion.h2>
  </div>
);

// --- Layout Wrapper ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen selection:bg-primary-200 selection:text-primary-900 bg-white">
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <Leaf size={24} />
            </div>
            <span className="text-2xl font-bold font-display tracking-tighter text-primary-900 uppercase">{BUSINESS_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-700">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            {isHome ? (
              <>
                <a href="#about" className="hover:text-primary-600 transition-colors">Tentang</a>
                <a href="#services" className="hover:text-primary-600 transition-colors">Layanan</a>
                <a href="#portfolio" className="hover:text-primary-600 transition-colors">Portfolio</a>
              </>
            ) : (
              <Link to="/#services" className="hover:text-primary-600 transition-colors">Services</Link>
            )}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
              Konsultasi
            </a>
          </div>

          <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-lg font-bold uppercase tracking-widest text-primary-900">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <a href="#services" onClick={() => setIsMenuOpen(false)}>Layanan</a>
                <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-primary-600">WhatsApp</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-18">{children}</main>

      <footer className="bg-gray-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
              <Leaf className="text-primary-600" size={24} />
              <span className="text-2xl font-bold font-display uppercase tracking-tighter">{BUSINESS_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Mewujudkan harmoni alam di hunian modern Anda. Spesialis taman minimalis, tropis, dan kolam koi profesional.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"><Instagram size={20} /></a>
              <a href={WA_LINK} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"><Phone size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-primary-400">Services</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              {SERVICES.map(s => <li key={s.id}><Link to={`/service/${s.id}`} className="hover:text-white transition-colors">{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-primary-400">Kontak</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li>{CONTACT_WA}</li>
              <li>Jabodetabek / Jawa Barat</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-primary-400">Area</h4>
            <p className="text-sm text-gray-400 italic">Jakarta, Bogor, Depok, Tangerang, Bekasi.</p>
          </div>
        </div>
        <div className="text-center text-gray-600 text-[10px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {BUSINESS_NAME}. Jakarta Landscape Specialist.
        </div>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:rotate-[360deg] transition-all duration-500">
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

// --- Page: Home ---

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filter, setFilter] = useState('Semua');

  const nextSlide = useCallback(() => setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1)), []);
  const prevSlide = useCallback(() => setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1)), []);

  useEffect(() => {
    const itv = setInterval(nextSlide, 6000);
    return () => clearInterval(itv);
  }, [nextSlide]);

  const categories = ['Semua', 'Minimalis', 'Tropis', 'Vertical Garden', 'Kolam Hias', 'Hardscape'];
  const filteredPortfolio = filter === 'Semua' ? PORTFOLIO : PORTFOLIO.filter(item => item.tag === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110" style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }} />
            <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-transparent md:to-black/30" />
            <div className="relative h-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center">
              <div className="hidden md:block" />
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-center md:text-left text-white max-w-xl">
                <span className="text-primary-400 font-bold uppercase tracking-[0.3em] text-xs mb-6 block">{HERO_SLIDES[currentSlide].subtitle}</span>
                <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-8 font-display">{HERO_SLIDES[currentSlide].heading}</h1>
                <p className="text-lg text-white/90 mb-10 leading-relaxed font-medium">{HERO_SLIDES[currentSlide].description}</p>
                <Link to="#services" className="inline-flex py-4 px-10 bg-white text-primary-900 font-bold rounded-lg hover:bg-primary-50 transition-all uppercase tracking-widest text-sm">Lihat Layanan</Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-12 left-0 w-full flex justify-center items-center gap-8 z-20">
          <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-primary-900 transition-all"><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-primary-900 transition-all"><ChevronRight size={24} /></button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src="https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/657762933_1420976045996876_5059208154390473513_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=O6tSPjPnyDoQ7kNvwH16T7I&_nc_oc=AdpGZutdkhBO1X8ULfDbeJqJHoMBkqUV3Q854IqfEIOOycw3co2f74W7zvGPPNtzh580WI95fvj1KTApetXfLzqh&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AGfORrlpbuslnilOZTEdSqMO_V0zw72eOlQTQJjXpK0pQ&oe=69FB3AEC" className="rounded-3xl shadow-2xl h-[500px] w-full object-cover" alt="About" />
          </motion.div>
          <div>
            <SectionHeading subtitle="Jasa Landscape Profesional" title="Estetika Alam di Setiap Sudut" />
            <p className="text-gray-600 text-lg mb-12">Kami percaya bahwa taman bukan sekadar hiasan, melainkan sumber ketenangan bagi penghuninya. Dengan pengalaman lebih dari 10 tahun, kami memastikan setiap detail landscape dikerjakan dengan standar profesional tertinggi.</p>
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-gray-100">
              <AnimatedCounter value={250} title="Projects" />
              <AnimatedCounter value={100} title="Clients" />
              <AnimatedCounter value={12} title="Years" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-gray-50 uppercase-headings">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="What We Do" title="Layanan Unggulan Kami" />
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map(s => (
              <div key={s.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="h-60 overflow-hidden"><img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="text-gray-500 mb-8 line-clamp-2">{s.description}</p>
                  <Link to={`/service/${s.id}`} className="inline-flex items-center gap-3 text-primary-600 font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all">
                    Lihat Detail <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Hasil Kerja Kami" title="Portofolio Proyek Terkini" />
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === c ? 'bg-primary-900 text-white shadow-xl shadow-primary-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map(p => (
                <motion.div 
                  key={p.id} 
                  layout 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.tag} />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-primary-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-primary-50 rounded-full">{p.tag}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{p.client || 'Proyek Taman'}</h4>
                    <p className="text-gray-500 text-sm mb-6 flex-grow flex items-center gap-2"><MapPin size={14} /> {p.location || 'Indonesia'}</p>
                    <Link to={`/project/${p.id}`} className="inline-flex items-center justify-center gap-3 py-4 bg-primary-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-800 transition-colors w-full">
                      Lihat Selengkapnya <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Process */}
       <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading subtitle="Flow Kerja" title="5 Tahapan Menuju Taman Idaman" />
          <div className="grid md:grid-cols-5 gap-12 relative">
            {FLOW.map((f, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-white border-2 border-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 text-2xl font-black text-primary-600 shadow-xl shadow-primary-100">{f.step}</div>
                <h4 className="font-bold mb-4">{f.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed opacity-80">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary-600 text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight italic">Ingin taman yang sama? Konsultasi GRATIS sekarang.</h2>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex py-5 px-12 bg-white text-primary-600 rounded-full text-lg font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Chat WhatsApp</a>
        </div>
      </section>
    </>
  );
};

// --- Page: Service Detail ---

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  if (!service) return <div className="py-40 text-center font-bold">Layanan tidak ditemukan</div>;

  return (
    <div className="pb-24">
      {/* Header Banner */}
      <div className="h-[40vh] md:h-[60vh] relative overflow-hidden">
        <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <span className="text-primary-400 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Layanan Kami</span>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              {service.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-24">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 text-primary-600 font-bold mb-12 hover:text-primary-900 transition-colors uppercase tracking-widest text-[10px]"
        >
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
             <ArrowLeft size={16} />
          </div>
          Kembali ke Home
        </button>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight italic border-l-4 border-primary-600 pl-8">
              {service.description}
            </h2>
            <div className="prose prose-xl text-gray-600 max-w-none mb-16 leading-relaxed font-medium">
              {service.fullDescription}
            </div>
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-900 pb-4 border-b border-gray-200">Keunggulan Kami</h3>
               <div className="space-y-6">
                  {service.features?.map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="font-bold text-gray-800 leading-tight">{f}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="mt-24 p-10 md:p-20 bg-primary-950 rounded-[3rem] text-white text-center shadow-2xl relative overflow-hidden">
          <Droplets className="absolute -bottom-10 -left-10 text-white/5 scale-[10]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">Mulai Projek {service.title} Anda</h2>
            <p className="mb-12 text-white/60 text-lg md:text-xl font-medium">Dapatkan konsultasi profesional dan penawaran harga yang transparan sekarang juga.</p>
            <a href={WA_LINK} className="inline-flex items-center gap-4 py-6 px-16 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-500 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-2xl">
              <MessageCircle size={20} /> Chat ke WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page: Project Detail ---

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PORTFOLIO.find(p => p.id === id);

  if (!project) return <div className="py-40 text-center font-bold">Proyek tidak ditemukan</div>;

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 text-primary-600 font-bold mb-12 hover:text-primary-900 transition-colors uppercase tracking-widest text-[10px]"
        >
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Kembali ke Gallery
        </button>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Side: Images & Info Cards */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] md:aspect-video"
            >
              <img src={project.image} className="w-full h-full object-cover" alt="Project Detail" />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-[10px] text-gray-400 font-black uppercase mb-3 block tracking-widest">Klien Kami</span>
                <p className="font-bold text-primary-900 text-xl">{project.client}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-[10px] text-gray-400 font-black uppercase mb-3 block tracking-widest">Lokasi</span>
                <p className="font-bold text-primary-900 text-xl">{project.location}</p>
              </div>
            </div>
          </div>
          
          {/* Right Side: Case Study Description */}
          <div className="lg:col-span-5 pt-4">
            <div className="inline-flex px-5 py-2 bg-primary-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-primary-200">
              Proyek Berhasil
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-12 leading-[0.95] tracking-tighter">
              The <br/> {project.tag} <br/> Result.
            </h1>
            
            <div className="space-y-12 mb-20">
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 bg-red-50 text-red-500 rounded-xl flex items-center justify-center font-bold text-sm">!</div>
                <h4 className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-red-600">Problem</h4>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">{project.problem}</p>
              </div>
              
              <div className="relative pl-12">
                 <div className="absolute left-0 top-0 w-8 h-8 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center font-bold text-sm">✓</div>
                <h4 className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-primary-600">Our Solution</h4>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">{project.solution}</p>
              </div>

              <div className="relative pl-12 bg-primary-50 p-10 rounded-[2.5rem] border border-primary-100">
                <h4 className="text-[10px] font-black mb-4 uppercase tracking-[0.3em] text-primary-600">Hasil Akhir</h4>
                <p className="text-primary-900 text-xl md:text-2xl leading-relaxed font-bold italic">
                   "{project.result}"
                </p>
              </div>
            </div>

            <div className="p-10 md:p-14 bg-gray-950 rounded-[3rem] text-white shadow-3xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-3xl font-bold mb-6 font-display leading-tight">Mau Punya Taman Seperti Ini?</h4>
                 <p className="text-white/50 text-base mb-10 leading-relaxed font-medium">Jangan ragu untuk bertanya. Tim ahli kami siap membantu Anda mewujudkan landscape impian dengan budget yang bersahabat.</p>
                 <a 
                   href={WA_LINK} 
                   className="flex items-center justify-center gap-4 bg-primary-600 text-white w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-500 hover:scale-105 transition-all shadow-2xl"
                 >
                   <MessageCircle size={22} /> Konsultasi Sekarang
                 </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
    </Layout>
  );
}
