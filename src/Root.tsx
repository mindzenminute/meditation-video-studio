import { Composition } from 'remotion';
import { MeditationVideo, MeditationVideoInputProps } from './compositions/MeditationVideo';
import { TestLogoBranding } from './test-LogoBranding';
import { TestTransitionWave } from './test-TransitionWave';
import { TestBreathingCircle } from './test-BreathingCircle';

// ============================================================================
// ⚙️ CONFIGURATION STANDARD
// ============================================================================

const FPS = 30;
const DURATION_IN_SECONDS = 690; // 10 minutes
const WIDTH = 1920;
const HEIGHT = 1080;

// ============================================================================
// 📋 EXEMPLE D'INPUT PROPS COMPLET
// ============================================================================

const EXAMPLE_PROPS: MeditationVideoInputProps = {
  title: 'Méditation du Matin - Clarté et Calme',
  subtitle: '10 minutes pour commencer la journée en pleine conscience',
  introBranding: { title: 'MindZenMinute', subtitle: 'Méditations guidées' },
  outroBranding: { title: 'MindZenMinute', subtitle: 'À demain' },
  breathingCycles: 3,
  breathingCycleDuration: 8,
  guidanceSegments: [
    { text: 'Installez-vous confortablement, le dos droit mais détendu...', startTime: 0, duration: 25 },
    { text: 'Fermez doucement les yeux, ou posez un regard doux devant vous...', startTime: 25, duration: 20 },
    { text: 'Portez attention à votre respiration, sans la forcer, sans la juger...', startTime: 45, duration: 30 },
    { text: 'À chaque inspiration, accueillez le calme...', startTime: 75, duration: 20 },
    { text: 'À chaque expiration, relâchez les tensions...', startTime: 95, duration: 20 },
    { text: 'Laissez les pensées passer comme des nuages dans le ciel...', startTime: 115, duration: 25 },
    { text: 'Revenez doucement à votre souffle, votre ancre dans le présent...', startTime: 140, duration: 25 },
    { text: 'Prenez un dernier moment pour savourer cet état de présence...', startTime: 400, duration: 20 },
  ],
  callToAction: {
    title: "Merci d'avoir médité avec nous",
    message: 'Si cette pause vous a fait du bien, abonnez-vous pour ne pas manquer les prochaines méditations.',
    actionText: "S'abonner à la chaîne",
  },
  breathingCircleColor: '#c9a961',
  enableParticles: true,
};

// ============================================================================
// 📦 ENREGISTREMENT DES COMPOSITIONS
// ============================================================================

export const Root: React.FC = () => {
  return (
    <>
      {/* Compositions de test pour prévisualisation individuelle */}
      <TestLogoBranding />
      <TestTransitionWave />
      <TestBreathingCircle />
      
      {/* Composition principale de méditation */}
      <Composition
        id="MeditationVideo"
        component={MeditationVideo}
        durationInFrames={DURATION_IN_SECONDS * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={EXAMPLE_PROPS}
      />
    </>
  );
};
