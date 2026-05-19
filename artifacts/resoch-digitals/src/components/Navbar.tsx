import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/95 backdrop-blur-md py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={closeMenu}
            className="text-2xl font-serif font-bold tracking-tighter"
            data-testid="link-logo"
          >
            <span className="text-white">Re.</span><span className="text-primary">Soch</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white text-sm font-medium relative group overflow-hidden"
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="bg-primary text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(255,136,88,0.4)]"
              data-testid="button-nav-cta"
            >
              Rethink Your Strategy
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 z-[70] relative"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — rendered outside nav to avoid stacking context issues */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-black z-[55] flex flex-col items-center justify-center"
            style={{ touchAction: "none" }}
          >
            <div className="flex flex-col items-center space-y-8 px-8 w-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-white text-4xl font-serif font-bold hover:text-primary transition-colors duration-200 text-center"
                  data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-primary text-black px-10 py-4 rounded-full font-bold text-xl mt-4 hover:scale-105 transition-transform duration-300"
                data-testid="button-mobile-cta"
              >
                Rethink Your Strategy
              </motion.a>
            </div>

            <div className="absolute bottom-10 text-white/30 text-sm font-serif font-bold">
              <span>Re.</span><span className="text-primary/40">Soch</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
