import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { dietContent } from '../data/gooseData';
import { Leaf, Flower2, Cherry, Wheat, Carrot, Bug, Droplets, Utensils } from 'lucide-react';

const dietIcons = [Leaf, Flower2, Cherry, Wheat, Carrot, Bug, Droplets];

function DietCard({ item, index }: { item: typeof dietContent.items[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = dietIcons[index % dietIcons.length];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-green-100 rounded-xl">
          <Icon className="w-5 h-5 text-green-700" />
        </div>
        <h4 className="font-semibold text-emerald-900">{item.name}</h4>
      </div>
      <p className="text-slate-600 text-sm">{item.desc}</p>
    </motion.div>
  );
}

export default function Diet() {
  return (
    <section id="diet" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">Diet</h2>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {dietContent.items.map((item, i) => (
            <DietCard key={item.name} item={item} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-emerald-50/60 backdrop-blur-md border border-emerald-100 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-200 rounded-xl">
              <Utensils className="w-5 h-5 text-emerald-800" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900">Feeding Habits</h3>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">{dietContent.habits}</p>
        </motion.div>
      </div>
    </section>
  );
}
