import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Headphones, RotateCcw } from 'lucide-react';

interface AudioTrack {
  label: string;
  sublabel: string;
  src: string;
  lang: string;
}

const tracks: AudioTrack[] = [
  {
    label: 'Listen in English',
    sublabel: 'English narration about the Goose',
    src: '/images/goose/Goose.mpeg',
    lang: 'EN',
  },
  {
    label: 'हिंदी में सुनें',
    sublabel: 'Hindi narration about the Goose',
    src: '/images/goose/Hans_Hindi.mpeg',
    lang: 'HI',
  },
];

function AudioCard({
  track,
  index,
  activeTrack,
  setActiveTrack,
}: {
  track: AudioTrack;
  index: number;
  activeTrack: string | null;
  setActiveTrack: (src: string | null) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  const isActive = activeTrack === track.src;

  useEffect(() => {
    if (!isActive && playing) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [isActive, playing]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      setActiveTrack(null);
    } else {
      setActiveTrack(track.src);
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setError('Unable to play audio. Please check the file.'));
    }
  }, [playing, track.src, setActiveTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setLoaded(true);
      setError(null);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
    setActiveTrack(null);
  };

  const handleError = () => {
    setError('Audio file not found or unsupported format.');
    setLoaded(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration, pos * duration));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const restart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!playing) {
      setActiveTrack(track.src);
      audioRef.current.play().then(() => setPlaying(true));
    }
  };

  const formatTime = (t: number) => {
    if (!isFinite(t) || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="p-3 bg-white/25 rounded-2xl">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          {playing && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-white truncate">{track.label}</h3>
          <p className="text-white/60 text-xs sm:text-sm">{track.sublabel}</p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
        onError={handleError}
      />

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm flex items-center gap-2">
          <VolumeX className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={togglePlay}
          disabled={!loaded && !error}
          className="shrink-0 p-3 sm:p-4 bg-white/30 hover:bg-white/50 disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" />
          )}
        </button>

        <button
          onClick={restart}
          disabled={!loaded}
          className="shrink-0 p-2 sm:p-3 bg-white/20 hover:bg-white/40 disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-all duration-200"
          aria-label="Restart"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-white/70 text-xs sm:text-sm mb-1.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="w-full h-2 sm:h-2.5 bg-white/20 rounded-full overflow-hidden cursor-pointer group"
          >
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-100 group-hover:bg-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="shrink-0 p-2 bg-white/15 hover:bg-white/30 rounded-full transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white/70" />
          ) : (
            <Volume2 className="w-4 h-4 text-white/70" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
        <span className="text-white/50 text-xs w-8 text-right">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>
    </motion.div>
  );
}

export default function AudioGuide() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <section id="audio" className="py-16 sm:py-20 bg-gradient-to-br from-emerald-800 via-teal-800 to-sky-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Goose Audio Guide</h2>
          <p className="mt-3 text-white/60 text-sm sm:text-base max-w-xl mx-auto px-4">
            Learn about the Goose through audio narration available in English and Hindi.
          </p>
          <div className="mt-3 w-16 h-1 bg-white/40 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {tracks.map((track, i) => (
            <AudioCard
              key={track.src}
              track={track}
              index={i}
              activeTrack={activeTrack}
              setActiveTrack={setActiveTrack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
