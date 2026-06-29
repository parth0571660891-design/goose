import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, Headphones } from 'lucide-react';

interface AudioTrack {
  label: string;
  sublabel: string;
  src: string;
}

const tracks: AudioTrack[] = [
  { label: 'Listen in English', sublabel: 'English narration', src: '/english.mp3' },
  { label: 'हिंदी में सुनें', sublabel: 'Hindi narration', src: '/hindi.mp3' },
];

function AudioCard({ track, index }: { track: AudioTrack; index: number }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoaded = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (t: number) => {
    if (!isFinite(t) || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white/30 rounded-2xl">
          <Headphones className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{track.label}</h3>
          <p className="text-white/70 text-sm">{track.sublabel}</p>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-4 bg-white/30 hover:bg-white/50 rounded-full transition-colors"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Volume2 className="w-4 h-4" />
            <span>{formatTime(currentTime)}</span>
            <span className="text-white/40">/</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="mt-2 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AudioGuide() {
  return (
    <section id="audio" className="py-20 bg-gradient-to-br from-emerald-800 via-teal-800 to-sky-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Goose Audio Guide</h2>
          <p className="mt-3 text-white/70 text-sm max-w-xl mx-auto">
            Learn about the Goose through audio narration available in English and Hindi.
          </p>
          <div className="mt-3 w-16 h-1 bg-white/40 mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tracks.map((track, i) => (
            <AudioCard key={track.src} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
