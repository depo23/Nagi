import { useState, useRef } from 'react';

interface OrganicAudioPlayerProps {
  src: string;
}

export function OrganicAudioPlayer({ src }: OrganicAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration && !isNaN(duration)) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * audioRef.current.duration;
    setProgress(ratio * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 rounded-full"
      style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(200,131,42,0.18)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="none"
      />

      {/* Play / Pause button */}
      <button
        onClick={togglePlay}
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-700"
        style={{
          background: isPlaying ? '#C8832A' : 'rgba(200,131,42,0.22)',
          border: '1px solid rgba(200,131,42,0.55)',
          boxShadow: isPlaying ? '0 0 12px rgba(200,131,42,0.45)' : 'none',
        }}
      >
        {isPlaying ? (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="#E8DCC8">
            <rect x="1" y="1" width="2.5" height="7" rx="0.5" />
            <rect x="5.5" y="1" width="2.5" height="7" rx="0.5" />
          </svg>
        ) : (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="#E8DCC8" style={{ marginLeft: 1 }}>
            <polygon points="1.5,1 8,4.5 1.5,8" />
          </svg>
        )}
      </button>

      {/* Progress track */}
      <div
        className="flex-1 relative cursor-pointer"
        style={{ height: 2, background: 'rgba(200,131,42,0.18)', borderRadius: 999 }}
        onClick={handleSeek}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            background: '#C8832A',
            borderRadius: 999,
            transition: 'width 0.1s linear',
          }}
        />
        {/* Dot handle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${progress}%`,
            transform: 'translate(-50%, -50%)',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#E8DCC8',
            boxShadow: '0 0 6px rgba(200,131,42,0.7)',
            transition: 'left 0.1s linear',
          }}
        />
      </div>
    </div>
  );
}
