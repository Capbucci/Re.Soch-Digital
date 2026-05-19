import { motion } from "framer-motion";

const resochSteps = ["Brief", "Research", "Re-Think", "Disrupt", "Dominate"];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Our Process</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white">
            The Art of the <span className="text-primary">Re-Think</span>.
          </h2>
        </motion.div>

        {/* Re.Soch Way steps */}
        <div className="flex flex-col items-center gap-3 md:gap-4">
          {resochSteps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="w-full max-w-sm"
            >
              <div
                className={`rounded-xl p-4 md:p-5 text-center font-semibold text-sm md:text-base transition-all duration-300 hover:-translate-y-1 ${
                  step === "Re-Think"
                    ? "bg-primary border-2 border-primary text-black font-bold shadow-[0_0_24px_rgba(255,136,88,0.45)]"
                    : "bg-white/5 border border-primary/30 text-white hover:border-primary hover:shadow-[0_0_12px_rgba(255,136,88,0.2)]"
                }`}
              >
                {step}
              </div>
              {i < resochSteps.length - 1 && (
                <div className="flex justify-center py-1.5 text-primary/60 text-xl">
                  &darr;
                </div>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-4"
          >
            <motion.span
              animate={{ boxShadow: ["0 0 10px rgba(255,136,88,0.3)", "0 0 22px rgba(255,136,88,0.65)", "0 0 10px rgba(255,136,88,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block bg-primary/20 text-primary border border-primary/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              Iconic
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
