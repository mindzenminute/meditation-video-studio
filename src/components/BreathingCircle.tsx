import React, { memo, useMemo } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type BreathingCircleProps = {
  /** Frame de début de l'animation */
  startFrame: number;
  /** Durée d'un cycle complet en secondes (défaut: 8 = 4s inhale + 4s exhale) */
  cycleDuration?: number;
  /** Texte pendant l'inspiration */
  inhaleText?: string;
  /** Texte pendant l'expiration */
  exhaleText?: string;
  /** Couleur du cercle */
  circleColor?: string;
  /** Couleur du texte */
  textColor?: string;
};

/**
 * BreathingCircle — Cercle animé avec cycle de respiration 4s/4s
 * Utilise spring() pour un mouvement naturel et fluide
 * Texte synchronisé : "Inspirez" / "Expirez"
 */
export const BreathingCircle: React.FC<BreathingCircleProps> = memo(({
  startFrame,
  cycleDuration = 8,
  inhaleText = 'Inspirez',
  exhaleText = 'Expirez',
  circleColor = '#c9a961',
  textColor = '#ffffff',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const relativeFrame = frame - startFrame;
  const cycleFrames = cycleDuration * fps;
  const cycleProgress = (relativeFrame % cycleFrames) / cycleFrames;
  
  const isInhalePhase = cycleProgress < 0.5;
  const phaseProgress = isInhalePhase ? cycleProgress * 2 : (cycleProgress - 0.5) * 2;
  
  const springConfig = useMemo(() => ({ damping: 20, stiffness: 100, mass: 1 }), []);
  const baseRadius = 80;
  const maxRadius = 180;
  const targetRadius = isInhalePhase ? maxRadius : baseRadius;
  
  const currentRadius = spring({
    frame: relativeFrame,
    fps,
    config: springConfig,
    from: baseRadius,
    to: targetRadius,
  });
  
  const textOpacity = interpolate(phaseProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  
  const displayText = isInhalePhase ? inhaleText : exhaleText;
  const textTranslateY = interpolate(currentRadius, [baseRadius, maxRadius], [10, -10], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div
        style={{
          width: currentRadius * 2,
          height: currentRadius * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${circleColor}40 0%, ${circleColor}10 70%, transparent 100%)`,
          border: `2px solid ${circleColor}80`,
          boxShadow: `0 0 30px ${circleColor}30, inset 0 0 20px ${circleColor}20`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 32,
          fontWeight: 300,
          color: textColor,
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
          letterSpacing: '0.05em',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
          pointerEvents: 'none',
        }}
      >
        {displayText}
      </div>
      <div
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: circleColor,
          opacity: 0.6,
          transform: `translateY(${currentRadius + 30}px)`,
        }}
      />
    </AbsoluteFill>
  );
});

BreathingCircle.displayName = 'BreathingCircle';
export default BreathingCircle;
