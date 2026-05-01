import React, { memo, useMemo } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export type BreathingCircleProps = {
  startFrame: number;
  /** MODIF: 6s par défaut = 3s inspire + 3s expire. 3 cycles = 18s total */
  cycleDuration?: number; 
  /** MODIF: nombre max de cycles avant stop. 3 cycles = 18s */
  maxCycles?: number;
  inhaleText?: string;
  exhaleText?: string;
  circleColor?: string;
  textColor?: string;
};

export const BreathingCircle: React.FC<BreathingCircleProps> = memo(({
  startFrame,
  cycleDuration = 6, // MODIF: 8 → 6 pour faire 3s/3s
  maxCycles = 3, // MODIF: on arrête après 3 cycles = 18s
  inhaleText = 'Inspirez',
  exhaleText = 'Expirez',
  circleColor = '#c9a961',
  textColor = '#ffffff',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const relativeFrame = frame - startFrame;
  const cycleFrames = cycleDuration * fps;
  
  // MODIF: On calcule le cycle actuel et on stoppe après maxCycles
  const currentCycle = Math.floor(relativeFrame / cycleFrames);
  const isFinished = currentCycle >= maxCycles;
  
  // Si fini, on bloque sur la dernière frame du dernier cycle
  const clampedFrame = isFinished 
    ? maxCycles * cycleFrames - 1 
    : relativeFrame;
  
  const cycleProgress = (clampedFrame % cycleFrames) / cycleFrames;
  
  const isInhalePhase = cycleProgress < 0.5;
  const phaseProgress = isInhalePhase ? cycleProgress * 2 : (cycleProgress - 0.5) * 2;
  
  // MODIF: damping plus doux pour coller au rythme zen 3s/3s
  const springConfig = useMemo(() => ({ damping: 25, stiffness: 80, mass: 1 }), []);
  const baseRadius = 80;
  const maxRadius = 180;
  const targetRadius = isInhalePhase ? maxRadius : baseRadius;
  
  const currentRadius = spring({
    frame: clampedFrame,
    fps,
    config: springConfig,
    from: baseRadius,
    to: targetRadius,
  });
  
  // MODIF: Si fini, on fade out le texte et le cercle
  const globalOpacity = isFinished 
    ? interpolate(relativeFrame - maxCycles * cycleFrames, [0, 30], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;
  
  const textOpacity = interpolate(phaseProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }) * globalOpacity;
  
  const displayText = isInhalePhase ? inhaleText : exhaleText;
  const textTranslateY = interpolate(currentRadius, [baseRadius, maxRadius], [10, -10], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'transparent',
      opacity: globalOpacity // MODIF: fade out à la fin
    }}>
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
          opacity: 0.6 * globalOpacity, // MODIF: fade out aussi
          transform: `translateY(${currentRadius + 30}px)`,
        }}
      />
    </AbsoluteFill>
  );
});

BreathingCircle.displayName = 'BreathingCircle';
export default BreathingCircle;
