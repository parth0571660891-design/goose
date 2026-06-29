import { motion } from 'framer-motion';
import { aboutContent } from '../data/gooseData';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Dna, Globe, History, Eye, Heart, TreePine, Wheat } from 'lucide-react';

const sections = [
  { title: 'Introduction', icon: BookOpen, text: aboutContent.intro },
  { title: 'Scientific Classification', icon: Dna, text: `Kingdom: ${aboutContent.classification.kingdom} | Phylum: ${aboutContent.classification.phylum} | Class: ${aboutContent.classification.class} | Order: ${aboutContent.classification.order} | Family: ${aboutContent.classification.family} | Genus: ${aboutContent.classification.genus} | Species: ${aboutContent.classification.species}` },
  { title: 'Origin', icon: Globe, text: aboutContent.origin },
  { title: 'Domestication History', icon: History, text: aboutContent.domestication },
  { title: 'Physical Appearance', icon: Eye, text: aboutContent.appearance },
  { title: 'Lifespan', icon: Heart, text: aboutContent.lifespan },
  { title: 'Importance in Wetland Ecosystems', icon: TreePine, text: aboutContent.ecosystem },
  { title: 'Role in Agriculture', icon: Wheat, text: aboutContent.agriculture },
];

function Card({ item, index }: { item: typeof sections[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-emerald-100 rounded-xl">
          <Icon className="w-5 h-5 text-emerald-700" />
        </div>
        <h3 className="text-lg font-semibold text-emerald-900">{item.title}</h3>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">About the Goose</h2>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
