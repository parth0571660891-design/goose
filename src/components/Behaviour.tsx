import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { behaviourContent } from '../data/gooseData';
import { Waves, Plane, ArrowRightLeft, Users, Heart, Megaphone, Shield, Clock } from 'lucide-react';

const behaviourIcons = [Waves, Plane, ArrowRightLeft, Users, Heart, Megaphone, Shield, Clock];

function BehaviourCard({ item, index }: { item: typeof behaviourContent.items[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = behaviourIcons[index % behaviourIcons.length];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-teal-100 rounded-xl">
          <Icon className="w-5 h-5 text-teal-700" />
        </div>
        <h4 className="font-semibold text-emerald-900">{item.title}</h4>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

export default function Behaviour() {
  return (
    <section id="behaviour" className="py-20 bg-gradient-to-b from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">Behaviour</h2>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {behaviourContent.items.map((item, i) => (
            <BehaviourCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
