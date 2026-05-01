import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export type MeditationSegment = {
  text: string;
  startTime: number;
  duration: number;
  align?: 'left' | 'center' | 'right';
};

export type TextSegmentProps = {
  text: string;
  startFrame: number;
  /** MODIF: 30 frames = 1s de fade in */
  fadeInDuration?: number;
  /** MODIF: 510 frames = 17s de lecture fixe */
  displayDuration?: number;
  /** MODIF: 30 frames = 1s de fade out */
  fadeOutDuration?: number;
  align?: 'left' | 'center' | 'right';
  marginLeft?: number;
  marginRight?: number;
};

/**
 * TextSegment — Affichage progressif du texte de guidance
 * MODIF: Durée totale par défaut = 30 + 510 + 30 = 570 frames = 19s
 * Avec 1s de TransitionWave avant = 20s par segment
 */
export const TextSegment: React.FC<TextSegmentProps> = memo(({
  text,
  startFrame,
  fadeInDuration = 30, // MODIF: 60 → 30 = 1s
  displayDuration = 510, // MODIF: 180 → 510 = 17s
  fadeOutDuration = 30, // MODIF: 60 → 30 = 1s
  align = 'center',
  marginLeft = 120,
  marginRight = 120,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  
  const relativeFrame = frame - startFrame;
  const totalDuration = fadeInDuration + displayDuration + fadeOutDuration;
  
  if (relativeFrame < 0 || relativeFrame > totalDuration) return null;
  
  let opacity = 0;
  if (relativeFrame < fadeInDuration) {
    opacity = interpolate(relativeFrame, [0, fadeInDuration], [0, 1], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      easing: (t) => t * t * (3 - 2 * t), // MODIF: Garde le easing doux
    });
  } else if (relativeFrame < fadeInDuration + displayDuration) {
    opacity = 1;
  } else {
    const fadeProgress = (relativeFrame - fadeInDuration - displayDuration) / fadeOutDuration;
    opacity = interpolate(fadeProgress, [0, 1], [1, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
  }
  
  const textAlign = align;
  const paddingLeft = align === 'left' ? marginLeft : align === 'center' ? 0 : 'auto';
  const paddingRight = align === 'right' ? marginRight : align === 'center' ? 0 : 'auto';
  
  // MODIF: Parallax réduit à 3px max. Optionnel : commente ces 3 lignes si tu veux 0 mouvement
  const parallaxOffset = interpolate(relativeFrame, [0, totalDuration], [0, 3], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        paddingLeft,
        paddingRight,
        opacity,
        transform: `translateX(${parallaxOffset}px)`,
      }}
    >
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 36, // MODIF: Tu peux passer à 32 si tu trouves ça gros
          fontWeight: 300,
          lineHeight: 1.6,
          color: '#f0f0ff',
          textAlign,
          margin: 0,
          maxWidth: width - marginLeft - marginRight - 40,
          textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
          // MODIF: Blur plus subtil pour le zen
          filter: `blur(${interpolate(opacity, [0, 0.3, 1], [1, 0, 0], { extrapolateLeft: 'clamp' })}px)`,
        }}
      >
        {text}
      </p>
    </AbsoluteFill>
  );
});

TextSegment.displayName = 'TextSegment';
export default TextSegment;
