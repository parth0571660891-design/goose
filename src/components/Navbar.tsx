import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Feather } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Characteristics', href: '#characteristics' },
  { label: 'Habitat', href: '#habitat' },
  { label: 'Diet', href: '#diet' },
  { label: 'Behaviour', href: '#behaviour' },
  { label: 'Care', href: '#care' },
  { label: 'Conservation', href: '#conservation' },
  { label: 'Facts', href: '#facts' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Audio', href: '#audio' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <Feather className={`w-6 h-6 ${scrolled ? 'text-emerald-700' : 'text-white'}`} />
            <span className={`text-lg font-semibold tracking-wide ${scrolled ? 'text-emerald-900' : 'text-white'}`}>
              Goose (Hans)
            </span>
          </button>
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                  scrolled ? 'text-emerald-800' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={scrolled ? 'text-emerald-900' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-emerald-900' : 'text-white'} />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t"
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-emerald-800 text-sm font-medium py-2 px-3 rounded-lg hover:bg-emerald-50"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
