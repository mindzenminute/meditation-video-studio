import React from 'react';
import { AbsoluteFill, Sequence, Composition, staticFile } from 'remotion';
import { IntroScene } from './IntroScene';
import { BreathingCircle } from './BreathingCircle';
import { TextSegment } from './TextSegment';
import { TransitionWave } from './TransitionWave';
import { OutroScene } from './OutroScene';
import { LogoBranding } from './LogoBranding';

// ============================================================================
// CONSTANTES GLOBALES — Version 10min31 à 30fps
// ============================================================================
export const FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

// Durées en frames
export const INTRO_DURATION = 8 * FPS;        // 240 frames = 8s
export const BREATHING_DURATION = 18 * FPS;   // 540 frames = 18s  
export const OUTRO_DURATION = 10 * FPS;       // 300 frames = 10s
export const SEGMENT_DURATION = 19 * FPS;     // 570 frames = 19s par texte
export const TRANSITION_DURATION = 1 * FPS;   // 30 frames = 1s
export const TOTAL_DURATION = 10 * 60 * FPS + 31 * FPS; // 18654 frames = 10min31s

// Frames de début de chaque phase
export const INTRO_START = 0;
export const BREATHING_START = INTRO_DURATION; // 240
export const GUIDANCE_START = BREATHING_START + BREATHING_DURATION; // 780
export const OUTRO_START = TOTAL_DURATION - OUTRO_DURATION; // 17355

// ============================================================================
// SCRIPT DE GUIDANCE — 28 segments = 9min15 de guidance
// 28 x 20s (19s texte + 1s transition) = 560s = 9min20s
// Avec intro 26s + outro 10s = 10min36s → on coupe 5s sur le total
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
// PROPS BRANDING — Centralisées pour cohérence
// ============================================================================
const BRANDING_CONFIG = {
  title: "MIND ZEN MINUTE",
  subtitle: "RETROUVER LE CALME",
  circleColor: "#c9a961",
  textColor: "#ffffff",
};

const BRANDING_OUTRO = {
  title: "MIND ZEN MINUTE",
  subtitle: "Merci d’avoir médité",
  circleColor: "#c9a961",
  textColor: "#ffffff",
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
export const MeditationVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0a1628' }}>
      
      {/* FIL ROUGE : Logo sablier à 10% sur toute la vidéo */}
      <Sequence from={0} durationInFrames={TOTAL_DURATION}>
        <LogoBranding 
          startFrame={0} 
          finalOpacity={0.1} 
          title={BRANDING_CONFIG.title}
          subtitle=""
          circleColor={BRANDING_CONFIG.circleColor}
          textColor={BRANDING_CONFIG.textColor}
        />
      </Sequence>
      
      {/* 1. INTRO : 0s → 8s / frames 0 → 239 */}
      <Sequence from={INTRO_START} durationInFrames={INTRO_DURATION}>
        <IntroScene 
          branding={BRANDING_CONFIG}
          backgroundVideoSrc="intro-bg-8s.mp4"
          transitionStartFrame={210} // Fade à 7s sur 8s
        />
      </Sequence>
      
      {/* 2. RESPIRATION : 8s → 26s / frames 240 → 779 */}
      <Sequence from={BREATHING_START} durationInFrames={BREATHING_DURATION}>
        <BreathingCircle 
          startFrame={BREATHING_START}
          cycleDuration={6} // 3s inspire + 3s expire
          maxCycles={3} // 3 cycles = 18s
          inhaleText="Inspirez"
          exhaleText="Expirez"
          circleColor={BRANDING_CONFIG.circleColor}
          textColor={BRANDING_CONFIG.textColor}
        />
      </Sequence>
      
      {/* 3. GUIDANCE : 26s → 10min21s / frames 780 → 17354 */}
      {GUIDANCE_SCRIPT.map((text, i) => {
        const segmentStart = GUIDANCE_START + i * (TRANSITION_DURATION + SEGMENT_DURATION);
        
        return (
          <React.Fragment key={`guidance-segment-${i}`}>
            {/* Transition 1s avant chaque texte */}
            <Sequence from={segmentStart} durationInFrames={TRANSITION_DURATION}>
              <TransitionWave 
                direction="up" 
                color="#0a1628"
                maxOpacity={0.6}
                duration={TRANSITION_DURATION}
              />
            </Sequence>
            
            {/* Texte 19s : 1s fade in + 17s lecture + 1s fade out */}
            <Sequence 
              from={segmentStart + TRANSITION_DURATION} 
              durationInFrames={SEGMENT_DURATION}
            >
              <TextSegment 
                text={text} 
                startFrame={segmentStart + TRANSITION_DURATION}
                fadeInDuration={30}    // 1s
                displayDuration={510}  // 17s
                fadeOutDuration={30}   // 1s
                align="center"
                marginLeft={120}
                marginRight={120}
              />
            </Sequence>
          </React.Fragment>
        );
      })}
      
      {/* 4. OUTRO : 10min21s → 10min31s / frames 17355 → 18654 */}
      <Sequence from={OUTRO_START} durationInFrames={OUTRO_DURATION}>
        <OutroScene 
          branding={BRANDING_OUTRO}
          durationInFrames={OUTRO_DURATION}
          fadeOutStartFrame={270} // Fade à 9s sur 10s
          backgroundVideoSrc="outro-bg-10s.mp4"
        />
      </Sequence>
      
    </AbsoluteFill>
  );
};

// ============================================================================
// COMPOSITION REMOTION — Pour render et preview
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

// ============================================================================
// EXPORTS POUR UTILISATION EXTERNE
// ============================================================================
export default MeditationVideo;

// Helper pour calculer la durée totale en secondes
export const getTotalDurationInSeconds = () => TOTAL_DURATION / FPS;

// Helper pour debug timeline
export const getTimelineMarkers = () => ({
  intro: { start: 0, end: INTRO_DURATION - 1 },
  breathing: { start: BREATHING_START, end: GUIDANCE_START - 1 },
  guidance: { start: GUIDANCE_START, end: OUTRO_START - 1 },
  outro: { start: OUTRO_START, end: TOTAL_DURATION - 1 },
  totalFrames: TOTAL_DURATION,
  totalSeconds: getTotalDurationInSeconds(),
});
