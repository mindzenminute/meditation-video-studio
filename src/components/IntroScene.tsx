import React, { memo } from 'react';
import { AbsoluteFill, Sequence, Video, staticFile } from 'remotion';
import { LogoBranding, LogoBrandingProps } from './LogoBranding';
import { TransitionWave } from './TransitionWave';

export type IntroSceneProps = {
  branding: Omit<LogoBrandingProps, 'startFrame'>;
  /** MODIF: 210 frames = 7s. La transition démarre à 7s pour finir à 8s */
  transitionStartFrame?: number;
  /** MODIF: Chemin vers ta vidéo générée 8s. Ex: "intro-bg.mp4" dans /public */
  backgroundVideoSrc?: string;
};

/**
 * IntroScene — Scène d'introduction (0–8s / 0–240 frames)
 * MODIF: Durée passée de 30s à 8s pour YouTube méditation
 * Affiche vidéo générée + branding + transition de sortie
 */
export const IntroScene: React.FC<IntroSceneProps> = memo(({
  branding,
  transitionStartFrame = 210, // MODIF: 840 → 210 = 7s
  backgroundVideoSrc, // MODIF: prop pour vidéo générée
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      
      {/* MODIF: Vidéo générée en fond si fournie */}
      {backgroundVideoSrc && (
        <AbsoluteFill>
          <Video
            src={staticFile(backgroundVideoSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5, // MODIF: 50% pour pas bouffer le logo
            }}
          />
        </AbsoluteFill>
      )}
      
      {/* MODIF: Gradient par-dessus la vidéo pour lisibilité du logo */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(10, 22, 40, 0.6) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(10, 22, 40, 0.4) 0%, transparent 65%)
          `,
          opacity: 0.8,
        }}
      />
      
      {/* Logo + Breath Bubbles animés */}
      <Sequence>
        <LogoBranding {...branding} startFrame={0} />
      </Sequence>
      
      {/* MODIF: Transition sortante à 7s pour finir à 8s */}
      <Sequence from={transitionStartFrame}>
        <TransitionWave direction="up" />
      </Sequence>
      
    </AbsoluteFill>
  );
});

IntroScene.displayName = 'IntroScene';
export default IntroScene;
