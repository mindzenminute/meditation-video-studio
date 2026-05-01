import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export type TransitionWaveProps = {
  /** MODIF: 30 frames = 1s. Parfait pour transition entre TextSegment */
  duration?: number;
  direction?: 'up' | 'down';
  color?: string;
  /** MODIF: Opacité max plus basse pour rester subtil */
  maxOpacity?: number;
};

export const TransitionWave: React.FC<TransitionWaveProps> = memo(({
  duration = 30, // MODIF: Garde 1s
  direction = 'up',
  color = '#1a1a3a',
  maxOpacity = 0.6, // MODIF: 0.9 → 0.6 = moins opaque
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const eased = progress * progress * (3 - 2 * progress);
  
  const getWavePath = () => {
    // MODIF: Amplitude divisée par 2 pour une vague plus douce
    const amplitude = 15; // 30 → 15
    const frequency = 0.015; // MODIF: Fréquence plus basse = vague plus large, plus lente
    const points: [number, number][] = [];
    
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * width;
      const waveOffset = Math.sin(x * frequency + eased * Math.PI * 2) * amplitude * (1 - eased);
      let y = direction === 'up' 
        ? height - (eased * (height + 50)) + waveOffset // MODIF: +100 → +50 = traverse moins
        : (eased * (height + 50)) + waveOffset;
      points.push([x, y]);
    }
    
    return `M 0 ${height} L ${points.map(([x, y]) => `${x} ${y}`).join(' L ')} L ${width} ${height} Z`;
  };
  
  // MODIF: Courbe d’opacité plus douce : monte vite, reste stable, descend vite
  const opacity = interpolate(eased, [0, 0.15, 0.85, 1], [0, maxOpacity, maxOpacity, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', top: 0, left: 0, opacity }}>
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.05" />
            <stop offset="50%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
          {/* MODIF: Blur plus léger */}
          <filter id="waveBlur"><feGaussianBlur in="SourceGraphic" stdDeviation="1.5" /></filter>
        </defs>
        <path d={getWavePath()} fill="url(#waveGradient)" filter="url(#waveBlur)" />
      </svg>
    </AbsoluteFill>
  );
});

TransitionWave.displayName = 'TransitionWave';
export default TransitionWave;
