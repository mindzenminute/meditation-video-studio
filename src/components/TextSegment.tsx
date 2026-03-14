import React, { memo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

// ============================================================================
// 📦 TYPES — Exportés pour utilisation dans MeditationVideo.tsx
// ============================================================================

/**
 * Segment de texte de guidance avec timing précis
 * Utilisé dans MeditationVideoInputProps.guidanceSegments
 */
export type MeditationSegment = {
  /** Texte à afficher */
  text: string;
  /** Temps de début en secondes (relatif au début de la phase guidance) */
  startTime: number;
  /** Durée d'affichage en secondes */
  duration: number;
  /** Alignement optionnel (défaut: 'center') */
  align?: 'left' | 'center' | 'right';
};

export type TextSegmentProps = {
  text: string;
  startFrame: number;
  fadeInDuration?: number;
  displayDuration?: number;
  fadeOutDuration?: number;
  align?: 'left' | 'center' | 'right';
  marginLeft?: number;
  marginRight?: number;
};

/**
 * TextSegment — Affichage progressif du texte de guidance
 */
export const TextSegment: React.FC<TextSegmentProps> = memo(({
  text,
  startFrame,
  fadeInDuration = 60,
  displayDuration = 180,
  fadeOutDuration = 60,
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
      easing: (t) => t * t * (3 - 2 * t),
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
  
  const parallaxOffset = interpolate(relativeFrame, [0, totalDuration], [0, 5], {
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
          fontSize: 36,
          fontWeight: 300,
          lineHeight: 1.6,
          color: '#f0f0ff',
          textAlign,
          margin: 0,
          maxWidth: width - marginLeft - marginRight - 40,
          textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
          filter: `blur(${interpolate(opacity, [0, 0.5, 1], [2, 0.5, 0], { extrapolateLeft: 'clamp' })}px)`,
        }}
      >
        {text}
      </p>
    </AbsoluteFill>
  );
});

TextSegment.displayName = 'TextSegment';
export default TextSegment;
