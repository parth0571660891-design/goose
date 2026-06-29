import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { conservationTips } from '../data/gooseData';
import { ShieldCheck } from 'lucide-react';

function TipCard({ tip, index }: { tip: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex items-start gap-4 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="shrink-0 p-2 bg-emerald-100 rounded-xl">
        <ShieldCheck className="w-5 h-5 text-emerald-700" />
      </div>
      <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
    </motion.div>
  );
}

export default function ConservationTips() {
  return (
    <section id="tips" className="py-20 bg-gradient-to-b from-teal-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900">Conservation Tips</h2>
          <div className="mt-3 w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {conservationTips.map((tip, i) => (
            <TipCard key={i} tip={tip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
