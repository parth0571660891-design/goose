import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { quickFacts } from '../data/gooseData';

function FactRow({ item, index }: { item: typeof quickFacts[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex items-center justify-between py-3 px-4 bg-white/50 rounded-xl border border-white/60"
    >
      <span className="text-sm font-medium text-emerald-800">{item.label}</span>
      <span className="text-sm font-semibold text-emerald-900">{item.value}</span>
    </motion.div>
  );
}

export default function QuickFacts() {
  return (
    <section id="quickfacts" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">Quick Facts</h2>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="space-y-3">
          {quickFacts.map((item, i) => (
            <FactRow key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
