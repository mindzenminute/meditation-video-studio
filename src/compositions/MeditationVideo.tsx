import React, { memo } from 'react';
import { AbsoluteFill, Series, Sequence } from 'remotion';
import { IntroScene } from '../components/IntroScene';
import { BreathingCircle } from '../components/BreathingCircle';
import { TextSegment, MeditationSegment } from '../components/TextSegment';
import { TransitionWave } from '../components/TransitionWave';
import { OutroScene } from '../components/OutroScene';

// ============================================================================
// 📦 INTERFACE INPUT PROPS
// ============================================================================

export type { MeditationSegment };

export type MeditationVideoInputProps = {
  title: string;
  subtitle?: string;
  introBranding: { title: string; subtitle?: string };
  outroBranding: { title: string; subtitle?: string };
  breathingCycles?: number;
  breathingCycleDuration?: number;
  guidanceSegments: MeditationSegment[];
  callToAction: { title: string; message: string; actionText: string };
  breathingCircleColor?: string;
  enableParticles?: boolean;
};

// ============================================================================
// 🎬 COMPOSITION PRINCIPALE
// ============================================================================

/**
 * MeditationVideo — Orchestre une vidéo de méditation guidée de 10 minutes
 */
export const MeditationVideo: React.FC<MeditationVideoInputProps> = memo((props) => {
  const {
    introBranding,
    outroBranding,
    breathingCycleDuration = 8,
    guidanceSegments,
    callToAction,
    breathingCircleColor = '#c9a961',
  } = props;
  
  const FPS = 30;
  const INTRO_DURATION = 30 * FPS;
  const BREATHING_DURATION = 30 * FPS;
  const GUIDANCE_DURATION = 9 * 60 * FPS;
  const OUTRO_DURATION = 90 * FPS;
  
  // GUIDANCE_START calculé mais non utilisé directement avec Series.Sequence
  // (gardé en commentaire pour référence si besoin de Sequence manuel)
  // const GUIDANCE_START = INTRO_DURATION + BREATHING_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      <Series>
        {/* === SCÈNE 1: INTRO [0–30s] === */}
        <Series.Sequence durationInFrames={INTRO_DURATION}>
          <IntroScene branding={{ title: introBranding.title, subtitle: introBranding.subtitle }} />
        </Series.Sequence>
        
        {/* === SCÈNE 2: RESPIRATION [30–60s] === */}
        <Series.Sequence durationInFrames={BREATHING_DURATION}>
          <AbsoluteFill>
            <BreathingCircle startFrame={0} cycleDuration={breathingCycleDuration} circleColor={breathingCircleColor} />
            <Sequence from={BREATHING_DURATION - 30}>
              <TransitionWave direction="up" />
            </Sequence>
          </AbsoluteFill>
        </Series.Sequence>
        
        {/* === SCÈNE 3: GUIDANCE [1min–8min] === */}
        <Series.Sequence durationInFrames={GUIDANCE_DURATION}>
          <AbsoluteFill>
            {guidanceSegments.map((segment, index) => {
              const startFrame = segment.startTime * FPS;
              return (
                <TextSegment
                  key={index}
                  text={segment.text}
                  startFrame={startFrame}
                  align={segment.align}
                  fadeInDuration={60}
                  displayDuration={segment.duration * FPS - 120}
                  fadeOutDuration={60}
                />
              );
            })}
            <Sequence from={GUIDANCE_DURATION - 30}>
              <TransitionWave direction="up" />
            </Sequence>
          </AbsoluteFill>
        </Series.Sequence>
        
        {/* === SCÈNE 4: OUTRO [9:30–10min] === */}
        <Series.Sequence durationInFrames={OUTRO_DURATION}>
          <OutroScene
            sceneStartFrame={0}
            branding={{ title: outroBranding.title, subtitle: outroBranding.subtitle }}
            cta={{ title: callToAction.title, message: callToAction.message, actionText: callToAction.actionText }}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
});

MeditationVideo.displayName = 'MeditationVideo';
export default MeditationVideo;
