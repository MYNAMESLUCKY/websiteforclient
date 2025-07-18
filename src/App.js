import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PricingPage from './PricingPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import MobileNav from './components/MobileNav';
import OnboardingTour from './components/OnboardingTour';
import { AuthProvider } from './components/AuthProvider';
import AuthUI from './components/AuthUI';
import ProfilePage from './pages/ProfilePage';

// Animated blurred color blobs
function AnimatedBlobs() {
  // Array of rice grain configs for variety and cuteness
  const grains = [
    { left: '-4%', top: '12%', size: 38, color1: '#fffbe9', color2: '#fef08a', delay: 0, duration: 10, opacity: 0.85, rotate: 0 },
    { left: '8%', top: '-6%', size: 32, color1: '#fef9c3', color2: '#fde68a', delay: 2, duration: 12, opacity: 0.7, rotate: 10 },
    { left: '92%', top: '8%', size: 36, color1: '#f5e9c3', color2: '#fef08a', delay: 1, duration: 11, opacity: 0.8, rotate: -8 },
    { left: '98%', top: '60%', size: 30, color1: '#fef9c3', color2: '#f5e9c3', delay: 3, duration: 14, opacity: 0.6, rotate: 5 },
    { left: '-6%', top: '70%', size: 34, color1: '#fef08a', color2: '#f5e9c3', delay: 2.5, duration: 13, opacity: 0.7, rotate: -12 },
    { left: '50%', top: '-7%', size: 28, color1: '#fffbe9', color2: '#fde68a', delay: 1.5, duration: 13, opacity: 0.7, rotate: 7 },
    { left: '90%', top: '90%', size: 40, color1: '#fef9c3', color2: '#fde68a', delay: 4, duration: 15, opacity: 0.6, rotate: 12 },
    { left: '-5%', top: '90%', size: 36, color1: '#f5e9c3', color2: '#fef08a', delay: 3.5, duration: 12, opacity: 0.8, rotate: -6 },
  ];
  return (
    <>
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-green-200/40 blur-3xl z-0"
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut', type: 'tween' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-yellow-200/40 blur-3xl z-0"
        animate={{ x: [0, -40, 40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', type: 'tween' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-amber-100/30 blur-2xl z-0"
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut', type: 'tween' }}
      />
      {/* Cute, realistic floating rice grains with faces and highlights */}
      {grains.map((g, i) => (
        <motion.svg
          key={i}
          className="absolute z-10 drop-shadow-md"
          style={{ left: g.left, top: g.top }}
          width={g.size} height={g.size * 1.3}
          viewBox={`0 0 ${g.size} ${g.size * 1.3}`}
          initial={{ y: 0, opacity: g.opacity, rotate: g.rotate }}
          animate={{ y: [0, -18, 0], rotate: [g.rotate, g.rotate + 10, g.rotate] }}
          transition={{ repeat: Infinity, duration: g.duration, delay: g.delay, ease: 'easeInOut', type: 'tween' }}
        >
          <defs>
            <linearGradient id={`grainGrad${i}`} x1="0" y1="0" x2="0" y2={g.size * 1.3} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={g.color1} />
              <stop offset="100%" stopColor={g.color2} />
            </linearGradient>
            <filter id={`grainShadow${i}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#eab308" floodOpacity="0.18" />
            </filter>
          </defs>
          {/* Plump, realistic rice grain shape (oval with slight curve) */}
          <path
            d={`M${g.size / 2},${g.size * 1.2} Q${g.size * 0.1},${g.size * 0.7} ${g.size * 0.2},${g.size * 0.3} Q${g.size / 2},0 ${g.size * 0.8},${g.size * 0.3} Q${g.size * 0.9},${g.size * 0.7} ${g.size / 2},${g.size * 1.2}`}
            fill={`url(#grainGrad${i})`}
            filter={`url(#grainShadow${i})`}
            stroke="#eab308"
            strokeWidth="1.2"
          />
          {/* Subtle highlight/shine */}
          <ellipse
            cx={g.size / 2 - 3}
            cy={g.size * 0.35}
            rx={g.size * 0.13}
            ry={g.size * 0.05}
            fill="#fff"
            opacity="0.5"
          />
          {/* Cute expressive face for all grains */}
          <g>
            <ellipse cx={g.size / 2 - 4} cy={g.size * 0.65} rx="1.5" ry="2" fill="#444" />
            <ellipse cx={g.size / 2 + 4} cy={g.size * 0.65} rx="1.5" ry="2" fill="#444" />
            <path d={`M${g.size / 2 - 2.5},${g.size * 0.73} Q${g.size / 2},${g.size * 0.78} ${g.size / 2 + 2.5},${g.size * 0.73}`} stroke="#eab308" strokeWidth="1.1" fill="none" />
          </g>
        </motion.svg>
      ))}
    </>
  );
}

// Animated Rice Spirit Mascot (bottom left)
function RiceSpirit() {
  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 flex flex-col items-center"
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', type: 'tween' }}
      tabIndex={0}
      aria-label="Rice Spirit Mascot"
    >
      {/* Cute rice grain with face */}
      <motion.svg
        width="48" height="64" viewBox="0 0 48 64"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.08, rotate: -5 }}
        whileTap={{ scale: 0.95, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="drop-shadow-lg cursor-pointer"
      >
        <ellipse cx="24" cy="40" rx="18" ry="24" fill="#fffde4" stroke="#a3e635" strokeWidth="2" />
        {/* Eyes */}
        <motion.ellipse cx="17" cy="48" rx="2" ry="3" fill="#444" animate={{ scaleY: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 4, delay: 1.2, ease: 'easeInOut', type: 'tween' }} />
        <motion.ellipse cx="31" cy="48" rx="2" ry="3" fill="#444" animate={{ scaleY: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 4, delay: 2, ease: 'easeInOut', type: 'tween' }} />
        {/* Smile */}
        <path d="M19 54 Q24 58 29 54" stroke="#a3e635" strokeWidth="2" fill="none" />
        {/* Blush */}
        <ellipse cx="14" cy="52" rx="2" ry="1" fill="#fde68a" />
        <ellipse cx="34" cy="52" rx="2" ry="1" fill="#fde68a" />
      </motion.svg>
      <span className="text-xs text-green-700 mt-1 font-semibold">Hi!</span>
    </motion.div>
  );
}

// Minimal Navbar for Rice Business with micro-interactions
function Navbar({ onShowTour, dark, setDark }) {
  const location = useLocation();
  const navLinks = [
    { label: 'HOME', to: '/' },
    { label: 'PRODUCTS', to: '/products' },
    { label: 'PRICING', to: '/pricing' },
    { label: 'ABOUT', to: '/about' },
    { label: 'CONTACT', to: '/contact' },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <header className="flex items-center w-full max-w-full flex-wrap justify-between px-0 md:px-4 py-4 md:py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <span className="inline-block w-8 h-8 bg-gradient-to-tr from-green-400 to-yellow-200 rounded-full flex items-center justify-center shadow-md">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="6" fill="#fffde4" /><path d="M12 6v12" stroke="#a3e635" strokeWidth="2"/><path d="M8 8c0 4 8 4 8 0" stroke="#facc15" strokeWidth="2"/></svg>
        </span>
      </div>
      {/* All nav links, toggles, quote, mascot in a single row */}
      <nav className="flex-1 flex items-center gap-4 md:gap-6 lg:gap-8 justify-center" role="navigation" aria-label="Main navigation">
        {navLinks.map(link => (
          <motion.div key={link.label} whileHover={{ scale: 1.08, color: '#fff' }} whileTap={{ scale: 0.95 }}>
            <Link
              to={link.to}
              className={`hover:text-black dark:hover:text-white transition cursor-pointer ${location.pathname === link.to ? 'text-green-700 dark:text-white font-bold underline' : ''}`}
              tabIndex={0}
              aria-label={link.label}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <button onClick={() => setDark(d => !d)} aria-label="Toggle dark mode" className="px-2 py-2 rounded-full bg-green-100 dark:bg-black text-green-700 dark:text-white font-bold shadow hover:bg-green-200 dark:hover:bg-white dark:hover:text-black transition focus:outline-none focus:ring-2 focus:ring-green-500">
          {dark ? '🌙' : '☀️'}
        </button>
        <button onClick={onShowTour} aria-label="Show onboarding tour" className="px-2 py-2 rounded-full bg-green-100 dark:bg-black text-green-700 dark:text-white font-bold shadow hover:bg-green-200 dark:hover:bg-white dark:hover:text-black transition focus:outline-none focus:ring-2 focus:ring-green-500">
          Tour
        </button>
        <motion.a
          href="#"
          whileHover={{ scale: 1.08, backgroundColor: '#fff', color: '#000' }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-full border border-green-600 dark:border-white text-green-700 dark:text-white font-semibold transition bg-white dark:bg-black hover:bg-green-600 dark:hover:bg-white hover:text-white dark:hover:text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          role="button"
          tabIndex={0}
          aria-label="Get a quote"
        >
          GET A QUOTE
        </motion.a>
        <span className="flex items-center" style={{ height: '40px' }}>
          <svg width="32" height="32" viewBox="0 0 48 64" className="drop-shadow-md" style={{ height: '32px', width: '32px' }}>
            <ellipse cx="24" cy="40" rx="18" ry="24" fill="#fffde4" stroke="#a3e635" strokeWidth="2" className="dark:fill-white dark:stroke-white" />
            <ellipse cx="17" cy="48" rx="2" ry="3" fill="#444" className="dark:fill-white" />
            <ellipse cx="31" cy="48" rx="2" ry="3" fill="#444" className="dark:fill-white" />
            <path d="M19 54 Q24 58 29 54" stroke="#a3e635" strokeWidth="2" fill="none" className="dark:stroke-white" />
            <ellipse cx="14" cy="52" rx="2" ry="1" fill="#fde68a" className="dark:fill-white" />
            <ellipse cx="34" cy="52" rx="2" ry="1" fill="#fde68a" className="dark:fill-white" />
          </svg>
        </span>
      </nav>
      {/* Mobile hamburger */}
      <button
        className="md:hidden flex items-center text-green-700 text-3xl ml-2"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg>
      </button>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} navLinks={navLinks} />
    </header>
  );
}

// Modularize Hero, ProductsSection, ScrollIndicator
function Hero() {
  useEffect(() => {}, []);
  return (
    <section className="flex flex-col justify-center h-[60vh] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-48 pt-8">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-green-900 dark:text-white mb-6 leading-tight"
      >
        Premium Rice<br />for Every Table
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-white mb-8 max-w-2xl"
      >
        Sourced from the finest fields, our rice brings quality, nutrition, and taste to families and businesses worldwide. Discover our range of premium grains and experience the difference.
      </motion.p>
      <motion.a
        href="/products"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.08, borderBottomWidth: '2px', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 font-semibold border-b border-green-700 dark:border-white pb-1 hover:underline cursor-pointer text-green-700 dark:text-white"
      >
        SHOP NOW
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </motion.a>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pl-2 select-none"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', type: 'tween' }}
    >
      <span className="text-xs text-green-400 tracking-widest rotate-[-90deg]">SCROLL</span>
      <motion.div
        className="w-1 h-12 bg-green-200 rounded-full mt-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', type: 'tween' }}
      />
    </motion.div>
  );
}

function ProductsSection() {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    import('./api/products').then(mod => mod.fetchProducts().then(setProducts));
  }, []);
  return (
    <section className="w-full px-8 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-8 text-center">Our Rice Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <motion.div
      className="bg-white/80 rounded-2xl shadow-lg border border-green-100 p-6 flex flex-col items-center gap-3 hover:shadow-2xl transition relative"
      whileHover={{ scale: 1.04, y: -6 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      <svg width="48" height="60" viewBox="0 0 48 60">
        <defs>
          <linearGradient id="prodGrain" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fffbe9" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
        </defs>
        <path d="M24,56 Q8,40 12,16 Q24,4 36,16 Q40,40 24,56" fill="url(#prodGrain)" stroke="#eab308" strokeWidth="2" />
        <ellipse cx="20" cy="38" rx="2" ry="3" fill="#444" />
        <ellipse cx="28" cy="38" rx="2" ry="3" fill="#444" />
        <path d="M21,44 Q24,47 27,44" stroke="#eab308" strokeWidth="1.2" fill="none" />
      </svg>
      <div className="w-20 h-20 bg-green-100 rounded-xl flex items-center justify-center mb-2">
        <img src={product.image} alt={product.name} className="object-contain w-16 h-16" />
      </div>
      <div className="text-lg font-bold text-green-900 text-center">{product.name}</div>
      <div className="text-xs text-green-600 font-semibold mb-1">{product.type}</div>
      <div className="text-gray-600 text-sm text-center mb-2">{product.description}</div>
      <div className="text-green-700 font-bold text-base mb-2">${product.price} /kg</div>
      <motion.button
        whileHover={{ scale: 1.08, backgroundColor: '#22c55e', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 rounded-full border border-green-600 text-green-700 font-semibold transition bg-white hover:bg-green-600 hover:text-white cursor-pointer"
      >
        Enquire
      </motion.button>
    </motion.div>
  );
}

function HelpButton() {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full border border-green-200 bg-white/80 shadow-lg flex items-center justify-center text-2xl font-bold text-green-700 hover:bg-green-600 hover:text-white transition"
      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'tween', duration: 0.5 }}
      aria-label="Help"
    >
      ?
    </motion.button>
  );
}

function HomePage() {
  return <><Hero /><ScrollIndicator /></>;
}

function App() {
  const [showTour, setShowTour] = React.useState(() => {
    return localStorage.getItem('riceco_tour_shown') !== 'true';
  });
  const [dark, setDark] = React.useState(() => {
    return localStorage.getItem('riceco_dark') === 'true';
  });
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('riceco_dark', dark);
  }, [dark]);
  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem('riceco_tour_shown', 'true');
  };
  return (
    <AuthProvider>
      <Router>
        <div className={"min-h-screen w-full flex items-center justify-center bg-green-50 dark:bg-black relative overflow-hidden transition-colors duration-300"}>
          {/* Profile button at top right */}
          <div className="absolute top-6 right-10 z-50">
            <AuthUI />
          </div>
          <OnboardingTour open={showTour} onClose={handleCloseTour} />
          <main className="relative z-10 w-full max-w-6xl 2xl:max-w-7xl min-h-[90vh] bg-white dark:bg-black rounded-3xl border border-green-200 dark:border-white shadow-xl flex flex-col overflow-visible px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 transition-colors duration-300">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
              <AnimatedBlobs />
            </div>
            <Navbar onShowTour={() => setShowTour(true)} dark={dark} setDark={setDark} />
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsSection />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </main>
          <RiceSpirit />
          <HelpButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
