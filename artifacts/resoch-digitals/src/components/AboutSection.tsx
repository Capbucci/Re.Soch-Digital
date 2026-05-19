import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        {/* Headline + Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Who We Are
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              We love the{" "}
              <span className="relative inline-block text-primary">
                'Delete'
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "110%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                  className="absolute left-[-5%] top-1/2 h-[5px] bg-primary -rotate-3 transform -translate-y-1/2 rounded-full"
                />
              </span>{" "}
              button.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="text-base md:text-lg text-white/70 leading-relaxed space-y-5"
          >
            <p>
              Why do we call ourselves Re.Soch? Because we believe the best work
              comes from challenging our own ideas. We research. We ideate. Then
              we look at the whiteboard and ask, <em className="text-white">'Is this good, or is it just safe?'</em>
            </p>
            <p>
              If it's safe, we{" "}
              <motion.span
                initial={{ color: "rgba(255,255,255,0.7)" }}
                whileInView={{ color: "#FF8858" }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="font-bold"
              >
                kill it
              </motion.span>
              . We{" "}
              <motion.span
                initial={{ color: "rgba(255,255,255,0.7)" }}
                whileInView={{ color: "#FF8858" }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className="font-bold"
              >
                rethink
              </motion.span>{" "}
              the narrative, the design, and the data until we find the angle
              your{" "}
              <motion.span
                initial={{ color: "rgba(255,255,255,0.7)" }}
                whileInView={{ color: "#FF8858" }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className="font-bold"
              >
                competitors missed
              </motion.span>
              .
            </p>
          </motion.div>
        </div>

        {/* Team photo — full color, no grayscale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full rounded-2xl overflow-hidden border border-white/10"
          style={{ aspectRatio: "16/7" }}
        >
          <img
            src="/images/about.jpg"
            alt="The Re.Soch Digitals team"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          {/* subtle bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-6 md:bottom-7 md:left-8">
            <p className="text-white/80 text-sm md:text-base font-medium">The Re.Soch Team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
