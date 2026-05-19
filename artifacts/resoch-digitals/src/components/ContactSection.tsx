import { useState } from "react";
import { motion } from "framer-motion";
import { SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!formState.name) e.name = true;
    if (!formState.email || !/^\S+@\S+\.\S+$/.test(formState.email)) e.email = true;
    if (!formState.service) e.service = true;
    if (!formState.message) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", service: "", message: "" });
    }, 1500);
  };

  const inputBase =
    "w-full bg-transparent border text-white text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-colors placeholder:text-white/35";

  return (
    <section id="contact" className="py-16 md:py-28 bg-black border-t border-white/10 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Let's <span className="text-primary">Talk.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => { setFormState({ ...formState, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: false }); }}
                className={`${inputBase} ${errors.name ? "border-red-500" : "border-white/15 focus:border-primary"}`}
                data-testid="input-name"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={(e) => { setFormState({ ...formState, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: false }); }}
                className={`${inputBase} ${errors.email ? "border-red-500" : "border-white/15 focus:border-primary"}`}
                data-testid="input-email"
              />
              <select
                value={formState.service}
                onChange={(e) => { setFormState({ ...formState, service: e.target.value }); if (errors.service) setErrors({ ...errors, service: false }); }}
                className={`${inputBase} appearance-none ${errors.service ? "border-red-500" : "border-white/15 focus:border-primary"} ${!formState.service ? "text-white/35" : "text-white"}`}
                data-testid="input-service"
              >
                <option value="" disabled>Select a Service</option>
                <option value="Social Media">Social Media Strategy</option>
                <option value="Copy & Design">Copy &amp; Design</option>
                <option value="Visual Production">Visual Production</option>
                <option value="SEO">SEO</option>
                <option value="Performance Marketing">Performance Marketing</option>
                <option value="Brand Management">Brand Management</option>
                <option value="Website">Web Development</option>
              </select>
              <textarea
                placeholder="Tell us about your project..."
                rows={4}
                value={formState.message}
                onChange={(e) => { setFormState({ ...formState, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: false }); }}
                className={`${inputBase} resize-none ${errors.message ? "border-red-500" : "border-white/15 focus:border-primary"}`}
                data-testid="input-message"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-primary text-black font-bold text-base py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 touch-manipulation"
                data-testid="button-submit-contact"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : status === "success" ? "Sent! We'll be in touch." : "Send It →"}
              </button>
              {status === "success" && (
                <p className="text-primary text-center text-sm font-medium" data-testid="text-success-msg">
                  Your message is on its way!
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 justify-center"
          >
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Reach Out</p>
              <a href="mailto:hello@resoch.com" className="text-xl md:text-2xl text-white hover:text-primary transition-colors font-serif block mb-1 break-all">
                hello@resoch.com
              </a>
              <a href="tel:+1234567890" className="text-base text-white/60 hover:text-primary transition-colors">
                +1 (234) 567-890
              </a>
            </div>

            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: <SiInstagram size={20} />, testid: "link-social-ig" },
                  { icon: <FaLinkedinIn size={20} />, testid: "link-social-li" },
                  { icon: <SiX size={18} />, testid: "link-social-x" },
                  { icon: <SiYoutube size={22} />, testid: "link-social-yt" },
                ].map(({ icon, testid }) => (
                  <a
                    key={testid}
                    href="#"
                    data-testid={testid}
                    className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 touch-manipulation"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Tagline box */}
            <div className="border border-primary/20 rounded-2xl p-5 bg-primary/5">
              <p className="text-white/80 text-sm leading-relaxed italic">
                "We don't just run campaigns — we rethink them from the ground up. Let's build something your competitors will be talking about."
              </p>
              <p className="text-primary text-xs font-bold mt-3">— The Re.Soch Team</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
