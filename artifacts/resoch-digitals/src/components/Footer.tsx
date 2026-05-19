import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-primary pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <a href="#" className="text-2xl md:text-3xl font-serif font-bold tracking-tighter mb-3">
              <span className="text-white">Re.Soch</span>
              <span className="text-primary">.Digitals</span>
            </a>
            <p className="text-white/55 text-sm max-w-xs">
              Don't Just Think. Re.Soch.
            </p>
          </div>

          {/* Connect */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white text-sm font-bold mb-1">Connect</h4>
            <a href="mailto:hello@resoch.com" className="text-white/55 text-sm hover:text-primary transition-colors break-all">hello@resoch.com</a>
            <a href="tel:+1234567890" className="text-white/55 text-sm hover:text-primary transition-colors">+1 (234) 567-890</a>
            <span className="text-white/55 text-sm">123 Innovation Drive</span>
          </div>

          {/* Social */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white text-sm font-bold mb-1">Follow</h4>
            <div className="flex gap-3">
              {[
                { icon: <SiInstagram size={17} /> },
                { icon: <FaLinkedinIn size={17} /> },
                { icon: <SiX size={15} /> },
                { icon: <SiYoutube size={17} /> },
              ].map(({ icon }, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 touch-manipulation"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© 2026 Re.Soch Digitals. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
