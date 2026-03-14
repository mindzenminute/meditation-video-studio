import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export type TransitionWaveProps = {
  duration?: number;
  direction?: 'up' | 'down';
  color?: string;
  maxOpacity?: number;
};

export const TransitionWave: React.FC<TransitionWaveProps> = memo(({
  duration = 30,
  direction = 'up',
  color = '#1a1a3a',
  maxOpacity = 0.9,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const eased = progress * progress * (3 - 2 * progress);
  
  const getWavePath = () => {
    const amplitude = 30;
    const frequency = 0.02;
    const points: [number, number][] = [];
    
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * width;
      const waveOffset = Math.sin(x * frequency + eased * Math.PI * 2) * amplitude * (1 - eased);
      let y = direction === 'up' 
        ? height - (eased * (height + 100)) + waveOffset
        : (eased * (height + 100)) + waveOffset;
      points.push([x, y]);
    }
    
    return `M 0 ${height} L ${points.map(([x, y]) => `${x} ${y}`).join(' L ')} L ${width} ${height} Z`;
  };
  
  const opacity = interpolate(eased, [0, 0.2, 0.8, 1], [0, maxOpacity * 0.8, maxOpacity * 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', top: 0, left: 0, opacity }}>
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
          <filter id="waveBlur"><feGaussianBlur in="SourceGraphic" stdDeviation="3" /></filter>
        </defs>
        <path d={getWavePath()} fill="url(#waveGradient)" filter="url(#waveBlur)" />
      </svg>
    </AbsoluteFill>
  );
});

TransitionWave.displayName = 'TransitionWave';
export default TransitionWave;
