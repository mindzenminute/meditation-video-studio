import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export type LogoBrandingProps = {
  title: string;
  subtitle?: string;
  startFrame?: number;
  entranceDuration?: number;
};

export const LogoBranding: React.FC<LogoBrandingProps> = memo(({
  title,
  subtitle,
  startFrame = 0,
  entranceDuration = 90,
}) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(
    frame - startFrame,
    [0, entranceDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const eased = progress * progress * (3 - 2 * progress);
  const opacity = eased;
  const scale = interpolate(eased, [0, 1], [0.95, 1]);
  const translateY = interpolate(eased, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a1628',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
    >
      <h1
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 48,
          fontWeight: 300,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '0.05em',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 20,
            fontWeight: 300,
            color: '#a0a0c0',
            margin: '12px 0 0 0',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: 120,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #c9a961, transparent)',
          marginTop: 24,
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
});

LogoBranding.displayName = 'LogoBranding';
export default LogoBranding;
