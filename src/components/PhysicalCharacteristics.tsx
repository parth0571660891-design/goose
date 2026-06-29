import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { physicalCharacteristics } from '../data/gooseData';
import { Ruler, Scale, Wind, Palette, Feather, Heart, Bone } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Ruler, Scale, Wind, Palette, Feather, Heart, Bone,
};

function Card({ item, index }: { item: typeof physicalCharacteristics[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = iconMap[item.icon] || Feather;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
          <Icon className="w-6 h-6 text-emerald-700" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">{item.label}</p>
          <p className="text-lg font-bold text-emerald-900 mt-0.5">{item.value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PhysicalCharacteristics() {
  return (
    <section id="characteristics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">Physical Characteristics</h2>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {physicalCharacteristics.map((item, i) => (
            <Card key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
