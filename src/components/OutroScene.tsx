import React, { memo } from 'react';
import { AbsoluteFill, Sequence, Video, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { LogoBranding, LogoBrandingProps } from './LogoBranding';
// MODIF: CallToAction supprimé de l’outro principale

export type OutroSceneProps = {
  branding: Omit<LogoBrandingProps, 'startFrame'>;
  /** MODIF: Durée totale de l’outro en frames. 300 = 10s */
  durationInFrames?: number;
  /** MODIF: Frame où démarre le fade final. 270 = à 9s sur 10s */
  fadeOutStartFrame?: number;
  /** MODIF: Vidéo générée 10s pour le fond. Ex: "outro-bg-10s.mp4" */
  backgroundVideoSrc?: string;
  /** MODIF: Si tu veux quand même un CTA, mets-le en optionnel */
  cta?: React.ReactNode;
};

/**
 * OutroScene — Scène de clôture (10min21s–10min31s / 10s total)
 * MODIF: Durée passée de 30s à 10s pour YouTube méditation
 * Affiche vidéo générée + branding + fade out doux
 */
export const OutroScene: React.FC<OutroSceneProps> = memo(({
  branding,
  durationInFrames = 300, // MODIF: 10s par défaut
  fadeOutStartFrame = 270, // MODIF: 17700 → 270 = fade à 9s
  backgroundVideoSrc,
  cta, // MODIF: optionnel maintenant
}) => {
  const brandingStartFrame = 0; // MODIF: Logo direct à 0s

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      
      {/* MODIF: Vidéo générée en fond */}
      {backgroundVideoSrc && (
        <AbsoluteFill>
          <Video
            src={staticFile(backgroundVideoSrc)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.4, // MODIF: Plus bas que l’intro pour finir en douceur
            }}
          />
        </AbsoluteFill>
      )}
      
      {/* Gradient pour lisibilité */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(201, 169, 97, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 30% 80%, rgba(150, 130, 200, 0.03) 0%, transparent 60%)
          `,
          opacity: 0.5,
        }}
      />
      
      {/* MODIF: Logo direct, pas de CTA avant */}
      <Sequence from={brandingStartFrame}>
        <LogoBranding {...branding} startFrame={0} finalOpacity={0.9} />
      </Sequence>
      
      {/* MODIF: CTA optionnel, après 5s si tu le veux vraiment */}
      {cta && (
        <Sequence from={150}> {/* 5s */}
          {cta}
        </Sequence>
      )}
      
      {/* MODIF: Fade final à 9s sur 10s */}
      <Sequence from={fadeOutStartFrame}>
        <FinalFade />
      </Sequence>
      
    </AbsoluteFill>
  );
});

const FinalFade: React.FC = memo(() => {
  const frame = useCurrentFrame();
  // MODIF: 30 frames = 1s de fade, pas 90
  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ backgroundColor: '#000000', opacity: progress }} />;
});

OutroScene.displayName = 'OutroScene';
export default OutroScene;
