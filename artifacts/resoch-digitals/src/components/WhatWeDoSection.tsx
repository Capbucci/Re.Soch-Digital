import { motion } from "framer-motion";

const services = [
  {
    icon: "📱",
    title: "Social Media Strategy",
    desc: "We build content systems that move faster than algorithms. From trend-jacking to original series, we create a social presence your audience can't scroll past.",
  },
  {
    icon: "🎥",
    title: "Visual Production",
    desc: "Cinematic content that stops the thumb. We produce high-impact videos, reels, and photography that make your brand impossible to forget.",
  },
  {
    icon: "✍️",
    title: "Copy & Design",
    desc: "Words that sell, visuals that compel. We craft brand narratives, ad copy, and design systems that make people feel something — then act on it.",
  },
  {
    icon: "🔍",
    title: "SEO & Performance Marketing",
    desc: "We put your brand where your customers are searching. Data-driven campaigns with surgical precision — every rupee tracked, every lead counted.",
  },
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Your website is your 24/7 salesperson. We build fast, aesthetic, conversion-optimised sites that don't just look good — they perform.",
  },
  {
    icon: "🛡️",
    title: "Brand Management",
    desc: "Your reputation is your most valuable asset. We protect, grow and evolve your brand equity across every touchpoint and channel.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white max-w-2xl">
            We don't just do{" "}
            <span className="text-primary">marketing</span>.{" "}
            We build movements.
          </h2>
          <p className="mt-4 text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
            Every brand has a story worth telling. We make sure the world actually listens.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/[0.03] border border-white/10 hover:border-primary/40 rounded-2xl p-6 md:p-7 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="text-3xl md:text-4xl mb-4 leading-none">{s.icon}</div>

              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

              <h3 className="text-lg md:text-xl font-serif font-bold text-white group-hover:text-primary transition-colors duration-300 mb-2">
                {s.title}
              </h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
