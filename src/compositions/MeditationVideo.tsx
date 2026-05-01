import React from 'react';
import { AbsoluteFill, Sequence, Composition, staticFile } from 'remotion';
import { IntroScene } from './IntroScene';
import { BreathingCircle } from './BreathingCircle';
import { TextSegment } from './TextSegment';
import { TransitionWave } from './TransitionWave';
import { OutroScene } from './OutroScene';
import { LogoBranding } from './LogoBranding';

// ============================================================================
// CONSTANTES GLOBALES — 10min31 à 30fps
// ============================================================================
export const FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

export const INTRO_DURATION = 8 * FPS;        // 240 frames = 8s
export const BREATHING_DURATION = 18 * FPS;   // 540 frames = 18s  
export const OUTRO_DURATION = 10 * FPS;       // 300 frames = 10s
export const SEGMENT_DURATION = 19 * FPS;     // 570 frames = 19s par texte
export const TRANSITION_DURATION = 1 * FPS;   // 30 frames = 1s
export const TOTAL_DURATION = 10 * 60 * FPS + 31 * FPS; // 18654 frames = 10min31s

// ============================================================================
// SCRIPT DE GUIDANCE — 28 segments = 9min15 de guidance pure
// ============================================================================
export const GUIDANCE_SCRIPT: string[] = [
  "Posez-vous confortablement",
  "Fermez doucement les yeux",
  "Sentez le poids de votre corps",
  "Relâchez vos épaules",
  "Détendez votre mâchoire",
  "Observez votre respiration naturelle",
  "Sans la changer, juste observez",
  "L’air entre par le nez",
  "L’air ressort par la bouche",
  "À chaque expire, relâchez un peu plus",
  "Sentez l’air frais qui entre",
  "Sentez l’air tiède qui sort",
  "Votre ventre se soulève doucement",
  "Votre ventre redescend lentement",
  "Rien à faire, juste être",
  "Si une pensée arrive, laissez-la passer",
  "Comme un nuage dans le ciel",
  "Revenez à votre souffle",
  "Encore et encore, sans jugement",
  "Votre corps se détend davantage",
  "Votre esprit devient calme",
  "Savourez cet instant de paix",
  "Vous êtes exactement où vous devez être",
  "Prenez une dernière inspiration profonde",
  "Et expirez lentement par la bouche",
  "Bougez doucement vos doigts",
  "Bougez doucement vos orteils",
  "Quand vous êtes prêt, ouvrez les yeux",
];

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
export const MeditationVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      
      {/* FIL ROUGE : Logo à 10% sur toute la vidéo */}
      <Sequence>
        <LogoBranding 
          startFrame={0} 
          finalOpacity={0.1} 
          title="Mind Zen Minute"
          subtitle=""
          circleColor="#c9a961"
          textColor="#ffffff"
        />
      </Sequence>
      
      {/* 1. INTRO : 0s → 8s / frames 0 → 239 */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <IntroScene 
          branding={{
            title: "Mind Zen Minute",
            subtitle: "Retrouver le calme",
            circleColor: "#c9a961",
            textColor: "#ffffff",
          }}
          backgroundVideoSrc="intro-bg-8s.mp4"
          transitionStartFrame={210}
        />
      </Sequence>
      
      {/* 2. RESPIRATION : 8s → 26s / frames 240 → 779 */}
      <Sequence from={INTRO_DURATION} durationInFrames={BREATHING_DURATION}>
        <BreathingCircle 
          startFrame={INTRO_DURATION}
          cycleDuration={6}
          maxCycles={3}
          inhaleText="Inspirez"
          exhaleText="Expirez"
          circleColor="#c9a961"
          textColor="#ffffff"
        />
      </Sequence>
      
      {/* 3. GUIDANCE : 26s → 10min21s / frames 780 → 17354 */}
      {GUIDANCE_SCRIPT.map((text, i) => {
        const segmentStart = INTRO_DURATION + BREATHING_DURATION + i * (TRANSITION_DURATION + SEGMENT_DURATION);
        
        return (
          <React.Fragment key={`segment-${i}`}>
            {/* Transition 1s */}
            <Sequence from={segmentStart} durationInFrames={TRANSITION_DURATION}>
              <TransitionWave 
                direction="up" 
                color="#0a1628"
                maxOpacity={0.6}
              />
            </Sequence>
            
            {/* Texte 19s */}
            <Sequence from={segmentStart + TRANSITION_DURATION} durationInFrames={SEGMENT_DURATION}>
              <TextSegment 
                text={text} 
                startFrame={segmentStart + TRANSITION_DURATION}
                fadeInDuration={30}
                displayDuration={510}
                fadeOutDuration={30}
                align="center"
              />
            </Sequence>
          </React.Fragment>
        );
      })}
      
      {/* 4. OUTRO : 10min21s → 10min31s / frames 17355 → 18654 */}
      <Sequence from={TOTAL_DURATION - OUTRO_DURATION} durationInFrames={OUTRO_DURATION}>
        <OutroScene 
          branding={{
            title: "Mind Zen Minute",
            subtitle: "Merci d’avoir médité",
            circleColor: "#c9a961",
            textColor: "#ffffff",
          }}
          backgroundVideoSrc="outro-bg-10s.mp4"
          fadeOutStartFrame={270}
        />
      </Sequence>
      
    </AbsoluteFill>
  );
};

// ============================================================================
// COMPOSITION REMOTION — Pour render
// ============================================================================
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MeditationVideo"
        component={MeditationVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
