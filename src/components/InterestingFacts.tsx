import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { interestingFacts } from '../data/gooseData';
import { Star, Feather } from 'lucide-react';

function FactCard({ fact, index }: { fact: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex items-start gap-4"
    >
      <div className="shrink-0 mt-1 p-2 bg-amber-100 rounded-xl">
        <Star className="w-4 h-4 text-amber-600" />
      </div>
      <p className="text-slate-700 text-sm leading-relaxed">{fact}</p>
    </motion.div>
  );
}

export default function InterestingFacts() {
  return (
    <section id="facts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Feather className="w-6 h-6 text-emerald-600" />
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">Interesting Facts</h2>
            <Feather className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {interestingFacts.map((fact, i) => (
            <FactCard key={i} fact={fact} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
