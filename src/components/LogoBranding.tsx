import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export type LogoBrandingProps = {
  title: string;
  subtitle?: string;
  startFrame?: number;
  entranceDuration?: number;
  finalOpacity?: number;
  /** MODIF: mode 'intro' = apparition normale, 'background' = discret en fond */
  mode?: 'intro' | 'background';
};

export const LogoBranding: React.FC<LogoBrandingProps> = memo(({
  title,
  subtitle,
  startFrame = 0,
  entranceDuration = 45, // MODIF: 90 → 45 = 1.5s. Plus rapide pour intro 8s
  finalOpacity = 1,
  mode = 'intro', // MODIF: nouveau prop
}) => {
  const frame = useCurrentFrame();
  
  const progress = interpolate(
    frame - startFrame,
    [0, entranceDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const eased = progress * progress * (3 - 2 * progress);
  
  // MODIF: Si mode background, on reste à opacity basse tout le temps
  const opacity = mode === 'background' 
    ? 0.1 // 10% fixe pour le fond
    : eased * finalOpacity;
  
  const scale = mode === 'background' 
    ? 1 // Pas d’anim de scale en fond
    : interpolate(eased, [0, 1], [0.95, 1]);
  
  const translateY = mode === 'background'
    ? 0 // Pas de mouvement en fond
    : interpolate(eased, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        // MODIF: Fond transparent si mode background, sinon bleu foncé
        backgroundColor: mode === 'background' ? 'transparent' : '#0a1628',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        // MODIF: pointerEvents none pour laisser cliquer à travers en background
        pointerEvents: mode === 'background' ? 'none' : 'auto',
      }}
    >
      <h1
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: mode === 'background' ? 32 : 48, // MODIF: plus petit en fond
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
            fontSize: mode === 'background' ? 14 : 20, // MODIF: plus petit en fond
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
          width: mode === 'background' ? 80 : 120, // MODIF: barre plus courte en fond
          height: 2,
          background: 'linear-gradient(90deg, transparent, #c9a961, transparent)',
          marginTop: mode === 'background' ? 16 : 24,
          opacity: mode === 'background' ? 0.3 : 0.6,
        }}
      />
    </AbsoluteFill>
  );
});

LogoBranding.displayName = 'LogoBranding';
export default LogoBranding;
