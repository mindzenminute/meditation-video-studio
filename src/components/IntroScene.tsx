import React, { memo } from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { LogoBranding, LogoBrandingProps } from './LogoBranding';
import { TransitionWave } from './TransitionWave';

export type IntroSceneProps = {
  branding: Omit<LogoBrandingProps, 'startFrame'>;
  /** MODIF: Titre de la méditation à afficher */
  titre: string;
  /** MODIF: Frame de début de la transition. 6s = 180 frames pour une intro de 8s */
  transitionStartFrame?: number;
};

/**
 * IntroScene — Scène d'introduction (0–8s / 0–240 frames) // MODIF: 30s → 8s
 * Affiche le branding + titre avec animation douce
 * Transition de sortie vers BreathingCircle
 */
export const IntroScene: React.FC<IntroSceneProps> = memo(({
  branding,
  titre,
  transitionStartFrame = 180, // MODIF: 840 → 180 = 6s. Laisse 2s pour le fondu
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // MODIF: Animation du titre qui apparaît après le logo
  // Logo : 0-2s, Titre : 2-5s, Maintien : 5-8s
  const titleOpacity = interpolate(
    frame,
    [2 * fps, 3 * fps, 5 * fps, 6 * fps], // 2s → 3s fade in, 5s → 6s fade out
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  const titleY = interpolate(
    frame,
    [2 * fps, 3 * fps],
    [20, 0], // Monte de 20px en apparaissant
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      {/* Fond doux avec gradients */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(100, 120, 180, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(150, 130, 200, 0.06) 0%, transparent 45%)
          `,
          opacity: 0.7,
        }}
      />
      
      {/* LogoBranding : apparaît de 0s à 8s */}
      <Sequence durationInFrames={8 * fps}>
        <LogoBranding {...branding} startFrame={0} />
      </Sequence>
      
      {/* MODIF: Titre de la méditation qui apparaît à 2s */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: '60%', // Sous le logo
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 36,
            fontWeight: 300,
            color: '#ffffff',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            letterSpacing: '0.05em',
            textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
          }}
        >
          {titre}
        </div>
      </AbsoluteFill>
      
      {/* Transition vers BreathingCircle à 6s */}
      <Sequence from={transitionStartFrame}>
        <TransitionWave direction="up" />
      </Sequence>
    </AbsoluteFill>
  );
});

IntroScene.displayName = 'IntroScene';
export default IntroScene;
