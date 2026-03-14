import React, { memo } from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { LogoBranding, LogoBrandingProps } from './LogoBranding';
import { TransitionWave } from './TransitionWave';

export type IntroSceneProps = {
  branding: Omit<LogoBrandingProps, 'startFrame'>;
  transitionStartFrame?: number;
};

/**
 * IntroScene — Scène d'introduction (0–30s / 0–900 frames)
 * Affiche le branding avec animation d'entrée douce
 * Inclut une transition de sortie vers la scène suivante
 */
export const IntroScene: React.FC<IntroSceneProps> = memo(({
  branding,
  transitionStartFrame = 840,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      <Sequence>
        <LogoBranding {...branding} startFrame={0} />
      </Sequence>
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(100, 120, 180, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(150, 130, 200, 0.06) 0%, transparent 45%)
          `,
          opacity: 0.7,
        }}
      />
      <Sequence from={transitionStartFrame}>
        <TransitionWave direction="up" />
      </Sequence>
    </AbsoluteFill>
  );
});

IntroScene.displayName = 'IntroScene';
export default IntroScene;
