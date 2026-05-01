import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const LogoBranding: React.FC<{
  startFrame: number;
  finalOpacity?: number;
  title?: string;
  subtitle?: string;
}> = ({ startFrame, finalOpacity = 1, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;
  
  // Animation d’apparition : scale + blur
  const scale = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 200, stiffness: 100 },
    from: 0.8,
    to: 1,
  });
  
  const blur = interpolate(relativeFrame, [0, 60], [8, 0], {
    extrapolateRight: 'clamp',
  });
  
  const opacity = interpolate(relativeFrame, [0, 45], [0, finalOpacity], {
    extrapolateRight: 'clamp',
  });
  
  // Légère pulsation = respiration, 1 cycle sur 6s
  const breathe = 1 + Math.sin(relativeFrame / fps * Math.PI / 3) * 0.02;
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transform: `scale(${scale * breathe})`,
      filter: `blur(${blur}px)`,
    }}>
      <Img 
        src={staticFile('logo-sablier.png')} // Mets ton image ici
        style={{ 
          width: 280, 
          height: 'auto',
          filter: 'drop-shadow(0 0 30px rgba(100, 180, 255, 0.3))',
        }} 
      />
      {title && (
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 42,
          fontWeight: 300,
          color: '#fff',
          marginTop: 30,
          letterSpacing: '0.1em',
          textShadow: '0 2px 20px rgba(0,0,0,0.6)',
          opacity: interpolate(relativeFrame, [60, 120], [0, 1]),
        }}>
          {title}
        </h1>
      )}
      {subtitle && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          fontWeight: 200,
          color: '#c9a961',
          marginTop: 10,
          letterSpacing: '0.2em',
          opacity: interpolate(relativeFrame, [120, 180], [0, 1]),
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
