import { motion } from "framer-motion";

const clients = [
  {
    name: "Casselore",
    industry: "F&B",
    desc: "We helped this premium meal subscription brand ditch the 'boring diet food' aesthetic and secure the bag with a high-converting, drool-worthy visual strategy.",
    image: "/images/client-1.jpg",
  },
  {
    name: "MYSA",
    industry: "Furniture",
    desc: "Delivered an elevated visual strategy and polished brand narrative that speaks directly to a high-end, discerning clientele.",
    image: "/images/client-2.jpg",
  },
  {
    name: "Namishree",
    industry: "Real Estate",
    desc: "A high-converting digital presence that effectively showcases their diverse portfolio of landmark properties.",
    image: "/images/client-3.jpg",
  },
  {
    name: "Mowzz",
    industry: "Sound & Light",
    desc: "A refined digital strategy that clearly communicates their technical excellence and industry-leading event production capabilities.",
    image: "/images/client-4.jpg",
  },
  {
    name: "Pooja Architect",
    industry: "Architecture",
    desc: "A polished digital strategy that showcases their design philosophy and establishes their authority in the architectural space.",
    image: "/images/client-5.jpg",
  },
  {
    name: "SUYU",
    industry: "Cosmetics",
    desc: "High-fidelity imagery that highlights the premium nature of their products and creates a compelling visual narrative.",
    image: "/images/client-6.jpg",
  },
];

export default function ClientsSection() {
  return (
    <section id="work" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white">
            Brands That Trusted the{" "}
            <span className="text-primary">Re-Think</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              data-testid={`card-client-${i}`}
            >
              {/* Background Image */}
              <img
                src={client.image}
                alt={client.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Base overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Content */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <span className="inline-block bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 self-start group-hover:-translate-y-1 transition-transform duration-300">
                  {client.industry}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors duration-300 mb-1 group-hover:-translate-y-1 transform transition-transform">
                  {client.name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
                  {client.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
